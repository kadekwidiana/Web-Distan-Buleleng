import ButtonBack from '@/Components/Button/Back';
import MapsDetailData from '@/Components/Maps/MapsDetailData';
import BackpageLayout from '@/Layouts/BackpageLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Carousel } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { formatDateToIndonesian } from '@/Utils/formatDateToIndonesian';
import { DATA_STATUSES } from '@/Constant/Status';

export default function DetailDataSpatialPage() {
    const { dataSpatialById, districtId } = usePage().props;

    return (
        <BackpageLayout>
            <Head title="Detail Kegiatan Penyuluhan" />
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2 shadow-default sm:px-7.5 xl:pb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                        <div className="relative overflow-x-auto">
                            <ButtonBack url={`/data-spasial`} />
                            <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                                <tbody>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Nama</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{dataSpatialById.name}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Tipe</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{dataSpatialById.type}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Layer Grup</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{dataSpatialById.layer_group.name}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Status</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{DATA_STATUSES.find((dataStatus) => dataSpatialById.status === dataStatus.value)?.label}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Warna</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">
                                            <div
                                                className="w-5 h-5"
                                                style={{ backgroundColor: dataSpatialById.color }}
                                            ></div>
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">File</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        {dataSpatialById.file &&
                                            <td className="px-2 py-2 w-full flex justify-start gap-2 items-center">
                                                <a href={`/storage/${dataSpatialById.file}`} target='_blank' className="w-auto p-1 px-2 border rounded-[4px] text-white bg-cyan-800">Lihat File</a>
                                                <a href={`/storage/${dataSpatialById.file}`} target='_blank' className="w-auto p-1 px-2 border rounded-[4px] text-white bg-cyan-800" download>Download</a>
                                            </td>
                                        }
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Deskripsi</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{dataSpatialById.description ?? '-'}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Data dibuat</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{formatDateToIndonesian(dataSpatialById.created_at)}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Data diupdate</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{formatDateToIndonesian(dataSpatialById.updated_at)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <MapsDetailData data={dataSpatialById} isSpatial={true} />
                    </div>
                </div>
            </div>
        </BackpageLayout>
    );
}
