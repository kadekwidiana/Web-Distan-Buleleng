import ButtonBack from '@/Components/Button/Back';
import MapsDetailData from '@/Components/Maps/MapsDetailData';
import BackpageLayout from '@/Layouts/BackpageLayout'
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import axios from 'axios';
import { Carousel } from 'flowbite-react';
import React, { useEffect, useState } from 'react'

export default function DetailGapoktanPage() {
    const { gapoktanById, districtId } = usePage().props;

    let photos = [];
    try {
        photos = JSON.parse(gapoktanById.photo) || [];
    } catch (e) {
        photos = [];
    }

    const options = {
        method: 'POST',
        url: 'https://indonesia-ktp-parser-validator.p.rapidapi.com/ktp_validator',
        headers: {
            'x-rapidapi-key': '4b054dde98msh97da94139fa576ep1a0ea4jsn9c3559679671',
            'x-rapidapi-host': 'indonesia-ktp-parser-validator.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            nik: '5107073112030001'
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.request(options);
                console.log(response.data);
                console.log(response.status);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])


    return (
        <BackpageLayout>
            <Head title="Detail Gapoktan" />
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2 shadow-default sm:px-7.5 xl:pb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                        <div className="relative overflow-x-auto">
                            <ButtonBack url={`/kelembagaan-pertanian/gapoktan/kecamatan/${districtId}`} />
                            <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                                <tbody>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Nama Gapoktan</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{gapoktanById.name}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Ketua</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{gapoktanById.leader}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Sekretaris</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{gapoktanById.secretary}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Bendahara</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{gapoktanById.treasurer}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Jumlah Anggota</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{gapoktanById.number_of_members}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Sejak</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{gapoktanById.since}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Alamat</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{gapoktanById.address}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">SK Konfirmasi</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{gapoktanById.confirmation_sk}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Nomor SK</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{gapoktanById.confirmation_sk_no}</td>
                                    </tr>
                                    {/* <tr className="bg-white">
                                    <td className="pr-2 py-2 w-1/5">Unit Usaha</td>
                                    <td className="px-2 py-2 w-3">:</td>
                                    <td className="px-2 py-2 w-full">{JSON.parse(gapoktanById.business_unit).jasa_lainnya}</td>
                                </tr> */}
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Usaha Pertanian</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{gapoktanById.farming_business}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Proses Usaha</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{gapoktanById.business_process}</td>
                                    </tr>
                                    {/* <tr className="bg-white">
                                    <td className="pr-2 py-2 w-1/5">Peralatan dan Mesin</td>
                                    <td className="px-2 py-2 w-3">:</td>
                                    <td className="px-2 py-2 w-full">{JSON.parse(gapoktanById.tools_and_machines).traktor}</td>
                                </tr> */}
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Deskripsi</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{gapoktanById.description}</td>
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
                        <MapsDetailData data={gapoktanById} />
                    </div>
                </div>
            </div>
        </BackpageLayout>
    )
}
