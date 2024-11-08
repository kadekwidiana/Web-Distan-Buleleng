import ButtonBack from '@/Components/Button/Back';
import MapsDetailData from '@/Components/Maps/MapsDetailData';
import { ABILITY_CLASSES } from '@/Constant/Class';
import { CONFIRMATION_STATUSES, GROUP_STATUSES } from '@/Constant/Status';
import BackpageLayout from '@/Layouts/BackpageLayout';
import { formatDateToIndonesian } from '@/Utils/formatDateToIndonesian';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Carousel } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

export default function DetailGapoktanPage() {
    const { poktanById, districtId } = usePage().props;

    let photos = [];
    try {
        photos = JSON.parse(poktanById.photo) || [];
    } catch (e) {
        photos = [];
    }

    return (
        <BackpageLayout>
            <Head title="Detail Poktan" />
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2 shadow-default sm:px-7.5 xl:pb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                        <div className="relative overflow-x-auto">
                            <ButtonBack url={`/kelembagaan-pertanian/poktan/kecamatan/${districtId}`} />
                            <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                                <tbody>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Nama Gapoktan</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{poktanById.name}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Ketua</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{poktanById.leader}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Sekretaris</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{poktanById.secretary}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Bendahara</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{poktanById.treasurer}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Jumlah Anggota</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{poktanById.number_of_members}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Sejak</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{poktanById.since}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Desa</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{poktanById.village.name}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Alamat</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{poktanById.address}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Kelas Kemampuan</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{ABILITY_CLASSES.find((abilityClass) => poktanById.ability_class === abilityClass.value)?.label}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Status Grup</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{GROUP_STATUSES.find((groupStatus) => poktanById.status === groupStatus.value)?.label}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Status Konfirmasi</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{CONFIRMATION_STATUSES.find((confirmationStatus) => poktanById.group_confirmation_status === confirmationStatus.value)?.label}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Tahun Kelas Kemampuan</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{poktanById.year_of_class_assignment}</td>
                                    </tr>
                                    {/* <tr className="bg-white">
                                    <td className="pr-2 py-2 w-1/5">Unit Usaha</td>
                                    <td className="px-2 py-2 w-3">:</td>
                                    <td className="px-2 py-2 w-full">{JSON.parse(poktanById.business_unit).jasa_lainnya}</td>
                                </tr> */}
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Komoditas Yang Di Usahakan</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">
                                            {poktanById.commodities.length > 0 ? poktanById.commodities.map((commodity, index) => (
                                                <span key={index}>
                                                    {commodity.name}{index < poktanById.commodities.length - 1 ? ', ' : ''}
                                                </span>
                                            )) : 'No commodities'}
                                        </td>

                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Deskripsi</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{poktanById.description}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Data dibuat</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{formatDateToIndonesian(poktanById.created_at)}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Data diupdate</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{formatDateToIndonesian(poktanById.updated_at)}</td>
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
                        <MapsDetailData data={poktanById} />
                    </div>
                </div>
            </div>
        </BackpageLayout>
    );
}
