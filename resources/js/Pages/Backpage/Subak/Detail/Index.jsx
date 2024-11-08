import ButtonBack from '@/Components/Button/Back';
import MapsDetailData from '@/Components/Maps/MapsDetailData';
import { GROUP_STATUSES } from '@/Constant/Status';
import BackpageLayout from '@/Layouts/BackpageLayout';
import { formatDateToIndonesian } from '@/Utils/formatDateToIndonesian';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Carousel } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

export default function DetailSubakPage() {
    const { subakById, districtId } = usePage().props;

    let photos = [];
    try {
        photos = JSON.parse(subakById.photo) || [];
    } catch (e) {
        photos = [];
    }

    return (
        <BackpageLayout>
            <Head title="Detail Subak" />
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2 shadow-default sm:px-7.5 xl:pb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                        <div className="relative overflow-x-auto">
                            <ButtonBack url={`/kelembagaan-pertanian/subak/kecamatan/${districtId}`} />
                            <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                                <tbody>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Nama</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{subakById.name}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Ketua</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{subakById.leader}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Sekretaris</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{subakById.secretary}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Bendahara</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{subakById.treasurer}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Jumlah Anggota</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{subakById.number_of_members}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Sejak</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{subakById.since}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Grup Status</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{GROUP_STATUSES.find((groupStatus) => subakById.status === groupStatus.value)?.label}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Desa</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{subakById.village.name}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Alamat</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{subakById.address}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Komoditas</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">
                                            {subakById.commodities.length > 0 ? subakById.commodities.map((commodity, index) => (
                                                <span key={index}>
                                                    {commodity.name}{index < subakById.commodities.length - 1 ? ', ' : ''}
                                                </span>
                                            )) : 'No commodities'}
                                        </td>

                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Deskripsi</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{subakById.description}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Data dibuat</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{formatDateToIndonesian(subakById.created_at)}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Data diupdate</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{formatDateToIndonesian(subakById.updated_at)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="h-80">
                            <Carousel>
                                {photos.length > 0 ? photos.map((photo, index) => (
                                    <img key={index} src={photo || "https://flowbite.com/docs/images/carousel/carousel-1.svg"} alt={`Photo ${index + 1}`} className='w-full' />
                                )) :
                                    <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="Default" />
                                }
                            </Carousel>
                        </div>
                        <MapsDetailData data={subakById} />
                    </div>
                </div>
            </div>
        </BackpageLayout>
    );
}
