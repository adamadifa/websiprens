import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import styles from './testimonial-section.module.css';
import api from "@/api/axios";
import endpoints from "@/api/endpoints";
import { Testimonial } from "@/api/types";

// Data fallback jika API tidak tersedia
const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    nama: "Mehwish",
    testimoni: "Compliment interested discretion estimating on stimulated apartments oh.",
    foto_url: "/assets/images/model3.png",
  },
  {
    id: 2,
    nama: "Elizabeth Jeff",
    testimoni: "Dear so sing when in find read of call. As distrusts behaviour abilities defective is.",
    foto_url: "/assets/images/model2.png",
  },
  {
    id: 3,
    nama: "Emily Thomas",
    testimoni: "Never at water me might. On formed merits hunted unable merely by mr whence or.",
    foto_url: "/assets/images/model1.png",
  },
  {
    id: 4,
    nama: "Sarah Johnson",
    testimoni: "Amazing experience with this platform. The quality of education and support exceeded my expectations completely.",
    foto_url: "/assets/images/model3.png",
  },
  {
    id: 5,
    nama: "Michael Chen",
    testimoni: "The best decision I made for my child's education. Professional staff and excellent facilities.",
    foto_url: "/assets/images/model2.png",
  },
];

const VISIBLE_COUNT = 3;
const CENTER_INDEX = 1; // index tengah dari 3 testimonial

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const animTimeout = useRef<NodeJS.Timeout | null>(null);
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const [animType, setAnimType] = useState<"in" | "out" | null>(null);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(endpoints.testimonials.getAll);
        const data = response.data?.data;

        if (data && Array.isArray(data)) {
          setTestimonials(data);
        } else {
          // Jika data tidak sesuai format, gunakan fallback
          setTestimonials(fallbackTestimonials);
        }
        setLoading(false);
      } catch (err: unknown) {
        console.error('Error fetching testimonials:', err);
        const errorMessage = err instanceof Error ? err.message : 'Gagal memuat testimonial';
        setError(errorMessage);
        setTestimonials(fallbackTestimonials);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Auto-slide every 4 detik
  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setPrevSlide(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentSlide, testimonials.length]);

  // Detect animating index for zoom in/out
  useEffect(() => {
    if (prevSlide !== currentSlide) {
      // Index yang akan masuk ke tengah
      const newCenter = (currentSlide + CENTER_INDEX) % testimonials.length;
      setAnimatingIndex(newCenter);
      setAnimType("in");
      if (animTimeout.current) clearTimeout(animTimeout.current);
      animTimeout.current = setTimeout(() => {
        setAnimatingIndex(null);
        setAnimType(null);
      }, 600); // durasi animasi
    }
    // eslint-disable-next-line
  }, [currentSlide]);

  // Calculate the visible testimonials (looping)
  const getVisibleTestimonials = () => {
    const visible: typeof testimonials = [];
    for (let i = 0; i < VISIBLE_COUNT; i++) {
      visible.push(testimonials[(currentSlide + i) % testimonials.length]);
    }
    return visible;
  };

  // --- MOBILE ---
  const [mobileIndex, setMobileIndex] = useState(0);
  const [mobileAnim, setMobileAnim] = useState<'left' | 'right' | null>(null);
  const handlePrev = () => {
    setMobileAnim('right');
    setTimeout(() => {
      setMobileIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setMobileAnim(null);
    }, 250);
  };
  const handleNext = () => {
    setMobileAnim('left');
    setTimeout(() => {
      setMobileIndex((prev) => (prev + 1) % testimonials.length);
      setMobileAnim(null);
    }, 250);
  };

  // Auto-slide for MOBILE
  useEffect(() => {
    const interval = setInterval(() => {
      setMobileAnim('left');
      setTimeout(() => {
        setMobileIndex((prev) => (prev + 1) % testimonials.length);
        setMobileAnim(null);
      }, 250);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Loading state
  if (loading) {
    return (
      <section className="w-full py-8 md:py-12 lg:py-16 bg-gradient-to-br from-gray-50 via-white to-teal-50">
        <div className="container mx-auto px-3 sm:px-6 lg:px-12">
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-teal-500 to-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold mb-3">
              TESTIMONIAL
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-3 sm:mb-4">Apa Kata Orangtua</h2>
            <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">Memuat testimonial...</p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-teal-600"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="w-full py-8 md:py-12 lg:py-16 bg-gradient-to-br from-gray-50 via-white to-teal-50">
        <div className="container mx-auto px-3 sm:px-6 lg:px-12">
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-teal-500 to-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold mb-3">
              TESTIMONIAL
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-3 sm:mb-4">Apa Kata Orangtua</h2>
            <p className="text-red-500 mb-3 sm:mb-4 text-sm sm:text-base">{error}</p>
            <p className="text-gray-500 text-sm sm:text-base">Menggunakan data testimonial default</p>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="w-full py-8 md:py-12 lg:py-16 bg-gradient-to-br from-gray-50 via-white to-teal-50">
        <div className="container mx-auto px-3 sm:px-6 lg:px-12">
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-teal-500 to-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold mb-3">
              TESTIMONIAL
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-3 sm:mb-4">Apa Kata Orangtua</h2>
            <p className="text-gray-500 text-sm sm:text-base">Belum ada testimonial tersedia</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="w-full py-12 md:py-20 bg-gradient-to-br from-gray-50 via-white to-teal-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-6 sm:top-10 left-6 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-teal-200 to-blue-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-20 sm:top-32 right-6 sm:right-20 w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-12 sm:bottom-20 left-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full opacity-20 animate-pulse delay-2000"></div>
        </div>

        <div className="container mx-auto px-3 sm:px-6 lg:px-12 relative z-10">
          {/* Title & Desc */}
          <div className="mb-6 sm:mb-8 md:mb-12 block md:hidden text-center">
            <div className="inline-block bg-gradient-to-r from-teal-500 to-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold mb-2 sm:mb-3">
              TESTIMONIAL
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-2 sm:mb-3">Apa Kata Orangtua</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 max-w-sm sm:max-w-md mx-auto text-xs sm:text-sm leading-relaxed px-2">
              Testimoni para orangtua tentang pengalaman dan kepuasan mereka menyekolahkan anak di Pondok Pesantren RIYADUL FALAH.
            </p>
            <button className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-xs sm:text-sm">
              Lihat Semua Testimonial
            </button>
          </div>
          {/* MOBILE: Card Satu per Satu */}
          <div className="block md:hidden w-full">
            <div className="flex flex-col items-center">
              <div className={`w-full bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-white/20 px-4 sm:px-6 md:px-8 py-6 sm:py-8 mb-4 sm:mb-6 relative transition-all duration-500 ease-in-out transform hover:scale-105
              ${mobileAnim === 'left' ? styles.animateSlideLeft : ''} ${mobileAnim === 'right' ? styles.animateSlideRight : ''}
            `}>
                {/* Quote icon */}
                <div className="absolute top-3 sm:top-4 right-4 sm:right-6 text-2xl sm:text-4xl text-teal-200 opacity-50">&#10077;</div>

                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="relative">
                    <Image
                      src={testimonials[mobileIndex].foto_url || "/assets/images/model3.png"}
                      alt={testimonials[mobileIndex].nama}
                      width={64}
                      height={64}
                      className="rounded-full object-cover border-2 sm:border-4 border-gradient-to-r from-teal-200 to-blue-200 mr-3 sm:mr-4 w-12 h-12 sm:w-16 sm:h-16 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm sm:text-lg text-gray-900 mb-1 truncate">{testimonials[mobileIndex].nama}</div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <svg key={idx} xmlns="http://www.w3.org/2000/svg" fill="#fbbf24" viewBox="0 0 20 20" className="w-3 h-3 sm:w-4 sm:h-4">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.176 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-gray-700 text-sm sm:text-base leading-relaxed font-medium mb-4 sm:mb-6 italic line-clamp-4">&ldquo;{testimonials[mobileIndex].testimoni}&rdquo;</div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
                  <div className="flex gap-1.5 sm:gap-2">
                    {testimonials.map((_, idx) => (
                      <span key={idx} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${idx === mobileIndex ? "bg-gradient-to-r from-teal-500 to-blue-600 scale-125" : "bg-gray-300"}`}></span>
                    ))}
                  </div>
                  <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                    <button onClick={handlePrev} className="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-semibold shadow-md transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm">
                      ← Sebelumnya
                    </button>
                    <button onClick={handleNext} className="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold shadow-md transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm">
                      Selanjutnya →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* DESKTOP: Slider Lama */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-16 md:items-center">
            {/* Left: Title & Desc */}
            <div className="mb-0">
              <div className="inline-block bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
                TESTIMONIAL
              </div>
              <h2 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">Apa Kata Orangtua</h2>
              <p className="text-gray-600 mb-8 max-w-lg text-lg leading-relaxed">
                Testimoni para orangtua tentang pengalaman dan kepuasan mereka menyekolahkan anak di Pondok Pesantren RIYADUL FALAH.
              </p>
              <button className="px-10 py-4 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg">
                Lihat Semua Testimonial
              </button>
            </div>
            {/* Right: Testimonials Slider lama */}
            <div className="relative">
              <div className="relative h-[400px] overflow-visible">
                <div className="flex flex-col transition-transform duration-700 ease-in-out">
                  {getVisibleTestimonials().map((t, i) => {
                    const thisIndex = (currentSlide + i) % testimonials.length;
                    let animClass = "";
                    if (animatingIndex === thisIndex && animType === "in" && i === CENTER_INDEX) {
                      animClass = styles.testimonialZoomIn;
                    } else if (animatingIndex === thisIndex && animType === "out" && i !== CENTER_INDEX) {
                      animClass = styles.testimonialZoomOut;
                    }
                    return (
                      <div
                        key={i}
                        className={`relative flex items-center bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 px-8 py-6 transition-all duration-500 h-[120px] mb-4 ${i === CENTER_INDEX
                          ? "ring-2 ring-teal-400 bg-gradient-to-r from-teal-50/90 to-blue-50/80 scale-110 z-10 shadow-2xl"
                          : "opacity-70 z-0 hover:opacity-90 hover:scale-105"
                          } ${animClass}`}
                        style={{
                          transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.6s cubic-bezier(0.4,0,0.2,1)",
                        }}
                      >
                        {i === CENTER_INDEX && (
                          <span className="absolute left-0 top-4 bottom-4 w-2 rounded-full bg-gradient-to-b from-teal-500 to-blue-600" />
                        )}

                        <div className="relative mr-6">
                          <Image
                            src={t.foto_url || "/assets/images/model3.png"}
                            alt={t.nama}
                            width={64}
                            height={64}
                            className="rounded-full object-cover border-4 border-gradient-to-r from-teal-200 to-blue-200 w-16 h-16 shadow-lg"
                          />
                          {i === CENTER_INDEX && (
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className={`font-bold text-gray-900 text-lg mb-1 flex items-center`}>
                            {t.nama}
                            {i === CENTER_INDEX && (
                              <span className="ml-3 text-2xl text-teal-500">&#10077;</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, idx) => (
                              <svg key={idx} xmlns="http://www.w3.org/2000/svg" fill="#fbbf24" viewBox="0 0 20 20" className="w-4 h-4">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.176 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                              </svg>
                            ))}
                          </div>
                          <div className={`text-gray-700 text-sm leading-relaxed ${i === CENTER_INDEX ? "font-medium" : ""} line-clamp-2 overflow-hidden italic`}>
                            &ldquo;{t.testimoni}&rdquo;
                          </div>
                        </div>

                        {i !== CENTER_INDEX && (
                          <span className="ml-4 text-gray-300 text-3xl opacity-50">&#10077;</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TestimonialSection;