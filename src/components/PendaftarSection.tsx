"use client";
import React from "react";

import { useEffect, useState } from "react";
import api from "../api/axios";
import endpoints from "../api/endpoints";
import CustomToast from "./CustomToast";
import ToastWithFade from "./ToastWithFade";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ReactDOM from 'react-dom/client';
import { pdf, Document, Page, View, Text, Image, StyleSheet, Font } from '@react-pdf/renderer';
import QRCode from 'qrcode';

// Helper untuk fetch gambar dan konversi ke base64
async function fetchImageAsBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Helper untuk generate QR code base64 dari string
async function generateQRCodeBase64(text: string): Promise<string> {
  const base64 = await QRCode.toDataURL(text, { margin: 1, width: 48 });
  console.log('QR base64 length:', base64.length);
  return base64;
}

export default function PendaftarSection() {
  const [toast, setToast] = useState<{
    open: boolean;
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    message: string;
  }>({ open: false, type: 'success', title: '', message: '' });
  // Toast otomatis hilang setelah 3 detik
  useEffect(() => {
    if (toast.open) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, open: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.open]);
  const [fotoUrl, setFotoUrl] = useState<string>("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [printing, setPrinting] = useState(false);

  // Handler ganti foto
  const handleChangePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !data) return;
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('foto', file);
    setUploading(true);
    try {
      // Upload foto sesuai dokumentasi baru
      const res = await api.post(endpoints.pendaftaronline.updateFoto(data.no_register), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Jika response mengembalikan path foto baru, update state
      // Gunakan foto_url dari response, tambahkan cache-buster agar selalu fresh
      console.log(res.data.foto_url);
      setData((prev: any) => {
        // foto_url dari API sudah lengkap, tidak perlu base_url tambahan
        const newFotoUrl = res.data.foto_url ? res.data.foto_url + '?t=' + Date.now() : prev.foto_url;
        console.log(newFotoUrl);
        setFotoUrl(newFotoUrl);
        return {
          ...prev,
          foto: res.data.foto,
          foto_url: newFotoUrl
        };
      });
      setToast({
        open: true,
        type: 'success',
        title: 'Foto Berhasil Diubah',
        message: 'Foto profil Anda berhasil diperbarui.'
      });
    } catch (err) {
      setToast({
        open: true,
        type: 'error',
        title: 'Gagal Upload Foto',
        message: 'Terjadi kesalahan saat mengunggah foto. Silakan coba lagi.'
      });
    } finally {
      setUploading(false);
    }
  };


  useEffect(() => {
    let userId = null;
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem("user");
        if (stored) userId = JSON.parse(stored)?.id;
      } catch { }
    }
    if (!userId) {
      setError("User tidak ditemukan");
      setLoading(false);
      return;
    }
    setLoading(true);
    api.get(endpoints.pendaftaronline.profilependaftar(userId))
      .then(res => {
        setData(res.data);
        setFotoUrl(res.data.foto_url || "");
        setLoading(false);
      })
      .catch(err => {
        setError("Gagal mengambil data pendaftar");
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="bg-white rounded-2xl shadow-lg w-full overflow-hidden animate-pulse">
      {/* Cover */}
      <div className="relative h-28 bg-gradient-to-r from-teal-900 to-teal-700 flex items-center justify-end pr-4">
        <div className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-1/2 z-20">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl bg-gray-200" />
        </div>
      </div>
      <div className="h-14" />
      <div className="flex flex-col items-center text-center px-2 pb-5">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-7 w-32 bg-gray-200 rounded mb-1" />
          <div className="h-5 w-16 bg-gray-200 rounded-full" />
        </div>
        <ul className="bg-white rounded-xl shadow border border-gray-100 divide-y divide-gray-100 mt-4 w-full max-w-xl mx-auto">
          {[...Array(8)].map((_, i) => (
            <li key={i} className="flex justify-between items-center px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-200" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!data) return null;

  // Komponen PDF dokumen (A4, layout seperti contoh)
  const MyPDFDocument = ({ data }: { data: any }) => (
    <Document>
      <Page size="A4" style={pdfStyles.body}>
        {/* Foto Siswa di kiri, kop surat tetap di tengah */}
        <View style={{ position: 'relative', marginBottom: 10, minHeight: 100 }}>
          {/* Foto Siswa absolute kiri, tanpa border */}
          <View style={{ position: 'absolute', left: 0, top: 0 }}>
            {data?.foto_url ? (
              <Image src={data.foto_url} style={{ width: 70, height: 90, marginRight: 12, marginBottom: 2, objectFit: 'cover' }} />
            ) : (
              <View style={pdfStyles.fotoPlaceholder}>
                <Text style={{ fontSize: 9, color: '#888', textAlign: 'center' }}>Foto Siswa</Text>
              </View>
            )}
          </View>
          {/* Kop surat tetap di tengah */}
          <View style={{ alignItems: 'center' }}>
            <Image src="/assets/images/logo/alamin.png" style={pdfStyles.logo} />
            <Text style={pdfStyles.title}>FORMULIR PENDAFTARAN</Text>
            <Text style={pdfStyles.subtitle}>PONDOK PESANTREN RIYADUL FALAH</Text>
            <Text style={pdfStyles.address}>SINDANGKASIH - CIAMIS</Text>
          </View>
        </View>
        <View style={pdfStyles.hr} />

        {/* Bagian Data */}
        <Section title="A. DATA PRIBADI">
          <PDFRow label="Nama Lengkap" value={data?.nama_lengkap} />
          <PDFRow label="NISN" value={data?.nisn} />
          <PDFRow label="Jenis Kelamin" value={data?.jenis_kelamin} />
          <PDFRow label="Tempat, Tgl Lahir" value={data?.tempat_lahir ? `${data.tempat_lahir}, ${data.tanggal_lahir || ''}` : ''} />
          <PDFRow label="Anak Ke" value={data?.anak_ke} />
          <PDFRow label="Jumlah Saudara" value={data?.jumlah_saudara} />
        </Section>
        <Section title="B. DATA ORANG TUA">
          <Text style={pdfStyles.sectionLabel}>Data Ayah:</Text>
          <PDFRow label="Nama Ayah" value={data?.nama_ayah} />
          <PDFRow label="NIK Ayah" value={data?.nik_ayah} />
          <PDFRow label="Pendidikan" value={data?.pendidikan_ayah} />
          <PDFRow label="Pekerjaan" value={data?.pekerjaan_ayah} />
          <Text style={[pdfStyles.sectionLabel, { marginTop: 6 }]}>Data Ibu:</Text>
          <PDFRow label="Nama Ibu" value={data?.nama_ibu} />
          <PDFRow label="NIK Ibu" value={data?.nik_ibu} />
          <PDFRow label="Pendidikan" value={data?.pendidikan_ibu} />
          <PDFRow label="Pekerjaan" value={data?.pekerjaan_ibu} />
        </Section>
        <Section title="C. DATA ALAMAT & KONTAK">
          <PDFRow label="Alamat" value={data?.alamat} />
          <PDFRow label="Kode Pos" value={data?.kode_pos} />
          <PDFRow label="No. HP" value={data?.no_hp} />
        </Section>
        <Section title="D. DATA AKADEMIK">
          <PDFRow label="Asal Sekolah" value={data?.asal_sekolah} />
          <PDFRow label="Unit" value={data?.kode_unit} />
          <PDFRow label="Jalur Pendaftaran" value={data?.jalur_pendaftaran} />
          <PDFRow label="No. Registrasi" value={data?.no_register} />
        </Section>
        {/* Footer tanggal kanan bawah */}

      </Page>
    </Document>
  );

  const Section = ({ title, children }: any) => (
    <View style={{ marginBottom: 8 }}>
      <Text style={pdfStyles.sectionTitle}>{title}</Text>
      <View style={pdfStyles.sectionHr} />
      <View>{children}</View>
    </View>
  );

  const PDFRow = ({ label, value }: { label: string, value: any }) => (
    <View style={pdfStyles.row}>
      <Text style={pdfStyles.label}>{label}</Text>
      <Text style={pdfStyles.colon}>:</Text>
      <Text style={pdfStyles.value}>{value || ''}</Text>
    </View>
  );

  const pdfStyles = StyleSheet.create({
    body: {
      padding: 32,
      fontSize: 12,
      fontFamily: 'Helvetica',
      lineHeight: 1.5,
      position: 'relative',
    },
    header: {
      alignItems: 'center',
      marginBottom: 8,
    },
    logo: {
      width: 40,
      height: 40,
      marginBottom: 2,
    },
    title: {
      fontSize: 13,
      fontWeight: 'bold',
      letterSpacing: 0.5,
      marginBottom: 0,
    },
    subtitle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginTop: 0,
      marginBottom: 0,
    },
    address: {
      fontSize: 11,
      marginTop: 0,
      marginBottom: 0,
    },
    hr: {
      borderBottomWidth: 1,
      borderBottomColor: '#bbb',
      marginBottom: 10,
      marginTop: 2,
    },
    sectionTitle: {
      fontWeight: 'bold',
      fontSize: 12,
      marginBottom: 2,
    },
    sectionHr: {
      borderBottomWidth: 0.5,
      borderBottomColor: '#eee',
      marginBottom: 2,
    },
    sectionLabel: {
      fontWeight: 'bold',
      fontSize: 11,
      marginBottom: 1,
    },
    row: {
      flexDirection: 'row',
      marginBottom: 1,
    },
    label: {
      width: 90,
      fontSize: 11,
    },
    colon: {
      width: 8,
      textAlign: 'center',
      fontSize: 11,
    },
    value: {
      fontSize: 11,
      flex: 1,
    },
    footer: {
      position: 'absolute',
      right: 32,
      bottom: 32,
      fontSize: 11,
      color: '#444',
    },
    fotoSiswa: {
      width: 70,
      height: 90,
      borderWidth: 1,
      borderColor: '#888',
      marginRight: 12,
      marginBottom: 2,
      objectFit: 'cover',
    },
    fotoPlaceholder: {
      width: 70,
      height: 90,
      borderWidth: 1,
      borderColor: '#bbb',
      backgroundColor: '#f5f5f5',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
      marginBottom: 2,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
  });

  // Handler cetak PDF dengan react-pdf
  const handlePrintPDF = async () => {
    try {
      setPrinting(true);
      if (!data) throw new Error('Data tidak tersedia');
      let fotoBase64 = '';
      if (data.foto_url) {
        try {
          const proxiedFotoUrl = `/api/proxy-image?url=${encodeURIComponent(data.foto_url)}`;
          fotoBase64 = await fetchImageAsBase64(proxiedFotoUrl);
        } catch (e) {
          fotoBase64 = '';
        }
      }
      let qrBase64 = '';
      if (data.no_register) {
        try {
          qrBase64 = await generateQRCodeBase64(data.no_register);
        } catch (e) {
          qrBase64 = '';
        }
      }
      console.log('QR base64:', qrBase64 ? qrBase64.substring(0, 100) + '...' : '(empty)');
      const blob = await pdf(<MyPDFDocument data={{ ...data, foto_url: fotoBase64, qr_code: qrBase64 }} />).toBlob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
    } catch (error: any) {
      alert('Gagal generate PDF: ' + error.message);
    } finally {
      setPrinting(false);
    }
  };

  // Komponen baris data label : value
  const DataRow = ({ label, value }: { label: string, value: any }) => (
    <div style={{ display: 'flex', marginBottom: 1 }}>
      <div style={{ width: 120 }}>{label}</div>
      <div style={{ width: 10, textAlign: 'center' }}>:</div>
      <div style={{ flex: 1 }}>{value || ''}</div>
    </div>
  );

  const tdLabel = { border: '1px solid #888', padding: 8, fontWeight: 'bold', width: 180, background: '#f5f5f5' };
  const tdValue = { border: '1px solid #888', padding: 8 };

  return (
    <>
      <ToastWithFade toast={toast} setToast={setToast} />
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl w-full overflow-hidden animate-fade-in border border-teal-100 transition-all duration-500">
        {/* Cover */}
        <div className="relative h-28 bg-gradient-to-r from-teal-900 to-teal-700 flex items-center justify-end pr-4">
          <button className="bg-white/80 hover:bg-white rounded-full p-1 shadow transition absolute top-3 right-4 z-20"><svg width="20" height="20" fill="none" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="10" cy="10" r="9" /><circle cx="10" cy="5" r="1.5" /><circle cx="10" cy="10" r="1.5" /><circle cx="10" cy="15" r="1.5" /></svg></button>
          {/* Avatar absolute center bottom */}
          <div className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-1/2 z-20">
            <label className="cursor-pointer group">
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleChangePhoto} disabled={uploading} />
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-teal-400 via-teal-200 to-white p-1 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={fotoUrl || "https://ui-avatars.com/api/?name=Anonim&background=14b8a6&color=fff&size=128"}
                    alt="Avatar"
                    className={`w-full h-full rounded-full border-4 border-white shadow-xl object-cover bg-gray-100 ${uploading ? 'opacity-50' : ''}`}
                  />
                  {uploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-full">
                      <svg className="animate-spin h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                    </div>
                  )}
                  {/* Watermark kamera di pojok kanan bawah avatar */}
                  <span className="absolute bottom-1 right-1 bg-white/80 rounded-full p-1 flex items-center justify-center shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553.378A2 2 0 0121 12.36V17a2 2 0 01-2 2H5a2 2 0 01-2-2v-4.64a2 2 0 01.447-1.982L8 10m7-4V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v.5M12 15a3 3 0 100-6 3 3 0 000 6z" />
                    </svg>
                  </span>
                </div>
              </div>
            </label>
          </div>
        </div>
        {/* Spacer untuk avatar overlap */}
        <div className="h-16" />
        {/* Tombol Cetak PDF */}
        <div className="flex justify-end px-6 mb-2">
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-lg transition shadow flex items-center gap-2"
            style={{ cursor: printing ? 'not-allowed' : 'pointer' }}
            onClick={handlePrintPDF}
            disabled={printing}
          >
            {printing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Sedang mencetak...
              </>
            ) : (
              <>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="6" y="9" width="12" height="13" rx="2" /><path d="M6 9V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5" /></svg>
                Cetak PDF
              </>
            )}
          </button>
        </div>
        {/* Info */}
        <div className="flex flex-col items-center text-center px-2 pb-5" id="formulir-pendaftar-print">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl md:text-3xl font-bold text-teal-900 animate-fade-in-slow">{data.nama_lengkap || '-'}</span>
            {data.status === 'Diterima' && (
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full shadow animate-bounce"><svg width="14" height="14" fill="#22c55e" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" fill="#22c55e" /><path d="M7 10l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg> Diterima</span>
            )}
            {data.status === 'Verifikasi' && (
              <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full shadow animate-pulse"><svg width="14" height="14" fill="#fbbf24" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" fill="#fbbf24" /><path d="M10 6v4" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><circle cx="10" cy="14" r="1" fill="#fff" /></svg> Verifikasi</span>
            )}
            {data.status === 'Ditolak' && (
              <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-700 text-xs font-semibold px-3 py-1 rounded-full shadow animate-shake"><svg width="14" height="14" fill="#f43f5e" viewBox="0 0 20 20"><circle cx="10" cy="10" r="7" fill="#f43f5e" /><path d="M7 7l6 6M13 7l-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg> Ditolak</span>
            )}
          </div>
          {/* Notebook-style detail siswa */}
          <ul className="bg-white/90 rounded-xl shadow border border-gray-100 divide-y divide-gray-100 mt-4 w-full max-w-xl mx-auto animate-fade-in-slow">
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>No Register</span><span className="text-gray-500">{data.no_register || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M8 2v4M16 2v4M3 10h18" /></svg>Tanggal Register</span><span className="text-gray-500">{data.tanggal_register || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>NISN</span><span className="text-gray-500">{data.nisn || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" /></svg>Nama Lengkap</span><span className="text-gray-500">{data.nama_lengkap || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>Jenis Kelamin</span><span className="text-gray-500">{data.jenis_kelamin || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>Tempat Lahir</span><span className="text-gray-500">{data.tempat_lahir || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M8 2v4M16 2v4M3 10h18" /></svg>Tanggal Lahir</span><span className="text-gray-500">{data.tanggal_lahir || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>Anak Ke</span><span className="text-gray-500">{data.anak_ke || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>Jumlah Saudara</span><span className="text-gray-500">{data.jumlah_saudara || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 4.418-7 13-9 13s-9-8.582-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>Alamat</span><span className="text-gray-500">{data.alamat || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3v4M8 3v4M2 11h20" /></svg>ID Province</span><span className="text-gray-500">{data.id_province || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3v4M8 3v4M2 11h20" /></svg>ID Regency</span><span className="text-gray-500">{data.id_regency || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3v4M8 3v4M2 11h20" /></svg>ID District</span><span className="text-gray-500">{data.id_district || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3v4M8 3v4M2 11h20" /></svg>ID Village</span><span className="text-gray-500">{data.id_village || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3v4M8 3v4M2 11h20" /></svg>Kode Pos</span><span className="text-gray-500">{data.kode_pos || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3v4M8 3v4M2 11h20" /></svg>No KK</span><span className="text-gray-500">{data.no_kk || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>NIK Ayah</span><span className="text-gray-500">{data.nik_ayah || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>Nama Ayah</span><span className="text-gray-500">{data.nama_ayah || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>Pendidikan Ayah</span><span className="text-gray-500">{data.pendidikan_ayah || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>Pekerjaan Ayah</span><span className="text-gray-500">{data.pekerjaan_ayah || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>NIK Ibu</span><span className="text-gray-500">{data.nik_ibu || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>Nama Ibu</span><span className="text-gray-500">{data.nama_ibu || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>Pendidikan Ibu</span><span className="text-gray-500">{data.pendidikan_ibu || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>Pekerjaan Ibu</span><span className="text-gray-500">{data.pekerjaan_ibu || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 12h-4M2 12h4m5-5v10" /></svg>No HP</span><span className="text-gray-500">{data.no_hp || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8" /><rect x="2" y="4" width="20" height="16" rx="2" /></svg>Asal Sekolah</span><span className="text-gray-500">{data.asal_sekolah || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3v4M8 3v4M2 11h20" /></svg>Email</span><span className="text-gray-500">{data.email || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3v4M8 3v4M2 11h20" /></svg>Kode Unit</span><span className="text-gray-500">{data.kode_unit || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3v4M8 3v4M2 11h20" /></svg>Kode TA</span><span className="text-gray-500">{data.kode_ta || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M8 2v4M16 2v4M3 10h18" /></svg>Created At</span><span className="text-gray-500">{data.created_at || '-'}</span></li>
            <li className="flex justify-between items-center px-5 py-3 hover:bg-teal-50 transition"><span className="flex items-center gap-2 font-semibold text-gray-700"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M8 2v4M16 2v4M3 10h18" /></svg>Updated At</span><span className="text-gray-500">{data.updated_at || '-'}</span></li>

          </ul>
        </div>
      </div>
      {/* End main content */}
    </>
  );
}
