import MultiSelect from '@/Components/Input/MultiSelect';
import MapsPPL from '@/Components/Maps/MapsPPL';
import BackpageLayout from '@/Layouts/BackpageLayout'
import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react'

export default function InputPPLPage() {

    // useScriptButtonClick();
    const [stepForm, setStepForm] = useState(1);
    const [statusStepNext, setStatusStepNext] = useState(false);

    const handlePreviousStep = () => {
        setStepForm(1)
    }

    const handleNextStep = () => {
        setStepForm(2)
        setStatusStepNext(true)
    }

    const [selectedOption, setSelectedOption] = useState('');
    const [isOptionSelected, setIsOptionSelected] = useState(false);
    const dateNow = new Date().toISOString().split('T')[0];

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    return (
        <BackpageLayout>
            <Head title="PPL" />
            <div className="mb-4 shadow-md">
                <ol className="flex items-center w-full p-3 space-x-1 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
                    <li onClick={handlePreviousStep} className="flex items-center text-blue-600 cursor-pointer">
                        <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0">
                            1
                        </span>
                        Kewilayahan & Potensi Pertanian
                        <svg className="w-3 h-3 ms-2 sm:ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                        </svg>
                    </li>
                    <li onClick={handleNextStep} className={`flex items-center ${stepForm === 2 && 'text-blue-600'} cursor-pointer`}>
                        <span className={`flex items-center justify-center w-5 h-5 me-2 text-xs border ${stepForm === 2 ? 'border-blue-600' : 'border-gray-500'}  rounded-full shrink-0`}>
                            2
                        </span>
                        Data Lahan & Maps
                    </li>
                </ol>
            </div>
            <div className={`${stepForm === 1 ? '' : 'hidden'} grid grid-cols-1 gap-4 sm:grid-cols-2`}>
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke shadow-md bg-white shadow-default">
                        <div className="flex flex-col gap-5 p-6">
                            <div>
                                <div>
                                    <label className="mb-3 block text-black">
                                        Nama Pegawai
                                    </label>
                                    <input
                                        defaultValue={'Kadek (010101)'}
                                        type="text"
                                        placeholder="Masukan nama user"
                                        className="w-full rounded-md bg-white border border-gray-400 py-3 px-5 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* other div */}
                </div>
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke shadow-md bg-white shadow-default">
                        <div className="flex flex-col gap-5 p-6">
                            <div>
                                <div>
                                    <label className="mb-3 block text-black">
                                        Tanggal Input
                                    </label>
                                    <input
                                        defaultValue={dateNow}
                                        type="date"
                                        placeholder="Masukan nama user"
                                        className="w-full rounded-md bg-white border border-gray-400 py-3 px-5 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* other div */}
                </div>

                <div className="flex flex-col gap-9">
                    {/* <!-- Input Fields --> */}
                    <div className="rounded-sm border border-stroke shadow-md bg-white shadow-default">
                        <div className="border-b border-gray-300 border-stroke py-4 px-6">
                            <h3 className="font-medium text-black">
                                Kewilayahan
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5 p-6">
                            <div>
                                <label className="mb-3 block text-black">
                                    Kecamatan
                                </label>

                                <div className="relative z-20 bg-white">
                                    <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2 text-gray-600">
                                        <i className="fa-solid fa-globe"></i>
                                    </span>

                                    <select
                                        // value=''
                                        // onChange={(e) => {
                                        //     setSelectedOption(e.target.value);
                                        //     changeTextColor();
                                        // }}
                                        className={`relative z-20 w-full appearance-none rounded-md bg-transparent py-3 px-12 bg-white border border-gray-400 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500 ${isOptionSelected ? 'text-black' : ''
                                            }`}
                                    >
                                        <option value="" className="text-body">
                                            -- Pilih Kecamatan --
                                        </option>
                                        <option value="Buleleng" className="text-body">
                                            Buleleng
                                        </option>
                                        <option value="Sukasada" className="text-body">
                                            Sukasada
                                        </option>
                                        <option value="Gerokgak" className="text-body">
                                            Gerokgak
                                        </option>
                                        <option value="Kubutambahan" className="text-body">
                                            Kubutambahan
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block text-black">
                                    Kelurahan/Desa
                                </label>

                                <div className="relative z-20 bg-white">
                                    <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2 text-gray-600">
                                        <i className="fa-solid fa-globe"></i>
                                    </span>

                                    <select
                                        // value=''
                                        // onChange={(e) => {
                                        //     setSelectedOption(e.target.value);
                                        //     changeTextColor();
                                        // }}
                                        className={`relative z-20 w-full appearance-none rounded-md bg-transparent py-3 px-12 bg-white border border-gray-400 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500 ${isOptionSelected ? 'text-black' : ''
                                            }`}
                                    >
                                        <option value="" className="text-body">
                                            -- Pilih Kelurahan/Desa --
                                        </option>
                                        <option value="Desa 1" className="text-body">
                                            Desa 1
                                        </option>
                                        <option value="Desa 2" className="text-body">
                                            Desa 2
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block text-black">
                                    Gabungan Kelompok Tani
                                </label>

                                <div className="relative z-20 bg-white">
                                    <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2 text-gray-600">
                                        <i className="fa-solid fa-users-viewfinder"></i>
                                    </span>

                                    <select
                                        // value=''
                                        // onChange={(e) => {
                                        //     setSelectedOption(e.target.value);
                                        //     changeTextColor();
                                        // }}
                                        className={`relative z-20 w-full appearance-none rounded-md bg-transparent py-3 px-12 bg-white border border-gray-400 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500 ${isOptionSelected ? 'text-black' : ''
                                            }`}
                                    >
                                        <option value="" className="text-body">
                                            -- Pilih Gabungan Kelompok Tani --
                                        </option>
                                        <option value="Gabungan Kelompok Tani 1" className="text-body">
                                            Gabungan Kelompok Tani 1
                                        </option>
                                        <option value="Gabungan Kelompok Tani 2" className="text-body">
                                            Gabungan Kelompok Tani 2
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block text-black">
                                    Kelompok Tani
                                </label>

                                <div className="relative z-20 bg-white">
                                    <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2 text-gray-600">
                                        <i className="fa-solid fa-users-rays"></i>
                                    </span>

                                    <select
                                        // value=''
                                        // onChange={(e) => {
                                        //     setSelectedOption(e.target.value);
                                        //     changeTextColor();
                                        // }}
                                        className={`relative z-20 w-full appearance-none rounded-md bg-transparent py-3 px-12 bg-white border border-gray-400 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500 ${isOptionSelected ? 'text-black' : ''
                                            }`}
                                    >
                                        <option value="" className="text-body">
                                            -- Pilih Kelompok Tani --
                                        </option>
                                        <option value="Kelompok Tani 1" className="text-body">
                                            Kelompok Tani 1
                                        </option>
                                        <option value="Kelompok Tani 2" className="text-body">
                                            Kelompok Tani 2
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block text-black">
                                    Subak
                                </label>

                                <div className="relative z-20 bg-white">
                                    <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2 text-gray-600">
                                        <i className="fa-solid fa-people-roof"></i>
                                    </span>

                                    <select
                                        // value=''
                                        // onChange={(e) => {
                                        //     setSelectedOption(e.target.value);
                                        //     changeTextColor();
                                        // }}
                                        className={`relative z-20 w-full appearance-none rounded-md bg-transparent py-3 px-12 bg-white border border-gray-400 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500 ${isOptionSelected ? 'text-black' : ''
                                            }`}
                                    >
                                        <option value="" className="text-body">
                                            -- Pilih Subak --
                                        </option>
                                        <option value="Subak 1" className="text-body">
                                            Subak 1
                                        </option>
                                        <option value="Subak 2" className="text-body">
                                            Subak 2
                                        </option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* other div */}
                </div>
                <div className="flex flex-col gap-9">
                    {/* <!-- Input Fields --> */}
                    <div className="rounded-sm border border-stroke shadow-md bg-white shadow-default">
                        <div className="border-b border-gray-300 border-stroke py-4 px-6">
                            <h3 className="font-medium text-black">
                                Potensi Pertanian
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5 p-6">
                            <MultiSelect id="multiSelect" title='Komoditi' optionDatas={['Kacang', 'Padi', 'Sayur']} />
                            <div>
                                <label className="mb-3 block text-black">
                                    Jenis Lahan
                                </label>

                                <div className="relative z-20 bg-white">
                                    <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2 text-gray-600">
                                        <i className="fa-solid fa-wheat-awn"></i>
                                    </span>

                                    <select
                                        // value=''
                                        // onChange={(e) => {
                                        //     setSelectedOption(e.target.value);
                                        //     changeTextColor();
                                        // }}
                                        className={`relative z-20 w-full appearance-none rounded-md bg-transparent py-3 px-12 bg-white border border-gray-400 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500 ${isOptionSelected ? 'text-black' : ''
                                            }`}
                                    >
                                        <option value="" className="text-body">
                                            -- Pilih Jenis Lahan --
                                        </option>
                                        <option value="Lahan Basah" className="text-body">
                                            Lahan Basah
                                        </option>
                                        <option value="Lahan Kering" className="text-body">
                                            Lahan Kering
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block text-black">
                                    Jumlah Perkiraan Panen (.kg)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Cth. 100"
                                    className="w-full rounded-md bg-white border border-gray-400 py-3 px-5 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="mb-3 block text-black">
                                    Waktu Rata" Panen (bulan/hari)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Cth. 4 Bulan 15 Hari"
                                    className="w-full rounded-md bg-white border border-gray-400 py-3 px-5 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                    {/* other div */}
                </div>
            </div>

            <div className={`${stepForm === 2 ? '' : 'hidden'} grid grid-cols-1 gap-4 lg:grid-cols-3 w-full`}>
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke shadow-md bg-white shadow-default">
                        <div className="border-b border-stroke py-4 px-6">
                            <h3 className="font-medium text-black">
                                Data Lahan
                            </h3>
                        </div>
                        <div className="flex flex-col gap-5 p-6">
                            <div>
                                <label className="mb-3 block text-black">
                                    Kepemilikan
                                </label>
                                <input
                                    type="text"
                                    placeholder="Masukan nama pemilik"
                                    className="w-full rounded-md bg-white border border-gray-400 py-3 px-5 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="mb-3 block text-black">
                                    Alamat/Lokasi
                                </label>
                                <input
                                    id='address'
                                    type="text"
                                    placeholder="Masukan Alamat/Lokasi"
                                    className="w-full rounded-md bg-white border border-gray-400 py-3 px-5 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black">
                                        Koordinat Latitude
                                    </label>
                                    <input
                                        disabled
                                        id='latitude'
                                        type="text"
                                        placeholder="Latitude"
                                        className="w-full rounded-md bg-white border border-gray-400 py-3 px-5 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black">
                                        Koordinat Longitude
                                    </label>
                                    <input
                                        disabled
                                        id='longitude'
                                        type="text"
                                        placeholder="Longitude"
                                        className="w-full rounded-md bg-white border border-gray-400 py-3 px-5 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-3 block text-black">
                                    Area
                                </label>
                                <textarea
                                    disabled
                                    id='aoi'
                                    rows={2}
                                    placeholder="Area.."
                                    className="w-full rounded-md bg-white border border-gray-400 py-3 px-5 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500"
                                ></textarea>
                            </div>
                            <div>
                                <label className="mb-3 block text-black">
                                    Luas Lahan (meter persegi)
                                </label>
                                <input
                                    id='wide'
                                    type="text"
                                    placeholder="Cth. 300"
                                    className="w-full rounded-md bg-white border border-gray-400 py-3 px-5 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="mb-3 block text-black">
                                    Gambar
                                </label>
                                <input
                                    type="file"
                                    className="w-full cursor-pointer rounded-md bg-white border border-gray-400 py-2 px-2 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="mb-3 block text-black">
                                    Catatan
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Catatan.."
                                    className="w-full rounded-md bg-white border border-gray-400 py-3 px-5 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                {stepForm === 2
                    ?
                    <MapsPPL></MapsPPL>
                    :
                    statusStepNext === true &&
                    <MapsPPL></MapsPPL>
                }
            </div>

            <div className="my-2 flex justify-between ">
                <button onClick={handlePreviousStep}
                    className="inline-flex items-center justify-center rounded-md bg-red-500 px-5 py-3 text-center font-medium text-white hover:bg-opacity-90">
                    Kembali
                </button>
                <button onClick={handleNextStep}
                    className="inline-flex items-center justify-center rounded-md bg-blue-500  px-5 py-3 text-center font-medium text-white hover:bg-opacity-90">
                    {stepForm === 2 ? 'Simpan' : 'Lanjut'}
                </button>
            </div>
        </BackpageLayout>
    )
}
