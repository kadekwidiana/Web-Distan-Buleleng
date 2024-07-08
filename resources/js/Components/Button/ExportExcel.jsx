import * as XLSX from 'xlsx';

const ExcelExport = ({ data, fileName }) => {
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Menyesuaikan lebar kolom
        const maxColumnWidths = {};
        data.forEach((row) => {
            Object.keys(row).forEach(key => {
                const value = row[key]?.toString() || '';
                maxColumnWidths[key] = Math.max(maxColumnWidths[key] || 0, value.length);
            });
        });
        worksheet['!cols'] = Object.keys(maxColumnWidths).map(key => ({ wch: maxColumnWidths[key] }));

        // Menambahkan wrapping dan alignment
        Object.keys(worksheet).forEach(key => {
            if (worksheet[key] && worksheet[key].v) {
                worksheet[key].s = {
                    alignment: {
                        wrapText: true,
                        vertical: 'top',
                        horizontal: 'left',
                    }
                };
            }
        });

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.xlsx`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <button className='px-3 w-auto flex justify-center items-center gap-2 bg-green-600 rounded-lg text-white' onClick={exportToExcel}>
            {/* <FontAwesomeIcon icon={faFileExport}></FontAwesomeIcon> */}
            <span className='whitespace-nowrap font-medium hidden sm:block'>Export Excel</span>
        </button>
    );
};

export default ExcelExport;
