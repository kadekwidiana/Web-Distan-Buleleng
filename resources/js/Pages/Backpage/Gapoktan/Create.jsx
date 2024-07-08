import ButtonAdd from '@/Components/Button/Add';
import DataNotFound from '@/Components/Error/DataNotFound';
import { pickBy, debounce } from 'lodash';
import BackpageLayout from '@/Layouts/BackpageLayout'
import { Head, Link, usePage, router, useForm } from '@inertiajs/react';
import { Dropdown, Table } from 'flowbite-react';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import LoadData from '@/Components/Loading/LoadData';
import ExcelExport from '@/Components/Button/ExportExcel';
import ButtonBack from '@/Components/Button/Back';
import InputLabel from '@/Components/Input/InputLabel';
import TextInput from '@/Components/Input/TextInput';
import InputSelect from '@/Components/Input/InputSelect';
import Button from '@/Components/Button/Button';
import InputError from '@/Components/Input/InputError';
import Swal from 'sweetalert2';
import TextInputArea from '@/Components/Input/TextInputArea';
import Checkbox from '@/Components/Input/Checkbox';
import { Toast } from '@/Components/Alert/Toast';
import MapsInputGapoktan from './MapInputGapoktan';

export default function CreateGapoktanPage() {
    const { district, villages, layerGroup, errors } = usePage().props;
    const { data, setData, post, progress, processing, recentlySuccessful } = useForm({
        village_id: '',
        layer_group_id: '',
        name: 'Test',
        leader: 'Test',
        secretary: 'test',
        treasurer: 'tes',
        number_of_members: '10',
        since: '2020',
        confirmation_sk: 'test',
        confirmation_sk_no: 'test',
        business_unit: {
            sp_produksi: false,
            pemasaran: false,
            keuangan_mikro: false,
            jasa_lainnya: ''
        },
        farming_business: 'test',
        business_process: 'test',
        tools_and_machines: {
            traktor: '',
            hand_traktor: '',
            pompa_air: '',
            mesin_penggiling_padi: '',
            mesin_pengerin: '',
        },
        // step 2
        photos: [],
        location: '[-8.191398419678444, 115.09421165748826]',
        address: 'test',
        description: 'testtttt'
    });

    const photosUpload = data.photos.map((photo) => (
        console.log(photo.name)
    ));

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
    };

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

        data.photos.forEach((photo) => {
            formData.append('photos[]', photo);
        });

        post(route('gapoktans.store', { districtId: district.id }), {
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
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
                <ButtonBack url='/kelembagaan-pertanian/gapoktan' />
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-rows-11 grid-flow-col gap-4">
                        <div className="">
                            <InputLabel>Kecamatan</InputLabel>
                            <TextInput id='kecamatan' name='kecamatan' value={district.name} className="bg-[#eeeeee]" readOnly />
                        </div>
                        <div className="">
                            <InputLabel>Desa</InputLabel>
                            <InputSelect
                                onChange={handleChange}
                                id="village_id"
                                name="village_id"
                            >
                                <option value="" defaultChecked>Pilih desa</option>
                                {villages.map((village, index) => (
                                    <option key={index} value={village.id}>{village.name}</option>
                                ))}
                            </InputSelect>
                            <InputError message={errors.village_id} />
                        </div>
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
                        <div className="">
                            <InputLabel>Nama Gapoktan</InputLabel>
                            <TextInput defaultValue={data.name} onChange={handleChange} id='name' name='name' placeholder="Nama gapoktan.." />
                            <InputError message={errors.name} />
                        </div>
                        <div className="">
                            <InputLabel>Ketua</InputLabel>
                            <TextInput defaultValue={data.leader} onChange={handleChange} id='leader' name='leader' placeholder="Ketua.." />
                            <InputError message={errors.leader} />
                        </div>
                        <div className="">
                            <InputLabel>Sekretaris</InputLabel>
                            <TextInput defaultValue={data.secretary} onChange={handleChange} id='secretary' name='secretary' placeholder="Sekretaris.." />
                            <InputError message={errors.secretary} />
                        </div>
                        <div className="">
                            <InputLabel>Bendahara</InputLabel>
                            <TextInput defaultValue={data.treasurer} onChange={handleChange} id='treasurer' name='treasurer' placeholder="Bendahara.." />
                            <InputError message={errors.treasurer} />
                        </div>
                        <div className="">
                            <InputLabel>Jumlah Anggota</InputLabel>
                            <TextInput defaultValue={data.number_of_members} type="number" onChange={handleChange} id='number_of_members' name='number_of_members' placeholder="Jumlah anggota.." />
                            <InputError message={errors.number_of_members} />
                        </div>
                        <div className="">
                            <InputLabel>Tahun Pembentukan</InputLabel>
                            <TextInput defaultValue={data.since} type="number" placeholder="YYYY" onChange={handleChange} id='since' name='since' />
                            <InputError message={errors.since} />
                        </div>
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
                            <InputLabel>SK Pengukuhan</InputLabel>
                            <TextInput defaultValue={data.confirmation_sk} onChange={handleChange} id='confirmation_sk' name='confirmation_sk' placeholder="SK Pengukuhan.." />
                            <InputError message={errors.confirmation_sk} />
                        </div>
                        <div className="">
                            <InputLabel>No. SK Pengukuhan</InputLabel>
                            <TextInput defaultValue={data.confirmation_sk_no} onChange={handleChange} id='confirmation_sk_no' name='confirmation_sk_no' placeholder="No. SK Pengukuhan.." />
                            <InputError message={errors.confirmation_sk_no} />
                        </div>
                        <div className="">
                            <InputLabel>Unit Usaha</InputLabel>
                            <div className="">
                                <label className="flex items-center">
                                    <Checkbox
                                        id="sp_produksi"
                                        name="sp_produksi"
                                        checked={data.business_unit.sp_produksi}
                                        onChange={handleCheckboxChangeBusinessUnit}
                                    />
                                    <span className="ms-2 text-base text-gray-800">Sarana dan prasarana produksi</span>
                                </label>
                                <label className="flex items-center">
                                    <Checkbox
                                        id="pemasaran"
                                        name="pemasaran"
                                        checked={data.business_unit.pemasaran}
                                        onChange={handleCheckboxChangeBusinessUnit}
                                    />
                                    <span className="ms-2 text-base text-gray-800">Pemasaran</span>
                                </label>
                                <label className="flex items-center">
                                    <Checkbox
                                        id="keuangan_mikro"
                                        name="keuangan_mikro"
                                        checked={data.business_unit.keuangan_mikro}
                                        onChange={handleCheckboxChangeBusinessUnit}
                                    />
                                    <span className="ms-2 text-base text-gray-800">Keunagan mikro/Simpan pinjam</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <InputLabel className="text-nowrap text-sm font-normal">Jasa lainnya</InputLabel>
                                    <TextInput
                                        onChange={handleInputChangeBusinessUnit}
                                        id="jasa_lainnya"
                                        name="jasa_lainnya"
                                        value={data.business_unit.jasa_lainnya}
                                        placeholder="Jasa lainnya.."
                                        className="py-1 px-2 border-s-0 rounded-s-none"
                                    />
                                </label>
                            </div>
                            {/* <TextInput defaultValue={data.business_unit} onChange={handleChange} id='business_unit' name='business_unit' placeholder="Unit bisnis.." /> */}
                            <InputError message={errors.business_unit} />
                        </div>
                        <div className="">
                            <InputLabel>Usaha Tani</InputLabel>
                            <TextInput defaultValue={data.farming_business} onChange={handleChange} id='farming_business' name='farming_business' placeholder="Bisnis pertanian.." />
                            <InputError message={errors.farming_business} />
                        </div>
                        <div className="">
                            <InputLabel>Usaha Olah</InputLabel>
                            <TextInput defaultValue={data.business_process} onChange={handleChange} id='business_process' name='business_process' placeholder="Proses bisnis.." />
                            <InputError message={errors.business_process} />
                        </div>
                        <div className="">
                            <InputLabel>Alat dan Mesin</InputLabel>
                            <div className='grid grid-cols-1 gap-1'>
                                <label className="flex items-center gap-2">
                                    <InputLabel className="text-nowrap text-sm font-normal">Traktor</InputLabel>
                                    <TextInput
                                        onChange={handleInputChangeToolsAndMachines}
                                        id="traktor"
                                        name="traktor"
                                        value={data.tools_and_machines.traktor}
                                        placeholder="Traktor.."
                                        className="py-1 px-2 border-s-0 rounded-s-none"
                                    />
                                </label>
                                <label className="flex items-center gap-2">
                                    <InputLabel className="text-nowrap text-sm font-normal">Hand Traktor</InputLabel>
                                    <TextInput
                                        onChange={handleInputChangeToolsAndMachines}
                                        id="hand_traktor"
                                        name="hand_traktor"
                                        value={data.tools_and_machines.hand_traktor}
                                        placeholder="Hand Traktor.."
                                        className="py-1 px-2 border-s-0 rounded-s-none"
                                    />
                                </label>
                                <label className="flex items-center gap-2">
                                    <InputLabel className="text-nowrap text-sm font-normal">Pompa Air</InputLabel>
                                    <TextInput
                                        onChange={handleInputChangeToolsAndMachines}
                                        id="pompa_air"
                                        name="pompa_air"
                                        value={data.tools_and_machines.pompa_air}
                                        placeholder="Pompa Air.."
                                        className="py-1 px-2 border-s-0 rounded-s-none"
                                    />
                                </label>
                                <label className="flex items-center gap-2">
                                    <InputLabel className="text-nowrap text-sm font-normal">Mesin Penggiling Padi</InputLabel>
                                    <TextInput
                                        onChange={handleInputChangeToolsAndMachines}
                                        id="mesin_penggiling_padi"
                                        name="mesin_penggiling_padi"
                                        value={data.tools_and_machines.mesin_penggiling_padi}
                                        placeholder="Mesin Penggiling Padi.."
                                        className="py-1 px-2 border-s-0 rounded-s-none"
                                    />
                                </label>
                                <label className="flex items-center gap-2">
                                    <InputLabel className="text-nowrap text-sm font-normal">Mesin Pengering</InputLabel>
                                    <TextInput
                                        onChange={handleInputChangeToolsAndMachines}
                                        id="mesin_pengering"
                                        name="mesin_pengering"
                                        value={data.tools_and_machines.mesin_pengering}
                                        placeholder="Mesin Pengering.."
                                        className="py-1 px-2 border-s-0 rounded-s-none"
                                    />
                                </label>
                                <label className="flex items-center gap-2">
                                    <InputLabel className="text-nowrap text-sm font-normal">Mesin Pencacah</InputLabel>
                                    <TextInput
                                        onChange={handleInputChangeToolsAndMachines}
                                        id="mesin_pencacah"
                                        name="mesin_pencacah"
                                        value={data.tools_and_machines.mesin_pencacah}
                                        placeholder="Mesin Pencacah.."
                                        className="py-1 px-2 border-s-0 rounded-s-none"
                                    />
                                </label>
                                <label className="flex items-center gap-2">
                                    <InputLabel className="text-nowrap text-sm font-normal">Lainnya</InputLabel>
                                    <TextInput
                                        onChange={handleInputChangeToolsAndMachines}
                                        id="lainnya"
                                        name="lainnya"
                                        value={data.tools_and_machines.lainnya}
                                        placeholder="Lainnya.."
                                        className="py-1 px-2 border-s-0 rounded-s-none"
                                    />
                                </label>
                            </div>
                            <InputError message={errors.tools_and_machines} />
                        </div>
                        <div className="">
                            <InputLabel>Deskripsi</InputLabel>
                            <TextInputArea defaultValue={data.description} onChange={handleChange} id='description' name='description' placeholder="Deskripsi.." />
                            <InputError message={errors.description} />
                        </div>
                    </div>
                    <div className="flex justify-end my-2">
                        <Button type="submit">Simpan</Button>
                    </div>
                </form>
            </div>
        </BackpageLayout>
    );
}
