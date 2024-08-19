/**
 * Fungsi untuk mendapatkan nama bulan dalam Bahasa Indonesia
 * @param {number} month - Bulan dalam bentuk angka (1-12)
 * @returns {string} Nama bulan dalam Bahasa Indonesia
 */
function getMonthName(month) {
    const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return monthNames[month - 1];
}

/**
 * Fungsi untuk mengonversi data komoditas menjadi string HTML
 * @param {Array} commodities - Array objek yang berisi nama komoditas dan bulan
 * @returns {string} String HTML yang menampilkan siklus komoditas dan nama bulan
 */
export function generateCommoditiesCycleHtml(commodities) {
    let htmlString = '<br />';

    commodities.forEach((item, index) => {
        // Mengonversi bulan menjadi nama bulan
        const monthNamesString = item.months.map(getMonthName).join(', ');

        // Menambahkan ke string HTML
        htmlString += `<span">${item.name}</span>: ${monthNamesString ?? '-'}`;

        // Tambahkan <br /> jika ini bukan item terakhir
        if (index < commodities.length - 1) {
            htmlString += '<br />';
        }
    });

    return htmlString;
}
