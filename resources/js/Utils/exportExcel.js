import * as XLSX from 'xlsx';

// Fungsi untuk mengubah nama header menjadi huruf besar
const transformHeadersToUpperCase = (data) => {
    if (data.length === 0) return data;

    // Ambil header dari kunci pertama data
    const headers = Object.keys(data[0]);

    // Ubah header menjadi huruf besar
    const upperCaseHeaders = headers.reduce((acc, header) => {
        acc[header] = header.toUpperCase();
        return acc;
    }, {});

    // Ubah header pada data
    return data.map(item => {
        const transformedItem = {};
        Object.keys(item).forEach(key => {
            transformedItem[upperCaseHeaders[key] || key] = item[key];
        });
        return transformedItem;
    });
};

export const handleExportExcel = (title, data) => {
    // Ubah header menjadi huruf besar
    const transformedData = transformHeadersToUpperCase(data);

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert table data to worksheet
    const ws = XLSX.utils.json_to_sheet(transformedData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Write workbook to file
    XLSX.writeFile(wb, `${title}.xlsx`);
};
