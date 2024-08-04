import ButtonAdd from '@/Components/Button/Add';
import MultiSelect from '@/Components/Input/MultiSelect';
import BackpageLayout from '@/Layouts/BackpageLayout'
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Dropdown, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'

export default function ListOutreachActivitiesRegencyPage() {
    const { districtWithOutreachActivities } = usePage().props;

    // Menghitung total jumlah Gapoktan
    const totalData = districtWithOutreachActivities.reduce((total, district) => total + district.outreach_activities_count, 0);

    const handleRowClick = (districtId) => {
        router.get(`/penyuluhan/kecamatan/${districtId}`);
    };

    return (
        <BackpageLayout>
            <Head title="Kegiatan Penyuluhan" />
            {/* <Link href='/ppl/input'>Input</Link> */}
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
                <h1 className='text-2xl font-semibold text-gray-800 mb-2 capitalize'>Daftar Kegiatan Penyuluhan Di Kabupaten Buleleng</h1>
                <div className="flex flex-col my-2">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell className='w-5'>NO</Table.HeadCell>
                            <Table.HeadCell>NAMA KECAMATAN</Table.HeadCell>
                            <Table.HeadCell>JUMLAH KEGIATAN PENYULUHAN</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {districtWithOutreachActivities.map((district, index) => (
                                <Table.Row key={index} onClick={() => handleRowClick(district.id)} className="bg-white hover:bg-gray-200 cursor-pointer">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 w-5">
                                        {index + 1}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                                        {district.name}
                                    </Table.Cell>
                                    <Table.Cell>{district.outreach_activities_count}</Table.Cell>
                                </Table.Row>
                            ))}
                            <Table.Row className="bg-white">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 w-5">

                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-semibold text-gray-900 text-end">
                                    Total kegiatan penyuluhan
                                </Table.Cell>
                                <Table.Cell className='text-gray-900 font-semibold'>{totalData}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </BackpageLayout>
    )
}
