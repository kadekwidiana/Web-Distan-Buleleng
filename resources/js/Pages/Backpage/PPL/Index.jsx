import MultiSelect from '@/Components/Input/MultiSelect';
import BackpageLayout from '@/Layouts/BackpageLayout'
import { Head, Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'

export default function IndexPPLPage() {
    return (
        <BackpageLayout>
            <Head title="PPL" />
            {/* <Link href='/ppl/input'>Input</Link> */}
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
                <div className="flex justify-between">
                    <h4 className="mb-6 text-xl font-semibold text-black">
                        List Data
                    </h4>
                    <Link
                        href="/ppl/input"
                        className="mb-2 inline-flex items-center justify-center rounded-md bg-blue-500 px-4 text-center font-medium text-white hover:bg-opacity-90"
                    >
                        Input Data
                    </Link>
                </div>

                <div className="flex flex-col">
                    <div className="grid grid-cols-3 rounded-sm bg-gray-200 sm:grid-cols-5">
                        <div className="p-2.5 xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Kelompok Tani
                            </h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Subak
                            </h5>
                        </div>
                        <div className="p-2.5 text-center xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Komoditi
                            </h5>
                        </div>
                        <div className="hidden p-2.5 text-center sm:block xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Luas Lahan
                            </h5>
                        </div>
                        <div className="hidden p-2.5 text-center sm:block xl:p-5">
                            <h5 className="text-sm font-medium uppercase xsm:text-base">
                                Aksi
                            </h5>
                        </div>
                    </div>
                    <div className={`grid grid-cols-3 sm:grid-cols-5 border-b border-stroke`}>
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                            {/* <div className="flex-shrink-0">
                                <img src='' alt="Brand" />
                            </div> */}
                            <p className="text-black">
                                Kelompok Tani 1
                            </p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black">Subak Abian</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-meta-3">Kacang, Pagi, Sayur</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-black">200 m2</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <Link
                                href="#"
                                className="mx-1 inline-flex items-center justify-center rounded-md border-2 border-green-500 p-1 text-center font-medium text-primary hover:bg-opacity-90"
                            >
                                Detail
                            </Link>
                            <Link
                                href="#"
                                className="mx-1 inline-flex items-center justify-center rounded-md border-2 border-blue-500 p-1 text-center font-medium text-primary hover:bg-opacity-90"
                            >
                                Edit
                            </Link>
                            <Link
                                href="#"
                                className="mx-1 inline-flex items-center justify-center rounded-md border-2 border-red-500 p-1 text-center font-medium text-primary hover:bg-opacity-90"
                            >
                                Hapus
                            </Link>
                        </div>
                    </div>
                    <div className={`grid grid-cols-3 sm:grid-cols-5 border-b border-stroke`}>
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                            {/* <div className="flex-shrink-0">
                                <img src='' alt="Brand" />
                            </div> */}
                            <p className="text-black">
                                Kelompok Tani 1
                            </p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black">Subak Abian</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-meta-3">Kacang, Pagi, Sayur</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-black">200 m2</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <Link
                                href="#"
                                className="mx-1 inline-flex items-center justify-center rounded-md border-2 border-green-500 p-1 text-center font-medium text-primary hover:bg-opacity-90"
                            >
                                Detail
                            </Link>
                            <Link
                                href="#"
                                className="mx-1 inline-flex items-center justify-center rounded-md border-2 border-blue-500 p-1 text-center font-medium text-primary hover:bg-opacity-90"
                            >
                                Edit
                            </Link>
                            <Link
                                href="#"
                                className="mx-1 inline-flex items-center justify-center rounded-md border-2 border-red-500 p-1 text-center font-medium text-primary hover:bg-opacity-90"
                            >
                                Hapus
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </BackpageLayout>
    )
}
