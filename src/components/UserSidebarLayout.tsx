"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layout, Folder, CheckSquare, BarChart2, Users, Bell, HelpCircle, Settings, ChevronDown, ChevronUp, User } from "react-feather";

interface UserSidebarLayoutProps {
  children: ReactNode;
}

export default function UserSidebarLayout({ children }: UserSidebarLayoutProps) {
  // State untuk menu expand/collapse (opsional)
  const [reportOpen, setReportOpen] = React.useState(false);
  const [userOpen, setUserOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Tutup sidebar saat klik menu di mobile
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={closeSidebar}></div>
      )}
      {/* Hamburger Button Mobile */}
      <button
        className="fixed top-4 left-4 z-40 flex items-center justify-center w-10 h-10 rounded-lg bg-teal-900 text-white shadow-lg md:hidden"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
      </button>
      {/* Sidebar */}
      <aside
        className={
          `fixed md:static z-40 md:z-0 top-0 left-0 h-screen w-[270px] bg-teal-900 text-white flex flex-col py-6 px-4 rounded-none md:rounded-2xl md:m-2 shadow-xl transition-transform duration-300 ` +
          (sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0')
        }
        style={{ height: '100vh' }}
      >
        {/* Close Button Mobile */}
        <div className="flex md:hidden justify-end mb-2">
          <button onClick={closeSidebar} className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 px-2">
          <img src="/assets/images/logo/alamin.png" alt="Logo" className="max-h-8 w-auto block" style={{ maxWidth: 120 }} />
          <span className="font-bold text-lg tracking-wide">SPMB</span>
        </div>
        {/* Search */}
        <div className="mb-5 px-2">
          <input type="text" placeholder="Search" className="w-full py-2 px-3 rounded-lg bg-white/10 placeholder-white/60 text-white focus:outline-none focus:bg-white/20" />
        </div>
        <nav className="flex-1">
          <ul className="space-y-1 text-sm overflow-y-auto max-h-[calc(100vh-320px)] pr-2">
            <li>
              <Link href="/dashboard" className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-yellow-100/10 transition-all border-l-4 ${usePathname() === '/dashboard' ? 'bg-yellow-100/10 border-yellow-400 font-bold text-yellow-400' : 'border-transparent'}`}>
                <Home size={18} /> Home
              </Link>
            </li>
            <li>
              <Link href="/formulirpendaftaran" className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-yellow-100/10 transition-all border-l-4 ${usePathname() === '/formulirpendaftaran' ? 'bg-yellow-100/10 border-yellow-400 font-bold text-yellow-400' : 'border-transparent'}`}>
                <CheckSquare size={18} /> Formulir Pendaftaran
              </Link>
            </li>
            <li>
              <Link href="/konfirmasipembayaran" className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-yellow-100/10 transition-all border-l-4 ${usePathname() === '/konfirmasipembayaran' ? 'bg-yellow-100/10 border-yellow-400 font-bold text-yellow-400' : 'border-transparent'}`}>
                <BarChart2 size={18} /> Konfirmasi Pembayaran
              </Link>
            </li>
            <li>
              <Link href="/uploaddokumen" className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-yellow-100/10 transition-all border-l-4 ${usePathname() === '/uploaddokumen' ? 'bg-yellow-100/10 border-yellow-400 font-bold text-yellow-400' : 'border-transparent'}`}>
                <Folder size={18} /> Upload Dokumen
              </Link>
            </li>
            {/* Reporting Group */}
            {/* <li>
              <button onClick={() => setReportOpen(v => !v)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition ${reportOpen ? 'bg-white/10' : ''}`}>
                <BarChart2 size={18}/> Reporting
                <span className="ml-auto">{reportOpen ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}</span>
              </button>
              {reportOpen && (
                <ul className="pl-9 py-1 space-y-1">
                  <li><a href="#" className="block py-1 hover:underline">Overview</a></li>
                  <li><a href="#" className="block py-1 hover:underline">Notifications</a></li>
                  <li><a href="#" className="block py-1 hover:underline">Analytics</a></li>
                  <li><a href="#" className="block py-1 hover:underline">Reports</a></li>
                </ul>
              )}
            </li> */}

          </ul>
        </nav>
        {/* Bottom section */}
        <div className="mt-8 border-t border-white/15 pt-4 space-y-1 px-2">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10"><Bell size={17} /> Notifications <span className="ml-auto bg-white/20 px-2 rounded-full text-xs">4</span></a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10"><HelpCircle size={17} /> Support</a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10"><Settings size={17} /> Settings</a>
        </div>
        {/* User profile bottom */}
        <div className="mt-6 flex items-center gap-3 bg-white/10 rounded-xl px-3 py-2">
          <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
            <User size={22} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">Anita Cruz</div>
            <div className="text-xs text-white/70 truncate">anita@untitledui.com</div>
          </div>
          <button className="ml-2 text-white/60 hover:text-white"><ChevronDown size={18} /></button>
        </div>
        {/* Logout Button */}
        <button
          className="mt-4 w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 rounded-lg transition"
          onClick={() => {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/login';
            }
          }}
        >
          Logout
        </button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto p-6 md:p-10 overflow-x-auto dotted-background">
        {children}
      </main>
    </div>
  );
}
