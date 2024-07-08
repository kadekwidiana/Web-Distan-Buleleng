import ButtonAdd from '@/Components/Button/Add';
import MultiSelect from '@/Components/Input/MultiSelect';
import BackpageLayout from '@/Layouts/BackpageLayout'
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Dropdown, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'

export default function ListGapoktanRegencyPage() {
    const { districtWithGapoktans } = usePage().props;
    // console.log(usePage().props);
    const handleRowClick = (districtId) => {
        router.get(`/kelembagaan-pertanian/gapoktan/kecamatan/${districtId}`);
    };
    return (
        <BackpageLayout>
            <Head title="Gapoktan" />
            {/* <Link href='/ppl/input'>Input</Link> */}
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
                <h1 className='text-2xl font-semibold text-gray-800 mb-2 capitalize'>Daftar Gapoktan Di Kabupaten Buleleng</h1>
                <div className="flex justify-between gap-2 sm:gap-10">
                    <form className="relative w-1/2">
                        <div className="relative w-full">
                            <input
                                type="text" id={''} className="rounded-lg border-2 border-gray-300 text-gray-900 text-sm block w-full p-2.5 focus:ring-0 focus:ring-blue-500 focus:border-bluering-blue-500 focus:outline-none focus-visible:outline-none" placeholder={'Cari data...'} required />
                            <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.7 14.3L11.5 10.1C11.3 9.9 11 9.8 10.7 9.8C11.5 8.8 12 7.4 12 6C12 2.7 9.3 0 6 0C2.7 0 0 2.7 0 6C0 9.3 2.7 12 6 12C7.4 12 8.8 11.5 9.8 10.6C9.8 10.9 9.8 11.2 10.1 11.4L14.3 15.6C14.5 15.8 14.8 15.9 15 15.9C15.2 15.9 15.5 15.8 15.7 15.6C16.1 15.3 16.1 14.7 15.7 14.3ZM6 10.5C3.5 10.5 1.5 8.5 1.5 6C1.5 3.5 3.5 1.5 6 1.5C8.5 1.5 10.5 3.5 10.5 6C10.5 8.5 8.5 10.5 6 10.5Z" fill="#1C2E45" fillOpacity="0.6" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col my-2">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell className='w-5'>NO</Table.HeadCell>
                            <Table.HeadCell>NAMA KECAMATAN</Table.HeadCell>
                            <Table.HeadCell>JUMLAH GAPOKTAN</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {districtWithGapoktans.map((district, index) => (
                                <Table.Row key={index} onClick={() => handleRowClick(district.id)} className="bg-white hover:bg-gray-200 cursor-pointer">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 w-5">
                                        {index + 1}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {district.name}
                                    </Table.Cell>
                                    <Table.Cell>{district.gapoktans_count}</Table.Cell>
                                </Table.Row>
                            ))}

                        </Table.Body>
                    </Table>
                </div>
            </div>
        </BackpageLayout >
    )
}
