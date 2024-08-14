import { Toast } from "@/Components/Alert/Toast";
import Button from "@/Components/Button/Button";
import InputError from "@/Components/Error/InputError";
import InputLabel from "@/Components/Input/InputLabel";
import InputSelect from "@/Components/Input/InputSelect";
import MultiSelect from "@/Components/Input/MultiSelect";
import TextInput from "@/Components/Input/TextInput";
import TextInputArea from "@/Components/Input/TextInputArea";
import BackpageLayout from "@/Layouts/BackpageLayout";
import { GENDERS } from "@/Utils/Constan/Gender";
import { RELIGIONS } from "@/Utils/Constan/Religion";
import { DATA_STATUSES, EMPLOYEE_STATUSES } from "@/Utils/Constan/Status";
import { TYPE_DATA_SPATIALS } from "@/Utils/Constan/Type";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Banner } from "flowbite-react";
import { useEffect, useState } from "react";

export default function CreateDataSpatialPage() {
    const { layerGroup, errors } = usePage().props;

    const { data, setData, post, progress, processing, recentlySuccessful } = useForm({
        layer_group_id: "",
        name: "",
        url: "",
        file: null,
        type: "",
        status: "ACTIVE",
        attribute: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files && files.length > 0) {
            setData((prevData) => ({
                ...prevData,
                [name]: files[0], // Assuming you want to handle a single file upload
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        post(route('data-spasial.store'), {
            data: formData,
            onSuccess: () => {
                Toast.fire({
                    icon: "success",
                    title: "Data berhasil di simpan.",
                });
            }
        });
    };

    return (
        <BackpageLayout>
            <Head title="Create Data Spasial" />
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3">
                            <div className="">
                                <InputLabel>Tipe*</InputLabel>
                                <InputSelect
                                    error={errors.type}
                                    onChange={handleChange}
                                    id="type"
                                    name="type"
                                >
                                    <option value="" defaultChecked>-- Pilih tipe spasial --</option>
                                    {TYPE_DATA_SPATIALS.map((type, index) => (
                                        <option key={index} value={type}>{type}</option>
                                    ))}
                                </InputSelect>
                                <InputError message={errors.type} />
                            </div>
                            <div className="">
                                <InputLabel>Nama*</InputLabel>
                                <TextInput error={errors.name} defaultValue={data.name} onChange={handleChange} id='name' name='name' placeholder="Nama data spasial..." />
                                <InputError message={errors.name} />
                            </div>
                            <div className="">
                                <InputLabel>Url</InputLabel>
                                <TextInput error={errors.url} defaultValue={data.url} onChange={handleChange} id='url' name='url' placeholder="Url..." />
                                <InputError message={errors.url} />
                            </div>
                            <div className="w-full">
                                <InputLabel>File</InputLabel>
                                <input
                                    type="file"
                                    name="file"
                                    onChange={handleChange}
                                    className="w-full rounded-md bg-white border border-gray-400 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">GEOJSON or ZIP (MAX. 50MB).</p>
                                <InputError message={errors.file} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="">
                                <InputLabel>Layer Grup*</InputLabel>
                                <InputSelect
                                    error={errors.layer_group_id}
                                    onChange={handleChange}
                                    id="layer_group_id"
                                    name="layer_group_id"
                                >
                                    <option value="" defaultChecked>-- Pilih jenis layer --</option>
                                    {layerGroup.map((layer, index) => (
                                        <option key={index} value={layer.id}>{layer.name}</option>
                                    ))}
                                </InputSelect>
                                <InputError message={errors.layer_group_id} />
                            </div>
                            <div className="">
                                <InputLabel>Status*</InputLabel>
                                <InputSelect
                                    error={errors.status}
                                    onChange={handleChange}
                                    id="status"
                                    name="status"
                                    defaultValue={data.status}
                                >
                                    {DATA_STATUSES.map((status, index) => (
                                        <option key={index} value={status.value}>{status.label}</option>
                                    ))}
                                </InputSelect>
                                <InputError message={errors.status} />
                            </div>
                            <div className="">
                                <InputLabel>Attribute*</InputLabel>
                                <TextInput error={errors.attribute} defaultValue={data.attribute} onChange={handleChange} id='attribute' name='attribute' placeholder="Atributte..." />
                                <InputError message={errors.attribute} />
                            </div>
                            <div className="">
                                <InputLabel>Deskripsi</InputLabel>
                                <TextInputArea defaultValue={data.description} onChange={handleChange} id='description' name='description' placeholder="Deskripsi.." />
                                <InputError message={errors.description} />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 my-2">
                        <Link href={`/data-spasial`}>
                            <Button type="button" className='bg-red-500 hover:bg-red-600'>Batal</Button>
                        </Link>
                        <Button disabled={processing} type="submit">{processing ? 'Simpan...' : 'Simpan'}</Button>
                    </div>
                </form>
            </div>
        </BackpageLayout>
    )
}
