import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserSidebarLayout from '../components/UserSidebarLayout';
import PendaftarSection from '../components/PendaftarSection';
import TimelineSection from '../components/TimelineSection';
import { User } from "react-feather";
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import Head from 'next/head';

interface UserData {
  name: string;
}

export default function DashboardPage() {
  const { isChecking, isAuthenticated } = useAuthRedirect();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      let parsedUserData: UserData | null = null;
      if (user) {
        try {
          parsedUserData = JSON.parse(user) as UserData;
        } catch (error) {
          console.error("Gagal mengurai data pengguna dari localStorage:", error);
        }
      }
      setUserData(parsedUserData);
      if (!token) {
        router.replace("/login");
      }
    }
  }, [router]);

  if (isChecking || !isAuthenticated) return null;
  if (!isClient) return null;

  return (
    <>
      <Head>
        <title>Dashboard | Sipren</title>
        <meta name="description" content="Dashboard Sipren" />
      </Head>
      <UserSidebarLayout>
        <div className="aurora-bg fixed inset-0 -z-10" aria-hidden="true" />
        <div className="w-full mx-auto mt-6 px-0 md:px-8 mb-6">
          <div className="flex items-center gap-4 mb-2 animate-fade-in">
            <div className="bg-teal-100 rounded-full w-14 h-14 flex items-center justify-center shadow-md border-2 border-teal-200">
              <User size={32} className="text-teal-600" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">
                Selamat Malam, {userData?.name || 'Pengguna'} <span className="inline-block">👋</span>
              </h2>
              <p className="text-gray-500 text-sm md:text-base">Selamat datang kembali di dashboard pendaftaran</p>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 px-0 md:px-8 items-start">
          <div className="rounded-2xl shadow-xl border border-teal-100 bg-white animate-fade-in">
            <PendaftarSection />
          </div>
          <div className="rounded-2xl shadow-xl border border-teal-100 bg-white animate-fade-in">
            <TimelineSection />
          </div>
        </div>
      </UserSidebarLayout>
    </>
  );
}
