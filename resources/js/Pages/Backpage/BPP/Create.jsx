import { Toast } from "@/Components/Alert/Toast";
import Button from "@/Components/Button/Button";
import InputError from "@/Components/Error/InputError";
import InputLabel from "@/Components/Input/InputLabel";
import InputSelect from "@/Components/Input/InputSelect";
import SelectTwo from "@/Components/Input/InputSelectTwo";
import TextInput from "@/Components/Input/TextInput";
import TextInputArea from "@/Components/Input/TextInputArea";
import MapsInputData from "@/Components/Maps/MapsInputData";
import { GROUP_STATUSES } from "@/Constant/Status";
import BackpageLayout from "@/Layouts/BackpageLayout";
import { useStore } from "@/Store/Index.store";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export default function CreateBPPPage() {
    const { locationInput, addressInput } = useStore(
        useShallow((state) => (
            {
                locationInput: state.locationInput,
                addressInput: state.addressInput,
            }
        )),
    );
    const { districts, errors } = usePage().props;
    const { data, setData, post, progress, processing, recentlySuccessful } = useForm({
        district_id: "",
        layer_group_id: 2,
        name: "",
        location: "",
        address: "",
        phone_number: "",
        email: "",
        leader: '',
        secretary: '',
        treasurer: '',
        number_of_members: '',
        since: '',
        status: "ACTIVE",
        photos: [],
        description: "",
    });

    useEffect(() => {
        setData(
            {
                ...data,
                location: locationInput,
                address: addressInput
            }
        );
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

        post(route('bpp.store'), {
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
        );
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
            <Head title="Create BPP" />
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3">
                            <div className="">
                                <InputLabel>Kecamatan*</InputLabel>
                                <SelectTwo
                                    entities={districts}
                                    selectedEntityId={data.district_id}
                                    setSelectedEntityId={(id) => setData({ ...data, district_id: id })}
                                    label={'-- Pilih kecamatan --'}
                                    placeholder={'Cari kecamatan...'}
                                    error={errors.district_id}
                                />
                                <InputError message={errors.district_id} />
                            </div>
                            <div className="">
                                <InputLabel>Nama BPP*</InputLabel>
                                <TextInput error={errors.name} defaultValue={data.name} onChange={handleChange} id='name' name='name' placeholder="Nama BPP..." />
                                <InputError message={errors.name} />
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
                                <InputLabel>Telepon*</InputLabel>
                                <TextInput type='number' error={errors.phone_number} defaultValue={data.phone_number} onChange={handleChange} id='phone_number' name='phone_number' placeholder="Telepon..." />
                                <InputError message={errors.phone_number} />
                            </div>
                            <div className="">
                                <InputLabel>Email*</InputLabel>
                                <TextInput type='email' error={errors.email} defaultValue={data.email} onChange={handleChange} id='email' name='email' placeholder="Email..." />
                                <InputError message={errors.email} />
                            </div>
                            <div className="">
                                <InputLabel>Ketua*</InputLabel>
                                <TextInput error={errors.leader} defaultValue={data.leader} onChange={handleChange} id='leader' name='leader' placeholder="Ketua..." />
                                <InputError message={errors.leader} />
                            </div>
                            <div className="">
                                <InputLabel>Sekretaris*</InputLabel>
                                <TextInput error={errors.secretary} defaultValue={data.secretary} onChange={handleChange} id='secretary' name='secretary' placeholder="Sekretaris..." />
                                <InputError message={errors.secretary} />
                            </div>
                            <div className="">
                                <InputLabel>Bendahara*</InputLabel>
                                <TextInput error={errors.treasurer} defaultValue={data.treasurer} onChange={handleChange} id='treasurer' name='treasurer' placeholder="Bendahara..." />
                                <InputError message={errors.treasurer} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="">
                                <InputLabel>Jumlah Anggota*</InputLabel>
                                <TextInput error={errors.number_of_members} defaultValue={data.number_of_members} type="number" onChange={handleChange} id='number_of_members' name='number_of_members' placeholder="00" />
                                <InputError message={errors.number_of_members} />
                            </div>
                            <div className="">
                                <InputLabel>Tahun Pembentukan*</InputLabel>
                                <TextInput error={errors.since} defaultValue={data.since} type="number" placeholder="YYYY" onChange={handleChange} id='since' name='since' />
                                <InputError message={errors.since} />
                            </div>
                            <div className="">
                                <InputLabel>Status*</InputLabel>
                                <InputSelect
                                    error={errors.status}
                                    defaultValue={data.status}
                                    onChange={handleChange}
                                    id="status"
                                    name="status"
                                >
                                    {GROUP_STATUSES.map((group_status, index) => (
                                        <option key={index} value={group_status.value} >{group_status.label}</option>
                                    ))}
                                </InputSelect>
                                <InputError message={errors.status} />
                            </div>
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
                    <div className="flex justify-end gap-4 my-2">
                        <Link href={`/bpp`}>
                            <Button type="button" className='bg-red-500 hover:bg-red-600'>Batal</Button>
                        </Link>
                        <Button disabled={processing} type="submit">{processing ? 'Simpan...' : 'Simpan'}</Button>
                    </div>
                </form>
            </div>
        </BackpageLayout>
    );
}
