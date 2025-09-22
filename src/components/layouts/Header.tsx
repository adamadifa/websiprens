import { Menu } from "react-feather";
import MobileSidebar from "../home/Mobilesidebar";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface UserData {
    id?: string;
    name?: string;
    nama_lengkap?: string;
    email?: string;
    [key: string]: string | number | boolean | undefined;
}

const getInitials = (name: string) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + (parts[1][0] || "")).toUpperCase();
};

const Header = () => {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<UserData | null>(null);
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
            console.log('User data from localStorage:', userStr);
            if (userStr) {
                try {
                    const parsedUser = JSON.parse(userStr) as UserData;
                    console.log('Parsed user data:', parsedUser);
                    setUser(parsedUser);
                } catch (error) {
                    console.error('Error parsing user data:', error);
                    setUser(null);
                }
            } else {
                console.log('No user data found in localStorage');
                setUser(null);
            }
        }
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (avatarRef.current && !(avatarRef.current as HTMLDivElement).contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showDropdown]);

    const handleLogout = () => {
        try {
            // Clear localStorage
            if (typeof window !== "undefined") {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }

            // Reset state
            setUser(null);
            setShowDropdown(false);

            // Navigate to home page
            router.push('/');

            // Fallback: force reload if router doesn't work
            setTimeout(() => {
                if (typeof window !== "undefined") {
                    window.location.href = '/';
                }
            }, 100);
        } catch (error) {
            console.error('Logout error:', error);
            // Fallback: force reload
            if (typeof window !== "undefined") {
                window.location.href = '/';
            }
        }
    };

    const initials = user ? getInitials(user.name || user.nama_lengkap || "") : "";

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur shadow-lg" : "bg-transparent"
                } py-6`}
        >
            <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
                {/* Sidebar mobile menu */}
                <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <Link href="/" className="block">
                    <Image
                        src="/assets/images/logo/alamin.png"
                        alt="Logo Pesantren Persis Al Amin"
                        width={64}
                        height={64}
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
                    <a href="#" className="hover:text-teal-600">Galery Kegiatan</a>
                    <Link href="/fintren" className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg">Fintren</Link>
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
                                <div
                                    className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl py-2 z-[9999] border border-gray-100"
                                    style={{
                                        zIndex: 9999,
                                        position: 'absolute',
                                        top: '100%',
                                        right: 0,
                                        marginTop: '8px',
                                        backgroundColor: 'white',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div
                                        className="block px-4 py-2 text-gray-700 text-sm font-semibold truncate hover:bg-gray-50 cursor-pointer"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setShowDropdown(false);
                                            router.push('/dashboard');
                                        }}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        style={{
                                            cursor: 'pointer',
                                            userSelect: 'none'
                                        }}
                                    >
                                        {user.name || user.nama_lengkap}
                                    </div>
                                    <div
                                        className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 text-sm font-semibold cursor-pointer"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleLogout();
                                        }}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        style={{
                                            cursor: 'pointer',
                                            userSelect: 'none',
                                            minHeight: '32px',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        Logout
                                    </div>
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
                                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-xl py-2 z-[9999] border border-gray-100" style={{ zIndex: 9999 }}>
                                    <div
                                        className="block px-4 py-2 text-gray-700 text-sm font-semibold truncate hover:bg-gray-50 cursor-pointer"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setShowDropdown(false);
                                            router.push('/dashboard');
                                        }}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        style={{
                                            cursor: 'pointer',
                                            userSelect: 'none'
                                        }}
                                    >
                                        {user.name || user.nama_lengkap}
                                    </div>
                                    <div
                                        className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 text-sm font-semibold cursor-pointer"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleLogout();
                                        }}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        style={{
                                            cursor: 'pointer',
                                            userSelect: 'none'
                                        }}
                                    >
                                        Logout
                                    </div>
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
