"use client";

import { FiPlus, FiEdit, FiEye, FiUser } from 'react-icons/fi'; // Mengganti FiTrash2 dengan FiEye

// Data dummy untuk setoran tahfidz
const tahfidzData = [
  {
    id: 1,
    name: 'Sefza Auma Tiang Alam',
    lastSurah: 'An-Naba',
    icon: FiUser,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
  },
  {
    id: 2,
    name: 'Sefza Auma Tiang Alam',
    lastSurah: 'An-Naba',
    icon: FiUser,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 3,
    name: 'Sefza Auma Tiang Alam',
    lastSurah: 'An-Naba',
    icon: FiUser,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
  },
];

export default function TahfidzPage() {
  return (
    <div>
      {/* Tombol Tambah Setoran */}
      <div className="flex justify-start mb-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FiPlus size={20} />
          <span>Tambah Setoran</span>
        </button>
      </div>

      {/* Daftar Setoran Tahfidz */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm space-y-4">
        {tahfidzData.map((item) => (
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
                  Last Surah : {item.lastSurah}
                </p>
              </div>
            </div>

            {/* ▼▼▼ PERUBAHAN TOMBOL ADA DI SINI ▼▼▼ */}
            <div className="flex items-center gap-3 self-end sm:self-center">
              {/* Tombol Edit diubah menjadi Update */}
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 text-white text-sm rounded-md hover:bg-yellow-500 transition-colors">
                <FiEdit size={14} />
                <span>Update</span>
              </button>
              {/* Tombol Hapus diubah menjadi View */}
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                <FiEye size={14} />
                <span>View</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}