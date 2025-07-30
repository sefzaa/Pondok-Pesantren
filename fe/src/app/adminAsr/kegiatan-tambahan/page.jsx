"use client";

import { FiPlus, FiEdit, FiTrash2, FiAward, FiFlag, FiTrendingUp } from 'react-icons/fi';

const kegiatanTambahanData = [
  {
    id: 1,
    name: 'Seminar Kepemimpinan',
    date: 'Senin, 19 Agustus 2025',
    icon: FiAward,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
  },
  {
    id: 2,
    name: 'Upacara Hari Santri',
    date: 'Selasa, 20 Agustus 2025',
    icon: FiFlag,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 3,
    name: 'Seminar Kewirausahaan',
    date: 'Rabu, 21 Agustus 2025',
    icon: FiTrendingUp,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
  },
];

export default function KegiatanTambahanPage() {
  return (
    <div>
      {/* Tombol Tambah Kegiatan */}
      <div className="flex justify-start mb-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FiPlus size={20} />
          <span>Kegiatan</span>
        </button>
      </div>

      {/* Daftar Kegiatan Tambahan */}
      <div className="space-y-4">
        {kegiatanTambahanData.map((kegiatan) => (
          // ▼▼▼ PERUBAHAN RESPONSIF ADA DI BARIS INI ▼▼▼
          <div key={kegiatan.id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Sisi Kiri: Ikon dan Nama Kegiatan */}
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${kegiatan.iconBg}`}>
                <kegiatan.icon className={`h-6 w-6 ${kegiatan.iconColor}`} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{kegiatan.name}</p>
                <p className="text-sm text-gray-500">{kegiatan.date}</p>
              </div>
            </div>

            {/* Sisi Kanan: Tombol Aksi */}
            <div className="flex items-center gap-3 self-end sm:self-center">
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 text-white text-sm rounded-md hover:bg-yellow-500 transition-colors">
                <FiEdit size={14} />
                <span>Edit</span>
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors">
                <FiTrash2 size={14} />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}