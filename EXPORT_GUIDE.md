# Panduan Upload ke public_html (Shared Hosting)

## Cara Upload ke public_html

### 1. Persiapan Environment
Pastikan API backend Anda berjalan dan dapat diakses saat build:

```bash
# Set environment variable untuk API URL
export BASE_API_URL=https://your-api-domain.com/api
# atau
set BASE_API_URL=https://your-api-domain.com/api  # untuk Windows
```

### 2. Generate Static Files
Jalankan perintah berikut untuk generate file static:

```bash
# Install dependencies (jika belum)
npm install

# Generate static files untuk upload
npm run deploy
```

### 3. Hasil Generate
Setelah generate selesai, file static akan tersimpan di folder `out/`:
- **Static HTML**: Semua halaman dalam format HTML
- **Assets**: CSS, JS, dan gambar
- **SEO-friendly**: Sitemap dan robots.txt
- **Upload-ready**: Siap di-upload ke public_html

### 4. Upload ke public_html
1. Buka File Manager di cPanel
2. Masuk ke folder `public_html`
3. Upload semua file dari folder `out/` ke `public_html`
4. Pastikan `index.html` ada di root `public_html`

## Fitur yang Sudah Dikonfigurasi

### 1. Static Export
- **News Detail**: `/news/[slug]` - di-generate sebagai static HTML
- **Fallback**: Halaman 404 custom untuk route yang tidak ditemukan
- **Upload-ready**: Semua file siap di-upload ke public_html

### 2. Static Generation
- Data di-fetch dari API saat build time
- Semua halaman di-generate sebagai HTML
- Tidak perlu server untuk menjalankan website

### 3. Image Optimization
- Image optimization dinonaktifkan untuk static export
- Semua gambar di-serve sebagai static files
- Lazy loading tetap aktif

### 4. SEO Optimization
- Sitemap otomatis di-generate
- Meta tags untuk setiap halaman
- Trailing slash untuk konsistensi URL

## Struktur File untuk Upload

```
out/                        # Folder untuk upload ke public_html
├── index.html              # Halaman beranda
├── news/
│   ├── index.html          # Daftar berita
│   └── [slug]/
│       └── index.html      # Detail berita (untuk setiap slug)
├── login/
│   └── index.html
├── register/
│   └── index.html
├── dashboard/
│   └── index.html
├── 404.html                # Halaman 404 custom
├── _next/                  # Assets Next.js
├── assets/                 # Static assets
├── sitemap.xml
└── robots.txt
```

## Troubleshooting

### 1. Error saat Build
Jika terjadi error saat build, pastikan:
- API backend berjalan dan dapat diakses saat build
- Environment variable `BASE_API_URL` sudah diset
- Tidak ada server-side code yang tidak kompatibel

### 2. File Tidak Muncul di public_html
Jika file tidak muncul setelah upload:
- Pastikan semua file dari folder `out/` sudah di-upload
- Check permission file (644 untuk file, 755 untuk folder)
- Pastikan `index.html` ada di root `public_html`

### 3. Berita Baru Tidak Muncul
**Masalah**: Berita baru tidak muncul di website

**Solusi**:
1. **Rebuild**: Jalankan `npm run deploy` lagi
2. **Re-upload**: Upload ulang file dari folder `out/`
3. **Check API**: Pastikan endpoint mengembalikan data terbaru

### 4. Website Tidak Load
Jika website tidak bisa diakses:
- Pastikan `index.html` ada di root `public_html`
- Check permission file dan folder
- Pastikan domain mengarah ke folder `public_html`

## Upload ke Shared Hosting

### 1. cPanel File Manager
1. Login ke cPanel
2. Buka File Manager
3. Masuk ke folder `public_html`
4. Upload semua file dari folder `out/`
5. Set permission: 644 untuk file, 755 untuk folder

### 2. FTP Client
1. Download FileZilla atau WinSCP
2. Connect ke server dengan kredensial FTP
3. Navigate ke folder `public_html`
4. Upload semua file dari folder `out/`

### 3. ZIP Upload
1. Zip folder `out/` menjadi `website.zip`
2. Upload `website.zip` ke `public_html`
3. Extract di server
4. Pindahkan semua file ke root `public_html`

### 4. Command Line (SSH)
```bash
# Jika ada akses SSH
scp -r out/* user@server:/path/to/public_html/
```

## Catatan Penting

1. **API Dependency**: Pastikan API backend dapat diakses saat build time
2. **Static Content**: Data di-generate sebagai static HTML
3. **Upload Required**: Setiap update perlu rebuild dan re-upload
4. **SEO**: Semua halaman memiliki meta tags yang proper
5. **Performance**: Static files load sangat cepat

## Script yang Tersedia

- `npm run dev` - Development server
- `npm run export` - Build static files
- `npm run deploy` - Generate dan siapkan file untuk upload
- `npm run preview` - Preview hasil static files
- `npm run lint` - Lint code
