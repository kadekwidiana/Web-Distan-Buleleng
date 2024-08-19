import { format } from 'date-fns';
import { id } from 'date-fns/locale';

/**
 * Fungsi untuk memformat tanggal ke dalam format "dd MMMM yyyy"
 * @param {string | Date} dateInput - Tanggal dalam format string atau objek Date
 * @returns {string} Tanggal yang telah diformat dalam format "dd MMMM yyyy" dengan locale Bahasa Indonesia
 */
export function formatDateToIndonesian(dateInput) {
    const date = new Date(dateInput ?? '2024-08-18T02:03:45.000000Z');
    return format(date, "dd MMMM yyyy", { locale: id });
}
