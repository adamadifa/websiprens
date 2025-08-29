import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";

const dummyLogos = [
  // Logo universitas, bisa diganti dengan logo asli
  { src: "/assets/images/logo/unsil.png", alt: "Logo UNSIL" },
  { src: "/assets/images/logo/unpad.png", alt: "Logo UNPAD" },
  { src: "/assets/images/logo/alazhar.png", alt: "Logo Al-Azhar" },
  { src: "/assets/images/logo/sakarya.png", alt: "Logo Sakarya" },
  { src: "/assets/images/logo/upi.png", alt: "Logo UPI" },
  { src: "/assets/images/logo/uin.png", alt: "Logo UIN" },
  { src: "/assets/images/logo/ugm.png", alt: "Logo UGM" },
  { src: "/assets/images/logo/unsoed.png", alt: "Logo UNSOED" },
];

const PartnerSection = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 6, spacing: 24 },
    renderMode: "performance",
    drag: true,
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 4, spacing: 24 },
      },
      "(max-width: 768px)": {
        slides: { perView: 3, spacing: 24 },
      },
    },
    created: (slider) => {
      slider.moveToIdx(0, true);
      setInterval(() => {
        if (slider) slider.next();
      }, 2000);
    },
  });
  return (
    <div className="hidden md:block container mx-auto px-2 md:px-6 lg:px-12 -mt-20 md:-mt-32 relative z-20 lg:-mt-35">
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 md:p-8 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/4 mb-4 md:mb-0">
          <h3 className="text-lg font-bold text-gray-800 "><i>Sebaran Alumni</i> <br />PondokPesantren Riyadul Falah</h3>
        </div>
        <div className="w-full md:w-3/4">
          <div ref={sliderRef} className="keen-slider flex items-center">
            {dummyLogos.map((logo, idx) => (
              <div className="keen-slider__slide flex justify-center items-center" key={idx}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={80}
                  height={80}
                  className="h-40 md:h-[80px] w-auto mx-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerSection;