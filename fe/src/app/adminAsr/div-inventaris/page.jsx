"use client";

import { FiPlus } from 'react-icons/fi';

// Anda bisa menyesuaikan data ini untuk setiap halaman jika perlu
// Untuk sekarang, kita gunakan data yang sama sebagai placeholder
const dataDummy = [
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
];


export default function CardLayoutPage() {
  return (
    <div>
      <div className="flex justify-start mb-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FiPlus size={20} />
          {/* Anda bisa mengubah teks ini sesuai halaman */}
          <span>Tambah Akun</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataDummy.map((item) => (
          <div 
            key={item.id} 
            className="bg-white p-6 rounded-2xl shadow-sm text-center flex flex-col items-center"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23E5E7EB' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          >
            <img 
              src={item.avatar}
              alt={`Avatar of ${item.name}`}
              className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-white"
            />
            <p className="font-bold text-lg text-gray-800">{item.name}</p>
            <p className="text-sm text-gray-500 mb-2">{item.role}</p>
            <p className="text-sm text-blue-600 font-medium">{item.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}