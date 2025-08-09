"use client";

import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiEdit3, FiX } from 'react-icons/fi';

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

// Komponen Modal Reusable tidak berubah
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><FiX size={24} /></button>
        </div>
        {children}
      </div>
    </div>
  );
};

const santriData = [
  { id: '0001', name: 'Christine Brooks', asrama: 'Ibrahim', kamar: '1A', kelas: 'IX A', status: 'Aktif' },
  { id: '0002', name: 'Rosie Pearson', asrama: 'Yahya', kamar: '2B', kelas: 'IX B', status: 'Pindah' },
  { id: '0003', name: 'Darrell Caldwell', asrama: 'Yusuf', kamar: '1C', kelas: 'VII A', status: 'Drop Out' },
  { id: '0004', name: 'Gilbert Johnston', asrama: 'Ismail', kamar: '3A', kelas: 'VIII C', status: 'Aktif' },
  { id: '0005', name: 'Alan Cain', asrama: 'Ibrahim', kamar: '2A', kelas: 'IX A', status: 'Pindah' },
  { id: '0006', name: 'Alfred Murray', asrama: 'Yahya', kamar: '1B', kelas: 'VII B', status: 'Aktif' },
];

const filterButtons = [1, 2, 3, 4, 5, 6];

const asramaOptions = ['Ibrahim', 'Yahya', 'Yusuf', 'Ismail', 'Lainnya'];
const kamarOptions = ['1A', '1B', '1C', '2A', '2B', '2C', '3A', '3B', '3C'];
const kelasOptions = ['VII A', 'VII B', 'VII C', 'VIII A', 'VIII B', 'VIII C', 'IX A', 'IX B', 'IX C'];
const statusOptions = ['Aktif', 'Pindah', 'Drop Out'];


export default function SantriPage() {
  const [activeFilter, setActiveFilter] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSantri, setEditingSantri] = useState(null);

  const openEditModal = (santri) => {
    setEditingSantri(santri);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingSantri(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Kelas</label>
          <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
            {filterButtons.map((number) => (
              <button
                key={number}
                onClick={() => setActiveFilter(number)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeFilter === number 
                  ? 'bg-blue-600 text-white' // <-- PERUBAHAN HANYA DI BARIS INI
                  : 'bg-transparent text-gray-600 hover:bg-white/60'
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
        <button className="text-sm text-red-500 hover:underline ml-auto self-end">Reset Filter</button>
      </div>

      {/* Sisa kode di bawah ini tidak ada yang diubah sama sekali */}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="p-4 font-medium">NAME</th>
              <th className="p-4 font-medium">ASRAMA</th>
              <th className="p-4 font-medium">KAMAR</th>
              <th className="p-4 font-medium">KELAS</th>
              <th className="p-4 font-medium">STATUS</th>
              <th className="p-4 font-medium">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {santriData.map((santri) => (
              <tr key={santri.id} className="hover:bg-gray-50">
                <td className="p-4 font-semibold text-gray-800">{santri.name}</td>
                <td className="p-4 text-gray-600">{santri.asrama}</td>
                <td className="p-4 text-gray-600">{santri.kamar}</td>
                <td className="p-4 text-gray-600">{santri.kelas}</td>
                <td className="p-4"><StatusBadge status={santri.status} /></td>
                <td className="p-4">
                  <button onClick={() => openEditModal(santri)} className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
                    <FiEdit3 size={14} />
                    <span>Edit</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between pt-4 text-sm text-gray-500">
        <p>Showing 1-06 of 78</p>
        <div className="flex items-center gap-2">
          <button className="p-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50" disabled><FiChevronLeft size={16} /></button>
          <button className="p-2 border rounded-lg hover:bg-gray-100"><FiChevronRight size={16} /></button>
        </div>
      </div>

      {editingSantri && (
        <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title={`Edit Data Santri: ${editingSantri.name}`}>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama</label>
                <input type="text" defaultValue={editingSantri.name} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Asrama</label>
                <select defaultValue={editingSantri.asrama} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900">
                  {asramaOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Kamar</label>
                 <select defaultValue={editingSantri.kamar} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900">
                  {kamarOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Kelas</label>
                <select defaultValue={editingSantri.kelas} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900">
                  {kelasOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select defaultValue={editingSantri.status} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900">
                  {statusOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={closeEditModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Batal</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Simpan Perubahan</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}