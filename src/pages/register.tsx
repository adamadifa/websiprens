import React, { useState, useEffect, ChangeEvent, FocusEvent, FormEvent } from "react";
import Head from 'next/head';
import { toast } from 'react-hot-toast';
import CustomToast from '../components/CustomToast';
import api from '../api/axios';
import endpoints from '../api/endpoints';
import { Unit } from '../api/types';
import { Home, BookOpen, Clipboard, User, AlertCircle, Phone } from "react-feather";
import styles from "../styles/RegisterForm.module.css";

export default function Register() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    jenis_kelamin: "",
    no_hp: "",
    kode_unit: ""
  });
  const [error, setError] = useState<{ [key: string]: string }>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    jenis_kelamin: "",
    no_hp: "",
    kode_unit: ""
  });

  const validate = (name: string, value: string) => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Nama wajib diisi";
      case "jenis_kelamin":
        return value ? "" : "Pilih jenis kelamin";
      case "kode_unit":
        return value ? "" : "Pilih jenjang pendidikan";
      case "email":
        if (!value) return "Email wajib diisi";
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) return "Format email tidak valid";
        return "";
      case "no_hp":
        if (!value) return "Nomor HP wajib diisi";
        if (!/^\d{10,15}$/.test(value)) return "Nomor HP harus 10-15 digit angka";
        return "";
      case "password":
        if (!value) return "Password wajib diisi";
        if (value.length < 6) return "Password minimal 6 karakter";
        return "";
      case "password_confirmation":
        if (!value) return "Konfirmasi password wajib diisi";
        if (value !== form.password) return "Konfirmasi password tidak sama";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: validate(name, value) }));
    if (name === "password" && form.password_confirmation) {
      setError((prev) => ({
        ...prev,
        password_confirmation: validate("password_confirmation", form.password_confirmation)
      }));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setError((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const res = await api.get(endpoints.unit.list);
        setUnits(res.data);
      } catch {
        setUnits([]);
      }
    };
    fetchUnits();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newError: { [key: string]: string } = {};
    Object.keys(form).forEach((key) => {
      newError[key] = validate(key, form[key as keyof typeof form]);
    });
    setError(newError);
    if (Object.values(newError).every((v) => !v)) {
      try {
        const res = await api.post('/auth/register-siswa', form);
        const data = res.data;
        if (data.success) {
          toast.custom((t) => (
            <CustomToast
              type="success"
              title="Well done!"
              message={data.message || 'Registrasi berhasil!'}
              onClose={() => toast.dismiss(t.id)}
            />
          ));
          setForm({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            jenis_kelamin: "",
            no_hp: "",
            kode_unit: ""
          });
          setError({
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            jenis_kelamin: "",
            no_hp: "",
            kode_unit: ""
          });
        } else {
          toast.custom((t) => (
            <CustomToast
              type="error"
              title="Oh snap!"
              message={data.message || 'Gagal registrasi.'}
              onClose={() => toast.dismiss(t.id)}
            />
          ));
        }
      } catch (err) {
        toast.custom((t) => (
          <CustomToast
            type="error"
            title="Oh snap!"
            message="Terjadi kesalahan saat mengirim data."
            onClose={() => toast.dismiss(t.id)}
          />
        ));
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Daftar | Sipren</title>
        <meta name="description" content="Daftar akun baru di Sipren" />
      </Head>
      <div className={"min-h-screen flex flex-col-reverse md:flex-row " + styles.mobileStack}>
        <div className={"hidden md:flex md:w-1/2 text-white flex-col justify-center px-8 py-12 gap-10 relative overflow-hidden " + styles.leftBgImage}>
          <img src="/assets/images/logo/logowithtext.png" alt="Logo" className={styles.logoCorner} />
          <div className="max-w-md mx-auto space-y-10">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-4 rounded-full flex items-center justify-center">
                <Home size={32} />
              </div>
              <div>
                <div className="font-bold text-lg">Fasilitas Lengkap</div>
                <div className="text-white/70 text-sm">Lingkungan pesantren modern, asrama nyaman, dan ruang belajar representatif.</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-4 rounded-xl">
                <BookOpen size={32} />
              </div>
              <div>
                <div className="font-bold text-lg">Program Unggulan</div>
                <div className="text-white/70 text-sm">Tahfidz, Bahasa Arab-Inggris, dan pengembangan karakter Islami.</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-4 rounded-xl">
                <Clipboard size={32} />
              </div>
              <div>
                <div className="font-bold text-lg">Seleksi Transparan</div>
                <div className="text-white/70 text-sm">Proses seleksi penerimaan siswa baru yang jujur dan profesional.</div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-40 h-40 bg-teal-900 rounded-full opacity-20 blur-2xl" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-teal-700 rounded-full opacity-25 blur-2xl" />
          </div>
        </div>
        <div className="md:w-1/2 flex items-center justify-center px-4 py-12 bg-gradient-to-br from-white via-teal-50 to-white relative overflow-hidden">
          <div className="absolute -top-14 -left-14 w-52 h-52 bg-gradient-to-br from-teal-200 via-teal-100 to-white opacity-40 rounded-full blur-2xl z-0" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tr from-teal-100 via-yellow-50 to-white opacity-30 rounded-full blur-2xl z-0" />
          <div className="w-full max-w-xl relative z-10">
            <div className="flex flex-col items-center mb-8">
              <div className="bg-teal-100 rounded-full p-3 mb-2 shadow-md flex items-center justify-center">
                <img src="/assets/images/logo/alamin.png" alt="Logo" style={{ width: 64, height: 64, objectFit: 'contain' }} />
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-1 text-center">Sistem Penerimaan <br /><span className="text-teal-700">Murid Baru 2026/2027</span></h2>
              <p className="text-gray-500 text-center text-sm max-w-md">Isi data diri dengan lengkap dan benar untuk proses pendaftaran siswa baru di Pondok Pesantren RIYADUL FALAH.</p>
              <div className="w-12 h-1 bg-teal-700 rounded mt-4" />
            </div>
            <div className="bg-white rounded-2xl shadow-2xl border border-teal-100 px-8 py-8">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={styles.inputField + (error.name ? ` ${styles.error}` : '')}
                    placeholder=" "
                    autoComplete="off"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="name" className={styles.label}>Nama Lengkap</label>
                  <span className={styles.iconSearch + (error.name ? ' ' + styles.errorIcon : '')}><User size={18} /></span>
                  {error.name && <div className={styles.errorMsg}><AlertCircle size={14} /> {error.name}</div>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="jenis_kelamin" className={styles.label}>Jenis Kelamin</label>
                  <select
                    id="jenis_kelamin"
                    name="jenis_kelamin"
                    className={styles.inputField + (error.jenis_kelamin ? ` ${styles.error}` : '')}
                    value={form.jenis_kelamin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled>Pilih jenis kelamin</option>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                  {error.jenis_kelamin && <div className={styles.errorMsg}><AlertCircle size={14} /> {error.jenis_kelamin}</div>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="kode_unit" className={styles.label}>Unit/Jenjang Pendidikan</label>
                  <select
                    id="kode_unit"
                    name="kode_unit"
                    className={styles.inputField + (error.kode_unit ? ` ${styles.error}` : '')}
                    value={form.kode_unit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="" disabled>Pilih jenjang pendidikan</option>
                    {units.map(unit => (
                      <option key={unit.kode_unit} value={unit.kode_unit}>{unit.nama_unit}</option>
                    ))}
                  </select>
                  {error.kode_unit && <div className={styles.errorMsg}><AlertCircle size={14} /> {error.kode_unit}</div>}
                </div>
                <div className={styles.formGroup}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={styles.inputField + (error.email ? ` ${styles.error}` : '')}
                    placeholder=" "
                    autoComplete="off"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="email" className={styles.label}>Email</label>
                  <span className={styles.iconSearch + (error.email ? ' ' + styles.errorIcon : '')}><Clipboard size={18} /></span>
                  {error.email && <div className={styles.errorMsg}><AlertCircle size={14} /> {error.email}</div>}
                </div>
                <div className={styles.formGroup}>
                  <input
                    id="no_hp"
                    name="no_hp"
                    type="tel"
                    className={styles.inputField + (error.no_hp ? ` ${styles.error}` : '')}
                    placeholder=" "
                    autoComplete="off"
                    value={form.no_hp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <label htmlFor="no_hp" className={styles.label}>Nomor HP</label>
                  <span className={styles.iconSearch + (error.no_hp ? ' ' + styles.errorIcon : '')}><Phone size={18} /></span>
                  {error.no_hp && <div className={styles.errorMsg}><AlertCircle size={14} /> {error.no_hp}</div>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={styles.formGroup}>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className={styles.inputField + (error.password ? ` ${styles.error}` : '')}
                      placeholder=" "
                      autoComplete="new-password"
                      value={form.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <span className={styles.iconSearch + (error.password ? ' ' + styles.errorIcon : '')}><Clipboard size={18} /></span>
                    {error.password && <div className={styles.errorMsg}><AlertCircle size={14} /> {error.password}</div>}
                  </div>
                  <div className={styles.formGroup}>
                    <input
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password"
                      className={styles.inputField + (error.password_confirmation ? ` ${styles.error}` : '')}
                      placeholder=" "
                      autoComplete="new-password"
                      value={form.password_confirmation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label htmlFor="password_confirmation" className={styles.label}>Konfirmasi Password</label>
                    <span className={styles.iconSearch + (error.password_confirmation ? ' ' + styles.errorIcon : '')}><Clipboard size={18} /></span>
                    {error.password_confirmation && <div className={styles.errorMsg}><AlertCircle size={14} /> {error.password_confirmation}</div>}
                  </div>
                </div>
                <div className="flex items-center pt-2">
                  <input id="setuju" type="checkbox" className="mr-2 accent-teal-700" />
                  <label htmlFor="setuju" className="text-xs text-gray-600">
                    Saya setuju dengan <a href="#" className="text-teal-700 underline hover:text-teal-800">Syarat & Ketentuan</a> dan <a href="#" className="text-teal-700 underline hover:text-teal-800">Kebijakan Privasi</a>
                  </label>
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-teal-700 text-white font-semibold py-3 rounded-lg hover:bg-teal-800 transition-colors duration-300 shadow-lg hover:shadow-teal-300/50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        Sedang diproses...
                      </span>
                    ) : (
                      'Daftar Sekarang'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
