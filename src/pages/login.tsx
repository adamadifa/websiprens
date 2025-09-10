// Migrated from app/login/page.tsx
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "react-feather";
import api from '../api/axios';
import endpoints from '../api/endpoints';
import { toast } from 'react-hot-toast';
import CustomToast from '../components/CustomToast';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<{ email: string; password: string }>({ email: "", password: "" });
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({ email: false, password: false });
  const [loading, setLoading] = useState(false);

  // Validasi per field
  const validate = (name: string, value: string) => {
    switch (name) {
      case "email":
        if (!value) return "Email wajib diisi";
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) return "Format email tidak valid";
        return "";
      case "password":
        if (!value) return "Password wajib diisi";
        if (value.length < 6) return "Password minimal 6 karakter";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setError((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newError = {
      email: validate("email", form.email),
      password: validate("password", form.password)
    };
    setError(newError);
    setTouched({ email: true, password: true });
    if (!newError.email && !newError.password) {
      setLoading(true);
      try {
        const res = await api.post(endpoints.auth.login, form);
        const data = res.data;
        if (data.success && data.data.token) {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("user", JSON.stringify(data.data.user));
          toast.custom((t) => (
            <CustomToast
              type="success"
              title="Login Berhasil!"
              message={data.message || "Selamat datang kembali!"}
              onClose={() => toast.dismiss(t.id)}
            />
          ));
          setTimeout(() => {
            if (router) router.replace("/dashboard");
          }, 600);
        } else {
          toast.custom((t) => (
            <CustomToast
              type="error"
              title="Login Gagal"
              message={data.message || "Email atau password salah."}
              onClose={() => toast.dismiss(t.id)}
            />
          ));
        }
      } catch (err: unknown) {
        const errorMessage = err && typeof err === 'object' && 'response' in err &&
          err.response && typeof err.response === 'object' && 'data' in err.response &&
          err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data
          ? (err.response.data as { message: string }).message
          : "Terjadi kesalahan. Silakan coba lagi.";

        toast.custom((t) => (
          <CustomToast
            type="error"
            title="Login Error"
            message={errorMessage}
            onClose={() => toast.dismiss(t.id)}
          />
        ));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Login | Sipren</title>
        <meta name="description" content="Login page for Sipren" />
      </Head>
      <div className="min-h-screen flex bg-white">
        {/* Left: Login Form */}
        <div className="flex flex-col justify-center items-center w-full max-w-xl px-8 py-12 bg-white">
          <div className="w-full max-w-sm">
            <div className="flex items-center gap-2 mb-10">
              <Image src="/assets/images/logo/alamin.png" alt="SoftQA Logo" width={36} height={36} className="w-9 h-9" />
              <span className="font-bold text-xl tracking-tight text-gray-900">SPMB</span>
            </div>
            <h2 className="text-2xl font-semibold mb-1 text-gray-900">Selamat Datang Kembali</h2>
            <p className="text-gray-500 mb-8">Silahkan Login Untuk Melanjutkan Proses Pendaftaran Penerimaan Santri Baru</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">Email</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail size={18} />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`pl-10 pr-3 py-2 w-full border rounded-md focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none text-gray-900 text-base bg-white placeholder-gray-400 transition ${error.email && touched.email ? 'border-rose-400' : 'border-gray-300'}`}
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {error.email && touched.email && (
                  <div className="text-rose-500 text-xs font-medium mt-1 flex items-center gap-1">
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#F87171" /><path d="M8 5v3.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" /><circle cx="8" cy="11" r=".8" fill="#fff" /></svg>
                    {error.email}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-1">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className={`pl-10 pr-10 py-2 w-full border rounded-md focus:ring-2 focus:ring-teal-600 focus:border-teal-600 outline-none text-gray-900 text-base bg-white placeholder-gray-400 transition ${error.password && touched.password ? 'border-rose-400' : 'border-gray-300'}`}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {error.password && touched.password && (
                  <div className="text-rose-500 text-xs font-medium mt-1 flex items-center gap-1">
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" fill="#F87171" /><path d="M8 5v3.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" /><circle cx="8" cy="11" r=".8" fill="#fff" /></svg>
                    {error.password}
                  </div>
                )}
                <div className="flex justify-end mt-1">
                  <a href="#" className="text-xs text-teal-700 hover:underline font-medium">Forgot Password?</a>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-700 text-white font-semibold py-2.5 rounded-md hover:bg-teal-800 transition-colors duration-300 shadow-md"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-200" />
                <span className="mx-3 text-gray-400 text-sm">OR</span>
                <div className="flex-grow h-px bg-gray-200" />
              </div>
              <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2.5 text-gray-800 font-medium bg-white hover:bg-gray-50 transition">
                <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} className="h-5 w-5" />
                Continue with Google
              </button>
            </form>
            <div className="mt-8 text-center text-sm text-gray-500">
              Don&apos;t have an Account?{' '}
              <Link href="/register" className="text-teal-700 font-semibold hover:underline">Sign Up</Link>
            </div>
          </div>
        </div>
        {/* Right: Model Image Only */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-teal-900 to-teal-600 relative overflow-hidden">
          {/* Overlay background image */}
          <Image src="/assets/images/bg.png" alt="Overlay" fill className="absolute inset-0 w-full h-full object-cover opacity-10 z-0 pointer-events-none select-none" />
          {/* Ornamen blur lingkaran */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-teal-300 opacity-30 rounded-full blur-3xl z-0 pointer-events-none" />
          {/* Bubble SVG putih */}
          <svg className="absolute right-24 bottom-10 w-40 h-40 opacity-40 z-0 hidden md:block" viewBox="0 0 160 160">
            <circle cx="60" cy="80" r="60" fill="white" />
            <circle cx="120" cy="40" r="30" fill="white" />
            <circle cx="120" cy="120" r="18" fill="white" />
          </svg>
          {/* Model student */}
          {/* Ripple effect di belakang model */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
            <svg width="420" height="420" viewBox="0 0 420 420" fill="none" className="block" style={{ maxWidth: '80vw', maxHeight: '60vw' }}>
              <circle className="ripple1" cx="210" cy="210" r="80" stroke="#2dd4bf" strokeWidth="3" fill="none" />
              <circle className="ripple2" cx="210" cy="210" r="110" stroke="#5eead4" strokeWidth="2.5" fill="none" />
              <circle className="ripple3" cx="210" cy="210" r="140" stroke="#99f6e4" strokeWidth="2" fill="none" />
            </svg>
            <style jsx>{`
              .ripple1 {
                opacity: 0.36;
                animation: rippleGrow1 3.4s linear infinite;
              }
              .ripple2 {
                opacity: 0.22;
                animation: rippleGrow2 3.4s linear 0.6s infinite;
              }
              .ripple3 {
                opacity: 0.13;
                animation: rippleGrow3 3.4s linear 1.2s infinite;
              }
              @keyframes rippleGrow1 {
                0% { r: 80; opacity: 0.36; }
                70% { r: 180; opacity: 0.08; }
                100% { r: 180; opacity: 0; }
              }
              @keyframes rippleGrow2 {
                0% { r: 110; opacity: 0.22; }
                70% { r: 210; opacity: 0.06; }
                100% { r: 210; opacity: 0; }
              }
              @keyframes rippleGrow3 {
                0% { r: 140; opacity: 0.13; }
                70% { r: 260; opacity: 0.03; }
                100% { r: 260; opacity: 0; }
              }
            `}</style>
          </div>
          <div className="relative z-10 w-full flex items-center justify-center">
            <Image
              src="/assets/images/model3.png"
              alt="Model"
              width={500}
              height={600}
              className="max-w-xs md:max-w-md lg:max-w-xl w-full h-auto object-contain mx-auto drop-shadow-2xl"
              style={{ marginTop: '2rem', marginBottom: '2rem' }}
            />
            {/* Box promosi Ayo Bergabung */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-3.5rem] md:bottom-[-4.5rem] w-[95vw] max-w-2xl z-30">
              <div className="bg-gradient-to-br from-teal-900/80 to-teal-600/80 backdrop-blur-md rounded-2xl shadow-2xl px-6 py-6 md:px-10 md:py-8 border border-white/10">
                <h2 className="text-white text-xl md:text-3xl font-bold mb-2 leading-tight">AYO BERGABUNG BERSAMA<br className='hidden md:block' /> PONDOK PESANTREN RIYADUL FALAH</h2>
                <p className="text-white/90 text-sm md:text-base font-medium leading-normal">Daftar sekarang untuk menjadi bagian dari kami. Bersama kita wujudkan generasi muda yang Berakhlak Mulia, Tafaquh Fiddien, Berprestasi</p>
              </div>
            </div>
            {/* Badge 88% Lulusan Diterima */}
            <div className="absolute left-1/2 translate-x-[20%] top-[28%] md:top-[34%] animate-badge-float z-20">
              <div className="bg-gradient-to-br from-white via-teal-50 to-teal-200 rounded-2xl shadow-2xl border border-teal-100 px-5 py-3 flex items-center gap-3 min-w-[210px] max-w-xs fade-in-badge">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-teal-500">
                  <svg width="22" height="22" fill="none" viewBox="0 0 22 22">
                    <circle cx="11" cy="11" r="11" fill="#14b8a6" />
                    <path d="M7 12.5l3 3 5-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <div className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">Ayo</div>
                  <div className="text-xs md:text-sm font-semibold text-teal-800 leading-tight">Bergabung<br className="hidden md:block" />Besama Kami</div>
                </div>
              </div>
            </div>
            <style jsx>{`
              @keyframes badgeFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
              .animate-badge-float {
                animation: badgeFloat 2.8s ease-in-out infinite;
              }
              .fade-in-badge {
                opacity: 0;
                animation: badgeFadeIn 1.2s 0.2s ease forwards;
              }
              @keyframes badgeFadeIn {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
              }
            `}</style>
            {/* Label Tauhidullah */}
            <div className="absolute left-1/2 -translate-x-[180%] top-[3%] md:top-[10%] animate-floatY1 flex items-center gap-2 bg-white/90 rounded-xl shadow-lg px-3 py-1 border border-teal-200">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-teal-500 rounded-full">
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><rect x="3" y="4" width="10" height="8" rx="2" fill="#fff" /><rect x="3" y="4" width="10" height="8" rx="2" stroke="#0d9488" strokeWidth="1.5" /><path d="M6 6h4" stroke="#0d9488" strokeWidth="1.2" strokeLinecap="round" /></svg>
              </span>
              <span className="font-semibold text-teal-700 text-xs">RA Riyadul Falah</span>
            </div>
            {/* Label Leadership */}
            <div className="absolute left-1/2 translate-x-[120%] top-[7%] md:top-[14%] animate-floatY2 flex items-center gap-2 bg-white/90 rounded-xl shadow-lg px-3 py-1 border border-amber-200">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-amber-400 rounded-full">
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#fff" /><circle cx="8" cy="8" r="6" stroke="#eab308" strokeWidth="1.5" /><path d="M8 5v3l2 2" stroke="#eab308" strokeWidth="1.2" strokeLinecap="round" /></svg>
              </span>
              <span className="font-semibold text-amber-700 text-xs">MITA Ma&apos;rifa</span>
            </div>
            {/* Label Kemandirian */}
            <div className="absolute left-1/2 -translate-x-[160%] top-[40%] md:top-[48%] animate-floatX1 flex items-center gap-2 bg-white/90 rounded-xl shadow-lg px-3 py-1 border border-yellow-300">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-400 rounded-full">
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><rect x="4" y="4" width="8" height="8" rx="2" fill="#fff" /><rect x="4" y="4" width="8" height="8" rx="2" stroke="#facc15" strokeWidth="1.5" /><path d="M8 7v2" stroke="#facc15" strokeWidth="1.2" strokeLinecap="round" /></svg>
              </span>
              <span className="font-semibold text-yellow-700 text-xs">MTs Ma&apos;rifa</span>
            </div>
            {/* Label Rahmatan lil'alamiin */}
            <div className="absolute left-1/2 translate-x-[100%] top-[55%] md:top-[65%] animate-floatX2 flex items-center gap-2 bg-white/90 rounded-xl shadow-lg px-3 py-1 border border-teal-300">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-teal-600 rounded-full">
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#fff" /><circle cx="8" cy="8" r="6" stroke="#14b8a6" strokeWidth="1.5" /><path d="M6 10l4-4" stroke="#14b8a6" strokeWidth="1.2" strokeLinecap="round" /></svg>
              </span>
              <span className="font-semibold text-teal-800 text-xs">SMK Ma&apos;rifa</span>
            </div>
            <style jsx>{`
              @keyframes floatY1 {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-16px); }
              }
              @keyframes floatY2 {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(18px); }
              }
              @keyframes floatX1 {
                0%, 100% { transform: translateX(0); }
                50% { transform: translateX(-16px); }
              }
              @keyframes floatX2 {
                0%, 100% { transform: translateX(0); }
                50% { transform: translateX(18px); }
              }
              .animate-floatY1 { animation: floatY1 3s ease-in-out infinite; }
              .animate-floatY2 { animation: floatY2 3.5s ease-in-out infinite; }
              .animate-floatX1 { animation: floatX1 2.8s ease-in-out infinite; }
              .animate-floatX2 { animation: floatX2 3.2s ease-in-out infinite; }
            `}</style>
          </div>
        </div>
      </div>
    </>
  );
}
