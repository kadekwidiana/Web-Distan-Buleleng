import ButtonBack from '@/Components/Button/Back';
import MapsDetailData from '@/Components/Maps/MapsDetailData';
import BackpageLayout from '@/Layouts/BackpageLayout'
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import axios from 'axios';
import { Carousel } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { format } from 'date-fns';

export default function DetailOutreachActivityPage() {
    const { outreachActivityById, districtId } = usePage().props;
    console.log(outreachActivityById);
    let photos = [];
    try {
        photos = JSON.parse(outreachActivityById.photo) || [];
    } catch (e) {
        photos = [];
    }

    return (
        <BackpageLayout>
            <Head title="Detail Kegiatan Penyuluhan" />
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2 shadow-default sm:px-7.5 xl:pb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                        <div className="relative overflow-x-auto">
                            <ButtonBack url={`/penyuluhan/kecamatan/${districtId}`} />
                            <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                                <tbody>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Judul</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{outreachActivityById.title}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Alamat/Lokasi</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{outreachActivityById.address}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">File/Dokumen</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        {outreachActivityById.file &&
                                            <td className="px-2 py-2 w-full flex justify-start gap-2 items-center">
                                                <a href={`/storage/${outreachActivityById.file}`} target='_blank' className="w-auto p-1 border rounded-md text-white bg-cyan-800">Lihat File</a>
                                                <a href={`/storage/${outreachActivityById.file}`} target='_blank' className="w-auto p-1 border rounded-md text-white bg-cyan-800" download>Download</a>
                                            </td>
                                        }
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Catatan</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{outreachActivityById.notes}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Laporan Kegiatan</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{outreachActivityById.activity_report}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Tanggal Di Buat</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{format(new Date(outreachActivityById.created_at), 'dd MMMM yyyy')}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Gapoktan Yang Terlibat</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">
                                            {outreachActivityById.gapoktan_outreach_activities.length > 0 ? outreachActivityById.gapoktan_outreach_activities.map((data, index) => (
                                                <span key={index}>
                                                    {data.name}{index < outreachActivityById.gapoktan_outreach_activities.length - 1 ? ', ' : ''}
                                                </span>
                                            )) : '-'}
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Poktan Yang Terlibat</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">
                                            {outreachActivityById.poktan_outreach_activities.length > 0 ? outreachActivityById.poktan_outreach_activities.map((data, index) => (
                                                <span key={index}>
                                                    {data.name}{index < outreachActivityById.poktan_outreach_activities.length - 1 ? ', ' : ''}
                                                </span>
                                            )) : '-'}
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Subak Yang Terlibat</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">
                                            {outreachActivityById.subak_outreach_activities.length > 0 ? outreachActivityById.subak_outreach_activities.map((data, index) => (
                                                <span key={index}>
                                                    {data.name}{index < outreachActivityById.subak_outreach_activities.length - 1 ? ', ' : ''}
                                                </span>
                                            )) : '-'}
                                        </td>
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
                        <MapsDetailData data={outreachActivityById} />
                    </div>
                </div>
            </div>
        </BackpageLayout>
    )
}
