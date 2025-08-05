"use client";

import { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FiSave, FiChevronDown, FiCheck } from 'react-icons/fi';

// Data dummy siswa
const initialStudentsData = [
  { id: '0001', name: 'Christine Brooks', status: 'Hadir' },
  { id: '0002', name: 'Rosie Pearson', status: 'Hadir' },
  { id: '0003', name: 'Darrell Caldwell', status: 'Alpa' },
  { id: '0004', name: 'Gilbert Johnston', status: 'Hadir' },
  { id: '0005', name: 'Alan Cain', status: 'Izin' },
  { id: '0006', name: 'Alfred Murray', status: 'Hadir' },
  { id: '0007', name: 'Maggie Sullivan', status: 'Pulang' },
];

const statusOptions = ['Hadir', 'Alpa', 'Izin', 'Pulang'];

// Fungsi untuk mendapatkan kelas warna Tailwind berdasarkan status
const getStatusClasses = (status) => {
  switch (status.toLowerCase()) {
    case 'hadir': return 'bg-green-100 text-green-700';
    case 'alpa': return 'bg-red-100 text-red-700';
    case 'izin': return 'bg-yellow-100 text-yellow-700';
    case 'pulang': return 'bg-blue-100 text-blue-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

// Pastikan baris ini ada dan benar
export default function AbsensiDetailPage() {
  const [students, setStudents] = useState(initialStudentsData);

  const handleStatusChange = (studentId, newStatus) => {
    setStudents(currentStudents =>
      currentStudents.map(student =>
        student.id === studentId ? { ...student, status: newStatus } : student
      )
    );
  };

  return (
    <div>
      {/* Header Halaman */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Kegiatan - <span className="text-gray-900 font-bold">Selasa, 05 Agustus 2025</span> &gt; <span className="text-gray-900 font-bold">Shalat Subuh</span>
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FiSave size={18} />
          <span>Simpan</span>
        </button>
      </div>

      {/* Tabel Absensi */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/50 text-gray-500">
              <tr>
                <th className="p-4 font-medium w-16">NO</th>
                <th className="p-4 font-medium">NAME</th>
                <th className="p-4 font-medium">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {students.map((student, index) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="p-4 text-gray-600">{index + 1}</td>
                  <td className="p-4 font-semibold text-gray-800">{student.name}</td>
                  <td className="p-4">
                    <Listbox value={student.status} onChange={(newStatus) => handleStatusChange(student.id, newStatus)}>
                      <div className="relative w-32">
                        <Listbox.Button className={`relative w-full cursor-default rounded-full py-1.5 pl-3 pr-10 text-left text-xs font-medium focus:outline-none ${getStatusClasses(student.status)}`}>
                          <span className="block truncate">{student.status}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <FiChevronDown className="h-4 w-4" aria-hidden="true" />
                          </span>
                        </Listbox.Button>
                        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                            {statusOptions.map((status, statusIdx) => (
                              <Listbox.Option
                                key={statusIdx}
                                className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${ active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900' }`}
                                value={status}
                              >
                                {({ selected }) => (
                                  <>
                                    <span className={`block truncate ${ selected ? 'font-medium' : 'font-normal' }`}>
                                      {status}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                        <FiCheck className="h-5 w-5" aria-hidden="true" />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}