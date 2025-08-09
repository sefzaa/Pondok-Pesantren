"use client";

import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FiPlus, FiEdit, FiTrash2, FiSun, FiClipboard, FiX, FiAlertTriangle } from 'react-icons/fi';

// Objek untuk memetakan nama ikon (string) ke komponen ikon
const iconMap = {
  FiSun: FiSun,
  FiClipboard: FiClipboard,
};

// Opsi untuk pilihan hari
const daysOfWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

// Helper untuk memformat jadwal menjadi string yang mudah dibaca
const formatSchedule = (kegiatan) => {
  if (!kegiatan.repetitionType) return kegiatan.schedule;

  switch (kegiatan.repetitionType) {
    case 'harian':
      return kegiatan.time ? `Setiap Hari, Pukul ${kegiatan.time}` : 'Setiap Hari';
    case 'mingguan':
      if (kegiatan.days && kegiatan.days.length > 0) {
        const sortedDays = daysOfWeek.filter(day => kegiatan.days.includes(day));
        return `Setiap Minggu: ${sortedDays.join(', ')}`;
      }
      return 'Setiap Minggu';
    case 'bulanan':
      if (kegiatan.dates && kegiatan.dates.length > 0) {
        const sortedDates = [...kegiatan.dates].sort((a, b) => a - b);
        return `Setiap Bulan: Tgl ${sortedDates.join(', ')}`;
      }
      return 'Setiap Bulan';
    default:
      return 'Jadwal tidak ditentukan';
  }
};

// Data awal dengan struktur baru
const initialKegiatanData = [
  {
    id: 1,
    name: 'Shalat Subuh',
    repetitionType: 'harian',
    time: '05:00',
    days: [],
    dates: [],
    icon: 'FiSun',
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
  },
  {
    id: 2,
    name: 'Shalat Zuhur',
    repetitionType: 'harian',
    time: '12:30',
    days: [],
    dates: [],
    icon: 'FiSun',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 3,
    name: 'Evaluasi Mingguan',
    repetitionType: 'mingguan',
    days: ['Rabu'],
    time: '',
    dates: [],
    icon: 'FiClipboard',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
  },
];

// Komponen Form dipindahkan ke luar komponen utama
const ScheduleForm = ({ initialItem, onSubmit, onClose }) => {
    const [item, setItem] = useState(initialItem);
    const [dateInput, setDateInput] = useState(initialItem.dates.join(', '));

    useEffect(() => {
        setItem(initialItem);
        setDateInput(initialItem.dates.join(', '));
    }, [initialItem]);

    const handleRepetitionChange = (e) => {
        const { value } = e.target;
        setItem(prev => ({ ...prev, repetitionType: value, days: [], dates: [], time: '' }));
        if (value !== 'bulanan') {
            setDateInput('');
        }
    };

    const handleDayChange = (day) => {
        const newDays = item.days.includes(day)
          ? item.days.filter(d => d !== day)
          : [...item.days, day];
        setItem({ ...item, days: newDays });
    };

    const handleDateInputChange = (e) => {
        const sanitizedValue = e.target.value.replace(/[^0-9,\s]/g, '');
        setDateInput(sanitizedValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalDates = dateInput.split(',')
            .map(d => parseInt(d.trim(), 10))
            .filter(num => !isNaN(num) && num > 0 && num <= 31);
        
        const finalItem = { ...item, dates: [...new Set(finalDates)] };
        onSubmit(finalItem);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="kegiatanName" className="block text-sm font-medium text-gray-700">Nama Kegiatan</label>
            <input type="text" id="kegiatanName" name="kegiatanName" value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" placeholder="Contoh: Pengajian Kitab" required />
          </div>

          <div>
            <label htmlFor="repetitionType" className="block text-sm font-medium text-gray-700">Ulangi</label>
            <select id="repetitionType" value={item.repetitionType} onChange={handleRepetitionChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900">
              <option value="harian">Setiap Hari</option>
              <option value="mingguan">Setiap Minggu</option>
              <option value="bulanan">Setiap Bulan</option>
            </select>
          </div>
          
          {item.repetitionType === 'harian' && (
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Pukul</label>
              <input type="time" id="time" value={item.time || ''} onChange={(e) => setItem({ ...item, time: e.target.value })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" required/>
            </div>
          )}

          {item.repetitionType === 'mingguan' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Pilih Hari</label>
              <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
                {daysOfWeek.map(day => (
                  <label key={day} className="flex items-center space-x-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={item.days.includes(day)} onChange={() => handleDayChange(day)} className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-gray-900">{day}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {item.repetitionType === 'bulanan' && (
            <div>
              <label htmlFor="dates" className="block text-sm font-medium text-gray-700">Pilih Tanggal</label>
              <input type="text" id="dates" value={dateInput} onChange={handleDateInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900" placeholder="Contoh: 1, 15, 25" />
               <p className="text-xs text-gray-500 mt-1">Pisahkan tanggal dengan koma.</p>
            </div>
          )}

          <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
            <button type="submit" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:ml-3 sm:w-auto">
              {item.id ? 'Simpan Perubahan' : 'Simpan'}
            </button>
            <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={onClose}>
              Batal
            </button>
          </div>
        </form>
    );
};

export default function KegiatanRutinPage() {
  const [kegiatanItems, setKegiatanItems] = useState(initialKegiatanData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const defaultNewItem = { name: '', repetitionType: 'harian', time: '', days: [], dates: [] };
  const [currentItem, setCurrentItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  function openAddModal() {
    setCurrentItem(defaultNewItem);
    setIsAddModalOpen(true);
  }
  function closeAddModal() { setIsAddModalOpen(false); }

  function openEditModal(item) {
    const itemToEdit = { ...defaultNewItem, ...item };
    setCurrentItem(itemToEdit);
    setIsEditModalOpen(true);
  }
  function closeEditModal() { setIsEditModalOpen(false); }

  function openDeleteModal(item) { setItemToDelete(item); setIsDeleteModalOpen(true); }
  function closeDeleteModal() { setItemToDelete(null); setIsDeleteModalOpen(false); }

  function handleAddItem(itemToAdd) {
      setKegiatanItems([
        ...kegiatanItems,
        {
          ...itemToAdd,
          id: Date.now(),
          icon: 'FiClipboard',
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600',
        }
      ]);
      closeAddModal();
  }

  function handleUpdateItem(itemToUpdate) {
      setKegiatanItems(kegiatanItems.map(item =>
        item.id === itemToUpdate.id ? itemToUpdate : item
      ));
      closeEditModal();
  }

  function handleDeleteItem() {
    if (itemToDelete) {
      setKegiatanItems(kegiatanItems.filter(item => item.id !== itemToDelete.id));
      closeDeleteModal();
    }
  }

  return (
    <div>
      <div className="flex justify-start mb-6">
        <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FiPlus size={20} />
          <span>Kegiatan</span>
        </button>
      </div>

      <div className="space-y-4">
        {kegiatanItems.map((kegiatan) => {
          const IconComponent = iconMap[kegiatan.icon] || FiClipboard;
          return (
            <div key={kegiatan.id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${kegiatan.iconBg}`}>
                  <IconComponent className={`h-6 w-6 ${kegiatan.iconColor}`} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{kegiatan.name}</p>
                  <p className="text-sm text-gray-500">{formatSchedule(kegiatan)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-center">
                <button onClick={() => openEditModal(kegiatan)} className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 text-white text-sm rounded-md hover:bg-yellow-500 transition-colors">
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
      <Transition appear show={isAddModalOpen || isEditModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={isAddModalOpen ? closeAddModal : closeEditModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                        {isAddModalOpen ? 'Tambah Kegiatan Baru' : 'Edit Kegiatan'}
                      </Dialog.Title>
                      <div className="mt-4">
                        {currentItem && <ScheduleForm initialItem={currentItem} onSubmit={isAddModalOpen ? handleAddItem : handleUpdateItem} onClose={isAddModalOpen ? closeAddModal : closeEditModal} />}
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
