import * as XLSX from 'xlsx';

export const handleExportExcel = (title, data) => {
    // Get the file name from user input
    const fileName = result.value || title;

    // Ubah header menjadi huruf besar
    const transformedData = transformHeadersToUpperCase(data);

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert table data to worksheet
    const ws = XLSX.utils.json_to_sheet(transformedData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Write workbook to file with the provided name
    XLSX.writeFile(wb, `${fileName}.xlsx`);
};
