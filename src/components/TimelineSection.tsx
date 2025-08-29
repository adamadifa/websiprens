"use client";
import React from "react";
import { Edit, CreditCard, Upload, Printer } from "react-feather";
import { useRouter } from "next/navigation";
import Link from "next/link";

const timeline = [
  { tahap: "Pendaftaran Dibuka", waktu: "1 Juli 2025", done: true },
  { tahap: "Verifikasi Berkas", waktu: "3-7 Juli 2025", done: true },
  { tahap: "Tes Seleksi", waktu: "10 Juli 2025", done: false },
  { tahap: "Pengumuman", waktu: "15 Juli 2025", done: false },
  { tahap: "Daftar Ulang", waktu: "20-22 Juli 2025", done: false }
];

export default function TimelineSection() {
  // Cari tahap aktif (done: false pertama)
  const activeIdx = timeline.findIndex((t) => !t.done);
  const router = useRouter();
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 w-full font-poppins border border-teal-100 animate-fade-in transition-all duration-500">
      <h3 className="font-bold text-lg mb-4 text-teal-900">Timeline Pendaftaran</h3>
      <ol className="relative ml-2">
        {timeline.map((item, i) => {
          // Status warna
          const isActive = i === activeIdx;
          const isDone = item.done;
          const circleColor = isDone ? 'bg-green-600 border-green-600 text-white' : isActive ? 'bg-blue-500 border-blue-500 text-white animate-pulse' : 'bg-gray-200 border-gray-300 text-gray-400';
          const titleColor = isDone ? 'text-green-700' : isActive ? 'text-blue-600' : 'text-gray-700';
          const subtitleColor = isDone ? 'text-green-400' : isActive ? 'text-blue-400' : 'text-gray-400';
          const icon = isDone ? (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
          ) : isActive ? (
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" /></svg>
          ) : (
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" /></svg>
          );
          return (
            <li key={i} className={`flex items-start relative min-h-[56px]`}> 
              {/* Nomor bulat */}
              <div className="flex flex-col items-center z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold text-lg shadow-sm ${circleColor} relative`}>{icon}
                  {isActive && <span className="absolute -top-2 -right-2 bg-blue-100 text-blue-600 text-xs font-bold px-2 py-0.5 rounded-full shadow animate-bounce">Aktif</span>}
                </div>
                {/* Garis putus-putus */}
                {i < timeline.length-1 && (
                  <div className="w-1 h-10 border-r-2 border-dashed mt-1" style={{borderColor: isDone ? '#22c55e' : '#d1d5db'}}></div>
                )}
              </div>
              {/* Konten */}
              <div className="ml-4 pt-0.5">
                <div className={`font-semibold text-base ${titleColor}`}>{item.tahap}</div>
                <div className={`text-xs ${subtitleColor}`}>{item.waktu}</div>
              </div>
            </li>
          );
        })}
      </ol>
      {/* Action Buttons */}
      <div className="mt-8 flex flex-col gap-3">
        <Link href="/formulirpendaftaran" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-2 rounded-lg transition cursor-pointer shadow animate-fade-in">
          <Edit size={18} className="-ml-1" /> Lengkapi Formulir Pendaftaran
        </Link>
        <Link href="#" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition cursor-pointer shadow animate-fade-in">
          <CreditCard size={18} className="-ml-1" /> Konfirmasi Pembayaran
        </Link>
        <Link href="#" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-semibold py-2 rounded-lg transition cursor-pointer shadow animate-fade-in">
          <Upload size={18} className="-ml-1" /> Upload Dokumen Persyaratan
        </Link>
        <Link href="#" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-semibold py-2 rounded-lg transition cursor-pointer shadow animate-fade-in">
          <Printer size={18} className="-ml-1" /> Cetak Formulir Pendaftaran
        </Link>
      </div>
    </div>
  );
}
