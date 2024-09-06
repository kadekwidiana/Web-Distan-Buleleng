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
import Swal from "sweetalert2";
import InputSelect from "@/Components/Input/InputSelect";
import { handleExportExcel } from "@/Utils/exportExcel";

const filtersBy = [
    'Poktan',
    'Subak',
    'Kecamatan',
    'Desa'
];

// Define table columns and data
const tableColumns = [
    { header: 'NO', dataKey: 'no' },
    { header: 'PEMILIK', dataKey: 'pemilik' },
    { header: 'PENGGARAP', dataKey: 'penggarap' },
    { header: 'ALAMAT', dataKey: 'alamat' },
    { header: 'POKTAN', dataKey: 'poktan' },
    { header: 'SUBAK', dataKey: 'subak' },
    { header: 'KOMODITAS', dataKey: 'komoditas' },
    { header: 'SIKLUS KOMODITAS', dataKey: 'siklus_komoditas' },
    { header: 'LUAS LAHAN', dataKey: 'luas_lahan' },
    { header: 'DATA DIBUAT', dataKey: 'data_dibuat' },
    { header: 'DATA DIUBAH', dataKey: 'data_diubah' }
];

// sample data
let tableData = [];

export default function ReportLandAgriculturePage() {
    const { auth, poktans, subaks, districts, villages } = usePage().props;
    const [landAgricultures, setLandAgricultures] = useState([]);
    const [landAreaTotal, setLandAreaTotal] = useState();
    const [filterBy, setFilterBy] = useState('');
    const [poktanId, setPoktanId] = useState('');
    const [subakId, setSubakId] = useState('');
    const [districtId, setDistrictId] = useState('');
    const [villageId, setVillageId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [titleDataPdf, setTitleDataPdf] = useState('');

    const getDataLandAgricultures = async () => {
        setIsLoading(true);
        const selectedDistrict = districts.find(district => district.id === districtId);
        const selectedVillage = villages.find(village => village.id === villageId);
        const selectedPoktan = poktans.find(poktan => poktan.id === poktanId);
        const selectedSubak = subaks.find(subak => subak.id === subakId);

        setTitleDataPdf(selectedDistrict?.name ?? selectedVillage?.name ?? selectedPoktan?.name ?? selectedSubak?.name);

        try {
            const res = await axios.get(`/management-report/lahan-pertanian/data?district_id=${districtId}&village_id=${villageId}&poktan_id=${poktanId}&subak_id=${subakId}`);
            // console.log(res.data);
            if (res.status === 200) {
                setLandAgricultures(res.data.data);
                setLandAreaTotal(res.data.total_luas_lahan);
                setError('');
                tableData = res.data.data.map((data, index) => ({
                    no: index + 1,
                    pemilik: data.pemilik,
                    penggarap: data.penggarap,
                    alamat: data.alamat,
                    poktan: data.poktan,
                    subak: data.subak,
                    komoditas: data.komoditas,
                    siklus_komoditas: data.siklus_komoditas,
                    luas_lahan: data.luas_lahan,
                    data_dibuat: formatDateToIndonesian(data.data_dibuat),
                    data_diubah: formatDateToIndonesian(data.data_diubah),
                }));
            } else {
                setLandAgricultures([]);
                setError(HTTP_STATUS_MESSAGES[res.status]);
            }
        } catch (error) {
            setLandAgricultures([]);
            setError(HTTP_STATUS_MESSAGES[error.response.status]);
            // console.log(error.response.status);
        } finally {
            setIsLoading(false);
        }
    }

    const handlePrintPDF = () => {
        Swal.fire({
            title: 'Masukkan Nama File',
            input: 'text',
            inputLabel: 'Nama File',
            inputPlaceholder: 'Laporan Lahan Pertanian',
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
                setIsLoading(true);
                const doc = new jsPDF('l', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' size

                // Add logo
                doc.addImage('/assets/images/logo-distan-buleleng-1.png', 'PNG', 5, 5, 40, 40); // x, y, width, height

                // Title and headers
                doc.setFontSize(18);
                doc.text('Laporan Lahan Pertanian', 50, 15); // x, y
                doc.setFontSize(13);
                doc.text(`${filterBy}: ${titleDataPdf}`, 50, 22); // x, y
                doc.text(`Total Luas Lahan: ${landAreaTotal}`, 50, 28); // x, y
                doc.text(`Total Data: ${tableData.length}`, 50, 34); // x, y

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

                // Save the PDF with the entered file name
                doc.save(`${result.value}.pdf`);
                setIsLoading(false);
            }
        });
    };

    return (
        <BackpageLayout>
            <Head title="Laporan Lahan Pertanian" />
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-5 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
                <table className="w-full text-base text-left rtl:text-right text-gray-800">
                    <tbody>
                        <tr className="bg-white">
                            <td className="pr-2 py-2 w-1/5">Cari Berdasarkan</td>
                            <td className="px-2 py-2 w-3">:</td>
                            <td className="px-2 py-2 w-full">
                                <div className="flex justify-start gap-2 items-center w-1/2">
                                    <InputSelect
                                        value={filterBy} // Set nilai select berdasarkan state filterBy
                                        id="filterBy"
                                        name="filterBy"
                                        onChange={(e) => {
                                            setFilterBy(e.target.value)
                                            setDistrictId('')
                                            setVillageId('')
                                            setPoktanId('')
                                            setSubakId('')
                                            setLandAgricultures([])
                                        }} // Tambahkan onChange handler
                                    >
                                        <option value={''}>-- Pilih Kriteria Pencarian --</option>
                                        {filtersBy.map((filterBy, index) => (
                                            <option key={index} value={filterBy}>{filterBy}</option>
                                        ))}
                                    </InputSelect>
                                </div>
                            </td>
                        </tr>
                        {filterBy === 'Poktan' &&
                            <tr className="bg-white">
                                <td className="pr-2 py-2 w-1/5">Poktan</td>
                                <td className="px-2 py-2 w-3">:</td>
                                <td className="px-2 py-2 w-full">
                                    <div className="flex justify-start gap-2 items-center w-1/2">
                                        <SelectTwo
                                            entities={poktans}
                                            selectedEntityId={poktanId}
                                            setSelectedEntityId={(id) => setPoktanId(id)}
                                            label={'-- Pilih Poktan --'}
                                            placeholder={'Cari Poktan...'}
                                        />
                                    </div>
                                </td>
                            </tr>
                        }
                        {filterBy === 'Subak' &&
                            <tr className="bg-white">
                                <td className="pr-2 py-2 w-1/5">Subak</td>
                                <td className="px-2 py-2 w-3">:</td>
                                <td className="px-2 py-2 w-full">
                                    <div className="flex justify-start gap-2 items-center w-1/2">
                                        <SelectTwo
                                            entities={subaks}
                                            selectedEntityId={subakId}
                                            setSelectedEntityId={(id) => setSubakId(id)}
                                            label={'-- Pilih Subak --'}
                                            placeholder={'Cari Subak...'}
                                        />
                                    </div>
                                </td>
                            </tr>
                        }
                        {filterBy === 'Kecamatan' &&
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
                        }
                        {filterBy === 'Desa' &&
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
                        }
                    </tbody>
                </table>
                <div className="py-4 bg-white flex justify-start gap-2 items-center">
                    <a href={`/management-report/lahan-pertanian`}>
                        <Button type="button" className="bg-yellow-500 hover:bg-yellow-600 text-white">Reset</Button>
                    </a>
                    <Button disabled={isLoading || districtId === '' && villageId === '' && poktanId === '' && subakId === ''} onClick={getDataLandAgricultures} type="button" className={`${districtId === '' && villageId === '' && poktanId === '' && subakId === '' ? 'bg-gray-400 hover:bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>
                        Cari
                    </Button>
                    {/* Tambahkan kondisi untuk menampilkan tombol PDF dan Excel jika data tersedia */}
                    {!isLoading && landAgricultures.length > 0 &&
                        <>
                            <Button disabled={isLoading} type="button" onClick={handlePrintPDF} className="bg-red-500 hover:bg-red-600 text-white">PDF</Button>
                            <Button type="button" onClick={() => handleExportExcel(`Laporan Lahan Pertanian`, landAgricultures)} className="bg-green-600 hover:bg-green-700 text-white">Excel</Button>
                        </>
                    }
                </div>

                <div className="w-full">
                    <div className="overflow-x-auto">
                        {!isLoading && landAgricultures.length > 0 &&
                            <Table striped>
                                <Table.Head>
                                    <Table.HeadCell>NO</Table.HeadCell>
                                    <Table.HeadCell>PEMILIK</Table.HeadCell>
                                    <Table.HeadCell>PENGGARAP</Table.HeadCell>
                                    <Table.HeadCell>ALAMAT</Table.HeadCell>
                                    <Table.HeadCell>POKTAN</Table.HeadCell>
                                    <Table.HeadCell>SUBAK</Table.HeadCell>
                                    <Table.HeadCell>KOMODITAS</Table.HeadCell>
                                    <Table.HeadCell>SIKLUS KOMODITAS</Table.HeadCell>
                                    <Table.HeadCell>LUAS LAHAN</Table.HeadCell>
                                    <Table.HeadCell>DATA DIBUAT</Table.HeadCell>
                                    <Table.HeadCell>DATA DIUBAH</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y text-gray-800">
                                    {landAgricultures.map((data, index) => (
                                        <Table.Row key={index} className="bg-white">
                                            <Table.Cell className="text-nowrap">
                                                {index + 1}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">
                                                {data.pemilik}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">
                                                {data.penggarap}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">
                                                {data.alamat}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">
                                                {data.poktan}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">
                                                {data.subak}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">
                                                {data.komoditas}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">
                                                {data.siklus_komoditas}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">
                                                {data.luas_lahan}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">
                                                {formatDateToIndonesian(data.data_dibuat)}
                                            </Table.Cell>
                                            <Table.Cell className="text-nowrap">
                                                {formatDateToIndonesian(data.data_diubah)}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        }
                        {isLoading && <LoadData />}
                        {error && !isLoading && <FetchError message={error} />}
                    </div>
                    {!isLoading && landAgricultures.length > 0 &&
                        <div className="flex items-center justify-between m-2">
                            <div className="">
                                Total Luas Lahan Pertanian: {landAreaTotal}
                            </div>
                            <div className="">
                                Total Data: {landAgricultures.length}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </BackpageLayout>
    );
}
