"use client";

import { FiPlus } from 'react-icons/fi';

// Data dummy untuk wali kamar
const waliKamarData = [
  {
    id: 1,
    name: 'Jason Price',
    role: 'Admin',
    email: 'jarick.parisian@yahoo.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'
  },
  {
    id: 2,
    name: 'Jukkoe Siso',
    role: 'CEO',
    email: 'sibyl.kozey@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80'
  },
  {
    id: 3,
    name: 'Harriet King',
    role: 'CTO',
    email: 'nadia_block@hotmail.com',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'
  },
  {
    id: 4,
    name: 'Olivia Reese',
    role: 'Strategist',
    email: 'kemmer.hattie@cremin.us',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  },
  {
    id: 5,
    name: 'Bertha Valdez',
    role: 'CEO',
    email: 'loraine.koelpin@tromp.io',
    avatar: 'https://images.unsplash.com/photo-1628157588553-5ee30acf6fb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'
  },
  {
    id: 6,
    name: 'Harriett Payne',
    role: 'Digital Marketer',
    email: 'nannie_west@estrella.tv',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'
  },
];


export default function WaliKamarPage() {
  return (
    <div>
      {/* ▼▼▼ PERUBAHAN ADA DI BARIS INI ▼▼▼ */}
      <div className="flex justify-start mb-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FiPlus size={20} />
          <span>Tambah Wali Kamar</span>
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {waliKamarData.map((wali) => (
          <div 
            key={wali.id} 
            className="bg-white p-6 rounded-2xl shadow-sm text-center flex flex-col items-center"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23E5E7EB' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          >
            <img 
              src={wali.avatar}
              alt={`Avatar of ${wali.name}`}
              className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-white"
            />
            <p className="font-bold text-lg text-gray-800">{wali.name}</p>
            <p className="text-sm text-gray-500 mb-2">{wali.role}</p>
            <p className="text-sm text-blue-600 font-medium">{wali.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}