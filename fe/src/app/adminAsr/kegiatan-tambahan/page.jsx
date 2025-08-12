"use client";

import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FiPlus, FiEdit, FiTrash2, FiAward, FiFlag, FiTrendingUp, FiX, FiAlertTriangle } from 'react-icons/fi';

// URL backend dari environment variable
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// Objek untuk memetakan nama ikon (string) ke komponen ikon
const iconMap = {
  FiAward: FiAward,
  FiFlag: FiFlag,
  FiTrendingUp: FiTrendingUp,
};

// Helper untuk memformat tanggal dari YYYY-MM-DD ke format "Hari, DD Bulan YYYY"
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const correctedDate = new Date(date.getTime() + userTimezoneOffset);
  
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(correctedDate);
};

export default function KegiatanTambahanPage() {
  const [kegiatanItems, setKegiatanItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const defaultNewItem = { name: '', date: '' };
  const [currentItem, setCurrentItem] = useState(defaultNewItem);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Fungsi untuk mengambil data dari API
  const fetchKegiatan = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/kegiatan-tambahan`);
      if (!response.ok) throw new Error('Gagal mengambil data');
      const data = await response.json();
      // Ganti nama field dari backend (nama, id_kegiatan) ke frontend (name, id)
      const formattedData = data.map(item => ({
        ...item,
        id: item.id_kegiatan,
        name: item.nama,
        date: item.tanggal.split('T')[0] // Ambil bagian tanggal saja
      }));
      setKegiatanItems(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Panggil fetchKegiatan saat komponen pertama kali dimuat
  useEffect(() => {
    fetchKegiatan();
  }, []);

  const openModal = (item = null) => {
    if (item) {
      setIsEditing(true);
      setCurrentItem({ ...item });
    } else {
      setIsEditing(false);
      setCurrentItem(defaultNewItem);
    }
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const openDeleteModal = (item) => { setItemToDelete(item); setIsDeleteModalOpen(true); };
  const closeDeleteModal = () => { setItemToDelete(null); setIsDeleteModalOpen(false); };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
        name: currentItem.name,
        date: currentItem.date,
        // Anda bisa menambahkan field icon dll di sini jika perlu
    };

    const url = isEditing 
      ? `${backendUrl}/api/kegiatan-tambahan/${currentItem.id}`
      : `${backendUrl}/api/kegiatan-tambahan/create`;
      
    const method = isEditing ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`Gagal ${isEditing ? 'memperbarui' : 'menambah'} data`);
        
        // Refresh data dari server untuk mendapatkan list terbaru
        fetchKegiatan();

    } catch (error) {
        console.error(`Error submitting form:`, error);
    } finally {
        closeModal();
    }
  };

  const handleDeleteItem = async () => {
    if (itemToDelete) {
      try {
        const response = await fetch(`${backendUrl}/api/kegiatan-tambahan/${itemToDelete.id}`, {
          method: 'DELETE'
        });
        if (!response.ok) throw new Error('Gagal menghapus data');
        
        // Hapus item dari state tanpa perlu fetch ulang
        setKegiatanItems(kegiatanItems.filter(item => item.id !== itemToDelete.id));

      } catch (error) {
        console.error("Error deleting item:", error);
      } finally {
        closeDeleteModal();
      }
    }
  };

  return (
    <div>
      <div className="flex justify-start mb-6">
        <button onClick={() => openModal()} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FiPlus size={20} />
          <span>Kegiatan</span>
        </button>
      </div>

      <div className="space-y-4">
        {kegiatanItems.map((kegiatan) => {
          const IconComponent = iconMap[kegiatan.icon] || FiAward;
          return (
            <div key={kegiatan.id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${kegiatan.iconBg || 'bg-gray-100'}`}>
                  <IconComponent className={`h-6 w-6 ${kegiatan.iconColor || 'text-gray-600'}`} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{kegiatan.name}</p>
                  <p className="text-sm text-gray-500">{formatDate(kegiatan.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-center">
                <button onClick={() => openModal(kegiatan)} className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 text-white text-sm rounded-md hover:bg-yellow-500 transition-colors">
                  <FiEdit size={14} />
                  <span>Edit</span>
                </button>
                <button onClick={() => openDeleteModal(kegiatan)} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors">
                  <FiTrash2 size={14} />
                  <span>Hapus</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal untuk Tambah dan Edit */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button type="button" className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={closeModal}>
                      <span className="sr-only">Close</span>
                      <FiX className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {isEditing ? 'Edit Kegiatan Tambahan' : 'Tambah Kegiatan Tambahan'}
                      </Dialog.Title>
                      <div className="mt-4">
                        {currentItem && (
                          <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                              <label htmlFor="kegiatanName" className="block text-sm font-medium text-gray-700">Nama Kegiatan</label>
                              <input type="text" id="kegiatanName" name="kegiatanName" value={currentItem.name} onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" placeholder="Contoh: Lomba Cerdas Cermat" required />
                            </div>
                            <div>
                              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Tanggal</label>
                              <input type="date" id="date" name="date" value={currentItem.date} onChange={(e) => setCurrentItem({ ...currentItem, date: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" required />
                            </div>
                            <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                              <button type="submit" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto">
                                {isEditing ? 'Simpan Perubahan' : 'Simpan'}
                              </button>
                              <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={closeModal}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <FiAlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Hapus Kegiatan
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Apakah Anda yakin ingin menghapus kegiatan "{itemToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.
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
