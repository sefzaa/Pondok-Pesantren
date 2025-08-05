"use client";

import { FiPlus, FiEdit, FiTrash2, FiUser } from 'react-icons/fi';

// Data dummy untuk prestasi santri
const prestasiData = [
  {
    id: 1,
    name: 'Sefza Auma Tiang Alam',
    achievement: 'Juara I Pramuka',
    icon: FiUser,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
  },
  {
    id: 2,
    name: 'Sefza Auma Tiang Alam',
    achievement: 'Juara #3 MTQ',
    icon: FiUser,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 3,
    name: 'Sefza Auma Tiang Alam',
    achievement: 'Semifinal ...',
    icon: FiUser,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
  },
];

export default function PrestasiPage() {
  return (
    <div>
      {/* Tombol Tambah Prestasi */}
      <div className="flex justify-start mb-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FiPlus size={20} />
          <span>Tambah Prestasi</span>
        </button>
      </div>

      {/* Daftar Prestasi */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm space-y-4">
        {prestasiData.map((item) => (
          // Kartu ini sudah responsif
          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-2 rounded-lg">
            {/* Sisi Kiri: Ikon dan Nama */}
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${item.iconBg}`}>
                <item.icon className={`h-6 w-6 ${item.iconColor}`} />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-blue-600 font-medium">
                  {item.achievement}
                </p>
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