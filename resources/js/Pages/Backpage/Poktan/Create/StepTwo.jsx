import { Toast } from '@/Components/Alert/Toast';
import Button from '@/Components/Button/Button';
import Checkbox from '@/Components/Input/Checkbox';
import InputError from '@/Components/Input/InputError';
import InputLabel from '@/Components/Input/InputLabel';
import InputSelect from '@/Components/Input/InputSelect';
import TextInput from '@/Components/Input/TextInput';
import TextInputArea from '@/Components/Input/TextInputArea';
import BackpageLayout from '@/Layouts/BackpageLayout'
import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { useStore } from '@/Store/Index.store';
import { useShallow } from 'zustand/react/shallow';
import MapsInputData from '@/Components/Maps/MapsInputData';

export default function StepOneCreateGapoktanPage() {
    const { locationInput, addressInput, optionsSelected } = useStore(
        useShallow((state) => (
            {
                locationInput: state.locationInput,
                addressInput: state.addressInput,
                optionsSelected: state.optionsSelected,
            }
        )),
    );

    const { district, layerGroup, errors } = usePage().props;
    // console.log(errors);
    const { data, setData, post, progress, processing, recentlySuccessful } = useForm({
        // step 2
        commodities: optionsSelected, // untuk di kirim/validasi ke BE,, ambil optionsSelected yg disimpan di step 1
        layer_group_id: '',
        photos: [],
        location: '',
        address: '',
        description: ''
    });

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
        if (files) {
            setData((prevData) => ({
                ...prevData,
                [name]: [...(prevData[name] || []), ...Array.from(files)],
            }));
        } else {
            setData({
                ...data,
                [name]: value,
            });
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

        // Menambahkan semua foto ke FormData
        data.photos.forEach((photo) => {
            formData.append('photos[]', photo);
        });

        post(route('poktans.store.step.two', { districtId: district.id }), {
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
            <Head title="Create Poktan" />
            <div className="mb-2">
                <ol className="flex items-center w-full p-3 space-x-1 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
                    <li className="flex items-center text-blue-600">
                        Step 1
                        <svg className="w-3 h-3 ms-2 sm:ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                        </svg>
                    </li>
                    <li className={`flex items-center text-blue-600`}>
                        Step 2
                    </li>
                </ol>
            </div>
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3">
                            <div className="">
                                <InputLabel>Layer Grup*</InputLabel>
                                <InputSelect
                                    error={errors.layer_group_id}
                                    onChange={handleChange}
                                    id="layer_group_id"
                                    name="layer_group_id"
                                >
                                    <option value="" defaultChecked>Pilih jenis layer</option>
                                    {layerGroup.map((layer, index) => (
                                        <option key={index} value={layer.id}>{layer.name}</option>
                                    ))}
                                </InputSelect>
                                <InputError message={errors.layer_group_id} />
                            </div>
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
                            <div className="">
                                <InputLabel>Deskripsi</InputLabel>
                                <TextInputArea defaultValue={data.description} onChange={handleChange} id='description' name='description' placeholder="Deskripsi..." />
                                <InputError message={errors.description} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="">
                                <InputLabel>Lokasi Koordinat*</InputLabel>
                                <TextInput error={errors.location} value={data.location} onChange={handleChange} id='location' name='location' placeholder="Lokasi..." />
                                <InputError message={errors.location} />
                            </div>
                            <div className="">
                                <InputLabel>Alamat Lengkap*</InputLabel>
                                <TextInputArea error={errors.address} value={data.address} onChange={handleChange} id='address' name='address' placeholder="Alamat..." />
                                <InputError message={errors.address} />
                            </div>
                            <div className="">
                                <MapsInputData />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 my-2">
                        <Link href={`/kelembagaan-pertanian/poktan/kecamatan/${district.id}/create-step-one`}>
                            <Button type="button" className='bg-red-500 hover:bg-red-600'>Sebelumnya</Button>
                        </Link>
                        <Button disabled={processing} type="submit">{processing ? 'Simpan...' : 'Simpan'}</Button>
                    </div>
                </form>
            </div>
        </BackpageLayout>
    )
}
