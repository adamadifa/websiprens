// Migrated from app/konfirmasipembayaran/page.tsx
import Head from 'next/head';
import React, { useState, useEffect } from "react";
import { UploadCloud, Calendar, CreditCard, CheckCircle, FileText } from "react-feather";
import Flatpickr from "react-flatpickr";
import clsx from "clsx";
import { Formik, Form, useField, useFormikContext } from 'formik';
import * as Yup from 'yup';
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_green.css";
import UserSidebarLayout from "../components/UserSidebarLayout";
import api from "../api/axios";
import endpoints from "../api/endpoints";
import Swal from 'sweetalert2';
import { useAuthRedirect } from '../hooks/useAuthRedirect';

const metodePembayaranList = [
  { label: "Transfer Bank", value: "transfer" },
  { label: "Tunai", value: "tunai" },
];

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string };
type SelectFieldProps = React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; children: React.ReactNode };
type FlatpickrFieldProps = { label: string; name: string };

const InputField: React.FC<InputFieldProps & { leftIcon?: React.ReactNode; inputClassName?: string; onValueChange?: (val: string) => void }> = ({ label, leftIcon, inputClassName, onValueChange, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div>
      {label && <label className="block text-gray-700 font-semibold mb-1">{label}</label>}
      <div className="relative">
        {leftIcon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400">{leftIcon}</span>}
        <input
          {...props}
          value={props.value ?? field.value}
          className={clsx(
            "w-full py-2.5 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-teal-50",
            leftIcon && "pl-10",
            inputClassName,
            meta.touched && meta.error && "border-rose-500 focus:ring-rose-400"
          )}
          onChange={e => {
            if (onValueChange) onValueChange(e.target.value);
            else field.onChange(e);
          }}
          inputMode={props.type === 'text' ? 'numeric' : props.inputMode}
          pattern={props.type === 'text' ? '[0-9.]*' : props.pattern}
        />
      </div>
      {meta.touched && meta.error && <div className="text-rose-600 text-sm mt-1">{meta.error}</div>}
    </div>
  );
};
const SelectField: React.FC<SelectFieldProps> = ({ label, children, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-1">{label}</label>
      <select {...field} {...props} className={clsx(
        "w-full py-2.5 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-teal-50",
        meta.touched && meta.error && "border-rose-500 focus:ring-rose-400"
      )}>
        {children}
      </select>
      {meta.touched && meta.error && <div className="text-rose-600 text-sm mt-1">{meta.error}</div>}
    </div>
  );
};
const FlatpickrField: React.FC<FlatpickrFieldProps> = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-1">{label}</label>
      <div className="relative">
        <Flatpickr
          {...field}
          options={{ dateFormat: "Y-m-d", maxDate: "today", allowInput: true }}
          value={field.value}
          onChange={([date]) => setFieldValue(field.name, date ? (date instanceof Date ? date.toISOString().slice(0, 10) : "") : "")}
          className={clsx(
            "w-full py-2.5 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 pr-10 bg-teal-50",
            meta.touched && meta.error && "border-rose-500 focus:ring-rose-400"
          )}
          placeholder="Pilih tanggal pembayaran"
        />
        <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-400 pointer-events-none" />
      </div>
      {meta.touched && meta.error && <div className="text-rose-600 text-sm mt-1">{meta.error}</div>}
    </div>
  );
};

const validationSchema = Yup.object({
  tanggalPembayaran: Yup.string().required('Tanggal pembayaran wajib diisi'),
  jumlahPembayaran: Yup.number().typeError('Jumlah pembayaran harus angka').required('Jumlah pembayaran wajib diisi').min(1, 'Jumlah pembayaran minimal 1'),
  metodePembayaran: Yup.string().required('Metode pembayaran wajib dipilih'),
  buktiPembayaran: Yup.mixed().required('Bukti pembayaran wajib diupload').test('fileRequired', 'Bukti pembayaran wajib diupload', value => value instanceof File),
});

const modalAnim = {
  enter: 'opacity-0 scale-95',
  enterActive: 'opacity-100 scale-100 transition-all duration-300',
  leave: 'opacity-100 scale-100',
  leaveActive: 'opacity-0 scale-95 transition-all duration-200',
};

export default function KonfirmasiPembayaran() {
  const { isChecking, isAuthenticated } = useAuthRedirect();
  const [status, setStatus] = useState("pending");
  const [buktiPreview, setBuktiPreview] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [notif, setNotif] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  const fetchSummary = () => {
    setLoading(true);
    setFetchError(null);
    api.get(endpoints.pendaftaronline.getKonfirmasiPembayaran)
      .then(res => {
        setSummary(res.data);
        setLoading(false);
      })
      .catch(err => {
        if (err?.response?.status === 404) {
          setSummary(null);
        } else {
          setFetchError('Gagal mengambil data konfirmasi pembayaran.');
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (isChecking || !isAuthenticated) return null;

  return (
    <UserSidebarLayout>
      <Head>
        <title>Konfirmasi Pembayaran | Sipren</title>
        <meta name="description" content="Konfirmasi Pembayaran Sipren" />
      </Head>
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-0 mt-10 mb-10 font-poppins border border-teal-100 overflow-hidden">
        <div className="h-2 bg-teal-100 relative">
          <div className="absolute left-0 top-0 h-2 bg-teal-500 transition-all duration-700" style={{ width: status === "submitted" ? "100%" : "60%" }} />
        </div>
        <div className="flex flex-col items-center py-8 px-8 bg-gradient-to-br from-teal-50 to-white border-b border-teal-100">
          <div className="bg-teal-100 rounded-full p-4 mb-3 shadow-md">
            <CreditCard size={36} className="text-teal-600" />
          </div>
          <h1 className="text-2xl font-extrabold text-teal-900 mb-1 tracking-tight">Konfirmasi Pembayaran</h1>
          <p className="mb-2 text-gray-600 text-center max-w-md">Silakan isi data berikut untuk melakukan konfirmasi pembayaran Anda. Pastikan data yang Anda masukkan sudah benar.</p>
        </div>
        {loading && <div className="p-8 text-center text-teal-700 font-semibold animate-pulse">Memuat data pembayaran...</div>}
        {fetchError && <div className="p-8 text-center text-rose-600 font-semibold">{fetchError}</div>}
        {(!loading && summary) ? (
          <div className="px-8 py-8">
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-6 shadow flex flex-col gap-4">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle size={24} className="text-green-500" />
                <span className="text-lg font-bold text-teal-900">Pembayaran Terkonfirmasi</span>
              </div>
              <div className="grid grid-cols-1 gap-2 text-gray-700 text-sm">
                <div className="flex justify-between"><span className="font-medium">Tanggal:</span><span>{summary.tanggal_pembayaran}</span></div>
                <div className="flex justify-between"><span className="font-medium">Jumlah:</span><span>Rp {Number(summary.jumlah_pembayaran).toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between"><span className="font-medium">Metode:</span><span className="capitalize">{summary.metode_pembayaran}</span></div>
                <div className="flex justify-between"><span className="font-medium">Status:</span><span className="capitalize font-semibold text-teal-700">{summary.status}</span></div>
                {summary.keterangan && <div className="flex justify-between"><span className="font-medium">Keterangan:</span><span>{summary.keterangan}</span></div>}
              </div>
              {summary.status === 'pending' && (
                <button
                  className="mt-4 w-fit bg-rose-600 hover:bg-rose-700 text-white font-semibold px-5 py-2 rounded-lg transition shadow self-end"
                  onClick={async () => {
                    const result = await Swal.fire({
                      title: 'Yakin mau membatalkan pembayaran?',
                      text: 'Tindakan ini tidak dapat dibatalkan.',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#d33',
                      cancelButtonColor: '#3085d6',
                      confirmButtonText: 'Ya, batalkan!',
                      cancelButtonText: 'Batal',
                    });
                    if (result.isConfirmed) {
                      setNotif(null);
                      try {
                        await api.delete(endpoints.pendaftaronline.deletePembayaran);
                        setNotif({ type: 'success', message: 'Konfirmasi pembayaran berhasil dibatalkan.' });
                        fetchSummary();
                      } catch (err: any) {
                        setNotif({ type: 'error', message: err?.response?.data?.message || 'Gagal membatalkan pembayaran.' });
                      }
                    }
                  }}
                >
                  Batalkan Pembayaran
                </button>
              )}
              {summary.bukti_pembayaran && (
                <div className="mt-2">
                  <div className="font-medium mb-1">Bukti Pembayaran:</div>
                  {summary.bukti_pembayaran.endsWith('.pdf') ? (
                    <a href={summary.bukti_pembayaran} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Lihat PDF</a>
                  ) : (
                    <img
                      src={summary.bukti_pembayaran}
                      alt="Bukti Pembayaran"
                      className="w-40 rounded shadow border border-teal-100 cursor-pointer hover:scale-105 transition"
                      onClick={() => setModalImg(summary.bukti_pembayaran)}
                    />
                  )}
                </div>
              )}
            </div>
            {modalImg && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-opacity duration-300"
                style={{ animation: 'fadeInBg 0.2s' }}
                onClick={() => setModalImg(null)}
              >
                <div
                  className="relative opacity-0 scale-95 animate-modalpop"
                  style={{ animation: 'modalPopIn 0.3s forwards' }}
                  onClick={e => e.stopPropagation()}
                >
                  <img src={modalImg} alt="Preview Bukti Pembayaran" className="max-w-[90vw] max-h-[80vh] rounded-xl shadow-2xl border-4 border-white" />
                  <button
                    className="absolute -top-4 -right-4 bg-white text-teal-700 rounded-full shadow p-2 hover:bg-teal-50"
                    onClick={() => setModalImg(null)}
                    aria-label="Tutup preview"
                  >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (!loading && !summary) && (
          <Formik
            initialValues={{
              tanggalPembayaran: todayStr,
              jumlahPembayaran: "",
              metodePembayaran: "",
              buktiPembayaran: null,
              keterangan: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setNotif(null);
              try {
                const formData = new FormData();
                const jumlah = values.jumlahPembayaran.replace(/\./g, "");
                formData.append("jumlah_pembayaran", jumlah);
                formData.append("metode_pembayaran", values.metodePembayaran);
                if (values.buktiPembayaran) {
                  formData.append("bukti_pembayaran", values.buktiPembayaran);
                }
                if (values.keterangan) {
                  formData.append("keterangan", values.keterangan);
                }
                await api.post(endpoints.pendaftaronline.konfirmasiPembayaran, formData, {
                  headers: { 'Content-Type': 'multipart/form-data' },
                });
                setStatus("submitted");
                setNotif({ type: 'success', message: 'Konfirmasi pembayaran berhasil dikirim!' });
                setSubmitting(false);
                fetchSummary();
              } catch (err: any) {
                setNotif({ type: 'error', message: err?.response?.data?.message || 'Gagal mengirim konfirmasi pembayaran.' });
                setSubmitting(false);
              }
            }}
          >
            {({ setFieldValue, values, isSubmitting, errors, touched }) => (
              <Form className="space-y-4 px-8 py-8">
                {notif && (
                  <div className={clsx(
                    'mb-4 px-4 py-2 rounded text-sm font-semibold',
                    notif.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-rose-50 text-rose-700 border border-rose-200')}
                  >
                    {notif.message}
                  </div>
                )}
                <div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-400" size={18} />
                    <InputField
                      label="Tanggal Pembayaran"
                      name="tanggalPembayaran"
                      type="text"
                      value={values.tanggalPembayaran}
                      readOnly
                      leftIcon={<Calendar size={18} />}
                      inputClassName="pl-10"
                    />
                  </div>
                </div>
                <InputField
                  label="Jumlah Pembayaran"
                  name="jumlahPembayaran"
                  type="text"
                  leftIcon={<CreditCard size={18} />}
                  inputClassName="text-right pr-4"
                  placeholder="Masukkan jumlah pembayaran"
                  onValueChange={val => {
                    const raw = val.replace(/\D/g, "");
                    const formatted = raw ? raw.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "";
                    setFieldValue("jumlahPembayaran", formatted);
                  }}
                  value={values.jumlahPembayaran}
                />
                <SelectField label="Metode Pembayaran" name="metodePembayaran">
                  <option value="" disabled>Pilih Metode</option>
                  {metodePembayaranList.map(m => (
                    <option value={m.value} key={m.value}>{m.label}</option>
                  ))}
                </SelectField>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Keterangan (Opsional)</label>
                  <textarea
                    name="keterangan"
                    className="w-full py-2.5 px-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 bg-teal-50 min-h-[80px]"
                    placeholder="Tulis keterangan tambahan jika ada..."
                    value={values.keterangan}
                    onChange={e => setFieldValue('keterangan', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Bukti Pembayaran</label>
                  <div className="flex items-center gap-4 flex-wrap">
                    <label className="flex items-center gap-2 cursor-pointer bg-teal-50 border border-teal-200 rounded-lg px-4 py-2 hover:bg-teal-100 transition shadow-sm">
                      <UploadCloud size={18} className="text-teal-700" />
                      <span className="text-teal-700 font-medium">Upload Bukti</span>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          setFieldValue("buktiPembayaran", file);
                          if (file) setBuktiPreview(URL.createObjectURL(file));
                          else setBuktiPreview(null);
                        }}
                      />
                    </label>
                    {buktiPreview && (
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-teal-100 bg-gray-50 shadow group">
                        {buktiPreview.endsWith('.pdf') ? (
                          <div className="flex flex-col items-center justify-center h-full w-full text-teal-400">
                            <FileText size={32} />
                            <span className="text-xs mt-1">PDF</span>
                          </div>
                        ) : (
                          <img src={buktiPreview} alt="Preview" className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110" />
                        )}
                      </div>
                    )}
                  </div>
                  {touched.buktiPembayaran && errors.buktiPembayaran && (
                    <div className="text-rose-600 text-sm mt-1">{errors.buktiPembayaran}</div>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-8">
                  <button
                    type="submit"
                    className={clsx(
                      "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold px-8 py-2.5 rounded-lg transition-all duration-300 shadow-lg flex items-center gap-2",
                      status === "submitted" && "opacity-60 cursor-not-allowed"
                    )}
                    disabled={status === "submitted" || isSubmitting}
                  >
                    {status === "submitted" ? (
                      <span className="flex items-center gap-2 animate-pulse"><CheckCircle size={18} /> Terkirim</span>
                    ) : (
                      <span className="flex items-center gap-2">Konfirmasi Pembayaran</span>
                    )}
                  </button>
                  {status === "submitted" && (
                    <span className="text-green-600 font-semibold flex items-center gap-1 animate-fade-in"><CheckCircle size={16} /> Data berhasil dikirim!</span>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </UserSidebarLayout>
  );
}
