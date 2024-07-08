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
import MapsInputGapoktan from '../MapInputGapoktan';
import { useStore } from '@/Store/Index.store';
import { useShallow } from 'zustand/react/shallow';

export default function StepOneCreateGapoktanPage() {
    const { locationInput, setLocationInput, addressInput, setAddressInput } = useStore(
        useShallow((state) => (
            {
                locationInput: state.locationInput,
                setLocationInput: state.setLocationInput,
                addressInput: state.addressInput,
                setAddressInput: state.setAddressInput
            }
        )),
    );

    const { gapoktan, district, villages, layerGroup, errors } = usePage().props;
    console.log(usePage().props);
    const { data, setData, post, progress, processing, recentlySuccessful } = useForm({
        // step 2
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

    console.log('STORE LOCATION', locationInput);
    console.log('STORE ADDRESS', addressInput);


    const photosUpload = data.photos.map((photo) => (
        console.log(photo.name)
    ));

    const [location, setLocation] = useState(data.location);
    const [address, setAddress] = useState(data.address);

    console.log(photosUpload);
    // console.log(data.tools_and_machines);
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

    const handleCheckboxChangeBusinessUnit = (event) => {
        const { name, checked } = event.target;
        setData(prevData => ({
            ...prevData,
            business_unit: {
                ...prevData.business_unit,
                [name]: checked
            }
        }));
    };

    const handleInputChangeBusinessUnit = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            business_unit: {
                ...prevData.business_unit,
                [name]: value
            }
        }));
    };

    const handleInputChangeToolsAndMachines = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            tools_and_machines: {
                ...prevData.tools_and_machines,
                [name]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Menambahkan semua foto ke FormData
        data.photos.forEach((photo) => {
            formData.append('photos[]', photo);
        });

        post(route('gapoktans.store.step.two', { districtId: district.id }), {
            data: formData,
            onSuccess: () => {
                Toast.fire({
                    icon: "success",
                    title: "Data successfully saved!",
                });
            }
        });
    };


    const renderPhotoPreviews = () => {
        return (
            <div className="grid grid-cols-2 gap-2">
                {data.photos.map((photo, index) => (
                    <div key={index} >
                        <img src={URL.createObjectURL(photo)} alt={`Preview ${photo.name}`} />
                        <button type='button' onClick={() => removePhoto(index)}>Hapus</button>
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
            <Head title="Create Gapoktan" />
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
                                <InputLabel>Layer Grup</InputLabel>
                                <InputSelect
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
                                <input type="file" onChange={handleChange} id='photos' name='photos' multiple />
                                <div className="w-72">
                                    {renderPhotoPreviews()}
                                </div>
                                <InputError message={errors['photos.0']} />
                                <InputError message={errors['photos.1']} />
                                <InputError message={errors['photos.2']} />
                                <InputError message={errors['photos.3']} />
                                <InputError message={errors['photos.4']} />
                                <InputError message={errors['photos.5']} />
                            </div>
                            <div className="">
                                <InputLabel>Deskripsi</InputLabel>
                                <TextInputArea defaultValue={data.description} onChange={handleChange} id='description' name='description' placeholder="Deskripsi.." />
                                <InputError message={errors.description} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="">
                                <InputLabel>Lokasi</InputLabel>
                                <TextInput defaultValue={data.location} onChange={handleChange} id='location' name='location' placeholder="Lokasi.." />
                                <InputError message={errors.location} />
                            </div>
                            <div className="">
                                <InputLabel>Alamat Lengkap</InputLabel>
                                <TextInputArea defaultValue={data.address} onChange={handleChange} id='address' name='address' placeholder="Alamat.." />
                                <InputError message={errors.address} />
                            </div>
                            <div className="">
                                <MapsInputGapoktan />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between my-2">
                        <Link href={`/kelembagaan-pertanian/gapoktan/kecamatan/${district.id}/create-step-one`}>
                            <Button type="button" className='bg-red-500 hover:bg-red-600'>Previous</Button>
                        </Link>
                        <Button type="submit">Simpan</Button>
                    </div>
                </form>
            </div>
        </BackpageLayout>
    )
}
