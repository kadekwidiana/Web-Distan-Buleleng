export const USER_STATUSES = [
    { value: "ACTIVE", label: "Aktif" },
    { value: "INACTIVE", label: "Tidak Aktif" },
    { value: "PENDING", label: "Menunggu" },
    { value: "SUSPENDED", label: "Ditangguhkan" },
    { value: "DELETED", label: "Dihapus" }
];

export const GROUP_STATUSES = [
    { value: "ACTIVE", label: "Aktif" },
    { value: "INACTIVE", label: "Tidak Aktif" },
    { value: "DISBANDED", label: "Dibubarkan" },
    { value: "MERGED", label: "Digabung" },
    { value: "FORMING", label: "Pembentukan" },
    { value: "REORGANIZING", label: "Reorganisasi" }
];

export const ORDER_STATUSES = [
    { value: "NEW", label: "Baru" },
    { value: "PROCESSING", label: "Diproses" },
    { value: "SHIPPED", label: "Dikirim" },
    { value: "DELIVERED", label: "Diterima" },
    { value: "CANCELED", label: "Dibatalkan" },
    { value: "RETURNED", label: "Dikembalikan" }
];

export const PROCESS_STATUSES = [
    { value: "NOT_STARTED", label: "Belum Dimulai" },
    { value: "IN_PROGRESS", label: "Sedang Berlangsung" },
    { value: "COMPLETED", label: "Selesai" },
    { value: "FAILED", label: "Gagal" }
];

export const PAYMENT_STATUSES = [
    { value: "PENDING", label: "Menunggu" },
    { value: "PAID", label: "Dibayar" },
    { value: "FAILED", label: "Gagal" },
    { value: "REFUNDED", label: "Dikembalikan" }
];

export const PROJECT_STATUSES = [
    { value: "INITIATED", label: "Diinisiasi" },
    { value: "PLANNING", label: "Perencanaan" },
    { value: "EXECUTING", label: "Pelaksanaan" },
    { value: "MONITORING", label: "Pemantauan" },
    { value: "CLOSING", label: "Penutupan" }
];

export const CONFIRMATION_STATUSES = [
    { value: "CONFIRMED", label: "Dikonfirmasi" },
    { value: "UNCONFIRMED", label: "Belum Dikonfirmasi" },
    { value: "PENDING", label: "Menunggu" },
    { value: "REJECTED", label: "Ditolak" }
];

export const EMPLOYEE_STATUSES = [
    'PNS',           // Pegawai Negeri Sipil
    'PPPK',          // Pegawai Pemerintah dengan Perjanjian Kerja
    'KONTRAK',       // Pegawai Kontrak
    'HONORER',       // Pegawai Honor
    'OUTSOURCING',   // Pegawai Outsourcing
    'KARYAWAN_TETAP', // Karyawan Tetap
    'KARYAWAN_TIDAK_TETAP', // Karyawan Tidak Tetap
    'MAGANG',         // Pegawai Magang
    'LAINNYA'
];

