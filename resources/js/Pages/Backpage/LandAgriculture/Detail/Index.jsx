import ButtonBack from '@/Components/Button/Back';
import MapsDetailData from '@/Components/Maps/MapsDetailData';
import BackpageLayout from '@/Layouts/BackpageLayout'
import { formatDateToIndonesian } from '@/Utils/formatDateToIndonesian';
import { generateCommoditiesCycleHtml } from '@/Utils/generateCommoditiesCycleHtml';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import axios from 'axios';
import { Carousel } from 'flowbite-react';
import React, { useEffect, useState } from 'react'

export default function DetailLandAgriculturePage() {
    const { landAgricultureById, districtId } = usePage().props;

    let photos = [];
    try {
        photos = JSON.parse(landAgricultureById.photo) || [];
    } catch (e) {
        photos = [];
    }

    return (
        <BackpageLayout>
            <Head title="Detail Gapoktan" />
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2 shadow-default sm:px-7.5 xl:pb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                        <div className="relative overflow-x-auto">
                            <ButtonBack url={`/lahan_pertanian/kecamatan/${districtId}`} />
                            <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                                <tbody>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Pemilik</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{landAgricultureById.owner.name}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Penggarap</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{landAgricultureById?.cultivator?.name ?? '-'}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Poktan</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{landAgricultureById?.poktan?.name ?? '-'}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Subak</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{landAgricultureById?.subak?.name ?? '-'}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Jenis Lahan</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{landAgricultureById.type_land_agriculture.name}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Luas</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{landAgricultureById.land_area} are (m²)</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Komoditas Lahan</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">
                                            {landAgricultureById.commodities.length > 0 ? landAgricultureById.commodities.map((commodity, index) => (
                                                <span key={index}>
                                                    {commodity.name}{index < landAgricultureById.commodities.length - 1 ? ', ' : ''}
                                                </span>
                                            )) : 'No commodities'}
                                        </td>

                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Siklus Komoditas</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full" dangerouslySetInnerHTML={{ __html: generateCommoditiesCycleHtml(JSON.parse(landAgricultureById.commodities_cycle)) }}></td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Alamat</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{landAgricultureById.address}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Deskripsi</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{landAgricultureById.description ?? '-'}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Data dibuat</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{formatDateToIndonesian(landAgricultureById.created_at)}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Data diupdate</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{formatDateToIndonesian(landAgricultureById.updated_at)}</td>
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
                        <MapsDetailData data={landAgricultureById} />
                    </div>
                </div>
            </div>
        </BackpageLayout>
    )
}
