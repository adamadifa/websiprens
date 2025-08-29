import Image from "next/image";
import Link from "next/link";
import { Facebook, Youtube, Instagram, Music } from "react-feather";

const FooterSection = () => {
  return (
    <footer className="bg-[#f8fbff] pt-24 pb-0">
      {/* Call to Action Pendaftaran - MOBILE */}
      <div className="block md:hidden px-4 mb-4">
        <div className="rounded-xl bg-teal-700 text-white flex flex-col items-center p-5 shadow-md">
          <h3 className="text-lg font-bold mb-1 text-center">Ayo Daftarkan Putra-Putri Anda!</h3>
          <p className="text-white/90 text-sm mb-3 text-center">
            <span className="font-bold text-yellow-200">Pondok Pesantren RIYADUL FALAH</span> membuka pendaftaran baru!
          </p>
          <Link href="/register" className="w-full bg-white text-teal-700 font-bold px-4 py-2 rounded-full shadow-sm hover:bg-yellow-300 hover:text-teal-900 transition text-base text-center">
            Daftar Sekarang
          </Link>
        </div>
      </div>
      {/* Call to Action Pendaftaran - DESKTOP */}
      <div className="hidden md:block">
        <div className="max-w-4xl mx-auto mt-2 mb-8 px-4">
          <div className="rounded-2xl bg-teal-700 text-white flex flex-col md:flex-row items-center justify-between p-8 md:p-10 shadow-md relative z-10">
            <div className="flex-1 flex flex-col gap-3 mb-6 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-extrabold mb-2 drop-shadow-sm">Ayo Daftarkan Putra-Putri Anda!</h3>
              <p className="text-white/90 text-base md:text-lg mb-4 leading-relaxed max-w-2xl drop-shadow-sm">Bergabunglah bersama <span className='font-bold text-yellow-200'>Pondok Pesantren RIYADUL FALAH</span> dan wujudkan generasi berakhlak mulia, cerdas, dan berprestasi. <span className='font-semibold text-yellow-100'>Segera lakukan pendaftaran untuk tahun ajaran baru!</span></p>
              <div className="mt-2">
                <Link href="/register" className="inline-block bg-white text-teal-700 font-bold px-8 py-3 rounded-full shadow-sm hover:bg-yellow-300 hover:text-teal-900 transition text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2" style={{ minWidth: 180 }}>
                  Daftar Sekarang
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center items-end w-36 h-36 md:w-48 md:h-48 overflow-visible mt-4 md:mt-0">
              <Image
                src="/assets/images/model4.png"
                width={192}
                height={240}
                alt="Pendaftaran"
                className="object-contain absolute left-1/2 bottom-0 -translate-x-1/2 -translate-y-1/4 drop-shadow-md"
                style={{ zIndex: 2 }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 lg:px-12 pb-10 pt-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12">
          {/* Logo & Desc */}
          <div className="md:w-1/4 mb-8 md:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <Image src="/assets/images/logo/alamin.png" width={64} height={64} alt="Logo" />
              <span className="font-extrabold text-lg text-teal-800">Pondok Pesantren <br /> RIYADUL FALAH<br />Sindangkasih - Ciamis</span>
            </div>
            <p className="text-gray-500 text-sm mb-4">Jln. Raya Ancol No. 27 Sindangkasih, Kecamatan Sindangkasih Kabupaten Ciamis</p>
            <div className="flex gap-3 mt-2">
              <a href="#" className="hover:text-teal-700"><Facebook size={20} className="text-teal-600" /></a>
              <a href="#" className="hover:text-teal-700"><Youtube size={20} className="text-teal-600" /></a>
              <a href="#" className="hover:text-teal-700"><Instagram size={20} className="text-teal-600" /></a>
              <a href="#" className="hover:text-teal-700">{/* Feather tidak punya ikon TikTok, gunakan Music sebagai alternatif */}<Music size={20} className="text-teal-600" /></a>
            </div>
          </div>
          {/* Footer Links */}
          <div className="md:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Jenjang Pendidikan</h4>
              <ul className="text-gray-500 text-sm space-y-2">
                <li><a href="#" className="hover:text-teal-700">TK Calisa Rabbani</a></li>
                <li><a href="#" className="hover:text-teal-700">Madrasah Diniyah</a></li>
                <li><a href="#" className="hover:text-teal-700">SDIT Al amin</a></li>
                <li><a href="#" className="hover:text-teal-700">Madrasah Tsanawiyyah</a></li>
                <li><a href="#" className="hover:text-teal-700">Madrasah Aliyah</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Media Sosial</h4>
              <ul className="text-gray-500 text-sm space-y-2">
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-teal-700">
                    <Facebook size={18} className="text-teal-600" /> Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-teal-700">
                    <Youtube size={18} className="text-teal-600" /> YouTube
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-teal-700">
                    <Instagram size={18} className="text-teal-600" /> Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-teal-700">
                    {/* Feather tidak punya ikon TikTok, gunakan Music sebagai alternatif */}
                    <Music size={18} className="text-teal-600" /> TikTok
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Links</h4>
              <ul className="text-gray-500 text-sm space-y-2">
                <li><a href="#" className="hover:text-teal-700">SPMB</a></li>
                <li><a href="#" className="hover:text-teal-700">SIPREN Kepegawaian</a></li>
                <li><a href="#" className="hover:text-teal-700">SIPORTU</a></li>
                <li><a href="#" className="hover:text-teal-700">SIPREN</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Contact Us</h4>
              <ul className="text-gray-500 text-sm space-y-2">
                <li className="flex items-center gap-2"><span className="text-teal-700"><i className="fas fa-phone-alt"></i></span>081322058570</li>
                <li className="flex items-center gap-2"><span className="text-teal-700"><i className="fas fa-envelope"></i></span> persis.alamin80@mail.com</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs">
          <span>© Copyright by Adamadifa. All rights reserved.</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-teal-700">Privacy Policy</a>
            <a href="#" className="hover:text-teal-700">Terms of Use</a>
            <a href="#" className="hover:text-teal-700">Legal</a>
            <a href="#" className="hover:text-teal-700">Site Map</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
