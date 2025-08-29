import { useState, useEffect } from "react";
import Image from "next/image";
import api from "@/api/axios";
import endpoints from "@/api/endpoints";
import { PrestasiSiswa } from "@/api/types";


// Data fallback jika API tidak tersedia
const fallbackPrestasi: PrestasiSiswa[] = [
  {
    id: 1,
    nama_siswa: "Aisyah Putri",
    prestasi: "Juara 1 Lomba Matematika",
    tingkat: "kecamatan",
    foto_url: "/assets/images/model1.png",
    unit: {
      kode_unit: "001",
      nama_unit: "Madrasah Aliyah"
    }
  },
  {
    id: 2,
    nama_siswa: "Rizky Ramadhan",
    prestasi: "Juara 2 Lomba Sains",
    tingkat: "kabupaten",
    foto_url: "/assets/images/model1.png",
    unit: {
      kode_unit: "002",
      nama_unit: "Madrasah Tsanawiyah"
    }
  },
  {
    id: 3,
    nama_siswa: "Fauzan Akbar",
    prestasi: "Juara 1 Lomba Tahfidz",
    tingkat: "provinsi",
    foto_url: "/assets/images/model1.png",
    unit: {
      kode_unit: "003",
      nama_unit: "SDIT Al Amin"
    }
  },
  {
    id: 4,
    nama_siswa: "Siti Nurhaliza",
    prestasi: "Juara 3 Lomba Menggambar",
    tingkat: "kecamatan",
    foto_url: "/assets/images/model1.png",
    unit: {
      kode_unit: "004",
      nama_unit: "TK Calisa Rabbani"
    }
  },
  {
    id: 5,
    nama_siswa: "Ahmad Fadli",
    prestasi: "Juara 1 Lomba Bahasa Inggris",
    tingkat: "kabupaten",
    foto_url: "/assets/images/model1.png",
    unit: {
      kode_unit: "005",
      nama_unit: "Madrasah Aliyah"
    }
  },
  {
    id: 6,
    nama_siswa: "Nurul Hidayati",
    prestasi: "Juara 2 Lomba Robotik",
    tingkat: "provinsi",
    foto_url: "/assets/images/model1.png",
    unit: {
      kode_unit: "006",
      nama_unit: "Madrasah Tsanawiyah"
    }
  },
  {
    id: 7,
    nama_siswa: "Muhammad Rizki",
    prestasi: "Juara 1 Lomba Kaligrafi",
    tingkat: "nasional",
    foto_url: "/assets/images/model1.png",
    unit: {
      kode_unit: "007",
      nama_unit: "SDIT Al Amin"
    }
  },
];

const PrestasiSiswaSection = () => {
  const [prestasi, setPrestasi] = useState<PrestasiSiswa[]>(fallbackPrestasi);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch prestasi siswa from API
  useEffect(() => {
    const fetchPrestasi = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(endpoints.prestasiSiswa.getAll);
        const data = response.data?.data;

        if (data && Array.isArray(data)) {
          setPrestasi(data);
        } else {
          // Jika data tidak sesuai format, gunakan fallback
          setPrestasi(fallbackPrestasi);
        }
        setLoading(false);
      } catch (err: unknown) {
        console.error('Error fetching prestasi siswa:', err);
        const errorMessage = err instanceof Error ? err.message : 'Gagal memuat prestasi siswa';
        setError(errorMessage);
        setPrestasi(fallbackPrestasi);
        setLoading(false);
      }
    };

    fetchPrestasi();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="w-full rounded-3xl bg-gradient-to-br from-white via-teal-50 to-blue-100 p-6 sm:p-8 shadow-xl border border-white/50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-200 to-blue-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full opacity-20 animate-pulse delay-1000"></div>

        {/* Header */}
        <div className="relative z-10 mb-6">
          <div className="inline-block bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-full text-xs font-semibold mb-3">
            🏆 PRESTASI SISWA
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Prestasi Membanggakan</h3>
          <p className="text-gray-600 text-xs sm:text-sm">Siswa-siswi berprestasi di berbagai kompetisi</p>
        </div>

        <div className="flex justify-center items-center h-[280px] sm:h-[320px] lg:h-[360px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="w-full rounded-3xl bg-gradient-to-br from-white via-red-50 to-pink-100 p-6 sm:p-8 shadow-xl border border-white/50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-200 to-pink-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-orange-200 to-red-300 rounded-full opacity-20 animate-pulse delay-1000"></div>

        {/* Header */}
        <div className="relative z-10 mb-6">
          <div className="inline-block bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-xs font-semibold mb-3">
            ⚠️ PRESTASI SISWA
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Prestasi Membanggakan</h3>
          <p className="text-gray-600 text-xs sm:text-sm">Siswa-siswi berprestasi di berbagai kompetisi</p>
        </div>

        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-600 font-semibold text-sm sm:text-base">{error}</p>
          <p className="text-gray-500 text-xs sm:text-sm mt-2">Menggunakan data default</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full rounded-3xl bg-gradient-to-br from-white via-teal-50 to-blue-100 p-6 sm:p-8 shadow-xl border border-white/50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-200 to-blue-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full opacity-20 animate-pulse delay-1000"></div>

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="inline-block bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-full text-xs font-semibold mb-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span>PRESTASI SISWA</span>
          </div>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Prestasi Membanggakan</h3>
        <p className="text-gray-600 text-sm">Siswa-siswi berprestasi di berbagai kompetisi</p>
      </div>

      <div className="relative h-[320px] sm:h-[360px] w-full overflow-hidden">
        {/* Enhanced gradients */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-16 z-10"
          style={{
            background: "linear-gradient(to bottom, rgba(248, 250, 252, 0.95) 60%, transparent 100%)"
          }}
        />
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 z-10"
          style={{
            background: "linear-gradient(to top, rgba(248, 250, 252, 0.95) 60%, transparent 100%)"
          }}
        />

        <div
          className="marquee-vertical flex flex-col w-full max-w-md mx-auto"
          style={{
            animation: `marqueeUp ${prestasi.length * 3}s linear infinite`,
          }}
        >
          {prestasi.concat(prestasi).map((s, i) => (
            <div
              key={i}
              className="group flex items-center bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-3 sm:p-4 min-h-[60px] sm:min-h-[70px] w-full mb-3 sm:mb-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-white"
            >
              {/* Photo or Trophy icon */}
              <div className="relative mr-4">
                {s.foto_url ? (
                  <div className="relative">
              <Image
                      src={s.foto_url}
                      alt={s.nama_siswa}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                      onError={(e) => {
                        // Fallback to trophy if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    {/* Fallback trophy icon */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center hidden ${s.tingkat === 'nasional' ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                      s.tingkat === 'provinsi' ? 'bg-gradient-to-br from-purple-400 to-pink-500' :
                        s.tingkat === 'kabupaten' ? 'bg-gradient-to-br from-blue-400 to-cyan-500' :
                          'bg-gradient-to-br from-teal-400 to-green-500'
                      }`}>
                      <div className="text-white">
                        {s.tingkat === 'nasional' ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        ) : s.tingkat === 'provinsi' ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        ) : s.tingkat === 'kabupaten' ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${s.tingkat === 'nasional' ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                    s.tingkat === 'provinsi' ? 'bg-gradient-to-br from-purple-400 to-pink-500' :
                      s.tingkat === 'kabupaten' ? 'bg-gradient-to-br from-blue-400 to-cyan-500' :
                        'bg-gradient-to-br from-teal-400 to-green-500'
                    }`}>
                    <div className="text-white">
                      {s.tingkat === 'nasional' ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      ) : s.tingkat === 'provinsi' ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      ) : s.tingkat === 'kabupaten' ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      )}
                    </div>
                  </div>
                )}

                {/* Status indicator dot */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full ${s.tingkat === 'nasional' ? 'bg-yellow-500' :
                    s.tingkat === 'provinsi' ? 'bg-purple-500' :
                      s.tingkat === 'kabupaten' ? 'bg-blue-500' :
                        'bg-teal-500'
                    }`}></div>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 text-sm sm:text-base truncate group-hover:text-teal-700 transition-colors">
                  {s.nama_siswa}
                </div>
                <div className="text-gray-700 text-xs sm:text-sm mt-1 font-medium line-clamp-2">
                  {s.prestasi}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-2">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold text-white ${s.tingkat === 'nasional' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    s.tingkat === 'provinsi' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                      s.tingkat === 'kabupaten' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                        'bg-gradient-to-r from-teal-500 to-green-500'
                    }`}>
                    {s.tingkat.toUpperCase()}
                  </span>
                  <div className="hidden sm:flex items-center gap-1">
                    <span className="text-gray-500 text-xs">•</span>
                    <span className="text-gray-600 text-xs font-medium">{s.unit.nama_unit}</span>
                  </div>
                  <span className="text-gray-600 text-xs font-medium sm:hidden">{s.unit.nama_unit}</span>
                </div>
              </div>

              {/* Arrow indicator */}
              <div className="ml-2 sm:ml-3 text-gray-300 group-hover:text-teal-500 transition-colors">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>


    </section>
  );
};

export default PrestasiSiswaSection;