import { formatDateToIndonesian } from '@/Utils/formatDateToIndonesian';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import plugin for auto table
import { useState } from 'react';
import Swal from 'sweetalert2';
export default function useExportPdfOutreachActivity(outreachActivity) {
    Swal.fire({
        title: 'Masukkan Nama File',
        input: 'text',
        inputLabel: 'Nama File',
        inputPlaceholder: 'Laporan Kegiatan Penyuluhan',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'Export',
        cancelButtonText: 'Batal',
        inputValidator: (value) => {
            if (!value) {
                return 'Nama file tidak boleh kosong!';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const doc = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' size
            const marginLeft = 20; // 2 cm margin (20 mm)
            const marginRight = 20; // 2 cm margin on the right as well
            const pageWidth = doc.internal.pageSize.getWidth();
            const maxWidth = pageWidth - marginLeft - marginRight;

            // Add logo
            doc.addImage('/assets/images/logo-distan-buleleng-1.png', 'PNG', marginLeft, 5, 40, 40); // Adjust x position for 2 cm margin

            // Title and headers
            doc.setFontSize(18);
            doc.setFont("helvetica", "bold").text('Laporan Kegiatan Penyuluhan', marginLeft + 40, 15); // Adjust x position for 2 cm margin
            doc.setFontSize(13);
            doc.setFont("helvetica", "normal").text(`Penyuluh: ${outreachActivity?.ppl?.front_title ?? ''} ${outreachActivity.ppl.name} ${outreachActivity?.ppl?.back_title ?? ''}`, marginLeft + 40, 22); // Adjust x position for 2 cm margin
            doc.setFont("helvetica", "normal").text(`Tanggal Input Kegiatan: ${formatDateToIndonesian(outreachActivity.created_at)}`, marginLeft + 40, 28); // Adjust x position for 2 cm margin

            // Draw horizontal line above table
            const lineY = 46;
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(0.50);
            doc.line(marginLeft, lineY, pageWidth - marginRight, lineY); // Draw line with 2 cm margin
            doc.line(marginLeft, lineY + 1, pageWidth - marginRight, lineY + 1); // Draw second line

            let currentY = 55; // Start position after the line

            // Function to handle text dimensions and printing
            const printTextSection = (title, text) => {
                doc.setFont("helvetica", "bold").text(title, marginLeft, currentY);
                currentY += 5;

                if (text) {
                    const dimensions = doc.getTextDimensions(text, { maxWidth });
                    doc.setFont("helvetica", "normal").text(text, marginLeft, currentY, { maxWidth });
                    currentY += dimensions.h + 3;
                } else {
                    // Handle empty text
                    const emptyDimensions = doc.getTextDimensions('-', { maxWidth });
                    doc.setFont("helvetica", "normal").text('-', marginLeft, currentY, { maxWidth });
                    currentY += emptyDimensions.h + 3;
                }
            };

            // Print each section
            printTextSection("Judul:", outreachActivity?.title);
            printTextSection("Alamat/Lokasi:", outreachActivity?.address);
            printTextSection("Catatan:", outreachActivity?.notes);
            printTextSection("Laporan Kegiatan:", outreachActivity?.activity_report);

            // "Gapoktan yang Terlibat" section
            const gapoktanText = outreachActivity.gapoktan_outreach_activities.length > 0
                ? outreachActivity.gapoktan_outreach_activities.map((data) => data.name).join(', ')
                : undefined; // Set to undefined if no data
            printTextSection("Gapoktan yang Terlibat:", gapoktanText);

            // "Poktan yang Terlibat" section
            const poktanText = outreachActivity.poktan_outreach_activities.length > 0
                ? outreachActivity.poktan_outreach_activities.map((data) => data.name).join(', ')
                : undefined; // Set to undefined if no data
            printTextSection("Poktan yang Terlibat:", poktanText);

            // "Subak yang Terlibat" section
            const subakText = outreachActivity.subak_outreach_activities.length > 0
                ? outreachActivity.subak_outreach_activities.map((data) => data.name).join(', ')
                : undefined; // Set to undefined if no data
            printTextSection("Subak yang Terlibat:", subakText);

            // "Pihak Lainnya yang Terlibat" section
            const othersText = outreachActivity?.others_involved;
            printTextSection("Pihak Lainnya yang Terlibat:", othersText);

            // New page for foto dokumentasi
            doc.addPage();
            // Centered "Foto Dokumentasi" section
            const pageMiddle = pageWidth / 2;
            doc.setFont("helvetica", "bold").setFontSize(16).text('Foto Dokumentasi Kegiatan', pageMiddle, 20, { align: 'center' });

            // Array of photo URLs
            let photos = [];
            try {
                photos = JSON.parse(outreachActivity.photo) || [];
            } catch (e) {
                photos = [];
            }

            // Loop through each photo and add it to the PDF
            let imageY = 30; // Start position for images
            photos.forEach((url) => {
                const isOverflowing = imageY + 60 > doc.internal.pageSize.height - marginRight;

                if (isOverflowing) {
                    doc.addPage(); // Add a new page if overflowing
                    imageY = 30; // Reset Y position for new page
                }

                doc.addImage(url, 'JPEG', marginLeft, imageY, maxWidth, 110); // Adjust width and height as needed
                imageY += 120; // Add spacing after each image
            });

            // Footer section
            const footerY = doc.internal.pageSize.height - 10;
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal").text(`Singaraja, ${formatDateToIndonesian(new Date().toLocaleDateString())}`, doc.internal.pageSize.width - marginRight, footerY, { align: 'right' });
            doc.text(`${outreachActivity?.ppl?.front_title ?? ''} ${outreachActivity.ppl.name} ${outreachActivity?.ppl?.back_title ?? ''} | Dinas Pertanian Kabupaten Buleleng`, doc.internal.pageSize.width - marginRight, footerY + 5, { align: 'right' });

            // Save the PDF with the entered file name
            doc.save(`${result.value}.pdf`);
        }
    });
}
