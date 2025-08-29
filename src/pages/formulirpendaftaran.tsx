import React, { useState, useEffect } from "react";
import { Formik, Form, useField, FieldHookConfig, useFormikContext } from 'formik';
import * as Yup from 'yup';
import UserSidebarLayout from '../components/UserSidebarLayout';
import { Edit, User, Hash, MapPin, Calendar, Phone, Home, Users, Book, Briefcase, AlertCircle } from "react-feather";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api/axios";
import endpoints from "../api/endpoints";
import CustomToast from "@/components/CustomToast";
import clsx from "clsx";
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

// ==============================================================================
// 1. REUSABLE FORM FIELD COMPONENTS (CONNECTED TO FORMIK)
// ==============================================================================
type FieldProps = {
    label: string;
    icon?: React.ElementType;
    placeholder?: string;
} & FieldHookConfig<string>;
// --- Input Field ---
const InputField: React.FC<FieldProps & { maxLength?: number }> = ({ label, icon: Icon, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name} className="block mb-1 font-semibold text-gray-700">{label}</label>
            <div className="relative">
                {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />}
                <input
                    {...field}
                    id={props.id || props.name}
                    placeholder={props.placeholder}
                    type={props.type}
                    maxLength={props.maxLength}
                    className={`w-full border bg-white rounded-lg px-4 py-2 pl-10 outline-none transition-all
                        ${meta.touched && meta.error ? 'border-rose-500 focus:border-rose-500' :
                            meta.touched ? 'border-teal-500 focus:border-teal-500' :
                                'border-gray-300 focus:border-gray-400'}`}
                />
            </div>
            {meta.touched && meta.error && (
                <div className="flex items-center gap-1 text-rose-600 text-sm mt-1">
                    <AlertCircle size={16} />
                    <span>{meta.error}</span>
                </div>
            )}
        </div>
    );
};
// --- Select Field ---
const SelectField: React.FC<FieldProps & { children: React.ReactNode }> = ({ label, icon: Icon, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name} className="block mb-1 font-semibold text-gray-700">{label}</label>
            <div className="relative">
                {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />}
                <select
                    {...field}
                    id={props.id || props.name}
                    className={`w-full border bg-white rounded-lg px-4 py-2 pl-10 outline-none transition-all
                        ${meta.touched && meta.error ? 'border-rose-500 focus:border-rose-500' :
                            meta.touched ? 'border-teal-500 focus:border-teal-500' :
                                'border-gray-300 focus:border-gray-400'}`}
                >
                    {props.children}
                </select>
            </div>
            {meta.touched && meta.error && (
                <div className="flex items-center gap-1 text-rose-600 text-sm mt-1">
                    <AlertCircle size={16} />
                    <span>{meta.error}</span>
                </div>
            )}
        </div>
    );
};
// --- Textarea Field ---
const TextareaField: React.FC<FieldProps> = ({ label, icon: Icon, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name} className="block mb-1 font-semibold text-gray-700">{label}</label>
            <div className="relative">
                {Icon && <Icon className="absolute left-3 top-4 text-gray-400" size={18} />}
                <textarea
                    {...field}
                    id={props.id || props.name}
                    rows={2}
                    placeholder={props.placeholder}
                    className={`w-full border bg-white rounded-lg px-4 py-2 pl-10 outline-none transition-all
                        ${meta.touched && meta.error ? 'border-rose-500 focus:border-rose-500' :
                            meta.touched ? 'border-teal-500 focus:border-teal-500' :
                                'border-gray-300 focus:border-gray-400'}`}
                />
            </div>
            {meta.touched && meta.error && (
                <div className="flex items-center gap-1 text-rose-600 text-sm mt-1">
                    <AlertCircle size={16} />
                    <span>{meta.error}</span>
                </div>
            )}
        </div>
    );
}
// --- Date Picker Field (FIXED) ---
const FormikDatePicker: React.FC<FieldProps> = ({ label, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);
    const selectedDate = field.value ? new Date(field.value) : null;
    return (
        <div>
            <label htmlFor={props.id || props.name} className="block mb-1 font-semibold text-gray-700">{label}</label>
            <div className="relative">
                <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date | null) => setFieldValue(field.name, date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText={props.placeholder}
                    className={`w-full border bg-white rounded-lg px-4 py-2 pr-10 outline-none transition-all hover:border-teal-400
                        ${meta.touched && meta.error ? 'border-rose-500 focus:border-rose-500' :
                            meta.touched ? 'border-teal-500 focus:border-teal-500' :
                                'border-gray-300 focus:border-gray-400'}`}
                    wrapperClassName="w-full"
                    popperPlacement="bottom"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    autoComplete="off"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Calendar size={18} className="text-gray-400" />
                </span>
            </div>
            {meta.touched && meta.error && (
                <div className="flex items-center gap-1 text-rose-600 text-sm mt-1">
                    <AlertCircle size={16} />
                    <span>{meta.error}</span>
                </div>
            )}
        </div>
    );
};
// ============================================================================== 
// 2. FORM VALIDATION SCHEMA (FIXED)
// ==============================================================================
const validationSchema = Yup.object({
    nama_lengkap: Yup.string().required('Nama lengkap wajib diisi').min(3, 'Nama lengkap minimal 3 karakter'),
    nisn: Yup.string().required('NISN wajib diisi').matches(/^[0-9]{10}$/, 'NISN harus 10 digit'),
    tempat_lahir: Yup.string().required('Tempat lahir wajib diisi').min(3, 'Tempat lahir minimal 3 karakter'),
    tanggal_lahir: Yup.date().required('Tanggal lahir wajib diisi').typeError('Format tanggal tidak valid'),
    anak_ke: Yup.number().required('Anak ke- wajib diisi').min(1, 'Minimal anak ke-1'),
    jumlah_saudara: Yup.number().required('Jumlah saudara wajib diisi').min(0, 'Minimal 0'),
    jenis_kelamin: Yup.string().required('Jenis kelamin wajib dipilih'),
    alamat: Yup.string().required('Alamat wajib diisi'),
    kode_pos: Yup.string().required('Kode pos wajib diisi').matches(/^[0-9]{5}$/, 'Kode pos harus 5 digit'),
    no_hp: Yup.string().required('No HP wajib diisi').matches(/^[0-9]{10,13}$/, 'Format No HP tidak valid'),
    no_kk: Yup.string().required('No KK wajib diisi').matches(/^[0-9]{16}$/, 'No KK harus 16 digit'),
    nik_ayah: Yup.string().required('NIK Ayah wajib diisi').matches(/^[0-9]{16}$/, 'NIK harus 16 digit'),
    nama_ayah: Yup.string().required('Nama Ayah wajib diisi'),
    pendidikan_ayah: Yup.string().required('Pendidikan Ayah wajib dipilih'),
    pekerjaan_ayah: Yup.string().required('Pekerjaan Ayah wajib diisi'),
    nik_ibu: Yup.string().required('NIK Ibu wajib diisi').matches(/^[0-9]{16}$/, 'NIK harus 16 digit'),
    nama_ibu: Yup.string().required('Nama Ibu wajib diisi'),
    pendidikan_ibu: Yup.string().required('Pendidikan Ibu wajib dipilih'),
    pekerjaan_ibu: Yup.string().required('Pekerjaan Ibu wajib diisi'),
    asal_sekolah: Yup.string().required('Asal sekolah wajib diisi'),
});
// ============================================================================== 
// 3. MAIN PAGE COMPONENT
// ==============================================================================
export default function FormulirPendaftaranPage() {
    const { isChecking, isAuthenticated } = useAuthRedirect();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState<'success' | 'error'>("error");
    const [initialFormValues, setInitialFormValues] = useState({
        nama_lengkap: '', nisn: '', tempat_lahir: '', tanggal_lahir: '', anak_ke: '', jumlah_saudara: '',
        jenis_kelamin: '', alamat: '', kode_pos: '', no_hp: '', no_kk: '', nik_ayah: '', nama_ayah: '',
        pendidikan_ayah: '', pekerjaan_ayah: '', nik_ibu: '', nama_ibu: '', pendidikan_ibu: '',
        pekerjaan_ibu: '', asal_sekolah: '',
    });
    const [noRegister, setNoRegister] = useState<string | null>(null);

    useEffect(() => {
        let userId: string | null = null;
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem("user");
            if (stored) userId = JSON.parse(stored)?.id;
        }
        if (!userId) {
            setError("Sesi tidak valid. Silakan login kembali.");
            setLoading(false);
            return;
        }
        api.get(endpoints.pendaftaronline.profilependaftar(userId))
            .then(res => {
                const data = res.data;
                setInitialFormValues({
                    nama_lengkap: data?.nama_lengkap || '',
                    nisn: data?.nisn || '',
                    tempat_lahir: data?.tempat_lahir || '',
                    tanggal_lahir: data?.tanggal_lahir || '',
                    anak_ke: data?.anak_ke || '',
                    jumlah_saudara: data?.jumlah_saudara || '',
                    jenis_kelamin: data?.jenis_kelamin || '',
                    alamat: data?.alamat || '',
                    kode_pos: data?.kode_pos || '',
                    no_hp: data?.no_hp || '',
                    no_kk: data?.no_kk || '',
                    nik_ayah: data?.nik_ayah || '',
                    nama_ayah: data?.nama_ayah || '',
                    pendidikan_ayah: data?.pendidikan_ayah || '',
                    pekerjaan_ayah: data?.pekerjaan_ayah || '',
                    nik_ibu: data?.nik_ibu || '',
                    nama_ibu: data?.nama_ibu || '',
                    pendidikan_ibu: data?.pendidikan_ibu || '',
                    pekerjaan_ibu: data?.pekerjaan_ibu || '',
                    asal_sekolah: data?.asal_sekolah || '',
                });
                setNoRegister(data?.no_register || null);
            })
            .catch(err => {
                setError("Gagal mengambil data pendaftar. Mohon coba lagi.");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSubmit = async (values: typeof initialFormValues, { setSubmitting }: any) => {
        setError(null);
        try {
            if (!noRegister) {
                setError("No register tidak ditemukan. Silakan login ulang.");
                setToastType("error");
                setShowToast(true);
                setTimeout(() => setShowToast(false), 4000);
                setSubmitting(false);
                return;
            }
            const url = endpoints.pendaftaronline.updateProfile(noRegister);
            await api.post(url, values);
            setToastType("success");
            setError(null);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
        } catch (err: any) {
            setError("Gagal menyimpan data. Mohon coba lagi.");
            setToastType("error");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    if (isChecking || !isAuthenticated) return null;
    if (loading) {
        return (
            <UserSidebarLayout>
                <div className="max-w-4xl mx-auto p-8 mt-10">
                    <div className="space-y-8 animate-pulse">
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
                            <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i}>
                                        <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                                        <div className="h-10 w-full bg-gray-300 rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
                            <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
                            <div className="space-y-4">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i}>
                                        <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                                        <div className="h-10 w-full bg-gray-300 rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
                            <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
                            <div className="space-y-4">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i}>
                                        <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                                        <div className="h-10 w-full bg-gray-300 rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
                            <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i}>
                                        <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                                        <div className="h-10 w-full bg-gray-300 rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </UserSidebarLayout>
        );
    }
    return (
        <UserSidebarLayout>
            {showToast && (
                <div className="fixed top-8 left-1/2 z-50" style={{ transform: 'translateX(-50%)' }}>
                    <CustomToast
                        type={toastType}
                        title={toastType === "success" ? "Berhasil!" : "Gagal!"}
                        message={toastType === "success" ? "Data berhasil disimpan!" : (error || "Terjadi kesalahan.")}
                        onClose={() => setShowToast(false)}
                    />
                </div>
            )}
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl border border-teal-100 mt-10 mb-10 overflow-hidden font-poppins">
                <div className="flex flex-col items-center py-8 px-8 bg-gradient-to-br from-teal-50 to-white border-b border-teal-100">
                    <div className="bg-teal-100 rounded-full p-4 mb-3 shadow-md">
                        <Edit size={36} className="text-teal-600" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-teal-900 mb-1 tracking-tight">Formulir Pendaftaran Siswa Baru</h1>
                    <p className="mb-2 text-gray-600 text-center max-w-lg">Silakan isi data berikut dengan benar dan lengkap. Data yang valid akan mempercepat proses seleksi.</p>
                </div>
                <div className="px-8 py-10">
                    <Formik
                        initialValues={initialFormValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-10">
                                <div>
                                    <h2 className="text-lg font-bold text-teal-700 mb-4 flex items-center gap-2"><User size={20} /> Data Diri</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputField label="Nama Lengkap" name="nama_lengkap" icon={User} placeholder="Nama sesuai ijazah" />
                                        <InputField label="NISN" name="nisn" icon={Hash} placeholder="10 digit NISN" maxLength={10} />
                                        <InputField label="Tempat Lahir" name="tempat_lahir" icon={MapPin} placeholder="Kota/Kabupaten" />
                                        <FormikDatePicker label="Tanggal Lahir" name="tanggal_lahir" placeholder="YYYY-MM-DD" />
                                        <InputField label="Anak ke-" name="anak_ke" icon={Users} placeholder="Contoh: 1" type="number" />
                                        <InputField label="Jumlah Saudara" name="jumlah_saudara" icon={Users} placeholder="Contoh: 2" type="number" />
                                        <SelectField label="Jenis Kelamin" name="jenis_kelamin" icon={User}>
                                            <option value="">Pilih Jenis Kelamin</option>
                                            <option value="L">Laki-laki</option>
                                            <option value="P">Perempuan</option>
                                        </SelectField>
                                        <InputField label="No HP" name="no_hp" icon={Phone} placeholder="08xxxxxxxxxx" maxLength={13} />
                                        <InputField label="No KK" name="no_kk" icon={Hash} placeholder="16 digit No KK" maxLength={16} />
                                        <InputField label="Kode Pos" name="kode_pos" icon={Home} placeholder="5 digit kode pos" maxLength={5} />
                                    </div>
                                    <div className="mt-6">
                                        <TextareaField label="Alamat" name="alamat" icon={MapPin} placeholder="Alamat lengkap sesuai KK" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-teal-700 mb-4 flex items-center gap-2"><User size={20} /> Data Ayah</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputField label="NIK Ayah" name="nik_ayah" icon={Hash} placeholder="16 digit NIK" maxLength={16} />
                                        <InputField label="Nama Ayah" name="nama_ayah" icon={User} placeholder="Nama lengkap ayah" />
                                        <SelectField label="Pendidikan Ayah" name="pendidikan_ayah" icon={Book}>
                                            <option value="">Pilih Pendidikan</option>
                                            <option value="SD">SD</option>
                                            <option value="SMP">SMP</option>
                                            <option value="SMA/SMK">SMA/SMK</option>
                                            <option value="D3/S1/S2/S3">D3/S1/S2/S3</option>
                                        </SelectField>
                                        <InputField label="Pekerjaan Ayah" name="pekerjaan_ayah" icon={Briefcase} placeholder="Pekerjaan ayah" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-teal-700 mb-4 flex items-center gap-2"><User size={20} /> Data Ibu</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputField label="NIK Ibu" name="nik_ibu" icon={Hash} placeholder="16 digit NIK" maxLength={16} />
                                        <InputField label="Nama Ibu" name="nama_ibu" icon={User} placeholder="Nama lengkap ibu" />
                                        <SelectField label="Pendidikan Ibu" name="pendidikan_ibu" icon={Book}>
                                            <option value="">Pilih Pendidikan</option>
                                            <option value="SD">SD</option>
                                            <option value="SMP">SMP</option>
                                            <option value="SMA/SMK">SMA/SMK</option>
                                            <option value="D3/S1/S2/S3">D3/S1/S2/S3</option>
                                        </SelectField>
                                        <InputField label="Pekerjaan Ibu" name="pekerjaan_ibu" icon={Briefcase} placeholder="Pekerjaan ibu" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-teal-700 mb-4 flex items-center gap-2"><Home size={20} /> Data Sekolah Asal</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <InputField label="Asal Sekolah" name="asal_sekolah" icon={Home} placeholder="Nama sekolah asal" />
                                    </div>
                                </div>
                                <div className="flex justify-end mt-8">
                                    <button
                                        type="submit"
                                        className={clsx(
                                            "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold px-10 py-3 rounded-lg transition-all duration-300 shadow-lg flex items-center gap-2",
                                            isSubmitting && "opacity-60 cursor-not-allowed"
                                        )}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2 animate-pulse"><Edit size={18} /> Mengirim...</span>
                                        ) : (
                                            <span className="flex items-center gap-2"><Edit size={18} /> Daftar Sekarang</span>
                                        )}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </UserSidebarLayout>
    );
}
