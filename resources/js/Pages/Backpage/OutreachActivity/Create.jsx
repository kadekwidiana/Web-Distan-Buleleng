import { Toast } from '@/Components/Alert/Toast';
import Button from '@/Components/Button/Button';
import InputError from '@/Components/Error/InputError';
import InputLabel from '@/Components/Input/InputLabel';
import InputSelect from '@/Components/Input/InputSelect';
import SelectTwo from '@/Components/Input/InputSelectTwo';
import MultiSelect from '@/Components/Input/MultiSelect';
import TextInput from '@/Components/Input/TextInput';
import TextInputArea from '@/Components/Input/TextInputArea';
import MapsInputData from '@/Components/Maps/MapsInputData';
import BackpageLayout from '@/Layouts/BackpageLayout'
import { useStore } from '@/Store/Index.store';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow';

export default function CreateOutreachActivityPage() {
    const { auth } = usePage().props;
    const { locationInput, addressInput } = useStore(
        useShallow((state) => (
            {
                locationInput: state.locationInput,
                addressInput: state.addressInput,
            }
        )),
    );
    const [optionsGapoktan, setOptionsGapoktan] = useState([]); //untuk menyimpan options multi select nya bentuknya [{value, label}]
    const [selectedValuesGapoktan, setSelectedValuesGapoktan] = useState([]); //value options yang di pilih
    const [optionsPoktan, setOptionsPoktan] = useState([]); //untuk menyimpan options multi select nya bentuknya [{value, label}]
    const [selectedValuesPoktan, setSelectedValuesPoktan] = useState([]); //value options yang di pilih
    const [optionsSubak, setOptionsSubak] = useState([]); //untuk menyimpan options multi select nya bentuknya [{value, label}]
    const [selectedValuesSubak, setSelectedValuesSubak] = useState([]); //value options yang di pilih
    const { district, villages, ppls, gapoktans, poktans, subaks, errors } = usePage().props;
    const { data, setData, post, progress, processing, recentlySuccessful } = useForm({
        village_id: '',
        ppl_nip: '',
        title: '',
        location: '',
        address: '',
        photos: [],
        file: null,
        notes: '',
        activity_report: '',
        others_involved: '',
        gapoktan_outreach_activities: [],
        poktan_outreach_activities: [],
        subak_outreach_activities: [],
    });

    console.log('form data', data);

    gapoktans.forEach((gapoktan) => {
        if (!optionsGapoktan.some(option => option.value === gapoktan.id)) {
            optionsGapoktan.push({
                value: gapoktan.id,
                label: gapoktan.name
            });
        }
    });

    useEffect(() => {
        setData({
            ...data,
            gapoktan_outreach_activities: selectedValuesGapoktan,
        });
    }, [selectedValuesGapoktan]);

    poktans.forEach((poktan) => {
        if (!optionsPoktan.some(option => option.value === poktan.id)) {
            optionsPoktan.push({
                value: poktan.id,
                label: poktan.name
            });
        }
    });

    useEffect(() => {
        setData({
            ...data,
            poktan_outreach_activities: selectedValuesPoktan,
        });
    }, [selectedValuesPoktan]);

    subaks.forEach((subak) => {
        if (!optionsSubak.some(option => option.value === subak.id)) {
            optionsSubak.push({
                value: subak.id,
                label: subak.name
            });
        }
    });

    useEffect(() => {
        setData({
            ...data,
            subak_outreach_activities: selectedValuesSubak,
        });
    }, [selectedValuesSubak]);

    useEffect(() => {
        setData(
            {
                ...data,
                location: locationInput,
                address: addressInput
            }
        )
    }, [locationInput, addressInput]);

    const [location, setLocation] = useState(data.location);
    const [address, setAddress] = useState(data.address);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files && name !== 'file') {
            setData((prevData) => ({
                ...prevData,
                [name]: [...(prevData[name] || []), ...Array.from(files)],
            }));
        } else {
            if (files && files.length > 0) {
                setData((prevData) => ({
                    ...prevData,
                    [name]: files[0], // Assuming you want to handle a single file upload
                }));
            } else {
                setData({
                    ...data,
                    [name]: value,
                });
            }
        }

        if (name === 'location') {
            setLocation(value);
        } else if (name === 'address') {
            setAddress(value);
        }
    };

    useEffect(() => {
        setData({ ...data, location: location });
        setData({ ...data, address: address });
    }, [location, address]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        post(route('outreachActivities.store', { districtId: district.id }), {
            data: formData,
            onSuccess: () => {
                Toast.fire({
                    icon: "success",
                    title: "Data berhasil di simpan.",
                });
            }
        });
    };

    const renderPhotoPreviews = () => {
        return (
            <div className="py-2 grid grid-cols-2 gap-2">
                {data.photos.map((photo, index) => (
                    <div key={index} >
                        <img src={URL.createObjectURL(photo)} alt={`Preview ${photo.name}`} className='border rounded-sm' />
                        <div className="flex justify-end mt-2">
                            <button type='button' onClick={() => removePhoto(index)} className='py-0.5 px-2 bg-red-500 text-white rounded-sm'>Hapus</button>
                        </div>
                    </div>))}
            </div>
        )
    };

    const removePhoto = (index) => {
        // Remove photo from data.photos
        const updatedPhotos = [...data.photos];
        updatedPhotos.splice(index, 1);
        setData(prevData => ({
            ...prevData,
            photos: updatedPhotos
        }));
    };

    return (
        <BackpageLayout>
            <Head title="Create Kegiatan Penyuluhan" />
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3">
                            <div className="w-full">
                                <InputLabel>Kecamatan</InputLabel>
                                <TextInput id='kecamatan' name='kecamatan' value={district.name} className="bg-[#e1e1e1]" readOnly />
                            </div>
                            <div className="">
                                <InputLabel>Desa*</InputLabel>
                                <SelectTwo
                                    entities={villages}
                                    selectedEntityId={data.village_id}
                                    setSelectedEntityId={(id) => setData({ ...data, village_id: id })}
                                    label={'-- Pilih desa --'}
                                    placeholder={'Cari desa...'}
                                    error={errors.village_id}
                                />
                                <InputError message={errors.village_id} />
                            </div>
                            <div className="">
                                <InputLabel>Penyuluh*</InputLabel>
                                <InputSelect
                                    error={errors.ppl_nip}
                                    onChange={handleChange}
                                    id="ppl_nip"
                                    name="ppl_nip"
                                    defaultValue={data.ppl_nip}
                                >
                                    {auth.user.role === 'ADMIN' &&
                                        <option value="">-- Pilih PPL --</option>
                                    }
                                    {ppls.map((ppl, index) => (
                                        <option key={index} value={ppl.nip}>{ppl.name}</option>
                                    ))}
                                </InputSelect>
                                <InputError message={errors.ppl_nip} />
                            </div>
                            <div className="w-full">
                                <InputLabel>Judul Penyuluhan*</InputLabel>
                                <TextInput error={errors.title} value={data.title} onChange={handleChange} id='title' name='title' placeholder="Judul.." />
                                <InputError message={errors.title} />
                            </div>
                            <div className="w-full">
                                <InputLabel>File/Dokumen</InputLabel>
                                <input
                                    type="file"
                                    name="file"
                                    onChange={handleChange}
                                    className="w-full rounded-md bg-white border border-gray-400 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">FILE MAX. 10MB</p>
                                <InputError message={errors.file} />
                            </div>
                            <div className="w-full">
                                <InputLabel>Catatan*</InputLabel>
                                <TextInputArea error={errors.notes} value={data.notes} onChange={handleChange} id='notes' name='notes' placeholder="Catatan.." />
                                <InputError message={errors.notes} />
                            </div>
                            <div className="w-full">
                                <InputLabel>Laporan Kegiatan*</InputLabel>
                                <TextInputArea error={errors.activity_report} value={data.activity_report} onChange={handleChange} id='activity_report' name='activity_report' placeholder="Lapoaran.." />
                                <InputError message={errors.activity_report} />
                            </div>
                            <div className="">
                                <InputLabel>Gapoktan yang terlibat</InputLabel>
                                <MultiSelect title={'-- Pilih gapoktan --'} onChange={setSelectedValuesGapoktan} options={optionsGapoktan} value={selectedValuesGapoktan} error={errors.gapoktan_outreach_activities} />
                                <InputError message={errors.gapoktan_outreach_activities} />
                            </div>
                            <div className="">
                                <InputLabel>Poktan yang terlibat</InputLabel>
                                <MultiSelect title={'-- Pilih poktan --'} onChange={setSelectedValuesPoktan} options={optionsPoktan} value={selectedValuesPoktan} error={errors.poktan_outreach_activities} />
                                <InputError message={errors.poktan_outreach_activities} />
                            </div>
                            <div className="">
                                <InputLabel>Subak yang terlibat</InputLabel>
                                <MultiSelect title={'-- Pilih subak --'} onChange={setSelectedValuesSubak} options={optionsSubak} value={selectedValuesSubak} error={errors.subak_outreach_activities} />
                                <InputError message={errors.subak_outreach_activities} />
                            </div>
                            <div className="w-full">
                                <InputLabel>Lainnya yang terlibat</InputLabel>
                                <TextInput error={errors.others_involved} value={data.others_involved} onChange={handleChange} id='others_involved' name='others_involved' placeholder="Lainnya.." />
                                <InputError message={errors.others_involved} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div>
                                <InputLabel>Foto</InputLabel>
                                <input type="file" onChange={handleChange} id='photos' name='photos' multiple className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 2MB).</p>
                                <div className="w-full">
                                    {renderPhotoPreviews()}
                                </div>
                                {data.photos.map((_, index) => (
                                    <InputError key={index} message={errors[`photos.${index}`]} />
                                ))}
                            </div>
                            <div className="w-full">
                                <InputLabel>Lokasi Koordinat*</InputLabel>
                                <TextInput error={errors.location} value={data.location} onChange={handleChange} id='location' name='location' placeholder="Lokasi koordinat.." />
                                <InputError message={errors.location} />
                            </div>
                            <div className="w-full">
                                <InputLabel>Alamat*</InputLabel>
                                <TextInputArea error={errors.address} value={data.address} onChange={handleChange} id='address' name='address' placeholder="Alamat.." />
                                <InputError message={errors.address} />
                            </div>
                            <div className="">
                                <MapsInputData />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 my-2">
                        <Link href={`/penyuluhan/kecamatan/${district.id}`}>
                            <Button type="button" className='bg-red-500 hover:bg-red-600'>Batal</Button>
                        </Link>
                        <Button disabled={processing} type="submit">{processing ? 'Simpan...' : 'Simpan'}</Button>
                    </div>
                </form>
            </div>
        </BackpageLayout>
    )
}
