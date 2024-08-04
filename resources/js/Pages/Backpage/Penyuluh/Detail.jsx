import ButtonBack from '@/Components/Button/Back';
import MapsDetailData from '@/Components/Maps/MapsDetailData';
import BackpageLayout from '@/Layouts/BackpageLayout'
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import axios from 'axios';
import { Carousel } from 'flowbite-react';
import React, { useEffect, useState } from 'react'

export default function DetailPenyuluhPage() {
    const { pplById } = usePage().props;

    // let photos = [];
    // try {
    //     photos = JSON.parse(pplById.foto) || [];
    // } catch (e) {
    //     photos = [];
    // }

    return (
        <BackpageLayout>
            <Head title="Detail PPL" />
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2 shadow-default sm:px-7.5 xl:pb-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-3">
                        <div className="relative overflow-x-auto">
                            <ButtonBack url={`/ppl`} />
                            <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                                <tbody>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">NIP</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{pplById.nip}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">NIK</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{pplById.account.nik}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Nama</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{pplById.name}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Email</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{pplById.email}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Jabatan/Role</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{pplById.account.role}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Alamat</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">{pplById.address}</td>
                                    </tr>
                                    {[
                                        { label: 'Nomor Telepon', name: 'phone_number' },
                                        { label: 'Status Pegawai', name: 'employee_status' },
                                        { label: 'Gelar Depan', name: 'front_title' },
                                        { label: 'Gelar Belakang', name: 'back_title' },
                                        { label: 'Tempat Lahir', name: 'place_of_birth' },
                                        { label: 'Tanggal Lahir', name: 'date_of_birth' },
                                        { label: 'Jenis Kelamin', name: 'gender' },
                                        { label: 'Agama', name: 'religion' },
                                        { label: 'Bidang Keahlian', name: 'areas_of_expertise' },
                                        { label: 'Pendidikan Terakhir', name: 'last_education' },
                                        { label: 'Bidang Pendidikan', name: 'field_of_education' },
                                        { label: 'Jurusan', name: 'major' },
                                        { label: 'Nama Sekolah', name: 'school_name' },
                                        { label: 'Lokasi Kerja', name: 'work_location' },
                                        { label: 'Tanggal SK', name: 'date_sk' },
                                        { label: 'Tanggal SPMT', name: 'date_spmt' },
                                        { label: 'Posisi', name: 'position' },
                                        { label: 'Provinsi', name: 'provinsi' },
                                        { label: 'Kabupaten', name: 'regency' },
                                        { label: 'Kode Pos', name: 'post_code' }
                                    ].map((field, index) => (
                                        <tr key={index} className="bg-white">
                                            <td className="pr-2 py-2 w-1/5">{field.label}</td>
                                            <td className="px-2 py-2 w-3">:</td>
                                            <td className="px-2 py-2 w-full">
                                                {['date_of_birth', 'date_sk', 'date_spmt'].includes(field.name) ? pplById[field.name].split('T')[0] : pplById[field.name]}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="bg-white">
                                        <td className="pr-2 py-2 w-1/5">Wilayah Binaan</td>
                                        <td className="px-2 py-2 w-3">:</td>
                                        <td className="px-2 py-2 w-full">
                                            {pplById?.villages?.length > 0 ? pplById?.villages?.map((village, index) => (
                                                <span key={index}>
                                                    {village.name}{index < pplById?.villages?.length - 1 ? ', ' : ''}
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
                                <img src={pplById.account.foto ? `/storage/${pplById.account.foto}` : "https://flowbite.com/docs/images/carousel/carousel-1.svg"} alt={`Photo`} className='w-full' />

                            </Carousel>
                        </div>
                        {/* <MapsDetailData data={gapoktanById} /> */}
                    </div>
                </div>
            </div>
        </BackpageLayout>
    )
}
