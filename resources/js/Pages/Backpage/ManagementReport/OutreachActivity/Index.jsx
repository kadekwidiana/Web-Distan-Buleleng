import Button from "@/Components/Button/Button";
import SelectTwo from "@/Components/Input/InputSelectTwo";
import TextInput from "@/Components/Input/TextInput";
import BackpageLayout from "@/Layouts/BackpageLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Table } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import plugin for auto table
import { formatDateToIndonesian } from "@/Utils/formatDateToIndonesian";
import * as XLSX from 'xlsx';
import axios from "axios";
import LoadData from "@/Components/Loading/LoadData";
import DataNotFound from "@/Components/Error/DataNotFound";
import { HTTP_STATUS_MESSAGES } from "@/Constant/HTTPStartusMessages";
import FetchError from "@/Components/Error/FetchError";

// Define table columns and data
const tableColumns = [
    { header: 'NO', dataKey: 'no' },
    { header: 'PENYULUH', dataKey: 'ppl_name' },
    { header: 'JUDUL', dataKey: 'title' },
    { header: 'KECAMATAN', dataKey: 'district' },
    { header: 'DESA', dataKey: 'village' },
    { header: 'LOKASI', dataKey: 'address' },
    { header: 'CATATAN', dataKey: 'notes' },
    { header: 'LAPORAN KEGIATAN', dataKey: 'activity_report' },
    { header: 'YANG TERLIBAT', dataKey: 'which_are_involved' },
    { header: 'DI BUAT', dataKey: 'created_at' },
    { header: 'DI UPDATE', dataKey: 'updated_at' }
];

// sample data
let tableData = [];

export default function ReportOutreachActivityPage() {
    const { auth, ppls, districts, villages } = usePage().props;
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [pplNIP, setPplNIP] = useState('');
    const [districtId, setDistrictId] = useState('');
    const [villageId, setVillageId] = useState('');
    const [outreachActivities, setOutreachActivities] = useState(tableData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const [startDateForPDF, setStartDateForPDF] = useState('');
    const [endDateForPDF, setEndDateForPDF] = useState('');
    const [pplNameForPDF, setPplNameForPDF] = useState('');
    const [districtNameForPDF, setDistrictNameForPDF] = useState('');
    const [villageNameForPDF, setVillageNameForPDF] = useState('');

    const handlePrintPDF = () => {
        setIsLoading(true);
        const doc = new jsPDF('l', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' size

        // Add logo
        doc.addImage('/assets/images/logo-distan-buleleng-1.png', 'PNG', 5, 5, 40, 40); // x, y, width, height

        // Title and headers
        doc.setFontSize(18);
        doc.text('Laporan Kegiatan Penyuluhan', 50, 15); // x, y
        doc.setFontSize(13);
        doc.text(`Tanggal: ${startDateForPDF} - ${endDateForPDF}`, 50, 22); // x, y
        doc.text(`Penyuluh: ${pplNameForPDF}`, 50, 28); // x, y
        doc.text(`Kecamatan: ${districtNameForPDF}`, 50, 34); // x, y
        doc.text(`Desa: ${villageNameForPDF}`, 50, 40); // x, y
        doc.text(`Total Data: ${tableData.length}`, 50, 46); // x, y

        // Draw horizontal line above table
        const lineY = 50; // y position where you want the line to be drawn
        doc.setDrawColor(0, 0, 0); // Set the line color to black
        doc.setLineWidth(0.50); // Set the line width
        const pageWidth = doc.internal.pageSize.width; // Get the page width
        doc.line(10, lineY, pageWidth - 10, lineY); // Draw line from x=10 to x=pageWidth-10
        doc.line(10, lineY + 1, pageWidth - 10, lineY + 1); // Draw line from x=10 to x=pageWidth-10

        // Generate table
        doc.autoTable({
            startY: lineY + 5, // Position the table below the header
            columns: tableColumns,
            body: tableData,
            margin: { top: 10, bottom: 10, right: 10, left: 10 },
            styles: {
                fontSize: 12,
                lineColor: 'black',
            },
            headStyles: {
                fillColor: 'gray', // Gray color for header background
                textColor: 'black',
                lineColor: 'black', // Border color black
                lineWidth: 0.25, // Border width
            },
            alternateRowStyles: {
                fillColor: 'white', // White color for body rows
                textColor: 'black',
            },
            theme: 'grid', // Grid theme to include borders
        });

        // Define the footer position
        const footerY = doc.internal.pageSize.height - 10; // Adjust the Y position as needed

        // Add the footer text
        doc.setFontSize(12);
        doc.text(`Singaraja, ${formatDateToIndonesian(new Date().toLocaleDateString())}`, doc.internal.pageSize.width - 14, footerY, { align: 'right' });
        doc.text(`${auth.user.name} | Dinas Pertanian Kabupaten Buleleng`, doc.internal.pageSize.width - 14, footerY + 5, { align: 'right' });

        // Save the PDF
        doc.save('Laporan Kegiatan Penyuluhan.pdf');
        setIsLoading(false);
    };

    const handleExportExcel = () => {
        setIsLoading(true);
        const dataExportExcel = tableData.map((data) => ({
            NO: data.no,
            PENYULUH: data.ppl_name,
            JUDUL: data.title,
            KECAMATAN: data.district,
            DESA: data.village,
            LOKASI: data.address,
            CATATAN: data.notes,
            LAPORAN_KEGIATAN: data.activity_report,
            YANG_TERLIBAT: data.which_are_involved,
            DIBUAT: data.created_at,
            DIUPDATE: data.updated_at,
        }));

        // Create a new workbook
        const wb = XLSX.utils.book_new();

        // Convert table data to worksheet
        const ws = XLSX.utils.json_to_sheet(dataExportExcel);

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        // Write workbook to file
        XLSX.writeFile(wb, 'Laporan Kegiatan Penyuluhan.xlsx');
        setIsLoading(false);
    };

    const getDataOutreachActivities = async () => {
        // set tanggal, nama, kec, dan desa di print PDF
        const selectedPpl = ppls.find(ppl => ppl.nip === pplNIP);
        const selectedDistrict = districts.find(district => district.id === districtId);
        const selectedVillage = villages.find(village => village.id === villageId);
        setStartDateForPDF(startDate ? formatDateToIndonesian(startDate) : '');
        setEndDateForPDF(endDate ? formatDateToIndonesian(endDate) : '');
        setPplNameForPDF(selectedPpl ? `${selectedPpl?.front_title} ${selectedPpl?.name} ${selectedPpl?.back_title}` : '');
        setDistrictNameForPDF(selectedDistrict?.name ?? '');
        setVillageNameForPDF(selectedVillage?.name ?? '');

        setIsLoading(true);
        try {
            const res = await axios.get(`/management-report/penyuluhan/data?start_date=${startDate}&end_date=${endDate}&ppl_nip=${pplNIP}&district_id=${districtId}&village_id=${villageId}`);
            // console.log(res.data);
            if (res.status === 200) {
                setOutreachActivities(res.data);
                // langsung set data di tabel nya (biar cepat cuyyy)
                tableData = res.data.map((data, index) => ({
                    no: index + 1,
                    ppl_name: data.ppl_name,
                    title: data.title,
                    district: data.district,
                    village: data.village,
                    address: data.address,
                    notes: data.notes,
                    activity_report: data.activity_report,
                    which_are_involved: data.gapoktans ?? '' + ', ' + data.poktans ?? '' + ', ' + data.subak ?? '' + ', ' + data.others_involved ?? '',
                    created_at: formatDateToIndonesian(data.created_at),
                    updated_at: formatDateToIndonesian(data.updated_at)
                }));
                setError('');
            } else {
                setOutreachActivities([]);
                setError(HTTP_STATUS_MESSAGES[res.status]);
            }
        } catch (error) {
            setOutreachActivities([]);
            setError(HTTP_STATUS_MESSAGES[error.response.status]);
            // console.log(error.response.status);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <BackpageLayout>
            <Head title="Laporan Penyuluhan" />
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-5 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
                <table className="w-full text-base text-left rtl:text-right text-gray-800">
                    <tbody>
                        <tr className="bg-white">
                            <td className="pr-2 py-2 w-1/5">Tanggal</td>
                            <td className="px-2 py-2 w-3">:</td>
                            <td className="px-2 py-2 w-full">
                                <div className="flex justify-start gap-2 items-center w-1/2">
                                    <TextInput
                                        type={'date'}
                                        name={'start_date'}
                                        placeholder={'Tanggal Mulai'}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                    <TextInput
                                        type={'date'}
                                        name={'end_date'}
                                        placeholder={'Tanggal Akhir'}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-white">
                            <td className="pr-2 py-2 w-1/5">Penyuluh</td>
                            <td className="px-2 py-2 w-3">:</td>
                            <td className="px-2 py-2 w-full">
                                <div className="flex justify-start gap-2 items-center w-1/2">
                                    <SelectTwo
                                        entities={ppls.map((ppl) => ({
                                            id: ppl.nip,
                                            name: ppl.name
                                        }))}
                                        selectedEntityId={pplNIP}
                                        setSelectedEntityId={(id) => setPplNIP(id)}
                                        label={'-- Pilih Penyuluh --'}
                                        placeholder={'Cari Penyuluh...'}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-white">
                            <td className="pr-2 py-2 w-1/5">Kecamatan</td>
                            <td className="px-2 py-2 w-3">:</td>
                            <td className="px-2 py-2 w-full">
                                <div className="flex justify-start gap-2 items-center w-1/2">
                                    <SelectTwo
                                        entities={districts}
                                        selectedEntityId={districtId}
                                        setSelectedEntityId={(id) => setDistrictId(id)}
                                        label={'-- Pilih Kecamatan --'}
                                        placeholder={'Cari Kecamatan...'}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr className="bg-white">
                            <td className="pr-2 py-2 w-1/5">Desa</td>
                            <td className="px-2 py-2 w-3">:</td>
                            <td className="px-2 py-2 w-full">
                                <div className="flex justify-start gap-2 items-center w-1/2">
                                    <SelectTwo
                                        entities={villages}
                                        selectedEntityId={villageId}
                                        setSelectedEntityId={(id) => setVillageId(id)}
                                        label={'-- Pilih Desa --'}
                                        placeholder={'Cari Desa...'}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="py-4 bg-white flex justify-start gap-2 items-center">
                    <a href={`/management-report/penyuluhan`}>
                        <Button type="button" className="bg-yellow-500 hover:bg-yellow-600 text-white">Reset</Button>
                    </a>
                    <Button disabled={isLoading} type="button" onClick={getDataOutreachActivities} className="bg-blue-500 hover:bg-blue-600 text-white">Cari</Button>
                    {!isLoading && outreachActivities.length > 0 &&
                        <>
                            <Button disabled={isLoading} type="button" onClick={handlePrintPDF} className="bg-red-500 hover:bg-red-600 text-white">PDF</Button>
                            <Button disabled={isLoading} type="button" onClick={handleExportExcel} className="bg-green-600 hover:bg-green-700 text-white">Excel</Button>
                        </>
                    }
                </div>

                <div className="w-full">
                    <div className="overflow-x-auto">
                        {!isLoading && outreachActivities.length > 0 &&
                            <Table striped>
                                <Table.Head>
                                    {tableColumns.map((header, index) => (
                                        <Table.HeadCell key={index}>{header.header}</Table.HeadCell>
                                    ))}
                                </Table.Head>
                                <Table.Body className="divide-y text-gray-800">
                                    {tableData.map((data, index) => (
                                        <Table.Row key={index} className="bg-white">
                                            <Table.Cell className="text-nowrap">
                                                {index + 1}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">
                                                {data.ppl_name}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">
                                                {data.title}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">
                                                {data.district}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">
                                                {data.village}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">
                                                {data.address}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">
                                                {data.notes}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">
                                                {data.activity_report}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">
                                                {data.which_are_involved}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">
                                                {data.created_at}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">
                                                {data.updated_at}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        }
                        {isLoading && <LoadData />}
                        {error && !isLoading && <FetchError message={error} />}
                    </div>
                    {!isLoading && outreachActivities.length > 0 &&
                        <div className="flex items-center justify-between m-2">
                            <div className="">
                                Total Data: {tableData.length}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </BackpageLayout>
    );
}
