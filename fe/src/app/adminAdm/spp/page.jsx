"use client";

import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FiPlus, FiEdit, FiTrash2, FiDollarSign, FiX, FiAlertTriangle } from 'react-icons/fi';

// Data awal, kita akan memindahkannya ke dalam state
const initialSppData = [
  { id: 1, name: 'Uang Pembangunan', amount: 400000 },
  { id: 2, name: 'Uang Sarana Prasarana', amount: 200000 },
  { id: 3, name: 'Uang Makan', amount: 700000 },
];

export default function SppPage() {
  // State untuk menyimpan daftar item SPP
  const [sppItems, setSppItems] = useState(initialSppData);

  // State untuk mengontrol modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State untuk data yang sedang di proses
  const [newItem, setNewItem] = useState({ name: '', amount: '' });
  const [currentItem, setCurrentItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Fungsi untuk format mata uang Rupiah
  const formatCurrency = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

  // --- Fungsi Handler untuk Modal ---
  function openAddModal() { setIsAddModalOpen(true); }
  function closeAddModal() {
    setIsAddModalOpen(false);
    setNewItem({ name: '', amount: '' }); // Reset form saat modal ditutup
  }

  function openEditModal(item) {
    setCurrentItem(item);
    setIsEditModalOpen(true);
  }
  function closeEditModal() {
    setIsEditModalOpen(false);
    setCurrentItem(null);
  }

  function openDeleteModal(item) {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  }
  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  }

  // --- Fungsi Handler untuk CRUD ---
  function handleAddItem(e) {
    e.preventDefault();
    if (newItem.name && newItem.amount) {
      setSppItems([
        ...sppItems,
        {
          id: Date.now(), // Gunakan timestamp untuk ID unik
          ...newItem,
          amount: Number(newItem.amount)
        }
      ]);
      closeAddModal();
    }
  }

  function handleUpdateItem(e) {
    e.preventDefault();
    if (currentItem) {
      setSppItems(sppItems.map(item =>
        item.id === currentItem.id ? { ...currentItem, amount: Number(currentItem.amount) } : item
      ));
      closeEditModal();
    }
  }

  function handleDeleteItem() {
    if (itemToDelete) {
      setSppItems(sppItems.filter(item => item.id !== itemToDelete.id));
      closeDeleteModal();
    }
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Manajemen SPP</h1>
        <div className="flex justify-start mb-6">
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FiPlus size={20} />
            <span>Tambah SPP</span>
          </button>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg space-y-4">
          {sppItems.length > 0 ? (
            sppItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-cyan-100">
                    <FiDollarSign className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-base">{item.name}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <p className="text-base text-blue-600 font-medium text-left sm:text-right w-full sm:w-36">
                    {formatCurrency(item.amount)}
                  </p>
                  <div className="flex items-center gap-3 self-start sm:self-center">
                    <button onClick={() => openEditModal(item)} className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 text-white text-sm rounded-md hover:bg-yellow-500 transition-colors"><FiEdit size={14} /><span>Edit</span></button>
                    <button onClick={() => openDeleteModal(item)} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"><FiTrash2 size={14} /><span>Hapus</span></button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 px-4">
              <p className="text-gray-500">Belum ada data SPP. Silakan tambahkan item baru.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal untuk Tambah Data */}
      <Transition appear show={isAddModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeAddModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button type="button" className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={closeAddModal}>
                      <span className="sr-only">Close</span>
                      <FiX className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Tambah Item SPP Baru
                      </Dialog.Title>
                      <div className="mt-4">
                        <form onSubmit={handleAddItem} className="space-y-4">
                          <div>
                            <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Nama Item</label>
                            <input type="text" id="itemName" name="itemName" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" placeholder="Contoh: Uang Buku" required />
                          </div>
                          <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Jumlah (Rp)</label>
                            <input type="number" id="amount" name="amount" value={newItem.amount} onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" placeholder="Contoh: 150000" required />
                          </div>
                          <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                            <button type="submit" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto">Simpan</button>
                            <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={closeAddModal}>Batal</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Modal untuk Edit Data */}
      <Transition appear show={isEditModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeEditModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button type="button" className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={closeEditModal}>
                      <span className="sr-only">Close</span>
                      <FiX className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  {currentItem && (
                     <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Edit Item SPP
                          </Dialog.Title>
                          <div className="mt-4">
                            <form onSubmit={handleUpdateItem} className="space-y-4">
                              <div>
                                <label htmlFor="editItemName" className="block text-sm font-medium text-gray-700">Nama Item</label>
                                <input type="text" id="editItemName" value={currentItem.name} onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" required />
                              </div>
                              <div>
                                <label htmlFor="editAmount" className="block text-sm font-medium text-gray-700">Jumlah (Rp)</label>
                                <input type="number" id="editAmount" value={currentItem.amount} onChange={(e) => setCurrentItem({ ...currentItem, amount: Number(e.target.value) })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" required />
                              </div>
                              <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                                <button type="submit" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto">Simpan Perubahan</button>
                                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={closeEditModal}>Batal</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                  )}
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
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <FiAlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Hapus Item SPP
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Apakah Anda yakin ingin menghapus item "{itemToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.
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
