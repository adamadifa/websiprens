import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/layouts/Header';
import FooterSection from '../components/layouts/FooterSection';

export default function Custom404() {
    return (
        <>
            <Head>
                <title>404 - Halaman Tidak Ditemukan | Sipren</title>
                <meta name="description" content="Halaman yang Anda cari tidak ditemukan. Kembali ke beranda Sipren." />
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-[#f0f5ff] to-white font-sans flex flex-col">
                <Header />
                <main className="flex-1 flex justify-center items-center py-20 px-4">
                    <div className="text-center max-w-2xl mx-auto">
                        {/* 404 Illustration */}
                        <div className="mb-8">
                            <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-teal-400 mb-4">
                                404
                            </div>
                            <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-teal-400 mx-auto rounded-full"></div>
                        </div>

                        {/* Error Message */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                            Halaman Tidak Ditemukan
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Maaf, halaman yang Anda cari tidak dapat ditemukan.
                            Mungkin halaman tersebut telah dipindahkan, dihapus, atau URL yang Anda masukkan salah.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href="/"
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-teal-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Kembali ke Beranda
                            </Link>

                            <Link
                                href="/news"
                                className="inline-flex items-center px-6 py-3 border-2 border-indigo-500 text-indigo-500 font-semibold rounded-lg hover:bg-indigo-50 transition-all duration-200"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                                Lihat Berita
                            </Link>
                        </div>

                        {/* Help Text */}
                        <div className="mt-12 p-6 bg-white/50 rounded-2xl shadow-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Butuh Bantuan?</h3>
                            <p className="text-gray-600 mb-4">
                                Jika Anda yakin halaman ini seharusnya ada, silakan hubungi tim support kami.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <a
                                    href="mailto:support@siprenpas.my.id"
                                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    support@siprenpas.my.id
                                </a>
                                <span className="hidden sm:inline text-gray-300">|</span>
                                <a
                                    href="tel:+6281234567890"
                                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    +62 812-3456-7890
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
                <FooterSection />
            </div>
        </>
    );
}
