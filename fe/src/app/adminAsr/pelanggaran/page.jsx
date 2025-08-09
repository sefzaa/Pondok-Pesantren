"use client";

import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FiPlus, FiEdit, FiTrash2, FiClock, FiXCircle, FiTrash, FiX, FiAlertTriangle } from 'react-icons/fi';

// Objek untuk memetakan nama ikon (string) ke komponen ikon
const iconMap = {
  FiClock: FiClock,
  FiXCircle: FiXCircle,
  FiTrash: FiTrash,
};

// Fungsi untuk mendapatkan warna badge berdasarkan jenis pelanggaran
const getTypeClass = (type) => {
  switch (type) {
    case 'Ringan':
      return 'bg-green-100 text-green-800';
    case 'Sedang':
      return 'bg-yellow-100 text-yellow-800';
    case 'Berat':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Data awal dengan struktur yang disesuaikan
const initialPelanggaranData = [
  {
    id: 1,
    name: 'Terlambat',
    type: 'Ringan',
    points: 5,
    icon: 'FiClock',
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
  },
  {
    id: 2,
    name: 'Bolos',
    type: 'Sedang',
    points: 10,
    icon: 'FiXCircle',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 3,
    name: 'Buang Sampah Sembarangan',
    type: 'Ringan',
    points: 5,
    icon: 'FiTrash',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
  },
];

export default function PelanggaranPage() {
  const [pelanggaranItems, setPelanggaranItems] = useState(initialPelanggaranData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const defaultNewItem = { name: '', type: 'Ringan' };
  const [currentItem, setCurrentItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Fungsi untuk menetapkan poin berdasarkan jenis
  const getPointsForType = (type) => {
    switch (type) {
      case 'Ringan': return 5;
      case 'Sedang': return 10;
      case 'Berat': return 25;
      default: return 0;
    }
  };

  function openAddModal() {
    setCurrentItem(defaultNewItem);
    setIsAddModalOpen(true);
  }
  function closeAddModal() { setIsAddModalOpen(false); }

  function openEditModal(item) {
    setCurrentItem(item);
    setIsEditModalOpen(true);
  }
  function closeEditModal() { setIsEditModalOpen(false); }

  function openDeleteModal(item) {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  }
  function closeDeleteModal() {
    setItemToDelete(null);
    setIsDeleteModalOpen(false);
  }

  function handleTypeChange(e, itemSetter) {
    const newType = e.target.value;
    itemSetter(prev => ({ ...prev, type: newType }));
  }

  function handleAddItem(e) {
    e.preventDefault();
    if (currentItem.name && currentItem.type) {
      const points = getPointsForType(currentItem.type);
      setPelanggaranItems([
        ...pelanggaranItems,
        {
          ...currentItem,
          id: Date.now(),
          points,
          icon: 'FiXCircle',
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600',
        },
      ]);
      closeAddModal();
    }
  }

  function handleUpdateItem(e) {
    e.preventDefault();
    if (currentItem) {
      const points = getPointsForType(currentItem.type);
      const updatedItem = { ...currentItem, points };
      setPelanggaranItems(
        pelanggaranItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
      closeEditModal();
    }
  }

  function handleDeleteItem() {
    if (itemToDelete) {
      setPelanggaranItems(
        pelanggaranItems.filter((item) => item.id !== itemToDelete.id)
      );
      closeDeleteModal();
    }
  }

  return (
    <div>
      <div className="flex justify-start mb-6">
        <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FiPlus size={20} />
          <span>Pelanggaran</span>
        </button>
      </div>

      <div className="space-y-4">
        {pelanggaranItems.map((pelanggaran) => {
          const IconComponent = iconMap[pelanggaran.icon] || FiXCircle;
          return (
            <div key={pelanggaran.id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Sisi Kiri: Ikon, Nama, Jenis, dan Poin */}
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${pelanggaran.iconBg}`}>
                  <IconComponent className={`h-6 w-6 ${pelanggaran.iconColor}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-800">{pelanggaran.name}</p>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getTypeClass(pelanggaran.type)}`}>
                      {pelanggaran.type}
                    </span>
                  </div>
                  <p className="text-sm text-blue-600 font-medium">{pelanggaran.points} Poin</p>
                </div>
              </div>
              
              {/* Sisi Kanan: Tombol Aksi */}
              <div className="flex items-center gap-3 self-end sm:self-center">
                  <button onClick={() => openEditModal(pelanggaran)} className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 text-white text-sm rounded-md hover:bg-yellow-500 transition-colors">
                    <FiEdit size={14} />
                    <span>Edit</span>
                  </button>
                  <button onClick={() => openDeleteModal(pelanggaran)} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors">
                    <FiTrash2 size={14} />
                    <span>Hapus</span>
                  </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal untuk Tambah dan Edit */}
      <Transition appear show={isAddModalOpen || isEditModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={isAddModalOpen ? closeAddModal : closeEditModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button type="button" className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={isAddModalOpen ? closeAddModal : closeEditModal}>
                      <span className="sr-only">Close</span>
                      <FiX className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {isAddModalOpen ? 'Tambah Jenis Pelanggaran' : 'Edit Jenis Pelanggaran'}
                      </Dialog.Title>
                      <div className="mt-4">
                        {currentItem && (
                          <form onSubmit={isAddModalOpen ? handleAddItem : handleUpdateItem} className="space-y-4">
                            <div>
                              <label htmlFor="pelanggaranName" className="block text-sm font-medium text-gray-700">Nama Pelanggaran</label>
                              <input type="text" id="pelanggaranName" name="pelanggaranName" value={currentItem.name} onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" placeholder="Contoh: Tidak ikut apel" required />
                            </div>
                            <div>
                              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Jenis</label>
                              <select id="type" name="type" value={currentItem.type} onChange={(e) => handleTypeChange(e, setCurrentItem)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900">
                                <option value="Ringan">Ringan</option>
                                <option value="Sedang">Sedang</option>
                                <option value="Berat">Berat</option>
                              </select>
                            </div>
                            <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                              <button type="submit" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto">
                                {isAddModalOpen ? 'Simpan' : 'Simpan Perubahan'}
                              </button>
                              <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={isAddModalOpen ? closeAddModal : closeEditModal}>
                                Batal
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Modal untuk Konfirmasi Hapus */}
      <Transition appear show={isDeleteModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <FiAlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Hapus Jenis Pelanggaran
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Apakah Anda yakin ingin menghapus jenis pelanggaran "{itemToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto" onClick={handleDeleteItem}>
                      Hapus
                    </button>
                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={closeDeleteModal}>
                      Batal
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
