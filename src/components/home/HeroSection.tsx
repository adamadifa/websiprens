import ArrowRightIcon from "./ArrowRightIcon";
import PlayIcon from "./Playicon";
import Image from "next/image";

import { Book, Monitor, Edit, Award } from "react-feather";
import Link from "next/link";

const HeroSection = () => {
    return (
        <div className="relative dotted-background">
            <div className="container mx-auto px-6 lg:px-12 pt-28">
                <main className="relative grid grid-cols-1 md:grid-cols-12 items-end pt-8 md:pt-12 pb-10 md:pb-32 z-10 gap-y-8 md:gap-x-8">
                    {/* Gambar Kiri MOBILE */}
                    <div className="block md:hidden mb-0 pb-2 overflow-visible">
                        <div className="relative flex justify-center items-center">
                            {/* Gradient background */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-b from-teal-200/60 via-white/80 to-white/0 rounded-full blur-2xl z-0"></div>
                            {/* Label animasi sekeliling gambar */}
                            <div className="absolute -top-2 left-4 flex items-center gap-2 z-20 animate-float-y">
                                <div className="bg-teal-400 p-2 rounded-full shadow-lg">
                                    <Book size={16} className="text-white" />
                                </div>
                                <span className="bg-white/90 text-teal-700 text-xs font-semibold px-2 py-1 rounded shadow-md">
                                    RA Riyadul Falah
                                </span>
                            </div>
                            <div className="absolute top-6 right-2 flex items-center gap-2 z-20 animate-float-x">
                                <div className="bg-yellow-300 p-2 rounded-full shadow-lg">
                                    <Monitor size={16} className="text-white" />
                                </div>
                                <span className="bg-white/90 text-yellow-700 text-xs font-semibold px-2 py-1 rounded shadow-md">
                                    MITA Ma&apos;rifa
                                </span>
                            </div>
                            <div className="absolute left-2 bottom-20 flex items-center gap-2 z-20 float-y-delay">
                                <div className="bg-yellow-300 p-2 rounded-full shadow-lg">
                                    <Edit size={15} className="text-white" />
                                </div>
                                <span className="bg-white/90 text-yellow-700 text-xs font-semibold px-2 py-1 rounded shadow-md">
                                    MTs Ma&apos;rifa
                                </span>
                            </div>
                            <div className="absolute right-4 bottom-16 flex items-center gap-2 z-20 float-x-delay">
                                <div className="bg-teal-400 p-2 rounded-full shadow-lg">
                                    <Award size={15} className="text-white" />
                                </div>
                                <span className="bg-white/90 text-teal-700 text-xs font-semibold px-2 py-1 rounded shadow-md">
                                    SMK IT Ma&apos;rifa
                                </span>
                            </div>
                            {/* Gambar utama */}
                            <Image
                                src="/assets/images/model1.png"
                                alt="Pria sedang menggunakan ponsel"
                                width={320}
                                height={320}
                                className="relative z-10 w-full max-w-sm mx-auto object-contain max-h-[320px] shadow-lg shadow-teal-100/30 mb-0"
                                style={{ background: "transparent" }}
                            />
                        </div>
                    </div>
                    {/* Gambar Kiri DESKTOP */}
                    <div className="col-span-3 hidden md:flex justify-center">
                        <div className="relative">
                            {/* Icon edukasi bertebangan di sekitar gambar */}
                            <div className="absolute -top-4 left-0 float-y flex items-center gap-2 z-10">
                                <div className="bg-teal-400 p-2 rounded-full shadow-lg">
                                    <Book size={16} className="text-white" />
                                </div>
                                <span className="bg-white/90 text-teal-700 text-xs font-semibold px-2 py-1 rounded shadow-md">
                                    RA Riyadul Falah
                                </span>
                            </div>
                            <div className="absolute top-4 right-0 float-x flex items-center gap-2 z-10">
                                <div className="bg-yellow-300 p-2 rounded-full shadow-lg">
                                    <Monitor size={16} className="text-white" />
                                </div>
                                <span className="bg-white/90 text-yellow-700 text-xs font-semibold px-2 py-1 rounded shadow-md">
                                    MITA Ma&apos;rifa
                                </span>
                            </div>
                            <div className="absolute left-0 bottom-20 float-y-delay flex items-center gap-2 z-10">
                                <div className="bg-yellow-300 p-2 rounded-full shadow-lg">
                                    <Edit size={15} className="text-white" />
                                </div>
                                <span className="bg-white/90 text-yellow-700 text-xs font-semibold px-2 py-1 rounded shadow-md">
                                    MTs Ma&apos;rifa
                                </span>
                            </div>
                            <div className="absolute right-4 bottom-16 float-x-delay flex items-center gap-2 z-10">
                                <div className="bg-teal-400 p-2 rounded-full shadow-lg">
                                    <Award size={15} className="text-white" />
                                </div>
                                <span className="bg-white/90 text-teal-700 text-xs font-semibold px-2 py-1 rounded shadow-md">
                                    SMK IT Ma&apos;rifa
                                </span>
                            </div>
                            <Image
                                src="/assets/images/model1.png"
                                alt="Pria sedang menggunakan ponsel"
                                width={400}
                                height={400}
                                className="h-40 md:h-[400px] w-auto mx-auto object-contain"
                            />
                        </div>
                    </div>

                    {/* Teks Tengah */}
                    <div className="col-span-1 md:col-span-6 flex flex-col justify-end items-center text-center px-2 md:px-0">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl md:text-6xl font-extrabold text-gray-800 leading-[1] mt-0">
                            Pondok
                            <span style={{ fontFamily: "Times New Roman, Times, serif" }}>
                                Pesantren RIYADUL FALAH
                            </span>
                        </h2>
                        <p className="mt-0 text-gray-500 max-w-lg mx-auto">
                            Cigalontang - Tasikmalaya
                        </p>
                        <div className="flex justify-center items-center space-x-4 mt-4 mb-6 mb-8">
                            <Link
                                href="/register"
                                className="bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-teal-700 transition-transform hover:scale-105"
                            >
                                <span>Daftar Sekarang</span>
                                <ArrowRightIcon />
                            </Link>
                            <button className="flex items-center space-x-2 text-teal-700 font-semibold">
                                <PlayIcon />
                                <span>Play video</span>
                            </button>
                        </div>
                    </div>

                    {/* Gambar Kanan */}
                    <div className="col-span-3 hidden md:flex justify-center">
                        <div className="relative">
                            <div className="ripple-anim absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                            {/* Badge 88% Lulusan Diterima di Kampus Favorite */}
                            <div className="absolute top-1/2 right-[-40px] md:right-[-80px] -translate-y-1/2 flex flex-col items-end z-20 animate-float-badge">
                                <div className="bg-gradient-to-br from-white via-slate-100 to-teal-500 rounded-2xl px-5 py-3 shadow-2xl flex items-center space-x-3 border border-white/70 backdrop-blur-md">
                                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="12" fill="#38b2ac" />
                                        <path
                                            d="M9.5 13.5l2 2 3-4"
                                            stroke="#fff"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div>
                                        <div className="text-2xl md:text-3xl font-extrabold text-gray-800 leading-tight">
                                            88%
                                        </div>
                                        <div className="text-xs md:text-sm font-semibold text-gray-700 -mt-1">
                                            Lulusan Diterima
                                            <br className="hidden md:block" /> di Kampus Favorit
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Image
                                src="/assets/images/model2.png"
                                alt="Santri laki-laki"
                                width={400}
                                height={400}
                                className="h-40 md:h-[400px] w-auto mx-auto object-contain"
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default HeroSection;
