import { Toast } from '@/Components/Alert/Toast';
import ButtonAdd from '@/Components/Button/Add';
import DataNotFound from '@/Components/Error/DataNotFound';
import MultiSelect from '@/Components/Input/MultiSelect';
import LoadData from '@/Components/Loading/LoadData';
import BackpageLayout from '@/Layouts/BackpageLayout'
import { EMPLOYEE_STATUSES } from '@/Constant/Status';
import { TYPE_DATA_SPATIALS } from '@/Constant/Type';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Dropdown, Table } from 'flowbite-react';
import { debounce, pickBy } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Swal from 'sweetalert2';

export default function DatSpatialPage() {
    const { dataSpatials, typeSpatialValue, searchValue } = usePage().props;
    const perpage = useRef(dataSpatials.per_page);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const typeSpatial = useRef(dataSpatials.typeSpatial);

    const handleChangePerPage = (e) => {
        perpage.current = e.target.value;
        getData();
    }

    const handleFilter = (e) => {
        typeSpatial.current = e.target.value;
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
            typeSpatial: typeSpatial.current ?? typeSpatialValue
        });

        if (isSearchCleared) {
            delete params.search;
        }

        router.get(
            route('data-spasial.index'),
            params,
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setIsLoading(false),
            }
        )
    }

    const deleteData = async (id) => {
        await router.delete(route('data-spasial.destroy', { id: id }));
    }

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
    }

    return (
        <BackpageLayout>
            <Head title="Data Spasial" />
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
                <div className="flex justify-between gap-2 sm:gap-10">
                    <div className="flex w-full">
                        <select defaultValue={perpage.current} onChange={handleChangePerPage} className="flex-shrink-0 z-10 inline-flex items-center py-2.5 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-0 focus:ring-blue-500 focus:border-bluering-blue-500 focus:outline-none focus-visible:outline-none">
                            <option value={10} defaultChecked>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <select defaultValue={typeSpatialValue} onChange={handleFilter} name='typeSpatial' id="typeSpatial" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-0 focus:ring-blue-500 focus:border-bluering-blue-500 focus:outline-none focus-visible:outline-none">
                            <option value="" defaultChecked>Semua Tipe</option>
                            {TYPE_DATA_SPATIALS.map((typeSpatial, index) => (
                                <option key={index} value={typeSpatial} >{typeSpatial}</option>
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
                    <ButtonAdd href={'/data-spasial/create'} />
                </div>
                <div className="flex flex-col my-2">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell className='w-5'>NO</Table.HeadCell>
                            <Table.HeadCell>NAMA</Table.HeadCell>
                            <Table.HeadCell>TIPE SPASIAL</Table.HeadCell>
                            <Table.HeadCell>WARNA</Table.HeadCell>
                            <Table.HeadCell className='flex justify-center'>
                                AKSI
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {!isLoading && dataSpatials.data.map((dataSpatial, index) => (
                                <Table.Row key={index} className="bg-white">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 w-5">
                                        {index + 1}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {dataSpatial.name}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {dataSpatial.type}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        <div
                                            className="w-5 h-5"
                                            style={{ backgroundColor: dataSpatial.color }}
                                        ></div>
                                    </Table.Cell>
                                    <Table.Cell className='flex justify-center items-center gap-3'>
                                        <Link href={`/data-spasial/${dataSpatial.id}`}>
                                            <i className="fa-solid fa-circle-info fa-2xl text-green-500"></i>
                                        </Link>

                                        <Dropdown placement="bottom-start" label="" dismissOnClick={false} renderTrigger={() =>
                                            <button>
                                                <i className="fa-solid fa-ellipsis fa-2xl"></i>
                                            </button>
                                        }>
                                            <Dropdown.Item><Link href={route('data-spasial.edit', { id: dataSpatial.id })}><i className="mr-2 fa-solid fa-pen-to-square text-blue-500 fa-xl"></i>Edit</Link></Dropdown.Item>
                                            <Dropdown.Item onClick={() => deteleDataConfirm(dataSpatial.id)}><i className="mr-2 fa-solid fa-trash fa-xl text-red-500"></i>Hapus</Dropdown.Item>
                                        </Dropdown>

                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    {isLoading && <LoadData />}
                    {dataSpatials.data.length <= 0 && !isLoading && <DataNotFound />}
                </div>
                {dataSpatials.data.length > 0 && !isLoading &&
                    <div className="flex items-center justify-between m-2">
                        <div className="">
                            Showing {dataSpatials.from} to {dataSpatials.from} total{" "} {dataSpatials.total}
                        </div>
                        <div className="flex items-center gap-2">
                            {dataSpatials.links.map((link, index) => (
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
