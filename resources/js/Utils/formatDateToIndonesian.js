/**
 * Fungsi untuk memformat tanggal ke dalam format "dd MMMM yyyy"
 * @param {string | Date} dateInput - Tanggal dalam format string atau objek Date
 * @returns {string} Tanggal yang telah diformat dalam format "dd MMMM yyyy" dengan locale Bahasa Indonesia
 */
export function formatDateToIndonesian(dateInput) {
    const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    // Jika dateInput adalah string, pastikan parsing dalam zona waktu lokal
    const date = typeof dateInput === 'string' ? new Date(dateInput.replace('Z', '')) : new Date(dateInput);

    // Pastikan waktu diubah ke lokal tanpa pergeseran tanggal
    const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());

    const day = localDate.getDate();
    const month = monthNames[localDate.getMonth()];
    const year = localDate.getFullYear();

    return `${day} ${month} ${year}`;
}
