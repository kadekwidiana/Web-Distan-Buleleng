import ButtonBack from '@/Components/Button/Back';
import MapsDetailData from '@/Components/Maps/MapsDetailData';
import { GROUP_STATUSES } from '@/Constant/Status';
import BackpageLayout from '@/Layouts/BackpageLayout';
import { formatDateToIndonesian } from '@/Utils/formatDateToIndonesian';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Carousel } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

export default function DetailGapoktanPage() {
    const { gapoktanById, districtId } = usePage().props;

    let photos = [];
    try {
        photos = JSON.parse(gapoktanById.photo) || [];
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
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Status</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{GROUP_STATUSES.find((groupStatus) => gapoktanById.status === groupStatus.value)?.label}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Unit Usaha</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">
                                            {(() => {
                                                const businessUnit = JSON.parse(gapoktanById.business_unit);
                                                const activeUnits = [];

                                                if (businessUnit?.sp_produksi) activeUnits.push('SP Produksi');
                                                if (businessUnit?.pemasaran) activeUnits.push('Pemasaran');
                                                if (businessUnit?.keuangan_mikro) activeUnits.push('Keuangan Mikro');

                                                return (
                                                    <>
                                                        {activeUnits.join(', ')}
                                                        {businessUnit?.jasa_lainnya && `, Jasa Lainnya: ${businessUnit.jasa_lainnya}`}
                                                    </>
                                                );
                                            })()}
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Peralatan dan Mesin</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">
                                            {(() => {
                                                const toolsAndMachines = JSON.parse(gapoktanById.tools_and_machines);
                                                const toolDescriptions = [];

                                                if (toolsAndMachines?.traktor) toolDescriptions.push(`Traktor: ${toolsAndMachines.traktor}`);
                                                if (toolsAndMachines?.hand_traktor) toolDescriptions.push(`Hand Traktor: ${toolsAndMachines.hand_traktor}`);
                                                if (toolsAndMachines?.pompa_air) toolDescriptions.push(`Pompa Air: ${toolsAndMachines.pompa_air}`);
                                                if (toolsAndMachines?.mesin_penggiling_padi) toolDescriptions.push(`Mesin Penggiling Padi: ${toolsAndMachines.mesin_penggiling_padi}`);
                                                if (toolsAndMachines?.mesin_pengering) toolDescriptions.push(`Mesin Pengering: ${toolsAndMachines.mesin_pengering}`);
                                                if (toolsAndMachines?.mesin_pencacah) toolDescriptions.push(`Mesin Pencacah: ${toolsAndMachines.mesin_pencacah}`);
                                                if (toolsAndMachines?.lainnya) toolDescriptions.push(`Lainnya: ${toolsAndMachines.lainnya}`);

                                                return toolDescriptions.join(', ');
                                            })()}
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Deskripsi</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{gapoktanById.description}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Data dibuat</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{formatDateToIndonesian(gapoktanById.created_at)}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Data diupdate</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{formatDateToIndonesian(gapoktanById.updated_at)}</td>
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
    );
}
