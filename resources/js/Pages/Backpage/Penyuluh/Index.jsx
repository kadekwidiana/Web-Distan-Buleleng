import { Toast } from '@/Components/Alert/Toast';
import ButtonAdd from '@/Components/Button/Add';
import DataNotFound from '@/Components/Error/DataNotFound';
import MultiSelect from '@/Components/Input/MultiSelect';
import LoadData from '@/Components/Loading/LoadData';
import BackpageLayout from '@/Layouts/BackpageLayout'
import { EMPLOYEE_STATUSES } from '@/Constant/Status';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Dropdown, Table } from 'flowbite-react';
import { debounce, pickBy } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import Button from '@/Components/Button/Button';
import { handleExportExcel } from '@/Utils/exportExcel';

export default function PenyuluhPage() {
    const { ppls, employeeStatusValue, searchValue } = usePage().props;
    const perpage = useRef(ppls.per_page);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const employeeStatus = useRef(ppls.employeeStatus);

    const handleChangePerPage = (e) => {
        perpage.current = e.target.value;
        getData();
    }

    const handleFilter = (e) => {
        employeeStatus.current = e.target.value;
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
            employeeStatus: employeeStatus.current ?? employeeStatusValue
        });

        if (isSearchCleared) {
            delete params.search;
        }

        router.get(
            route('ppl.index'),
            params,
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setIsLoading(false),
            }
        )
    }

    const deleteData = async (id) => {
        await router.delete(route('ppl.destroy', { ppl: id }));
    }

    const deteleDataConfirm = (id) => {
        Swal.fire({
            title: "Apakah Anda yakin ingin menghapus data ini?",
            text: "Data yang terkait dengan ini juga akan dihapus dan tidak dapat dipulihkan.",
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
    }

    return (
        <BackpageLayout>
            <Head title="Data Penyuluh" />
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
                <div className="flex justify-between gap-2 sm:gap-6">
                    <div className="flex w-full">
                        <select defaultValue={perpage.current} onChange={handleChangePerPage} className="flex-shrink-0 z-10 hidden lg:inline-flex items-center py-2.5 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-0 focus:ring-blue-500 focus:border-bluering-blue-500 focus:outline-none focus-visible:outline-none">
                            <option value={10} defaultChecked>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <select defaultValue={employeeStatusValue} onChange={handleFilter} name='employeeStatus' id="employeeStatus" className="flex-shrink-0 z-10 hidden lg:inline-flex items-center py-2.5 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-0 focus:ring-blue-500 focus:border-bluering-blue-500 focus:outline-none focus-visible:outline-none">
                            <option value="" defaultChecked>Semua Status Pegawai</option>
                            {EMPLOYEE_STATUSES.map((employeeStatus, index) => (
                                <option key={index} value={employeeStatus} >{employeeStatus}</option>
                            ))}
                        </select>
                        <form className="relative w-full">
                            <div className="relative w-full">
                                <input
                                    defaultValue={searchValue} onChange={debouncedResults}
                                    type="text" id='search' name='search' className="max-lg:rounded-s-lg max-lg:border-s-gray-300 rounded-e-lg border-s-gray-50 border-s-1 border-2 border-gray-300 text-gray-900 text-sm block w-full p-2.5 focus:ring-0 focus:ring-blue-500 focus:border-bluering-blue-500 focus:outline-none focus-visible:outline-none" placeholder={'Cari data...'} required />
                                <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.7 14.3L11.5 10.1C11.3 9.9 11 9.8 10.7 9.8C11.5 8.8 12 7.4 12 6C12 2.7 9.3 0 6 0C2.7 0 0 2.7 0 6C0 9.3 2.7 12 6 12C7.4 12 8.8 11.5 9.8 10.6C9.8 10.9 9.8 11.2 10.1 11.4L14.3 15.6C14.5 15.8 14.8 15.9 15 15.9C15.2 15.9 15.5 15.8 15.7 15.6C16.1 15.3 16.1 14.7 15.7 14.3ZM6 10.5C3.5 10.5 1.5 8.5 1.5 6C1.5 3.5 3.5 1.5 6 1.5C8.5 1.5 10.5 3.5 10.5 6C10.5 8.5 8.5 10.5 6 10.5Z" fill="#1C2E45" fillOpacity="0.6" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                    <Button type="button" onClick={() => handleExportExcel(`Penyuluh`, ppls.data)} className="bg-green-600 hover:bg-green-700 text-white">Excel</Button>
                    <ButtonAdd href={'/ppl/create'} />
                </div>
                <div className="flex flex-col my-2 overflow-x-auto">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell className='w-5'>NO</Table.HeadCell>
                            <Table.HeadCell>NIP</Table.HeadCell>
                            <Table.HeadCell>NAMA</Table.HeadCell>
                            <Table.HeadCell>STATUS PEGAWAI</Table.HeadCell>
                            <Table.HeadCell className='w-96'>ALAMAT</Table.HeadCell>
                            <Table.HeadCell className='flex justify-center'>
                                AKSI
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {!isLoading && ppls.data.map((ppl, index) => (
                                <Table.Row key={index} className="bg-white">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 w-5">
                                        {index + 1}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {ppl.nip}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {ppl.front_title} {ppl.name} {ppl.back_title}
                                    </Table.Cell>
                                    <Table.Cell>{ppl.employee_status}</Table.Cell>
                                    <Table.Cell className='w-96'>
                                        <p className='line-clamp-1 mr-3'>
                                            {ppl.address}
                                        </p>
                                    </Table.Cell>
                                    <Table.Cell className='flex justify-center items-center gap-3'>
                                        <Link href={`/ppl/${ppl.nip}`}>
                                            <i className="fa-solid fa-circle-info fa-2xl text-green-500"></i>
                                        </Link>

                                        <Dropdown placement="bottom-start" label="" dismissOnClick={false} renderTrigger={() =>
                                            <button>
                                                <i className="fa-solid fa-ellipsis fa-2xl"></i>
                                            </button>
                                        }>
                                            <Dropdown.Item><Link href={route('ppl.edit', { ppl: ppl.nip })}><i className="mr-2 fa-solid fa-pen-to-square text-blue-500 fa-xl"></i>Edit</Link></Dropdown.Item>
                                            <Dropdown.Item onClick={() => deteleDataConfirm(ppl.nip)}><i className="mr-2 fa-solid fa-trash fa-xl text-red-500"></i>Hapus</Dropdown.Item>
                                        </Dropdown>

                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    {isLoading && <LoadData />}
                    {ppls.data.length <= 0 && !isLoading && <DataNotFound />}
                </div>
                {ppls.data.length > 0 && !isLoading &&
                    <div className="flex items-center justify-between m-2">
                        <div className="">
                            Showing {ppls.from} to {ppls.from} total{" "} {ppls.total}
                        </div>
                        <div className="flex items-center gap-2">
                            {ppls.links.map((link, index) => (
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
