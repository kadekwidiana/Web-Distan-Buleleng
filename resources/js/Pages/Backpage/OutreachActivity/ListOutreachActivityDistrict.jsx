import ButtonAdd from '@/Components/Button/Add';
import DataNotFound from '@/Components/Error/DataNotFound';
import { pickBy, debounce } from 'lodash';
import BackpageLayout from '@/Layouts/BackpageLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Dropdown, Modal, Table } from 'flowbite-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import LoadData from '@/Components/Loading/LoadData';
import ExcelExport from '@/Components/Button/ExportExcel';
import ButtonBack from '@/Components/Button/Back';
import Swal from 'sweetalert2';
import { Toast } from '@/Components/Alert/Toast';
import DetailGapoktan from '@/Components/Modal/DetailGapoktan';
import Button from '@/Components/Button/Button';
import { handleExportExcel } from '@/Utils/exportExcel';
import TextInput from '@/Components/Input/TextInput';
import { formatDateToIndonesian } from '@/Utils/formatDateToIndonesian';

export default function ListOutreachActivitiesInDistrictPage() {
    const { villagesByDistrictId, outreachActivitiesInDiscrict, districtData, searchValue, villageIdValue, startDateValue, endDateValue } = usePage().props;
    const perpage = useRef(outreachActivitiesInDiscrict.per_page);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const villageId = useRef(outreachActivitiesInDiscrict.villageId);
    const startDate = useRef(outreachActivitiesInDiscrict.startDate);
    const endDate = useRef(outreachActivitiesInDiscrict.endDate);
    const [openModal, setOpenModal] = useState(false);
    const [selectedGapoktan, setSelectedGapoktan] = useState({});

    const handleChangePerPage = (e) => {
        perpage.current = e.target.value;
        getData();
    };

    const handleFilter = (e) => {
        villageId.current = e.target.value;
        getData();
    };

    const handleFilterStartDate = (e) => {
        startDate.current = e.target.value;
        getData();
    };

    const handleFilterEndDate = (e) => {
        endDate.current = e.target.value;
        getData();
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value === '') {
            getData(true); // Pass true to indicate that search is cleared
        }
    };

    const debouncedResults = useMemo(() => {
        return debounce(handleSearch, 500);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    useEffect(() => {
        if (search) {
            getData();
        }
    }, [search]);

    const getData = (isSearchCleared = false) => {
        setIsLoading(true);

        const params = pickBy({
            perpage: perpage.current,
            search: search ?? searchValue,
            villageId: villageId.current ?? villageIdValue,
            startDate: startDate.current ?? startDateValue,
            endDate: endDate.current ?? endDateValue,
        });

        if (isSearchCleared) {
            delete params.search;
        }

        router.get(
            route('outreachActivities.district', { districtId: districtData.id }),
            params,
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setIsLoading(false),
            }
        );
    };

    const deleteData = async (id) => {
        await router.delete(`/penyuluhan/kecamatan/${districtData.id}/${id}/delete`);
    };

    const deteleDataConfirm = (id) => {
        Swal.fire({
            title: "Apakah anda yakin ingin menghapus data ini?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(id);
                Toast.fire({
                    icon: "success",
                    title: "Data berhasil di hapus.",
                });
            }
        });
    };

    return (
        <BackpageLayout>
            <Head title="Kegiatan Penyuluhan" />
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-2 md:px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
                <ButtonBack url={`/penyuluhan`} />
                <h1 className='text-2xl font-semibold text-gray-800 mb-2 capitalize'>Daftar Kegiatan Penyuluhan di Kecamatan {districtData.name}</h1>
                <div className="flex justify-between gap-2">
                    <div className="flex w-full">
                        <select defaultValue={perpage.current} onChange={handleChangePerPage} className="flex-shrink-0 z-10 hidden md:inline-flex items-center sm:py-2.5 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-0 focus:ring-blue-500 focus:border-bluering-blue-500 focus:outline-none focus-visible:outline-none">
                            <option value={10} defaultChecked>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <select defaultValue={villageIdValue} onChange={handleFilter} name='villageId' id="villageId" className="flex-shrink-0 z-10 hidden md:inline-flex items-center sm:py-2.5 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-0 focus:ring-blue-500 focus:border-bluering-blue-500 focus:outline-none focus-visible:outline-none">
                            <option value="" defaultChecked>Semua Desa</option>
                            {villagesByDistrictId.map((village) => (
                                <option key={village.id} value={village.id}>{village.name}</option>
                            ))}
                        </select>
                        <form className="relative w-full">
                            <div className="relative w-full">
                                <input defaultValue={searchValue} onChange={debouncedResults}
                                    type="text" id='search' name='search' className="rounded-e-lg max-md:rounded-s-lg md:border-s-gray-50 border-s-1 border-2 border-gray-300 text-gray-900 text-sm block w-full sm:p-2.5 focus:ring-0 focus:ring-blue-500 focus:border-bluering-blue-500 focus:outline-none focus-visible:outline-none" placeholder={'Cari data...'} required />
                                <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.7 14.3L11.5 10.1C11.3 9.9 11 9.8 10.7 9.8C11.5 8.8 12 7.4 12 6C12 2.7 9.3 0 6 0C2.7 0 0 2.7 0 6C0 9.3 2.7 12 6 12C7.4 12 8.8 11.5 9.8 10.6C9.8 10.9 9.8 11.2 10.1 11.4L14.3 15.6C14.5 15.8 14.8 15.9 15 15.9C15.2 15.9 15.5 15.8 15.7 15.6C16.1 15.3 16.1 14.7 15.7 14.3ZM6 10.5C3.5 10.5 1.5 8.5 1.5 6C1.5 3.5 3.5 1.5 6 1.5C8.5 1.5 10.5 3.5 10.5 6C10.5 8.5 8.5 10.5 6 10.5Z" fill="#1C2E45" fillOpacity="0.6" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="hidden xl:flex justify-start gap-1 items-center w-1/2">
                        <TextInput
                            type={'date'}
                            name={'startDate'}
                            placeholder={'Tanggal Mulai'}
                            onChange={handleFilterStartDate}
                            defaultValue={startDateValue}
                        />
                        <TextInput
                            type={'date'}
                            name={'endDate'}
                            placeholder={'Tanggal Akhir'}
                            onChange={handleFilterEndDate}
                            defaultValue={endDateValue}
                        />
                    </div>
                    <Button type="button" onClick={() => handleExportExcel(`Kegiatan Penyuluhan ${districtData?.name}`, outreachActivitiesInDiscrict.data)} className="bg-green-600 hover:bg-green-700 text-white text-nowrap px-3">
                        <i className="fa-solid fa-download"></i>
                        <span className='hidden sm:block'>Export Excel</span>
                    </Button>
                    <ButtonAdd href={`/penyuluhan/kecamatan/${districtData.id}/create`} />
                </div>
                <div className="flex flex-col my-2 w-auto overflow-x-auto max-md:my-8">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell className='w-5'>NO</Table.HeadCell>
                            <Table.HeadCell>PENYULUH</Table.HeadCell>
                            <Table.HeadCell>JUDUL</Table.HeadCell>
                            <Table.HeadCell>DESA</Table.HeadCell>
                            <Table.HeadCell>TANGGAL</Table.HeadCell>
                            <Table.HeadCell className='flex justify-center'>
                                AKSI
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {!isLoading && outreachActivitiesInDiscrict.data.map((outreachActivity, index) => (
                                <Table.Row key={outreachActivity.id} className="bg-white">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 w-5">
                                        {index + 1}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {outreachActivity.ppl.name}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {outreachActivity.title}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {outreachActivity.village.name}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {formatDateToIndonesian(outreachActivity.created_at) ?? ''}
                                    </Table.Cell>
                                    <Table.Cell className='flex justify-center items-center gap-3'>
                                        <Link href={`/penyuluhan/kecamatan/${districtData.id}/${outreachActivity.id}/detail`}>
                                            <i className="fa-solid fa-circle-info fa-2xl text-green-500"></i>
                                        </Link>
                                        <Dropdown placement="bottom-end" label="" dismissOnClick={false} renderTrigger={() =>
                                            <button>
                                                <i className="fa-solid fa-ellipsis fa-2xl"></i>
                                            </button>
                                        }>
                                            <Dropdown.Item><Link href={route('outreachActivities.edit', { districtId: districtData.id, id: outreachActivity.id })}><i className="mr-2 fa-solid fa-pen-to-square text-blue-500 fa-xl"></i>Edit</Link></Dropdown.Item>
                                            <Dropdown.Item onClick={() => deteleDataConfirm(outreachActivity.id)}><i className="mr-2 fa-solid fa-trash fa-xl text-red-500"></i>Hapus</Dropdown.Item>
                                        </Dropdown>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    {isLoading && <LoadData />}
                    {outreachActivitiesInDiscrict.data.length <= 0 && !isLoading && <DataNotFound />}
                </div>
                {outreachActivitiesInDiscrict.data.length > 0 && !isLoading &&
                    <div className="flex items-center justify-between m-2">
                        <div className="">
                            Showing {outreachActivitiesInDiscrict.from} to {outreachActivitiesInDiscrict.from} total{" "} {outreachActivitiesInDiscrict.total}
                        </div>
                        <div className="flex items-center gap-2">
                            {outreachActivitiesInDiscrict.links.map((link, index) => (
                                <Link key={index} href={link.url} className='bg-blue-900 text-white p-2 text-sm rounded' preserveScroll preserveState>
                                    <div dangerouslySetInnerHTML={
                                        {
                                            __html: link.label,
                                        }
                                    } />
                                </Link>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </BackpageLayout >
    );
}
