"use client";

import Link from 'next/link'; // 1. Import komponen Link
import { FiSun, FiCheckSquare } from 'react-icons/fi';

// Data dummy untuk kegiatan absensi
const kegiatanAbsensiData = [
  {
    id: 1,
    name: 'Shalat Subuh',
    icon: FiSun,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
  },
  {
    id: 2,
    name: 'Shalat Zuhur',
    icon: FiSun,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 3,
    name: 'Evaluasi Mingguan',
    icon: FiCheckSquare,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
  },
];

export default function AbsensiPage() {
  return (
    <div>
      {/* Judul dan Tanggal */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Kegiatan - Selasa, 05 Agustus 2025
        </h2>
      </div>

      {/* Daftar Kegiatan Absensi */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm space-y-4">
        {kegiatanAbsensiData.map((kegiatan) => (
          <div key={kegiatan.id} className="flex items-center justify-between p-2 rounded-lg">
            {/* Sisi Kiri: Ikon dan Nama Kegiatan */}
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${kegiatan.iconBg}`}>
                <kegiatan.icon className={`h-6 w-6 ${kegiatan.iconColor}`} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{kegiatan.name}</p>
              </div>
            </div>

            {/* Sisi Kanan: Tombol Aksi */}
            <div className="flex items-center">
              {/* ▼▼▼ 2. Tombol Absen diubah menjadi Link ▼▼▼ */}
              <Link
                href="/wali-kamar/absensi/detail"
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
              >
                <FiCheckSquare size={16} />
                <span>Absen</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}