"use client";

import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FiPlus, FiEdit, FiTrash2, FiDollarSign, FiX } from 'react-icons/fi';

const sppData = [
  { id: 1, name: 'Uang Pembangunan', amount: 400000 },
  { id: 2, name: 'Uang Sarana Prasarana', amount: 200000 },
  { id: 3, name: 'Uang Makan', amount: 700000 },
];

export default function SppPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  function closeAddModal() { setIsAddModalOpen(false); }
  function openAddModal() { setIsAddModalOpen(true); }

  function closeEditModal() { setIsEditModalOpen(false); setCurrentItem(null); }
  function openEditModal(item) { setCurrentItem(item); setIsEditModalOpen(true); }
  
  const formatCurrency = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

  return (
    <div>
      <div className="flex justify-start mb-6">
        <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FiPlus size={20} />
          <span>Tambah SPP</span>
        </button>
      </div>
      
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm space-y-4">
        {sppData.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-2 rounded-lg">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full bg-cyan-100`}><FiDollarSign className={`h-6 w-6 text-cyan-600`} /></div>
              <div><p className="font-semibold text-gray-800">{item.name}</p></div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <p className="text-sm text-blue-600 font-medium text-left sm:text-right">{formatCurrency(item.amount)}</p>
              <div className="flex items-center gap-3 self-start sm:self-center">
                <button onClick={() => openEditModal(item)} className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 text-white text-sm rounded-md hover:bg-yellow-500 transition-colors"><FiEdit size={14} /><span>Edit</span></button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"><FiTrash2 size={14} /><span>Hapus</span></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal untuk Tambah Data */}
      <Transition appear show={isAddModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeAddModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto"><div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center">
                  <span>Tambah Item SPP Baru</span><button onClick={closeAddModal} className="p-1 rounded-full hover:bg-gray-100"><FiX /></button>
                </Dialog.Title>
                <div className="mt-4"><form><div className="space-y-4">
                  <div><label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Nama Item</label><input type="text" id="itemName" name="itemName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Contoh: Uang Buku"/></div>
                  <div><label htmlFor="amount" className="block text-sm font-medium text-gray-700">Jumlah (Rp)</label><input type="number" id="amount" name="amount" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Contoh: 150000"/></div>
                </div></form></div>
                <div className="mt-6 flex justify-end gap-3"><button type="button" className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" onClick={closeAddModal}>Batal</button><button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none" onClick={closeAddModal}>Simpan</button></div>
              </Dialog.Panel>
            </Transition.Child>
          </div></div>
        </Dialog>
      </Transition>

      {/* Modal untuk Edit Data */}
      <Transition appear show={isEditModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeEditModal}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto"><div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center">
                  <span>Edit Item SPP</span><button onClick={closeEditModal} className="p-1 rounded-full hover:bg-gray-100"><FiX /></button>
                </Dialog.Title>
                <div className="mt-4"><form><div className="space-y-4">
                  <div><label htmlFor="editItemName" className="block text-sm font-medium text-gray-700">Nama Item</label><input type="text" id="editItemName" value={currentItem?.name || ''} onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/></div>
                  <div><label htmlFor="editAmount" className="block text-sm font-medium text-gray-700">Jumlah (Rp)</label><input type="number" id="editAmount" value={currentItem?.amount || ''} onChange={(e) => setCurrentItem({...currentItem, amount: parseInt(e.target.value)})} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/></div>
                </div></form></div>
                <div className="mt-6 flex justify-end gap-3"><button type="button" className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" onClick={closeEditModal}>Batal</button><button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none" onClick={closeEditModal}>Simpan Perubahan</button></div>
              </Dialog.Panel>
            </Transition.Child>
          </div></div>
        </Dialog>
      </Transition>
    </div>
  );
}