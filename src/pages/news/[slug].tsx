import Head from 'next/head';
import Image from "next/image";
import Header from "../../components/layouts/Header";
import FooterSection from "../../components/layouts/FooterSection";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import endpoints from "../../api/endpoints";
import Link from "next/link";

export default function NewsDetail() {
    const router = useRouter();
    const { slug } = router.query;
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [otherNews, setOtherNews] = useState<any[]>([]);
    const [loadingOther, setLoadingOther] = useState(true);

    // Fetch data berita detail secara dinamis
    useEffect(() => {
        if (!slug || typeof slug !== 'string') return;

        setLoading(true);
        setError(null);

        api.get(endpoints.publicPosts.getDetail(slug))
            .then(res => {
                setData(res.data?.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching news detail:', err);
                setError("Berita tidak ditemukan.");
                setLoading(false);
            });
    }, [slug]);

    // Fetch berita lainnya
    useEffect(() => {
        setLoadingOther(true);
        api.get(endpoints.publicPosts.getRandomPost)
            .then(res => {
                let posts = res.data?.data;
                if (!posts) posts = [];
                if (!Array.isArray(posts)) posts = [posts];
                setOtherNews(posts);
                setLoadingOther(false);
            })
            .catch(() => {
                setOtherNews([]);
                setLoadingOther(false);
            });
    }, [slug]);

    return (
        <>
            <Head>
                <title>{data?.title ? `${data.title} | Sipren` : 'Detail Berita | Sipren'}</title>
                <meta name="description" content={data?.excerpt || "Detail Berita Sipren"} />
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-[#f0f5ff] to-white font-sans flex flex-col">
                <Header />
                <main className="flex-1 flex justify-center items-start py-10 px-2 md:px-0">
                    <div className="w-full max-w-7xl flex flex-col md:flex-row-reverse gap-10 mt-20 md:mt-24 mb-8">
                        {/* Sidebar berita lainnya di kanan (atau bawah di mobile) */}
                        <aside className="w-full md:w-80 flex-shrink-0 order-2 md:order-1 mb-10 md:mb-0">
                            <div className="bg-white/90 rounded-2xl shadow-lg p-5">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Berita Lainnya</h3>
                                {loadingOther ? (
                                    <ul className="space-y-4 animate-pulse">
                                        {[1, 2, 3].map((_, idx) => (
                                            <li key={idx} className="flex items-center gap-3 border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                                                <div className="w-16 h-14 rounded-xl bg-gray-200" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="h-4 w-32 bg-gray-100 rounded mb-2" />
                                                    <div className="h-3 w-16 bg-gray-100 rounded" />
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : otherNews.length === 0 ? (
                                    <div className="text-gray-400 text-sm py-8 text-center">Tidak ada berita lain.</div>
                                ) : (
                                    <ul className="space-y-4">
                                        {otherNews.map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-3 border-b border-gray-100 pb-3 last:border-b-0 last:pb-0 group cursor-pointer transition-all">
                                                <Link href={`/news/${item.slug}`} className="flex items-center gap-3 w-full group" tabIndex={0} aria-label={`Baca detail berita: ${item.title}`}>
                                                    <div className="w-16 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 group-hover:scale-105 group-hover:shadow-lg transition-all duration-300">
                                                        <Image src={item.image} alt={item.title} width={64} height={56} className="object-cover w-full h-full" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-semibold text-teal-700 group-hover:text-teal-900 hover:underline text-sm mb-1 truncate transition-colors duration-200">{item.title}</div>
                                                        <div className="text-xs text-gray-400">{item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            {/* Section Iklan di bawah sidebar (desktop only) */}
                            <div className="hidden md:block mt-8">
                                <div className="rounded-2xl shadow-xl bg-gradient-to-r from-yellow-400/90 via-orange-400/80 to-pink-400/80 flex flex-col items-center gap-6 p-6">
                                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/80 shadow-lg mb-2">
                                        <svg width="32" height="32" fill="none" viewBox="0 0 40 40">
                                            <rect width="32" height="32" rx="16" fill="#fbbf24" />
                                            <path d="M20 10v12M10 20h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0 text-center">
                                        <h4 className="text-lg font-bold text-white mb-1 drop-shadow">Iklan Spesial</h4>
                                        <p className="text-white/90 mb-3 text-sm drop-shadow">Tampilkan brand, event, atau promo Anda di sini. Jangkau ribuan pembaca setiap hari!</p>
                                        <button className="bg-white text-orange-600 font-bold px-4 py-2 rounded-lg shadow hover:bg-orange-50 transition text-sm">Pasang Iklan</button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        {/* Konten utama */}
                        <div className="flex-1 order-1 md:order-2">
                            {/* Hero image full width, rounded, shadow */}
                            {loading ? (
                                <div className="w-full max-w-4xl mx-auto h-56 md:h-96 bg-gray-200 rounded-2xl shadow-xl animate-pulse mb-8" />
                            ) : error ? null : data && (
                                <div className="w-full max-w-4xl mx-auto mb-8 rounded-2xl overflow-hidden shadow-xl">
                                    <Image
                                        src={data.image}
                                        alt={data.title}
                                        width={1200}
                                        height={500}
                                        className="object-cover w-full h-56 md:h-96 transition-all duration-300"
                                    />
                                </div>
                            )}
                            {/* Card konten */}
                            <div className="w-full max-w-4xl mx-auto bg-white/90 rounded-2xl shadow-2xl p-6 md:p-12">
                                {loading ? (
                                    <div className="animate-pulse space-y-4">
                                        <div className="h-6 w-32 bg-gray-200 rounded mb-2" />
                                        <div className="h-10 w-2/3 bg-gray-200 rounded mb-2" />
                                        <div className="h-4 w-24 bg-gray-100 rounded mb-4" />
                                        <div className="h-4 w-full bg-gray-100 rounded mb-2" />
                                        <div className="h-4 w-5/6 bg-gray-100 rounded mb-2" />
                                        <div className="h-4 w-2/3 bg-gray-100 rounded mb-2" />
                                    </div>
                                ) : error ? (
                                    <div className="text-center text-rose-600 font-semibold py-12">{error}</div>
                                ) : data ? (
                                    <>
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            <span className="inline-block bg-gradient-to-r from-indigo-500 to-teal-400 text-white text-xs px-3 py-1 rounded shadow-md font-semibold tracking-wide">{data.category?.name || '-'}</span>
                                            <span className="text-xs text-gray-400">Dipublikasikan: {data.created_at ? new Date(data.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</span>
                                            {data.user?.name && (
                                                <span className="text-xs text-gray-500">Oleh: <span className="font-semibold text-teal-700">{data.user.name}</span></span>
                                            )}
                                        </div>
                                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{data.title}</h1>
                                        <div className="prose max-w-none text-gray-700 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: data.content }} />
                                    </>
                                ) : null}
                            </div>
                            {/* Section Iklan */}
                            <section className="w-full max-w-4xl mx-auto mt-10 mb-8">
                                <div className="rounded-2xl shadow-xl bg-gradient-to-r from-yellow-400/90 via-orange-400/80 to-pink-400/80 flex flex-col md:flex-row items-center gap-6 p-6 md:p-10">
                                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/80 shadow-lg mb-4 md:mb-0">
                                        <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
                                            <rect width="40" height="40" rx="20" fill="#fbbf24" />
                                            <path d="M20 12v16M12 20h16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow">Pasang Iklan di Sini!</h4>
                                        <p className="text-white/90 mb-4 drop-shadow">Promosikan produk, event, atau layanan Anda kepada ribuan pembaca kami. Hubungi kami untuk penawaran spesial bulan ini!</p>
                                        <button className="bg-white text-orange-600 font-bold px-6 py-2 rounded-lg shadow hover:bg-orange-50 transition">Hubungi Admin</button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>
                <FooterSection />
            </div>
        </>
    );
}
