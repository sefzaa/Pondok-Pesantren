"use client";

import { useState } from 'react';
import { FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Komponen StatusBadge tidak berubah
const StatusBadge = ({ status }) => {
  const baseClasses = "px-2.5 py-1 text-xs font-medium rounded-full";
  let specificClasses = "";

  switch (status.toLowerCase()) {
    case 'aktif':
      specificClasses = "bg-green-100 text-green-700";
      break;
    case 'pindah':
      specificClasses = "bg-yellow-100 text-yellow-700";
      break;
    case 'drop out':
      specificClasses = "bg-red-100 text-red-700";
      break;
    default:
      specificClasses = "bg-gray-100 text-gray-700";
  }

  return <span className={`${baseClasses} ${specificClasses}`}>{status}</span>;
};


// ▼▼▼ 1. MENAMBAHKAN PROPERTI 'kelas' PADA DATA ▼▼▼
const santriData = [
  { id: '0001', name: 'Christine Brooks', asrama: '089 Kutch Green Apt. 448', kamar: '04 Sep 2019', kelas: 'IX A', status: 'Aktif' },
  { id: '0002', name: 'Rosie Pearson', asrama: '979 Immanuel Ferry Suite 626', kamar: '28 May 2019', kelas: 'IX B', status: 'Pindah' },
  { id: '0003', name: 'Darrell Caldwell', asrama: '8587 Frida Ports', kamar: '23 Nov 2019', kelas: 'VII A', status: 'Drop Out' },
  { id: '0004', name: 'Gilbert Johnston', asrama: '768 Destiny Lake Suite 600', kamar: '05 Feb 2019', kelas: 'VIII C', status: 'Aktif' },
  { id: '0005', name: 'Alan Cain', asrama: '042 Mylene Throughway', kamar: '29 Jul 2019', kelas: 'IX A', status: 'Pindah' },
  { id: '0006', name: 'Alfred Murray', asrama: '543 Weinmann Mountain', kamar: '15 Aug 2019', kelas: 'VII B', status: 'Aktif' },
];

const filterButtons = [1, 2, 3, 4, 5, 6];

export default function SantriPage() {
  const [activeFilter, setActiveFilter] = useState(1);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* Filter Section - tidak ada perubahan */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6">
        <button className="p-2.5 text-sm border rounded-lg hover:bg-gray-50">
          <FiFilter size={16} />
        </button>
        <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
          {filterButtons.map((number) => (
            <button
              key={number}
              onClick={() => setActiveFilter(number)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeFilter === number 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'bg-transparent text-gray-600 hover:bg-white/60'
              }`}
            >
              {number}
            </button>
          ))}
        </div>
        <button className="text-sm text-red-500 hover:underline ml-auto">
          Reset Filter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="p-4 font-medium">ID</th>
              <th className="p-4 font-medium">NAME</th>
              <th className="p-4 font-medium">ASRAMA</th>
              <th className="p-4 font-medium">KAMAR</th>
              {/* ▼▼▼ 2. MENAMBAHKAN HEADER KOLOM 'KELAS' ▼▼▼ */}
              <th className="p-4 font-medium">KELAS</th>
              <th className="p-4 font-medium">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {santriData.map((santri) => (
              <tr key={santri.id} className="hover:bg-gray-50">
                <td className="p-4 text-gray-600">{santri.id}</td>
                <td className="p-4 font-semibold text-gray-800">{santri.name}</td>
                <td className="p-4 text-gray-600">{santri.asrama}</td>
                <td className="p-4 text-gray-600">{santri.kamar}</td>
                {/* ▼▼▼ 3. MENAMPILKAN DATA 'kelas' DI SETIAP BARIS ▼▼▼ */}
                <td className="p-4 text-gray-600">{santri.kelas}</td>
                <td className="p-4">
                  <StatusBadge status={santri.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section - tidak ada perubahan */}
      <div className="flex items-center justify-between pt-4 text-sm text-gray-500">
        <p>Showing 1-06 of 78</p>
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
  );
}