"use client";

import { FiPlus, FiEdit, FiTrash2, FiClock, FiXCircle, FiTrash } from 'react-icons/fi';

// Data dummy untuk jenis pelanggaran
const pelanggaranData = [
  {
    id: 1,
    name: 'Terlambat',
    points: '5 Poin',
    icon: FiClock,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
  },
  {
    id: 2,
    name: 'Bolos',
    points: '8 Poin',
    icon: FiXCircle,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 3,
    name: 'Buang Sampah Sembarangan',
    points: '8 Poin',
    icon: FiTrash,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
  },
];

export default function PelanggaranPage() {
  return (
    <div>
      {/* Tombol Tambah Kegiatan di sebelah kiri */}
      <div className="flex justify-start mb-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FiPlus size={20} />
          {/* Mengganti teks tombol agar lebih sesuai */}
          <span>Pelanggaran</span>
        </button>
      </div>

      {/* Daftar Pelanggaran */}
      <div className="space-y-4">
        {pelanggaranData.map((pelanggaran) => (
          // Kartu ini sudah responsif
          <div key={pelanggaran.id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Sisi Kiri: Ikon dan Nama Pelanggaran */}
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${pelanggaran.iconBg}`}>
                <pelanggaran.icon className={`h-6 w-6 ${pelanggaran.iconColor}`} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{pelanggaran.name}</p>
                <p className="text-sm text-blue-600 font-medium">{pelanggaran.points}</p>
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