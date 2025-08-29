// Desain Halaman Utama (Revisi Final)
// ===================================================================
//
// CATATAN:
// - Menggunakan gambar PNG transparan.
// - Memindahkan posisi kartu partner ke atas.
// - Menerapkan gradasi warna ke seluruh latar belakang halaman.
//
// ===================================================================

// File: src/pages/index.tsx
// Deskripsi: Halaman utama yang disempurnakan sesuai permintaan.

import Head from 'next/head';
import Header from "../components/layouts/Header";
import HeroSection from '@/components/home/HeroSection';
import PartnerSection from '@/components/home/PartnerSection';
import UnitSection from '@/components/home/UnitSection';
import ReasonSection from "../components/home/ReasonSection";
import NewsSection from "../components/home/NewsSection";
import PrestasiSiswaSection from "../components/home/PrestasiSiswaSection";
import TestimonialSection from "../components/home/TestimonialSection";
import FooterSection from "../components/layouts/FooterSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>Beranda | Sipren</title>
        <meta name="description" content="Halaman utama Sipren. Pendidikan, prestasi, berita, dan lainnya." />
      </Head>
      {/* Latar belakang utama dengan gradasi warna menyeluruh */}
      <div className="relative bg-gradient-to-b from-[#f0f5ff] to-white min-h-screen font-sans">
        {/* Aurora Gradient Background - contained within screen */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-teal-500 via-teal-300 to-teal-200 opacity-35 rounded-full blur-3xl z-0" />
        <div className="absolute top-[40%] left-0 w-[250px] h-[250px] bg-gradient-to-tr from-teal-200 via-teal-100 to-yellow-100 opacity-15 rounded-full blur-2xl z-0" />
        <div className="absolute bottom-0 right-0 w-[280px] h-[280px] bg-gradient-to-tr from-teal-400 via-teal-300 to-teal-200 opacity-30 rounded-full blur-3xl z-0" />
        <div className="absolute bottom-[20%] right-[5%] w-[200px] h-[200px] bg-gradient-to-tr from-teal-100 via-yellow-100 to-teal-200 opacity-10 rounded-full blur-2xl z-0" />
        <Header />
        <HeroSection />
        {/* Bagian Partner (Posisi Baru) */}
        <PartnerSection />
        {/* Bagian Kategori */}
        <UnitSection />
        {/* Bagian Reason */}
        <ReasonSection />
        {/* Bagian News & Prestasi Siswa */}
        <section className="container mx-auto px-6 lg:px-12 mt-10 mb-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <NewsSection />
          </div>
          <div>
            <PrestasiSiswaSection />
          </div>
        </section>
        {/* Testimoni */}
        <TestimonialSection />
        {/* Footer */}
        <FooterSection />
      </div>
    </>
  );
}
