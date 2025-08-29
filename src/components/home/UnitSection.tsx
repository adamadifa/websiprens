const categories = [
    {
        name: "RA Riyadul Falah",
        text: "RA",
        circleBg: "bg-gradient-to-br from-yellow-400 to-orange-500",
        desc: "Pendidikan Anak Usia Dini"
    },
    {
        name: "MITA Ma'rifa",
        text: "MITA",
        circleBg: "bg-gradient-to-br from-teal-400 to-blue-500",
        desc: "Madrasah Ibtidaiyah"
    },
    {
        name: "MTs Ma'rifa",
        text: "MTs",
        circleBg: "bg-gradient-to-br from-purple-400 to-pink-500",
        desc: "Madrasah Tsanawiyah"
    },
    {
        name: "SMK Ma'rifa",
        text: "SMK",
        circleBg: "bg-gradient-to-br from-green-400 to-emerald-500",
        desc: "Sekolah Menengah Kejuruan"
    },
    {
        name: "MATTA Ma'rifa",
        text: "MATTA",
        circleBg: "bg-gradient-to-br from-red-400 to-pink-500",
        desc: "Madrasah Aliyah"
    },
];

const UnitSection = () => {
    return (
        <section className="bg-gradient-to-br from-white via-gray-50 to-blue-50 pt-8 sm:pt-12 md:pt-16 lg:pt-24 pb-8 sm:pb-12 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-teal-200 to-blue-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full opacity-20 animate-pulse delay-1000"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
                {/* Header */}
                <div className="mb-8 sm:mb-12">
                    <div className="inline-block bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 shadow-lg">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            </svg>
                            <span>JENJANG PENDIDIKAN</span>
                        </div>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight sm:leading-snug mb-2 sm:mb-3">
                        Program Pendidikan
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm max-w-2xl mx-auto">
                        Berbagai jenjang pendidikan yang tersedia di Pondok Pesantren RIYADUL FALAH
                    </p>
                </div>

                {/* Units Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                    {categories.map((cat, index) => (
                        <div
                            key={cat.name}
                            className="p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-white/80 backdrop-blur-sm text-gray-800 border border-white/50 shadow-lg hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center group relative overflow-hidden"
                        >
                            {/* Background gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {/* Unit icon */}
                            <div className={`relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full mb-3 sm:mb-4 md:mb-6 ${cat.circleBg} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                                <span className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl tracking-wider">
                                    {cat.text}
                                </span>

                                {/* Status indicator */}
                                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
                                    <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${index === 0 ? 'bg-yellow-500' :
                                        index === 1 ? 'bg-teal-500' :
                                            index === 2 ? 'bg-purple-500' :
                                                index === 3 ? 'bg-green-500' :
                                                    'bg-red-500'
                                        }`}></div>
                                </div>
                            </div>

                            {/* Unit info */}
                            <div className="relative z-10 text-center">
                                <h4 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 group-hover:text-teal-700 transition-colors duration-300 leading-tight mb-1 sm:mb-2">
                                    {cat.name}
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                    {cat.desc}
                                </p>
                            </div>

                            {/* Hover indicator */}
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center gap-1 text-teal-600 text-xs">
                                    <div className="w-1 h-1 bg-teal-500 rounded-full animate-pulse"></div>
                                    <span>Unit Pendidikan</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    )
}

export default UnitSection
