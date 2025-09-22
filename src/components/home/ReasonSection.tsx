// ReasonSection.tsx
// Section Misi Pondok

import { Target, Users, TrendingUp, BookOpen, Zap, ShoppingBag } from "react-feather";
import { useEffect, useState } from "react";
import api from "@/api/axios";
import endpoints from "@/api/endpoints";
import type { VisiMisiResponse, Misi } from "@/api/types";

const misiPondok = [
  {
    title: "Pencetak Kader Muslim 5M",
    desc: "Menjadi lembaga pencetak kader muslim dengan predikat 5M",
    icon: <Target className="text-white w-full h-full" />,
  },
  {
    title: "Amar Ma'ruf Nahyi Munkar",
    desc: "Menjadi lembaga dan wahana amar ma'ruf nahyi munkar",
    icon: <Users className="text-white w-full h-full" />,
  },
  {
    title: "Penopang Masyarakat",
    desc: "Menjadi penopang, pendorong, dan pemandu majunya masyarakat",
    icon: <TrendingUp className="text-white w-full h-full" />,
  },
  {
    title: "Pilot Proyek Masyarakat Islam",
    desc: "Menjadi pilot proyek masyarakat islam yang menjunjung tinggi Al-Qur'an dan Hadits dalam wadah NKRI",
    icon: <BookOpen className="text-white w-full h-full" />,
  },
  {
    title: "Corong Usaha Pertanian",
    desc: "Menjadi corong usaha bidang Pertanian",
    icon: <Zap className="text-white w-full h-full" />,
  },
  {
    title: "Ekonomi & Perdagangan",
    desc: "Peternakan, Ekonomi, Perdagangan, dan Perindustrian",
    icon: <ShoppingBag className="text-white w-full h-full" />,
  },
];

const iconMap = [
  <Target key="target" className="text-white w-full h-full" />,
  <Users key="users" className="text-white w-full h-full" />,
  <TrendingUp key="trending" className="text-white w-full h-full" />,
  <BookOpen key="book" className="text-white w-full h-full" />,
  <Zap key="zap" className="text-white w-full h-full" />,
  <ShoppingBag key="shopping" className="text-white w-full h-full" />,
];

const ReasonSection = () => {
  const [visiMisi, setVisiMisi] = useState<Misi[]>(misiPondok.map(m => ({ id: 0, judul: m.title, deskripsi: m.desc, created_at: '', updated_at: '' })));
  const [visi, setVisi] = useState<string>('Menjadi lembaga pendidikan terdepan...');

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await api.get<VisiMisiResponse>(endpoints.publicVisiMisi.getVisiMisi);
        if (isMounted && res.data?.status === 'success') {
          setVisi(res.data.visi.deskripsi);
          setVisiMisi(res.data.misi || []);
        }
      } catch {
        // Biarkan fallback ke data statis
      }
    })();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-teal-700 to-teal-600 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-green-700 to-green-600 rounded-full opacity-20 animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block bg-gradient-to-r from-green-400 to-green-500 text-white px-4 sm:px-6 py-2 rounded-full font-semibold text-xs sm:text-sm md:text-base mb-3 sm:mb-4 shadow-lg">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span>VISI DAN MISI</span>
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight sm:leading-snug px-2">
            Visi dan Misi <span className="text-green-400">Pondok Pesantren</span>{" "}
            <span className="block sm:inline">RIYADUL FALAH</span>
          </h2>
          <p className="text-white/80 text-xs sm:text-sm mt-3 sm:mt-4 max-w-2xl mx-auto">
            {visi}
          </p>
        </div>

        {/* Misi List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {visiMisi.map((misi, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group hover:shadow-lg hover:shadow-green-500/20"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 aspect-square flex items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 group-hover:from-green-400 group-hover:to-green-500 transition-all duration-300 flex-shrink-0 shadow-md">
                  <div className="w-5 h-5 sm:w-6 sm:h-6">
                    {iconMap[i % iconMap.length]}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm sm:text-base md:text-lg text-white mb-1 sm:mb-2 group-hover:text-green-200 transition-colors duration-300 leading-tight">
                    <span className="text-green-400 text-xs sm:text-sm font-mono mr-1">
                      {(i + 1).toString().padStart(2, '0')}.
                    </span>
                    {misi.judul}
                  </div>
                  <div className="text-white/90 text-xs sm:text-sm leading-relaxed">
                    {misi.deskripsi}
                  </div>
                </div>
              </div>

              {/* Hover indicator */}
              <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-2 text-green-300 text-xs">
                  <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Misi Utama</span>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default ReasonSection;
