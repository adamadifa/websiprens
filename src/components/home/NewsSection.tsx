// NewsSection.tsx
import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/api/axios";
import endpoints from "@/api/endpoints";
import Link from "next/link";

interface NewsItem {
  title: string;
  category: string;
  img: string;
  slug: string;
}

const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    setLoading(true);
    setError(null);
    api.get(endpoints.publicPosts.getPostHomepage)
      .then(res => {
        let posts = res.data?.data;
        if (!posts) posts = [];
        if (!Array.isArray(posts)) posts = [posts];
        const mapped = posts.map((post: { title: string; category?: { name: string }; image: string; slug: string }) => ({
          title: post.title,
          category: post.category?.name || "-",
          img: post.image,
          slug: post.slug,
        }));
        setNews(mapped);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat berita");
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <section className="w-full rounded-3xl bg-gradient-to-br from-white via-blue-50 to-indigo-100 p-6 sm:p-8 shadow-xl border border-white/50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full opacity-20 animate-pulse delay-1000"></div>

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-xs font-semibold mb-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span>BERITA TERKINI</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Berita & Informasi</h3>
            <p className="text-gray-600 text-sm">Update terbaru seputar kegiatan pondok</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-blue-600 font-semibold shadow-md">
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              Memuat...
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 h-full relative z-10">
        {/* Featured News Skeleton */}
        <div className="row-span-2 col-span-1 rounded-2xl sm:rounded-3xl overflow-hidden relative bg-white shadow-lg">
          <div className="h-48 sm:h-64 lg:h-80 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse">
            <div className="absolute top-4 left-4 w-16 sm:w-20 h-5 sm:h-6 bg-gray-300 rounded-full"></div>
            <div className="absolute top-4 right-4 w-12 sm:w-16 h-5 sm:h-6 bg-gray-300 rounded-full"></div>
          </div>
          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
            <div className="h-5 sm:h-6 w-3/4 bg-gray-300 rounded mb-2 sm:mb-3 animate-pulse"></div>
            <div className="h-3 sm:h-4 w-1/2 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Secondary News Skeleton - Top */}
        <div className="col-span-1 rounded-xl sm:rounded-2xl overflow-hidden relative bg-white shadow-lg">
          <div className="h-24 sm:h-32 lg:h-36 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse">
            <div className="absolute top-3 left-3 w-12 sm:w-16 h-4 sm:h-5 bg-gray-300 rounded-full"></div>
          </div>
          <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
            <div className="h-4 sm:h-5 w-2/3 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Secondary News Skeleton - Bottom */}
        <div className="col-span-1 rounded-xl sm:rounded-2xl overflow-hidden relative bg-white shadow-lg">
          <div className="h-24 sm:h-32 lg:h-36 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse">
            <div className="absolute top-3 left-3 w-12 sm:w-16 h-4 sm:h-5 bg-gray-300 rounded-full"></div>
          </div>
          <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
            <div className="h-4 sm:h-5 w-2/3 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Stats footer */}
      <div className="relative z-10 mt-6 pt-4 border-t border-gray-200/50">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Memuat berita...</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Update real-time</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
  if (error) return (
    <section className="w-full rounded-3xl bg-gradient-to-br from-white via-red-50 to-pink-100 p-6 sm:p-8 shadow-xl border border-white/50 relative overflow-hidden">
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Gagal Memuat Berita</h3>
        <p className="text-red-600 font-semibold">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
        >
          Coba Lagi
        </button>
      </div>
    </section>
  );

  if (!news || news.length < 3) return (
    <section className="w-full rounded-3xl bg-gradient-to-br from-white via-blue-50 to-indigo-100 p-6 sm:p-8 shadow-xl border border-white/50 relative overflow-hidden">
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Belum Ada Berita</h3>
        <p className="text-gray-500">Berita terbaru akan segera hadir</p>
      </div>
    </section>
  );

  return (
    <section className="w-full rounded-3xl bg-gradient-to-br from-white via-blue-50 to-indigo-100 p-6 sm:p-8 shadow-xl border border-white/50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full opacity-20 animate-pulse delay-1000"></div>

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-xs font-semibold mb-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span>BERITA TERKINI</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Berita & Informasi</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Update terbaru seputar kegiatan pondok</p>
          </div>
          <Link
            href="/news"
            className="group flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full text-blue-600 font-semibold hover:bg-white transition-all duration-300 shadow-md hover:shadow-lg text-sm"
          >
            <span>Lihat Semua</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 h-full relative z-10">
        {/* Featured News - Kiri besar */}
        <Link
          href={`/news/${news[0].slug}`}
          className="group row-span-2 col-span-1 rounded-2xl sm:rounded-3xl overflow-hidden relative cursor-pointer bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
        >
          <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
            {news[0].img && !imageErrors.has(news[0].img) ? (
              <Image
                src={news[0].img}
                alt={news[0].title}
                width={400}
                height={400}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                onError={() => {
                  setImageErrors(prev => new Set(prev).add(news[0].img));
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
                <div className="text-white text-center">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <p className="text-sm font-medium">Gambar Berita</p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            {/* Category badge */}
            <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs px-3 py-1.5 rounded-full shadow-lg font-semibold z-10 backdrop-blur-sm">
              {news[0].category}
            </div>

            {/* Featured indicator */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full shadow-lg font-bold z-10">
              FEATURED
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
            <div className="text-white text-base sm:text-lg lg:text-xl font-bold drop-shadow-lg mb-2 sm:mb-3 line-clamp-2 group-hover:text-blue-200 transition-colors duration-300">
              {news[0].title}
            </div>
            <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>Baca selengkapnya</span>
            </div>
          </div>
        </Link>

        {/* Secondary News - Kanan atas */}
        <Link
          href={`/news/${news[1].slug}`}
          className="group col-span-1 rounded-xl sm:rounded-2xl overflow-hidden relative cursor-pointer bg-white shadow-lg hover:shadow-xl transition-all duration-500"
        >
          <div className="relative h-24 sm:h-32 lg:h-36 overflow-hidden">
            {news[1].img && !imageErrors.has(news[1].img) ? (
              <Image
                src={news[1].img}
                alt={news[1].title}
                width={400}
                height={180}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                onError={() => {
                  setImageErrors(prev => new Set(prev).add(news[1].img));
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-500 flex items-center justify-center">
                <div className="text-white text-center">
                  <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <p className="text-xs font-medium">Berita</p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

            <div className="absolute top-3 left-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-xs px-2.5 py-1 rounded-full shadow-md font-semibold z-10">
              {news[1].category}
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
            <div className="text-white text-xs sm:text-sm lg:text-base font-semibold drop-shadow-lg line-clamp-2 group-hover:text-teal-200 transition-colors duration-300">
              {news[1].title}
            </div>
          </div>
        </Link>

        {/* Secondary News - Kanan bawah */}
        <Link
          href={`/news/${news[2].slug}`}
          className="group col-span-1 rounded-xl sm:rounded-2xl overflow-hidden relative cursor-pointer bg-white shadow-lg hover:shadow-xl transition-all duration-500"
        >
          <div className="relative h-24 sm:h-32 lg:h-36 overflow-hidden">
            {news[2].img && !imageErrors.has(news[2].img) ? (
              <Image
                src={news[2].img}
                alt={news[2].title}
                width={400}
                height={180}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                onError={() => {
                  setImageErrors(prev => new Set(prev).add(news[2].img));
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center">
                <div className="text-white text-center">
                  <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <p className="text-xs font-medium">Berita</p>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

            <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs px-2.5 py-1 rounded-full shadow-md font-semibold z-10">
              {news[2].category}
            </div>
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
            <div className="text-white text-xs sm:text-sm lg:text-base font-semibold drop-shadow-lg line-clamp-2 group-hover:text-orange-200 transition-colors duration-300">
              {news[2].title}
            </div>
          </div>
        </Link>
      </div>


    </section>
  );
};

export default NewsSection;
