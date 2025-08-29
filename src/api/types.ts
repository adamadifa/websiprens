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
