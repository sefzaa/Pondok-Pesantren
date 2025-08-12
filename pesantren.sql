--
-- Database: `pesantren`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `absen_kegiatan`
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
-- Struktur dari tabel `asrama`
--

CREATE TABLE `asrama` (
  `id_asrama` int NOT NULL,
  `nama_gedung` varchar(255) NOT NULL,
  `penanggung_jawab` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_izin_asrama`
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
-- Struktur dari tabel `detail_kamar`
--

CREATE TABLE `detail_kamar` (
  `id_detail_kamar` int NOT NULL,
  `tahun_ajaran` varchar(255) NOT NULL,
  `id_kamar` int DEFAULT NULL,
  `id_santri` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_obat_keluar`
--

CREATE TABLE `detail_obat_keluar` (
  `id_detail_obat_keluar` int NOT NULL,
  `jumlah` int NOT NULL,
  `tanggal` datetime DEFAULT NULL,
  `id_obat` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_obat_masuk`
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
-- Struktur dari tabel `detail_pelanggaran_asrama`
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
-- Struktur dari tabel `detail_pelanggaran_dg`
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
-- Struktur dari tabel `detail_perizinan_dg`
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
-- Struktur dari tabel `detail_sakit`
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
-- Struktur dari tabel `detail_tabungan`
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
-- Struktur dari tabel `detail_ukt`
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
-- Struktur dari tabel `faktur_obat_masuk`
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
-- Struktur dari tabel `hafalan`
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
-- Struktur dari tabel `izin_asrama`
--

CREATE TABLE `izin_asrama` (
  `id_izin_asrama` int NOT NULL,
  `jenis` enum('pulang','harian','mingguan','semester') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kamar`
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
-- Struktur dari tabel `kegiatan`
--

CREATE TABLE `kegiatan` (
  `id_kegiatan` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jenis` varchar(255) DEFAULT NULL,
  `tanggal` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `kelas`
--

CREATE TABLE `kelas` (
  `id_kelas` int NOT NULL,
  `nama_kelas` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `obat`
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
-- Struktur dari tabel `ortu`
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
-- Struktur dari tabel `pelanggaran_asrama`
--

CREATE TABLE `pelanggaran_asrama` (
  `id_pelanggaran` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jenis` varchar(255) DEFAULT NULL,
  `bobot` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pelanggaran_dg`
--

CREATE TABLE `pelanggaran_dg` (
  `id_pelanggaran` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jenis` varchar(255) DEFAULT NULL,
  `bobot` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `perizinan_dg`
--

CREATE TABLE `perizinan_dg` (
  `id_perizinan` int NOT NULL,
  `jenis` enum('sakit','pulang','izin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `prestasi`
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
-- Struktur dari tabel `roles`
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
-- Struktur dari tabel `santri`
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
-- Struktur dari tabel `surah`
--

CREATE TABLE `surah` (
  `id_surah` int NOT NULL,
  `nama` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tabungan`
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
-- Struktur dari tabel `tahfidz`
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
-- Struktur dari tabel `ukt`
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
-- Struktur dari tabel `users`
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
-- Struktur dari tabel `user_roles`
--

CREATE TABLE `user_roles` (
  `id_user` int NOT NULL,
  `id_role` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `wali_kamar`
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

