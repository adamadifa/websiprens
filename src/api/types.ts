export interface Unit {
  kode_unit: string;
  nama_unit: string;
}

export interface Testimonial {
  id: number;
  nama: string;
  testimoni: string;
  foto?: string | null;
  foto_url?: string | null;
  status?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PrestasiSiswa {
  id: number;
  nama_siswa: string;
  prestasi: string;
  tingkat: string;
  foto?: string | null;
  foto_url?: string | null;
  unit: {
    kode_unit: string;
    nama_unit: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface SebaranAlumni {
  id: number;
  nama_universitas: string;
  logo: string;
  logo_url: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiListResponse<T> {
  status: 'success' | 'error';
  count?: number;
  data: T[];
  message?: string;
}

export interface Visi {
  id: number;
  deskripsi: string;
  created_at?: string;
  updated_at?: string;
}

export interface Misi {
  id: number;
  judul: string;
  deskripsi: string;
  created_at?: string;
  updated_at?: string;
}

export interface VisiMisiResponse {
  status: 'success' | 'error';
  visi: Visi;
  misi: Misi[];
  misi_count: number;
  message?: string;
}
