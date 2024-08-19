import { Toast } from '@/Components/Alert/Toast';
import ButtonAdd from '@/Components/Button/Add';
import DataNotFound from '@/Components/Error/DataNotFound';
import MultiSelect from '@/Components/Input/MultiSelect';
import LoadData from '@/Components/Loading/LoadData';
import BackpageLayout from '@/Layouts/BackpageLayout'
import { DATA_STATUSES, EMPLOYEE_STATUSES } from '@/Constant/Status';
import { TYPE_DATA_SPATIALS } from '@/Constant/Type';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Dropdown, Table } from 'flowbite-react';
import { debounce, pickBy } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import ModalInputLayerGroup from './ModalInput';
// import ModalInputCommodity from './ModalInput';

export default function MasterDataLayerGroupPage() {
    const { layerGroups, statusValue, searchValue } = usePage().props;
    const perpage = useRef(layerGroups.per_page);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const status = useRef(layerGroups.status);
    const [openModal, setOpenModal] = useState(false);
    const [selectedLayerGroup, setSelectedLayerGroup] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);

    const handleChangePerPage = (e) => {
        perpage.current = e.target.value;
        getData();
    }

    const handleFilter = (e) => {
        status.current = e.target.value;
        getData();
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value === '') {
            getData(true); // Pass true to indicate that search is cleared
        }
    }

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
            status: status.current ?? statusValue
        });

        if (isSearchCleared) {
            delete params.search;
        }

        router.get(
            route('layer-grup.index'),
            params,
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setIsLoading(false),
            }
        )
    }

    const deleteData = async (id) => {
        await router.delete(route('layer-grup.destroy', { id: id }));
    }

    const deteleDataConfirm = (id) => {
        Swal.fire({
            title: "Apakah Anda yakin ingin menghapus DATA MASTER ini?",
            text: "Data yang terkait dengan ini juga akan dihapus dan tidak dapat dipulihkan.",
            icon: "warning",
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
    }

    const handleEditClick = (layerGroup) => {
        setSelectedLayerGroup(layerGroup);
        setOpenModal(true);
        setIsUpdate(true);
    };

    return (
        <BackpageLayout>
            <Head title="Master Data Layer Grup" />
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
                <div className="flex justify-between gap-2 sm:gap-10">
                    <div className="flex w-full">
                        <select defaultValue={perpage.current} onChange={handleChangePerPage} className="flex-shrink-0 z-10 inline-flex items-center py-2.5 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-0 focus:ring-blue-500 focus:border-bluering-blue-500 focus:outline-none focus-visible:outline-none">
                            <option value={10} defaultChecked>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <select defaultValue={statusValue} onChange={handleFilter} name='status' id="status" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-0 focus:ring-blue-500 focus:border-bluering-blue-500 focus:outline-none focus-visible:outline-none">
                            <option value="" defaultChecked>Semua Status</option>
                            {DATA_STATUSES.map((status, index) => (
                                <option key={index} value={status.value} >{status.label}</option>
                            ))}
                        </select>
                        <form className="relative w-full">
                            <div className="relative w-full">
                                <input
                                    defaultValue={searchValue} onChange={debouncedResults}
                                    type="text" id='search' name='search' className="rounded-e-lg border-s-gray-50 border-s-1 border-2 border-gray-300 text-gray-900 text-sm block w-full p-2.5 focus:ring-0 focus:ring-blue-500 focus:border-bluering-blue-500 focus:outline-none focus-visible:outline-none" placeholder={'Cari data...'} required />
                                <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.7 14.3L11.5 10.1C11.3 9.9 11 9.8 10.7 9.8C11.5 8.8 12 7.4 12 6C12 2.7 9.3 0 6 0C2.7 0 0 2.7 0 6C0 9.3 2.7 12 6 12C7.4 12 8.8 11.5 9.8 10.6C9.8 10.9 9.8 11.2 10.1 11.4L14.3 15.6C14.5 15.8 14.8 15.9 15 15.9C15.2 15.9 15.5 15.8 15.7 15.6C16.1 15.3 16.1 14.7 15.7 14.3ZM6 10.5C3.5 10.5 1.5 8.5 1.5 6C1.5 3.5 3.5 1.5 6 1.5C8.5 1.5 10.5 3.5 10.5 6C10.5 8.5 8.5 10.5 6 10.5Z" fill="#1C2E45" fillOpacity="0.6" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                    <button onClick={() => {
                        setOpenModal(true);
                        setSelectedLayerGroup(null);
                        setIsUpdate(false);
                    }} type='button' className='px-3 w-auto flex justify-center items-center gap-2 border-2 text-blue-500 border-blue-500 rounded-lg text-blueborder-blue-500'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 4.1665V15.8332" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4.16675 10H15.8334" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className='whitespace-nowrap font-medium hidden sm:block'>Tambah data</span>
                    </button>
                    <ModalInputLayerGroup
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        layerGroupById={selectedLayerGroup}
                        isUpdate={isUpdate}
                    />
                </div>
                <div className="flex flex-col my-2">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell className='w-5'>NO</Table.HeadCell>
                            <Table.HeadCell>NAMA</Table.HeadCell>
                            <Table.HeadCell>STATUS</Table.HeadCell>
                            <Table.HeadCell className='flex justify-center'>
                                AKSI
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {!isLoading && layerGroups.data.map((layerGroup, index) => (
                                <Table.Row key={index} className="bg-white">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 w-5">
                                        {index + 1}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {layerGroup.name}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {DATA_STATUSES.map((status, index) => (
                                            layerGroup.status === status.value && status.label
                                        ))}
                                    </Table.Cell>
                                    <Table.Cell className='flex justify-center items-center gap-3'>
                                        <button
                                            onClick={() => handleEditClick(layerGroup)}
                                        >
                                            <i className="mr-2 fa-solid fa-pen-to-square text-blue-500 fa-xl"></i>
                                        </button>
                                        <button
                                            onClick={() => deteleDataConfirm(layerGroup.id)}
                                        >
                                            <i className="mr-2 fa-solid fa-trash fa-xl text-red-500"></i>
                                        </button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    {isLoading && <LoadData />}
                    {layerGroups.data.length <= 0 && !isLoading && <DataNotFound />}
                </div>
                {layerGroups.data.length > 0 && !isLoading &&
                    <div className="flex items-center justify-between m-2">
                        <div className="">
                            Showing {layerGroups.from} to {layerGroups.from} total{" "} {layerGroups.total}
                        </div>
                        <div className="flex items-center gap-2">
                            {layerGroups.links.map((link, index) => (
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
    )
}
