import Head from 'next/head';
import Image from 'next/image';
import Header from "../components/layouts/Header";
import FooterSection from "../components/layouts/FooterSection";
import { Clock, FileText, DollarSign, BarChart, Bell, Shield } from 'react-feather';

const FintrenPage = () => {
    return (
        <>
            <Head>
                <title>Fintren - Aplikasi Monitoring Santri</title>
                <meta name="description" content="Fintren adalah aplikasi monitoring santri yang memudahkan orang tua memantau kegiatan dan perkembangan anak mereka di pesantren dengan aman dan real-time." />
                <style jsx>{`
                    @keyframes float {
                        0%, 100% {
                            transform: translateY(0px);
                        }
                        50% {
                            transform: translateY(-20px);
                        }
                    }
                    .animate-float {
                        animation: float 3s ease-in-out infinite;
                    }
                `}</style>
            </Head>

            {/* Latar belakang utama dengan gradasi warna menyeluruh */}
            <div className="relative bg-gradient-to-b from-[#f0f5ff] to-white min-h-screen font-sans">
                {/* Aurora Gradient Background - contained within screen */}
                <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-teal-500 via-teal-300 to-teal-200 opacity-35 rounded-full blur-3xl z-0" />
                <div className="absolute top-[40%] left-0 w-[250px] h-[250px] bg-gradient-to-tr from-teal-200 via-teal-100 to-yellow-100 opacity-15 rounded-full blur-2xl z-0" />
                <div className="absolute bottom-0 right-0 w-[280px] h-[280px] bg-gradient-to-tr from-teal-400 via-teal-300 to-teal-200 opacity-30 rounded-full blur-3xl z-0" />
                <div className="absolute bottom-[20%] right-[5%] w-[200px] h-[200px] bg-gradient-to-tr from-teal-100 via-yellow-100 to-teal-200 opacity-10 rounded-full blur-2xl z-0" />

                <Header />

                {/* Hero Section Fintren - Modern Layout */}
                <section className="pt-32 pb-20">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                            {/* Kolom Kiri - Image Mockup */}
                            <div className="flex-1 max-w-md lg:max-w-lg">
                                <div className="relative">
                                    {/* Background decorative elements */}
                                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-teal-200 rounded-full opacity-20 blur-xl"></div>
                                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl"></div>

                                    {/* Image dengan animasi melayang */}
                                    <Image
                                        src="/assets/images/fintren.png"
                                        alt="Fintren App Mockup"
                                        width={280}
                                        height={420}
                                        className="w-full h-auto rounded-2xl animate-float"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Kolom Kanan - Konten dengan Modern Typography */}
                            <div className="flex-1 max-w-2xl">
                                <div className="space-y-6">
                                    {/* Badge */}
                                    <div className="inline-flex items-center px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-medium border border-teal-200">
                                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                                        Aplikasi Monitoring Santri
                                    </div>

                                    {/* Title dengan gradient */}
                                    <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                                        <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                            Selamat Datang di{' '}
                                        </span>
                                        <span className="bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                                            Fintren
                                        </span>
                                    </h1>

                                    {/* Subtitle */}
                                    <p className="text-xl text-gray-500 font-medium">
                                        Platform monitoring santri untuk orang tua yang terpercaya dan mudah digunakan
                                    </p>

                                    {/* Content tanpa card styling */}
                                    <div className="space-y-6">
                                        <p className="text-gray-700 leading-relaxed text-lg">
                                            <strong className="text-gray-900">Fintren</strong> adalah aplikasi mobile yang dirancang khusus untuk orang tua santri di Pondok Pesantren Riyadul Falah. Dengan antarmuka yang user-friendly dan fitur yang lengkap, Anda dapat memantau perkembangan anak Anda secara real-time dan mudah diakses kapan saja.
                                        </p>

                                        <p className="text-gray-700 leading-relaxed text-lg">
                                            Melalui Fintren, Anda dapat melihat informasi lengkap tentang santri seperti ID, kelas, unit pendidikan, presensi harian (jam masuk dan pulang), tagihan pembayaran, tabungan santri, dan pengumuman penting dari pesantren. Semua data tersedia dalam satu aplikasi yang aman dan terpercaya.
                                        </p>

                                        <p className="text-gray-700 leading-relaxed text-lg">
                                            Aplikasi ini memberikan kemudahan bagi orang tua untuk tetap terhubung dengan kegiatan anak di pesantren, memantau perkembangan akademik, dan mengelola keuangan santri dengan transparansi penuh. Dukungan customer service 24/7 siap membantu Anda kapan saja.
                                        </p>
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        <button className="bg-gradient-to-r from-teal-600 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                                            Download Aplikasi
                                        </button>
                                        <button className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-xl font-semibold hover:bg-teal-50 transition-all duration-300">
                                            Panduan Penggunaan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Fitur Utama */}
                <section className="py-16">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                Fitur Utama Fintren
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Pantau perkembangan santri dengan fitur monitoring yang lengkap dan real-time
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Fitur 1 - Presensi */}
                            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Clock className="w-8 h-8 text-teal-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Monitoring Presensi</h3>
                                <p className="text-gray-600 text-center leading-relaxed">
                                    Pantau kehadiran santri secara real-time. Lihat jam masuk dan pulang harian dengan detail waktu yang akurat.
                                </p>
                            </div>

                            {/* Fitur 2 - Tagihan */}
                            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FileText className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Tagihan & Pembayaran</h3>
                                <p className="text-gray-600 text-center leading-relaxed">
                                    Kelola tagihan pesantren dengan mudah. Lihat detail pembayaran, jatuh tempo, dan riwayat transaksi.
                                </p>
                            </div>

                            {/* Fitur 3 - Tabungan Santri */}
                            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <DollarSign className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Tabungan Santri</h3>
                                <p className="text-gray-600 text-center leading-relaxed">
                                    Pantau tabungan santri secara real-time. Lihat saldo, riwayat transaksi, dan laporan keuangan.
                                </p>
                            </div>

                            {/* Fitur 4 - Raport */}
                            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <BarChart className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Raport Akademik</h3>
                                <p className="text-gray-600 text-center leading-relaxed">
                                    Akses raport dan laporan akademik santri. Pantau perkembangan nilai dan prestasi belajar.
                                </p>
                            </div>

                            {/* Fitur 5 - Pengumuman */}
                            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Bell className="w-8 h-8 text-yellow-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Pengumuman</h3>
                                <p className="text-gray-600 text-center leading-relaxed">
                                    Terima notifikasi pengumuman penting dari pesantren. Selalu update dengan kegiatan dan informasi terbaru.
                                </p>
                            </div>

                            {/* Fitur 6 - Keamanan Data */}
                            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Shield className="w-8 h-8 text-red-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Keamanan Data</h3>
                                <p className="text-gray-600 text-center leading-relaxed">
                                    Data pribadi santri dan keluarga dilindungi dengan enkripsi tingkat tinggi dan sistem keamanan berlapis.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Call to Action */}
                <section className="py-16">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-12 text-center text-white">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Siap Memantau Perkembangan Santri?
                            </h2>
                            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                                Bergabunglah dengan ribuan orang tua yang telah mempercayai Fintren untuk memantau kegiatan dan perkembangan anak mereka di pesantren.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="bg-white text-teal-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                                    Download Aplikasi
                                </button>
                                <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-teal-600 transition-colors">
                                    Hubungi Admin
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <FooterSection />
            </div>
        </>
    );
};

export default FintrenPage;