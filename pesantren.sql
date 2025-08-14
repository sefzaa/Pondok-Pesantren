-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 14, 2025 at 07:31 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pesantren`
--

-- --------------------------------------------------------

--
-- Table structure for table `absen_kegiatan`
--

CREATE TABLE `absen_kegiatan` (
  `id_absen_kegiatan` int NOT NULL,
  `status` enum('Hadir','Izin','Sakit','Alpa') NOT NULL,
  `tanggal` date DEFAULT NULL,
  `id_santri` int DEFAULT NULL,
  `id_kegiatan` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `asrama`
--

CREATE TABLE `asrama` (
  `id_asrama` int NOT NULL,
  `nama_gedung` varchar(255) NOT NULL,
  `penanggung_jawab` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detail_izin_asrama`
--

CREATE TABLE `detail_izin_asrama` (
  `id_detail_izin_asrama` int NOT NULL,
  `tanggal_awal` datetime NOT NULL,
  `tanggal_akhir` datetime NOT NULL,
  `jam_keluar` time DEFAULT NULL,
  `jam_masuk` time DEFAULT NULL,
  `isApprove_wk` tinyint(1) DEFAULT '0',
  `keterangan` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_izin_asrama` int DEFAULT NULL,
  `id_santri` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detail_kamar`
--

CREATE TABLE `detail_kamar` (
  `id_detail_kamar` int NOT NULL,
  `tahun_ajaran` varchar(255) NOT NULL,
  `id_kamar` int DEFAULT NULL,
  `id_santri` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detail_obat_keluar`
--

CREATE TABLE `detail_obat_keluar` (
  `id_detail_obat_keluar` int NOT NULL,
  `jumlah` int NOT NULL,
  `tanggal` datetime DEFAULT NULL,
  `id_obat` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detail_obat_masuk`
--

CREATE TABLE `detail_obat_masuk` (
  `id_detail_obat_masuk` int NOT NULL,
  `jumlah` int NOT NULL,
  `harga` decimal(10,2) NOT NULL,
  `id_faktur_obat_masuk` int DEFAULT NULL,
  `id_obat` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detail_pelanggaran_asrama`
--

CREATE TABLE `detail_pelanggaran_asrama` (
  `id_detail_pelanggaran` int NOT NULL,
  `tanggal` datetime DEFAULT NULL,
  `pembinaan` text,
  `created_by` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_pelanggaran` int DEFAULT NULL,
  `id_santri` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detail_pelanggaran_dg`
--

CREATE TABLE `detail_pelanggaran_dg` (
  `id_detail_pelanggaran` int NOT NULL,
  `tanggal` datetime DEFAULT NULL,
  `pembinaan` text,
  `created_by` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_pelanggaran` int DEFAULT NULL,
  `id_santri` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detail_perizinan_dg`
--

CREATE TABLE `detail_perizinan_dg` (
  `id_detail_perizinan` int NOT NULL,
  `tanggal_awal` datetime NOT NULL,
  `tanggal_akhir` datetime NOT NULL,
  `isApprove_Pol` tinyint(1) DEFAULT '0',
  `isApprove_Asr` tinyint(1) DEFAULT '0',
  `isApprove_Skl` tinyint(1) DEFAULT '0',
  `keterangan` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_perizinan` int DEFAULT NULL,
  `id_santri` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detail_sakit`
--

CREATE TABLE `detail_sakit` (
  `id_detail_sakit` int NOT NULL,
  `keterangan_wk` text,
  `tanggal` datetime DEFAULT NULL,
  `penanganan` text,
  `isApprove_Pol` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_santri` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detail_tabungan`
--

CREATE TABLE `detail_tabungan` (
  `id_detail_tabungan` int NOT NULL,
  `jenis` enum('debit','kredit') NOT NULL,
  `jumlah` decimal(10,2) NOT NULL,
  `saldo_akhir` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_tabungan` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `detail_ukt`
--

CREATE TABLE `detail_ukt` (
  `id_detail_ukt` int NOT NULL,
  `tanggal` datetime DEFAULT NULL,
  `createdby` varchar(255) DEFAULT NULL,
  `via` varchar(255) DEFAULT NULL,
  `id_ukt` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faktur_obat_masuk`
--

CREATE TABLE `faktur_obat_masuk` (
  `id_faktur_obat_masuk` int NOT NULL,
  `no_faktur` varchar(255) DEFAULT NULL,
  `tanggal_masuk` date NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hafalan`
--

CREATE TABLE `hafalan` (
  `id_hafalan` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `keterangan` text,
  `tanggal` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_santri` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `izin_asrama`
--

CREATE TABLE `izin_asrama` (
  `id_izin_asrama` int NOT NULL,
  `jenis` enum('pulang','harian','mingguan','semester') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jadwal_rutin`
--

CREATE TABLE `jadwal_rutin` (
  `id_jadwal_rutin` int NOT NULL,
  `name` varchar(255) NOT NULL COMMENT 'Nama kegiatan rutin, contoh: Shalat Subuh.',
  `repetitionType` enum('harian','mingguan','bulanan') NOT NULL COMMENT 'Jenis pengulangan jadwal.',
  `time` time DEFAULT NULL COMMENT 'Waktu pelaksanaan, terutama untuk jenis harian.',
  `days` json DEFAULT NULL COMMENT 'Hari pelaksanaan untuk jenis mingguan.',
  `dates` json DEFAULT NULL COMMENT 'Tanggal pelaksanaan untuk jenis bulanan.',
  `icon` varchar(255) DEFAULT 'FiClipboard',
  `iconBg` varchar(255) DEFAULT 'bg-gray-100',
  `iconColor` varchar(255) DEFAULT 'text-gray-600',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `jadwal_rutin`
--

INSERT INTO `jadwal_rutin` (`id_jadwal_rutin`, `name`, `repetitionType`, `time`, `days`, `dates`, `icon`, `iconBg`, `iconColor`, `createdAt`, `updatedAt`) VALUES
(1, 'Shalat Subuh', 'harian', '05:10:00', '[]', '[]', 'FiClipboard', 'bg-gray-100', 'text-gray-600', '2025-08-12 05:47:56', '2025-08-12 05:47:56'),
(2, 'Taklim Alquran', 'mingguan', NULL, '[\"Senin\", \"Jumat\"]', '[]', 'FiClipboard', 'bg-gray-100', 'text-gray-600', '2025-08-12 05:48:33', '2025-08-12 05:48:33'),
(3, 'Evaluasi', 'bulanan', NULL, '[]', '[4, 6]', 'FiClipboard', 'bg-gray-100', 'text-gray-600', '2025-08-12 05:49:05', '2025-08-12 05:49:05');

-- --------------------------------------------------------

--
-- Table structure for table `kamar`
--

CREATE TABLE `kamar` (
  `id_kamar` int NOT NULL,
  `nomor_kamar` varchar(255) NOT NULL,
  `kapasitas` int NOT NULL,
  `id_asrama` int DEFAULT NULL,
  `id_wali_kamar` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kegiatan`
--

CREATE TABLE `kegiatan` (
  `id_kegiatan` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jenis` enum('rutin','tambahan') DEFAULT NULL,
  `tanggal` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `kegiatan`
--

INSERT INTO `kegiatan` (`id_kegiatan`, `nama`, `jenis`, `tanggal`) VALUES
(1, 'Seminar Kepemimpinan 2', 'tambahan', '2025-08-28 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `id_kelas` int NOT NULL,
  `nama_kelas` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `obat`
--

CREATE TABLE `obat` (
  `id_obat` int NOT NULL,
  `kode_obat` varchar(255) DEFAULT NULL,
  `nama_obat` varchar(255) NOT NULL,
  `stok_minimum` int DEFAULT '0',
  `stok_sekarang` int DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ortu`
--

CREATE TABLE `ortu` (
  `id_ortu` int NOT NULL,
  `nama_ortu_lk` varchar(255) DEFAULT NULL,
  `nama_ortu_pr` varchar(255) DEFAULT NULL,
  `pekerjaan_lk` varchar(255) DEFAULT NULL,
  `pekerjaan_pr` varchar(255) DEFAULT NULL,
  `no_telp` varchar(255) DEFAULT NULL,
  `alamat` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_user` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pelanggaran_asrama`
--

CREATE TABLE `pelanggaran_asrama` (
  `id_pelanggaran` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jenis` varchar(255) DEFAULT NULL,
  `bobot` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pelanggaran_dg`
--

CREATE TABLE `pelanggaran_dg` (
  `id_pelanggaran` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jenis` varchar(255) DEFAULT NULL,
  `bobot` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `perizinan_dg`
--

CREATE TABLE `perizinan_dg` (
  `id_perizinan` int NOT NULL,
  `jenis` enum('sakit','pulang','izin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prestasi`
--

CREATE TABLE `prestasi` (
  `id_prestasi` int NOT NULL,
  `prestasi` text NOT NULL,
  `tanggal` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_santri` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id_role` int NOT NULL,
  `nama_role` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `santri`
--

CREATE TABLE `santri` (
  `id_santri` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `tempat_lahir` varchar(255) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') DEFAULT NULL,
  `alamat` text,
  `tahun_masuk` varchar(4) DEFAULT NULL,
  `status_aktif` tinyint(1) DEFAULT '1',
  `foto` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_kelas` int DEFAULT NULL,
  `id_ortu` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `surah`
--

CREATE TABLE `surah` (
  `id_surah` int NOT NULL,
  `nama` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tabungan`
--

CREATE TABLE `tabungan` (
  `id_tabungan` int NOT NULL,
  `saldo` decimal(10,2) DEFAULT '0.00',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_santri` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tahfidz`
--

CREATE TABLE `tahfidz` (
  `id_tahfidz` int NOT NULL,
  `ayat` varchar(255) NOT NULL,
  `tanggal` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_santri` int DEFAULT NULL,
  `id_surah` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ukt`
--

CREATE TABLE `ukt` (
  `id_ukt` int NOT NULL,
  `bulan` varchar(255) NOT NULL,
  `tahun` varchar(4) NOT NULL,
  `jumlah` decimal(10,2) NOT NULL,
  `status` enum('Lunas','Belum Lunas') DEFAULT 'Belum Lunas',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_santri` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `id_user` int NOT NULL,
  `id_role` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wali_kamar`
--

CREATE TABLE `wali_kamar` (
  `id_wali_kamar` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `tempat_lahir` varchar(255) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan') DEFAULT NULL,
  `alamat` text,
  `tahun_masuk` varchar(4) DEFAULT NULL,
  `no_telp` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_user` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `absen_kegiatan`
--
ALTER TABLE `absen_kegiatan`
  ADD PRIMARY KEY (`id_absen_kegiatan`),
  ADD UNIQUE KEY `absen_kegiatan_id_kegiatan_id_santri_unique` (`id_santri`,`id_kegiatan`),
  ADD KEY `id_kegiatan` (`id_kegiatan`);

--
-- Indexes for table `asrama`
--
ALTER TABLE `asrama`
  ADD PRIMARY KEY (`id_asrama`);

--
-- Indexes for table `detail_izin_asrama`
--
ALTER TABLE `detail_izin_asrama`
  ADD PRIMARY KEY (`id_detail_izin_asrama`),
  ADD UNIQUE KEY `detail_izin_asrama_id_santri_id_izin_asrama_unique` (`id_izin_asrama`,`id_santri`),
  ADD KEY `id_santri` (`id_santri`);

--
-- Indexes for table `detail_kamar`
--
ALTER TABLE `detail_kamar`
  ADD PRIMARY KEY (`id_detail_kamar`),
  ADD UNIQUE KEY `detail_kamar_id_santri_id_kamar_unique` (`id_kamar`,`id_santri`),
  ADD KEY `id_santri` (`id_santri`);

--
-- Indexes for table `detail_obat_keluar`
--
ALTER TABLE `detail_obat_keluar`
  ADD PRIMARY KEY (`id_detail_obat_keluar`),
  ADD KEY `id_obat` (`id_obat`);

--
-- Indexes for table `detail_obat_masuk`
--
ALTER TABLE `detail_obat_masuk`
  ADD PRIMARY KEY (`id_detail_obat_masuk`),
  ADD UNIQUE KEY `detail_obat_masuk_id_obat_id_faktur_obat_masuk_unique` (`id_faktur_obat_masuk`,`id_obat`),
  ADD KEY `id_obat` (`id_obat`);

--
-- Indexes for table `detail_pelanggaran_asrama`
--
ALTER TABLE `detail_pelanggaran_asrama`
  ADD PRIMARY KEY (`id_detail_pelanggaran`),
  ADD UNIQUE KEY `detail_pelanggaran_asrama_id_santri_id_pelanggaran_unique` (`id_pelanggaran`,`id_santri`),
  ADD KEY `id_santri` (`id_santri`);

--
-- Indexes for table `detail_pelanggaran_dg`
--
ALTER TABLE `detail_pelanggaran_dg`
  ADD PRIMARY KEY (`id_detail_pelanggaran`),
  ADD UNIQUE KEY `detail_pelanggaran_dg_id_santri_id_pelanggaran_unique` (`id_pelanggaran`,`id_santri`),
  ADD KEY `id_santri` (`id_santri`);

--
-- Indexes for table `detail_perizinan_dg`
--
ALTER TABLE `detail_perizinan_dg`
  ADD PRIMARY KEY (`id_detail_perizinan`),
  ADD UNIQUE KEY `detail_perizinan_dg_id_santri_id_perizinan_unique` (`id_perizinan`,`id_santri`),
  ADD KEY `id_santri` (`id_santri`);

--
-- Indexes for table `detail_sakit`
--
ALTER TABLE `detail_sakit`
  ADD PRIMARY KEY (`id_detail_sakit`),
  ADD KEY `id_santri` (`id_santri`);

--
-- Indexes for table `detail_tabungan`
--
ALTER TABLE `detail_tabungan`
  ADD PRIMARY KEY (`id_detail_tabungan`),
  ADD KEY `id_tabungan` (`id_tabungan`);

--
-- Indexes for table `detail_ukt`
--
ALTER TABLE `detail_ukt`
  ADD PRIMARY KEY (`id_detail_ukt`),
  ADD KEY `id_ukt` (`id_ukt`);

--
-- Indexes for table `faktur_obat_masuk`
--
ALTER TABLE `faktur_obat_masuk`
  ADD PRIMARY KEY (`id_faktur_obat_masuk`),
  ADD UNIQUE KEY `no_faktur` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_2` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_3` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_4` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_5` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_6` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_7` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_8` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_9` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_10` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_11` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_12` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_13` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_14` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_15` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_16` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_17` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_18` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_19` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_20` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_21` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_22` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_23` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_24` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_25` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_26` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_27` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_28` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_29` (`no_faktur`),
  ADD UNIQUE KEY `no_faktur_30` (`no_faktur`);

--
-- Indexes for table `hafalan`
--
ALTER TABLE `hafalan`
  ADD PRIMARY KEY (`id_hafalan`),
  ADD KEY `id_santri` (`id_santri`);

--
-- Indexes for table `izin_asrama`
--
ALTER TABLE `izin_asrama`
  ADD PRIMARY KEY (`id_izin_asrama`);

--
-- Indexes for table `jadwal_rutin`
--
ALTER TABLE `jadwal_rutin`
  ADD PRIMARY KEY (`id_jadwal_rutin`);

--
-- Indexes for table `kamar`
--
ALTER TABLE `kamar`
  ADD PRIMARY KEY (`id_kamar`),
  ADD KEY `id_asrama` (`id_asrama`),
  ADD KEY `id_wali_kamar` (`id_wali_kamar`);

--
-- Indexes for table `kegiatan`
--
ALTER TABLE `kegiatan`
  ADD PRIMARY KEY (`id_kegiatan`);

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id_kelas`),
  ADD UNIQUE KEY `nama_kelas` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_2` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_3` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_4` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_5` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_6` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_7` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_8` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_9` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_10` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_11` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_12` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_13` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_14` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_15` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_16` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_17` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_18` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_19` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_20` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_21` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_22` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_23` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_24` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_25` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_26` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_27` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_28` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_29` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_30` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_31` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_32` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_33` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_34` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_35` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_36` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_37` (`nama_kelas`),
  ADD UNIQUE KEY `nama_kelas_38` (`nama_kelas`);

--
-- Indexes for table `obat`
--
ALTER TABLE `obat`
  ADD PRIMARY KEY (`id_obat`),
  ADD UNIQUE KEY `kode_obat` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_2` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_3` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_4` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_5` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_6` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_7` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_8` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_9` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_10` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_11` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_12` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_13` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_14` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_15` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_16` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_17` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_18` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_19` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_20` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_21` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_22` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_23` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_24` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_25` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_26` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_27` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_28` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_29` (`kode_obat`),
  ADD UNIQUE KEY `kode_obat_30` (`kode_obat`);

--
-- Indexes for table `ortu`
--
ALTER TABLE `ortu`
  ADD PRIMARY KEY (`id_ortu`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `pelanggaran_asrama`
--
ALTER TABLE `pelanggaran_asrama`
  ADD PRIMARY KEY (`id_pelanggaran`);

--
-- Indexes for table `pelanggaran_dg`
--
ALTER TABLE `pelanggaran_dg`
  ADD PRIMARY KEY (`id_pelanggaran`);

--
-- Indexes for table `perizinan_dg`
--
ALTER TABLE `perizinan_dg`
  ADD PRIMARY KEY (`id_perizinan`);

--
-- Indexes for table `prestasi`
--
ALTER TABLE `prestasi`
  ADD PRIMARY KEY (`id_prestasi`),
  ADD KEY `id_santri` (`id_santri`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_role`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD UNIQUE KEY `slug_2` (`slug`),
  ADD UNIQUE KEY `slug_3` (`slug`),
  ADD UNIQUE KEY `slug_4` (`slug`),
  ADD UNIQUE KEY `slug_5` (`slug`),
  ADD UNIQUE KEY `slug_6` (`slug`),
  ADD UNIQUE KEY `slug_7` (`slug`),
  ADD UNIQUE KEY `slug_8` (`slug`),
  ADD UNIQUE KEY `slug_9` (`slug`),
  ADD UNIQUE KEY `slug_10` (`slug`),
  ADD UNIQUE KEY `slug_11` (`slug`),
  ADD UNIQUE KEY `slug_12` (`slug`),
  ADD UNIQUE KEY `slug_13` (`slug`),
  ADD UNIQUE KEY `slug_14` (`slug`),
  ADD UNIQUE KEY `slug_15` (`slug`),
  ADD UNIQUE KEY `slug_16` (`slug`),
  ADD UNIQUE KEY `slug_17` (`slug`),
  ADD UNIQUE KEY `slug_18` (`slug`),
  ADD UNIQUE KEY `slug_19` (`slug`),
  ADD UNIQUE KEY `slug_20` (`slug`),
  ADD UNIQUE KEY `slug_21` (`slug`),
  ADD UNIQUE KEY `slug_22` (`slug`),
  ADD UNIQUE KEY `slug_23` (`slug`),
  ADD UNIQUE KEY `slug_24` (`slug`);

--
-- Indexes for table `santri`
--
ALTER TABLE `santri`
  ADD PRIMARY KEY (`id_santri`),
  ADD KEY `id_kelas` (`id_kelas`),
  ADD KEY `id_ortu` (`id_ortu`);

--
-- Indexes for table `surah`
--
ALTER TABLE `surah`
  ADD PRIMARY KEY (`id_surah`),
  ADD UNIQUE KEY `nama` (`nama`),
  ADD UNIQUE KEY `nama_2` (`nama`),
  ADD UNIQUE KEY `nama_3` (`nama`),
  ADD UNIQUE KEY `nama_4` (`nama`),
  ADD UNIQUE KEY `nama_5` (`nama`),
  ADD UNIQUE KEY `nama_6` (`nama`),
  ADD UNIQUE KEY `nama_7` (`nama`),
  ADD UNIQUE KEY `nama_8` (`nama`),
  ADD UNIQUE KEY `nama_9` (`nama`),
  ADD UNIQUE KEY `nama_10` (`nama`),
  ADD UNIQUE KEY `nama_11` (`nama`),
  ADD UNIQUE KEY `nama_12` (`nama`),
  ADD UNIQUE KEY `nama_13` (`nama`),
  ADD UNIQUE KEY `nama_14` (`nama`),
  ADD UNIQUE KEY `nama_15` (`nama`),
  ADD UNIQUE KEY `nama_16` (`nama`),
  ADD UNIQUE KEY `nama_17` (`nama`),
  ADD UNIQUE KEY `nama_18` (`nama`),
  ADD UNIQUE KEY `nama_19` (`nama`),
  ADD UNIQUE KEY `nama_20` (`nama`),
  ADD UNIQUE KEY `nama_21` (`nama`),
  ADD UNIQUE KEY `nama_22` (`nama`),
  ADD UNIQUE KEY `nama_23` (`nama`),
  ADD UNIQUE KEY `nama_24` (`nama`);

--
-- Indexes for table `tabungan`
--
ALTER TABLE `tabungan`
  ADD PRIMARY KEY (`id_tabungan`),
  ADD KEY `id_santri` (`id_santri`);

--
-- Indexes for table `tahfidz`
--
ALTER TABLE `tahfidz`
  ADD PRIMARY KEY (`id_tahfidz`),
  ADD UNIQUE KEY `tahfidz_id_surah_id_santri_unique` (`id_santri`,`id_surah`),
  ADD KEY `id_surah` (`id_surah`);

--
-- Indexes for table `ukt`
--
ALTER TABLE `ukt`
  ADD PRIMARY KEY (`id_ukt`),
  ADD KEY `id_santri` (`id_santri`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username_20` (`username`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `username_21` (`username`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `username_22` (`username`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `username_23` (`username`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `username_24` (`username`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `username_25` (`username`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `username_26` (`username`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `username_27` (`username`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `username_28` (`username`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `username_29` (`username`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `username_30` (`username`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `username_31` (`username`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `username_32` (`username`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `username_3` (`username`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `username_4` (`username`),
  ADD UNIQUE KEY `email_4` (`email`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id_user`,`id_role`),
  ADD KEY `id_role` (`id_role`);

--
-- Indexes for table `wali_kamar`
--
ALTER TABLE `wali_kamar`
  ADD PRIMARY KEY (`id_wali_kamar`),
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `absen_kegiatan`
--
ALTER TABLE `absen_kegiatan`
  MODIFY `id_absen_kegiatan` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asrama`
--
ALTER TABLE `asrama`
  MODIFY `id_asrama` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_izin_asrama`
--
ALTER TABLE `detail_izin_asrama`
  MODIFY `id_detail_izin_asrama` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_kamar`
--
ALTER TABLE `detail_kamar`
  MODIFY `id_detail_kamar` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_obat_keluar`
--
ALTER TABLE `detail_obat_keluar`
  MODIFY `id_detail_obat_keluar` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_obat_masuk`
--
ALTER TABLE `detail_obat_masuk`
  MODIFY `id_detail_obat_masuk` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_pelanggaran_asrama`
--
ALTER TABLE `detail_pelanggaran_asrama`
  MODIFY `id_detail_pelanggaran` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_pelanggaran_dg`
--
ALTER TABLE `detail_pelanggaran_dg`
  MODIFY `id_detail_pelanggaran` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_perizinan_dg`
--
ALTER TABLE `detail_perizinan_dg`
  MODIFY `id_detail_perizinan` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_sakit`
--
ALTER TABLE `detail_sakit`
  MODIFY `id_detail_sakit` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_tabungan`
--
ALTER TABLE `detail_tabungan`
  MODIFY `id_detail_tabungan` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detail_ukt`
--
ALTER TABLE `detail_ukt`
  MODIFY `id_detail_ukt` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faktur_obat_masuk`
--
ALTER TABLE `faktur_obat_masuk`
  MODIFY `id_faktur_obat_masuk` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hafalan`
--
ALTER TABLE `hafalan`
  MODIFY `id_hafalan` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `izin_asrama`
--
ALTER TABLE `izin_asrama`
  MODIFY `id_izin_asrama` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jadwal_rutin`
--
ALTER TABLE `jadwal_rutin`
  MODIFY `id_jadwal_rutin` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `kamar`
--
ALTER TABLE `kamar`
  MODIFY `id_kamar` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kegiatan`
--
ALTER TABLE `kegiatan`
  MODIFY `id_kegiatan` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id_kelas` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `obat`
--
ALTER TABLE `obat`
  MODIFY `id_obat` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ortu`
--
ALTER TABLE `ortu`
  MODIFY `id_ortu` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pelanggaran_asrama`
--
ALTER TABLE `pelanggaran_asrama`
  MODIFY `id_pelanggaran` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pelanggaran_dg`
--
ALTER TABLE `pelanggaran_dg`
  MODIFY `id_pelanggaran` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `perizinan_dg`
--
ALTER TABLE `perizinan_dg`
  MODIFY `id_perizinan` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prestasi`
--
ALTER TABLE `prestasi`
  MODIFY `id_prestasi` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id_role` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `santri`
--
ALTER TABLE `santri`
  MODIFY `id_santri` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `surah`
--
ALTER TABLE `surah`
  MODIFY `id_surah` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tabungan`
--
ALTER TABLE `tabungan`
  MODIFY `id_tabungan` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tahfidz`
--
ALTER TABLE `tahfidz`
  MODIFY `id_tahfidz` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ukt`
--
ALTER TABLE `ukt`
  MODIFY `id_ukt` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wali_kamar`
--
ALTER TABLE `wali_kamar`
  MODIFY `id_wali_kamar` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `absen_kegiatan`
--
ALTER TABLE `absen_kegiatan`
  ADD CONSTRAINT `absen_kegiatan_ibfk_5` FOREIGN KEY (`id_santri`) REFERENCES `santri` (`id_santri`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `absen_kegiatan_ibfk_6` FOREIGN KEY (`id_kegiatan`) REFERENCES `kegiatan` (`id_kegiatan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detail_izin_asrama`
--
ALTER TABLE `detail_izin_asrama`
  ADD CONSTRAINT `detail_izin_asrama_ibfk_59` FOREIGN KEY (`id_izin_asrama`) REFERENCES `izin_asrama` (`id_izin_asrama`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_izin_asrama_ibfk_60` FOREIGN KEY (`id_santri`) REFERENCES `santri` (`id_santri`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detail_kamar`
--
ALTER TABLE `detail_kamar`
  ADD CONSTRAINT `detail_kamar_ibfk_59` FOREIGN KEY (`id_kamar`) REFERENCES `kamar` (`id_kamar`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_kamar_ibfk_60` FOREIGN KEY (`id_santri`) REFERENCES `santri` (`id_santri`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detail_obat_keluar`
--
ALTER TABLE `detail_obat_keluar`
  ADD CONSTRAINT `detail_obat_keluar_ibfk_1` FOREIGN KEY (`id_obat`) REFERENCES `obat` (`id_obat`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `detail_obat_masuk`
--
ALTER TABLE `detail_obat_masuk`
  ADD CONSTRAINT `detail_obat_masuk_ibfk_57` FOREIGN KEY (`id_faktur_obat_masuk`) REFERENCES `faktur_obat_masuk` (`id_faktur_obat_masuk`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_obat_masuk_ibfk_58` FOREIGN KEY (`id_obat`) REFERENCES `obat` (`id_obat`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detail_pelanggaran_asrama`
--
ALTER TABLE `detail_pelanggaran_asrama`
  ADD CONSTRAINT `detail_pelanggaran_asrama_ibfk_57` FOREIGN KEY (`id_pelanggaran`) REFERENCES `pelanggaran_asrama` (`id_pelanggaran`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_pelanggaran_asrama_ibfk_58` FOREIGN KEY (`id_santri`) REFERENCES `santri` (`id_santri`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detail_pelanggaran_dg`
--
ALTER TABLE `detail_pelanggaran_dg`
  ADD CONSTRAINT `detail_pelanggaran_dg_ibfk_57` FOREIGN KEY (`id_pelanggaran`) REFERENCES `pelanggaran_dg` (`id_pelanggaran`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_pelanggaran_dg_ibfk_58` FOREIGN KEY (`id_santri`) REFERENCES `santri` (`id_santri`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detail_perizinan_dg`
--
ALTER TABLE `detail_perizinan_dg`
  ADD CONSTRAINT `detail_perizinan_dg_ibfk_53` FOREIGN KEY (`id_perizinan`) REFERENCES `perizinan_dg` (`id_perizinan`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_perizinan_dg_ibfk_54` FOREIGN KEY (`id_santri`) REFERENCES `santri` (`id_santri`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detail_sakit`
--
ALTER TABLE `detail_sakit`
  ADD CONSTRAINT `detail_sakit_ibfk_1` FOREIGN KEY (`id_santri`) REFERENCES `santri` (`id_santri`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `detail_tabungan`
--
ALTER TABLE `detail_tabungan`
  ADD CONSTRAINT `detail_tabungan_ibfk_1` FOREIGN KEY (`id_tabungan`) REFERENCES `tabungan` (`id_tabungan`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `detail_ukt`
--
ALTER TABLE `detail_ukt`
  ADD CONSTRAINT `detail_ukt_ibfk_1` FOREIGN KEY (`id_ukt`) REFERENCES `ukt` (`id_ukt`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `hafalan`
--
ALTER TABLE `hafalan`
  ADD CONSTRAINT `hafalan_ibfk_1` FOREIGN KEY (`id_santri`) REFERENCES `santri` (`id_santri`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `kamar`
--
ALTER TABLE `kamar`
  ADD CONSTRAINT `kamar_ibfk_59` FOREIGN KEY (`id_asrama`) REFERENCES `asrama` (`id_asrama`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `kamar_ibfk_60` FOREIGN KEY (`id_wali_kamar`) REFERENCES `wali_kamar` (`id_wali_kamar`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `ortu`
--
ALTER TABLE `ortu`
  ADD CONSTRAINT `ortu_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `prestasi`
--
ALTER TABLE `prestasi`
  ADD CONSTRAINT `prestasi_ibfk_1` FOREIGN KEY (`id_santri`) REFERENCES `santri` (`id_santri`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `santri`
--
ALTER TABLE `santri`
  ADD CONSTRAINT `santri_ibfk_67` FOREIGN KEY (`id_kelas`) REFERENCES `kelas` (`id_kelas`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `santri_ibfk_68` FOREIGN KEY (`id_ortu`) REFERENCES `ortu` (`id_ortu`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tabungan`
--
ALTER TABLE `tabungan`
  ADD CONSTRAINT `tabungan_ibfk_1` FOREIGN KEY (`id_santri`) REFERENCES `santri` (`id_santri`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tahfidz`
--
ALTER TABLE `tahfidz`
  ADD CONSTRAINT `tahfidz_ibfk_47` FOREIGN KEY (`id_santri`) REFERENCES `santri` (`id_santri`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tahfidz_ibfk_48` FOREIGN KEY (`id_surah`) REFERENCES `surah` (`id_surah`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ukt`
--
ALTER TABLE `ukt`
  ADD CONSTRAINT `ukt_ibfk_1` FOREIGN KEY (`id_santri`) REFERENCES `santri` (`id_santri`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_role`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wali_kamar`
--
ALTER TABLE `wali_kamar`
  ADD CONSTRAINT `wali_kamar_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
