import { useEffect, useState } from "react";
import Head from 'next/head';
import Header from "../../components/layouts/Header";
import FooterSection from "../../components/layouts/FooterSection";
import api from "../../api/axios";
import endpoints from "../../api/endpoints";
import Link from "next/link";
import Image from "next/image";

export default function AllNewsPage() {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setLoading(true);
        setError(null);
        api.get(endpoints.publicPosts.getAllPosts(page))
            .then(res => {
                const data = res.data?.data;
                setNews(data?.data || []);
                setTotalPages(data?.last_page || 1);
                setLoading(false);
            })
            .catch(() => {
                setError("Gagal memuat berita");
                setLoading(false);
            });
    }, [page]);

    return (
        <>
            <Head>
                <title>Semua Berita | Sipren</title>
                <meta name="description" content="Daftar berita, artikel, dan informasi terbaru Sipren" />
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-[#f0f5ff] to-white font-sans flex flex-col">
                <Header />
                <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-24">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Semua Berita</h1>
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, idx) => (
                                <div key={idx} className="rounded-2xl bg-gray-200 animate-pulse h-72 w-full">
                                    <div className="h-40 w-full bg-gray-300 rounded-t-2xl" />
                                    <div className="p-4">
                                        <div className="h-4 w-24 bg-gray-300 rounded mb-2" />
                                        <div className="h-6 w-3/4 bg-gray-300 rounded mb-2" />
                                        <div className="h-3 w-1/2 bg-gray-300 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-center text-rose-600 font-semibold py-12">{error}</div>
                    ) : news.length === 0 ? (
                        <div className="text-center text-gray-500 py-12">Belum ada berita.</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {news.map((item, idx) => (
                                    <Link
                                        href={`/news/${item.slug}`}
                                        key={item.id}
                                        className="rounded-2xl bg-white shadow-md border border-gray-100 hover:shadow-lg transition group flex flex-col overflow-hidden"
                                    >
                                        <div className="relative w-full h-40 bg-gray-100 group-hover:scale-105 transition-transform duration-300">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover w-full h-full"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                            <span className="absolute top-3 left-3 bg-teal-500/80 text-white text-xs px-3 py-1 rounded shadow-md z-10">
                                                {item.category?.name || "-"}
                                            </span>
                                        </div>
                                        <div className="flex-1 flex flex-col p-4">
                                            <div className="text-xs text-gray-400 mb-1">
                                                {item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                                            </div>
                                            <h2 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors">{item.title}</h2>
                                            <div className="text-gray-500 text-sm line-clamp-3 mb-2" dangerouslySetInnerHTML={{ __html: item.content?.replace(/<[^>]+>/g, '').slice(0, 120) + '...' }} />
                                            <div className="mt-auto flex items-center gap-2 pt-2">
                                                <span className="text-xs text-gray-500">Oleh:</span>
                                                <span className="text-xs font-semibold text-teal-700">{item.user?.name || '-'}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            {/* Pagination */}
                            <div className="flex justify-center items-center gap-2 mt-10">
                                <button
                                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-500 font-semibold hover:bg-gray-200 disabled:opacity-50"
                                    onClick={() => setPage(page - 1)}
                                    disabled={page === 1}
                                >
                                    Sebelumnya
                                </button>
                                {[...Array(totalPages)].map((_, idx) => (
                                    <button
                                        key={idx}
                                        className={`px-4 py-2 rounded-lg font-semibold transition ${page === idx + 1 ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-teal-100'}`}
                                        onClick={() => setPage(idx + 1)}
                                    >
                                        {idx + 1}
                                    </button>
                                ))}
                                <button
                                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-500 font-semibold hover:bg-gray-200 disabled:opacity-50"
                                    onClick={() => setPage(page + 1)}
                                    disabled={page === totalPages}
                                >
                                    Berikutnya
                                </button>
                            </div>
                        </>
                    )}
                </main>
                <FooterSection />
            </div>
        </>
    );
}
