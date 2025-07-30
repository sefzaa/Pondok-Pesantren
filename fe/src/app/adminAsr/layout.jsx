"use client";

import { useState, Fragment, useMemo } from 'react'; // 1. Tambahkan useMemo
import { usePathname } from 'next/navigation'; // 2. Tambahkan usePathname
import { Dialog, Transition } from '@headlessui/react';
import { FiMenu, FiX, FiSearch, FiFilter } from 'react-icons/fi';
import SidebarAdminAsr from '@/components/SidebarAdminAsr';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname(); // 3. Dapatkan URL saat ini

  // 4. Logika untuk membuat judul dinamis
  const pageTitle = useMemo(() => {
    if (pathname === '/adminAsr') {
      return 'Dashboard';
    }
    // Mengambil bagian terakhir dari URL, misal: "/adminAsr/kegiatan-rutin" -> "kegiatan-rutin"
    const lastSegment = pathname.split('/').pop();
    // Mengubah "kegiatan-rutin" menjadi "Kegiatan Rutin"
    const title = lastSegment.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    return title;
  }, [pathname]); // Akan dihitung ulang hanya jika pathname berubah

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ... Kode sidebar mobile tidak berubah ... */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0"><div className="fixed inset-0 bg-gray-600 bg-opacity-75" /></Transition.Child>
            <div className="fixed inset-0 flex z-40">
                <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
                    <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full">
                        <Transition.Child as={Fragment} enter="ease-in-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <div className="absolute top-0 right-0 -mr-12 pt-2">
                                <button type="button" className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" onClick={() => setSidebarOpen(false)}>
                                    <span className="sr-only">Close sidebar</span>
                                    <FiX className="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                            </div>
                        </Transition.Child>
                        <SidebarAdminAsr setSidebarOpen={setSidebarOpen} />
                    </Dialog.Panel>
                </Transition.Child>
                <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
            </div>
        </Dialog>
      </Transition.Root>

      {/* ... Kode sidebar desktop tidak berubah ... */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <SidebarAdminAsr />
      </div>

      <div className="lg:pl-64 flex flex-col flex-1">
        <header className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b items-center justify-between px-4 sm:px-6 lg:px-8">
          <button type="button" className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <FiMenu className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 flex justify-between items-center">
            
            {/* ▼▼▼ PERUBAHAN UTAMA ADA DI SINI ▼▼▼ */}
            <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
            
            <div className="flex items-center gap-4">{/* Isinya kosong */}</div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {/* ... Kode search bar tidak berubah ... */}
            <div className="relative max-w-md mb-6"><span className="absolute inset-y-0 left-0 flex items-center pl-3"><FiSearch className="h-5 w-5 text-gray-400" /></span><input type="text" placeholder="Search something here" className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-full focus:ring-blue-500 focus:border-blue-500" /><span className="absolute inset-y-0 right-0 flex items-center pr-3"><button className='p-1 hover:bg-gray-100 rounded-full'><FiFilter className="h-5 w-5 text-gray-400" /></button></span></div>
            {children}
        </main>
      </div>
    </div>
  );
}