// Daftar endpoint API terpusat
// Contoh penggunaan: endpoints.auth.login

const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    registerSiswa: '/auth/register-siswa', // Untuk registrasi siswa
    logout: '/auth/logout',
    profile: '/auth/profile',
  },
  unit: {
    list: '/unit',
  },
  user: {
    list: '/user',
    detail: (id: string | number) => `/user/${id}`,
  },
  publicPosts: {
    getLastPostHomepage: '/public/posts/getlastposthomepage',
    getPostHomepage:'/public/posts/getposthomepage',
    getDetail: (slug: string) => `/public/posts/${slug}`,
    getRandomPost: '/public/posts/getrandompost',
    getAllPosts: (page = 1) => `/public/posts?page=${page}`,
  },
  testimonials: {
    getAll: '/public/testimonials',
  },
  prestasiSiswa: {
    getAll: '/public/prestasi-siswa',
  },
  pendaftaronline: {
    profilependaftar: (id: string | number) => `/pendaftaranonline/${id}`,
    updateProfile: (id: string | number) => `/pendaftaranonline/${id}/update`,
    updateFoto: (no_register: string) => `/pendaftaranonline/${no_register}/update-foto`,
    konfirmasiPembayaran: '/pendaftaranonline/konfirmasi-pembayaran',
    getKonfirmasiPembayaran: '/pendaftaranonline/getkonfirmasipembayaran',
    deletePembayaran: '/pendaftaranonline/delete-pembayaran',
  },
  // Tambahkan endpoint lain sesuai kebutuhan
};

export default endpoints;
