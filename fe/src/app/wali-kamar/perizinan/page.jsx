"use client";

import { FiPlus, FiEdit, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// ▼▼▼ 1. MENAMBAHKAN DATA TANGGAL PADA SETIAP ITEM ▼▼▼
const perizinanData = [
  {
    id: 1,
    name: 'Sefza Auma Tiang Alam',
    izinType: 'Pulang',
    tanggalIzin: '04 Agu 2025',
    tanggalKembali: '05 Agu 2025',
  },
  {
    id: 2,
    name: 'Sefza Auma Tiang Alam',
    izinType: 'Mingguan',
    tanggalIzin: '02 Agu 2025',
    tanggalKembali: '03 Agu 2025',
  },
  {
    id: 3,
    name: 'Sefza Auma Tiang Alam',
    izinType: 'Mudif',
    tanggalIzin: '01 Agu 2025',
    tanggalKembali: '01 Agu 2025',
  },
];

export default function PerizinanWaliKamarPage() {
  return (
    <div>
      {/* Tombol Tambah Izin */}
      <div className="flex justify-start mb-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FiPlus size={20} />
          <span>Tambah Izin</span>
        </button>
      </div>

      {/* ▼▼▼ 2. DAFTAR KARTU DIUBAH MENJADI TABEL ▼▼▼ */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500">
              <tr>
                <th className="p-4 font-medium">NAME</th>
                <th className="p-4 font-medium">Jenis Izin</th>
                <th className="p-4 font-medium">Tanggal Izin</th>
                <th className="p-4 font-medium">Tanggal Kembali</th>
                <th className="p-4 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {perizinanData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-4 font-semibold text-gray-800">{item.name}</td>
                  <td className="p-4 text-gray-600">{item.izinType}</td>
                  <td className="p-4 text-gray-600">{item.tanggalIzin}</td>
                  <td className="p-4 text-gray-600">{item.tanggalKembali}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 text-white text-xs rounded-md hover:bg-yellow-500 transition-colors">
                        <FiEdit size={12} />
                        <span>Edit</span>
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition-colors">
                        <FiTrash2 size={12} />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Section */}
        <div className="flex items-center justify-between pt-4 text-sm text-gray-500">
          <p>Showing 1-03 of 10</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50" disabled>
              <FiChevronLeft size={16} />
            </button>
            <button className="p-2 border rounded-lg hover:bg-gray-100">
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}