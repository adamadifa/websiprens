import { Menu, User } from "react-feather";
import MobileSidebar from "../home/Mobilesidebar";
import { useState, useEffect, useRef, RefObject } from "react";
import Link from "next/link";

const getInitials = (name: string) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + (parts[1][0] || "")).toUpperCase();
};

const Header = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const avatarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const userStr = localStorage.getItem("user");
            if (userStr) {
                try {
                    setUser(JSON.parse(userStr));
                } catch {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        }
        console.log(user);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (avatarRef.current && !(avatarRef.current as HTMLDivElement).contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside as any);
        } else {
            document.removeEventListener("mousedown", handleClickOutside as any);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside as any);
    }, [showDropdown]);

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
    };

    const initials = user ? getInitials((user as any).name) || getInitials((user as any).name) : "";

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur shadow-lg" : "bg-transparent"
                } py-6`}
        >
            <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
                {/* Sidebar mobile menu */}
                <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <Link href="/" className="block">
                    <img
                        src="/assets/images/logo/alamin.png"
                        alt="Logo Pesantren Persis Al Amin"
                        className="h-16 w-auto"
                    />
                </Link>
                <div className="flex-1 flex items-center md:hidden">
                    {/* Spacer agar hamburger ke kanan */}
                </div>
                <nav className="hidden md:flex items-center space-x-8 text-gray-600 font-medium">
                    <Link href="/" className="hover:text-teal-600">Home</Link>
                    <a href="#" className="hover:text-teal-600">Tentang Pesantren</a>
                    <a href="#" className="hover:text-teal-600">Visi Misi</a>
                    <a href="#" className="hover:text-teal-600">Virtual Tour</a>
                    <a href="#" className="hover:text-teal-600">Sustainable Curiculum</a>
                </nav>
                {/* Bagian kanan header */}
                <div className="hidden md:flex items-center space-x-4">
                    {user ? (
                        <div className="relative" ref={avatarRef}>
                            <button
                                className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-lg shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                onClick={() => setShowDropdown((v) => !v)}
                                aria-label="User menu"
                            >
                                {initials}
                            </button>
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                                    <Link href="/dashboard" className="block px-4 py-2 text-gray-700 text-sm font-semibold truncate hover:bg-gray-50">{(user as any).name || (user as any).nama_lengkap}</Link>
                                    <button
                                        className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 text-sm font-semibold"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="text-teal-600 font-semibold px-4 py-2 rounded-lg hover:bg-teal-50">Masuk</Link>
                            <Link href="/register" className="bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-teal-700">Daftar Sekarang</Link>
                        </>
                    )}
                </div>
                {/* Avatar user di mobile */}
                <div className="flex md:hidden items-center ml-2">
                    {user ? (
                        <div className="relative" ref={avatarRef}>
                            <button
                                className="w-9 h-9 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center text-base shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                onClick={() => setShowDropdown((v) => !v)}
                                aria-label="User menu"
                            >
                                {initials}
                            </button>
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                                    <div className="px-4 py-2 text-gray-700 text-sm font-semibold truncate">{(user as any).name || (user as any).nama_lengkap}</div>
                                    <button
                                        className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 text-sm font-semibold"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>
                {/* Hamburger menu for mobile */}
                <button
                    className="md:hidden ml-auto p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                    aria-label="Open menu"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu size={28} />
                </button>
            </div>
        </header>
    );
};

export default Header;
