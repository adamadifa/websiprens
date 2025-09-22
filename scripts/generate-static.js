#!/usr/bin/env node

/**
 * Script untuk generate static files untuk upload ke public_html
 * Gunakan: node scripts/generate-static.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Memulai generate static files untuk upload ke public_html...');

try {
    // 1. Build static files
    console.log('📦 Building static files...');
    execSync('npm run export', { stdio: 'inherit' });

    // 2. Cek apakah build berhasil
    const outDir = path.join(process.cwd(), 'out');
    if (fs.existsSync(outDir)) {
        console.log('✅ Build berhasil!');

        // 3. Tampilkan informasi file
        const files = getAllFiles(outDir);
        console.log(`📁 Ditemukan ${files.length} file:`);

        // Tampilkan struktur folder
        console.log('\n📂 Struktur folder "out":');
        displayDirectoryTree(outDir, '', 0);

        // 4. Instruksi upload
        console.log('\n📋 Instruksi Upload ke public_html:');
        console.log('1. Buka File Manager di cPanel');
        console.log('2. Masuk ke folder public_html');
        console.log('3. Upload semua file dari folder "out/" ke public_html');
        console.log('4. Pastikan file index.html ada di root public_html');
        console.log('5. Set permission 644 untuk file dan 755 untuk folder');

        console.log('\n🔗 File penting yang harus di-upload:');
        console.log('   - index.html (halaman beranda)');
        console.log('   - news/ (folder berita)');
        console.log('   - _next/ (assets Next.js)');
        console.log('   - assets/ (gambar dan file statis)');
        console.log('   - sitemap.xml');
        console.log('   - robots.txt');

        console.log('\n✨ Upload selesai! Website Anda akan live di domain Anda.');

    } else {
        console.error('❌ Build gagal! Folder "out" tidak ditemukan.');
        process.exit(1);
    }

} catch (error) {
    console.error('❌ Error saat generate static files:', error.message);
    process.exit(1);
}

// Helper function untuk mendapatkan semua file
function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

// Helper function untuk menampilkan struktur direktori
function displayDirectoryTree(dirPath, prefix = '', depth = 0) {
    if (depth > 3) return; // Batasi kedalaman untuk readability

    const files = fs.readdirSync(dirPath);
    const sortedFiles = files.sort((a, b) => {
        const aIsDir = fs.statSync(path.join(dirPath, a)).isDirectory();
        const bIsDir = fs.statSync(path.join(dirPath, b)).isDirectory();

        if (aIsDir && !bIsDir) return -1;
        if (!aIsDir && bIsDir) return 1;
        return a.localeCompare(b);
    });

    sortedFiles.forEach((file, index) => {
        const fullPath = path.join(dirPath, file);
        const isLast = index === sortedFiles.length - 1;
        const isDir = fs.statSync(fullPath).isDirectory();

        const connector = isLast ? '└── ' : '├── ';
        const icon = isDir ? '📁' : '📄';

        console.log(`${prefix}${connector}${icon} ${file}`);

        if (isDir) {
            const newPrefix = prefix + (isLast ? '    ' : '│   ');
            displayDirectoryTree(fullPath, newPrefix, depth + 1);
        }
    });
}

