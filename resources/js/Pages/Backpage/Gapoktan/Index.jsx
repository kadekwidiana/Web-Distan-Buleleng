import ButtonAdd from '@/Components/Button/Add';
import MultiSelect from '@/Components/Input/MultiSelect';
import BackpageLayout from '@/Layouts/BackpageLayout'
import { Head, Link, usePage } from '@inertiajs/react';
import { Dropdown, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'

export default function IndexGapoktanPage() {
    const { dataGapoktans } = usePage().props;
    return (
        <BackpageLayout>
            <Head title="Gapoktan" />
            {/* <Link href='/ppl/input'>Input</Link> */}
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
                <div className="flex justify-between gap-2 sm:gap-10">
                    <div className="flex w-full">
                        <select id="countries" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-0 focus:ring-blue-500 focus:border-bluering-blue-500 focus:outline-none focus-visible:outline-none">
                            <option value={10} defaultChecked>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                        <select name='filter' id="filter" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-0 focus:ring-blue-500 focus:border-bluering-blue-500 focus:outline-none focus-visible:outline-none">
                            <option value="" defaultChecked>Semua</option>
                            <option value="" >Buleleng</option>
                        </select>
                        <select name='filter' id="filter" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-0 focus:ring-blue-500 focus:border-bluering-blue-500 focus:outline-none focus-visible:outline-none">
                            <option value="" defaultChecked>Semua</option>
                            <option value="">Penarukan</option>
                        </select>
                        <form className="relative w-full">
                            {/* <input name='search' type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm bg-gray-50 rounded-e-lg border-s-gray-50 border-s-1 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 focus:outline-none focus-visible:outline-none" placeholder="Search Postss..." />
                            <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-500 rounded-e-lg border border-blue-600 hover:bg-blue-600 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700">
                                Search
                            </button> */}
                            <div className="relative w-full">
                                <input
                                    type="text" id={''} className="rounded-e-lg border-s-gray-50 border-s-1 border-2 border-gray-300 text-gray-900 text-sm block w-full p-2.5 focus:ring-0 focus:ring-blue-500 focus:border-bluering-blue-500 focus:outline-none focus-visible:outline-none" placeholder={'Cari data...'} required />
                                <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.7 14.3L11.5 10.1C11.3 9.9 11 9.8 10.7 9.8C11.5 8.8 12 7.4 12 6C12 2.7 9.3 0 6 0C2.7 0 0 2.7 0 6C0 9.3 2.7 12 6 12C7.4 12 8.8 11.5 9.8 10.6C9.8 10.9 9.8 11.2 10.1 11.4L14.3 15.6C14.5 15.8 14.8 15.9 15 15.9C15.2 15.9 15.5 15.8 15.7 15.6C16.1 15.3 16.1 14.7 15.7 14.3ZM6 10.5C3.5 10.5 1.5 8.5 1.5 6C1.5 3.5 3.5 1.5 6 1.5C8.5 1.5 10.5 3.5 10.5 6C10.5 8.5 8.5 10.5 6 10.5Z" fill="#1C2E45" fillOpacity="0.6" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                    <ButtonAdd href={'#'} />
                </div>
                <div className="flex flex-col my-2">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell className='w-5'>NO</Table.HeadCell>
                            <Table.HeadCell>NAMA</Table.HeadCell>
                            <Table.HeadCell>KETUA</Table.HeadCell>
                            <Table.HeadCell>JUMLAH ANGGOTA</Table.HeadCell>
                            <Table.HeadCell className='w-96'>ALAMAT</Table.HeadCell>
                            <Table.HeadCell className='flex justify-center'>
                                AKSI
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {dataGapoktans.map((dataGapoktan, index) => (
                                <Table.Row className="bg-white">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 w-5">
                                        {index + 1}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {dataGapoktan.name}
                                    </Table.Cell>
                                    <Table.Cell>{dataGapoktan.leader}</Table.Cell>
                                    <Table.Cell>{dataGapoktan.number_of_members}</Table.Cell>
                                    <Table.Cell className='w-96'>
                                        <p className='line-clamp-1 mr-3'>
                                            {dataGapoktan.address}
                                        </p>
                                    </Table.Cell>
                                    <Table.Cell className='flex justify-center items-center gap-3'>
                                        <button>
                                            <i className="fa-solid fa-circle-info fa-2xl text-green-500"></i>
                                        </button>

                                        <Dropdown placement="bottom-start" label="" dismissOnClick={false} renderTrigger={() =>
                                            <button>
                                                <i className="fa-solid fa-ellipsis fa-2xl"></i>
                                            </button>
                                        }>
                                            <Dropdown.Item><i className="mr-2 fa-solid fa-pen-to-square text-blue-500 fa-xl"></i>Edit</Dropdown.Item>
                                            <Dropdown.Item><i className="mr-2 fa-solid fa-trash fa-xl text-red-500"></i>Hapus</Dropdown.Item>
                                        </Dropdown>

                                    </Table.Cell>
                                </Table.Row>
                            ))}

                        </Table.Body>
                    </Table>
                </div>
            </div>
        </BackpageLayout >
    )
}
