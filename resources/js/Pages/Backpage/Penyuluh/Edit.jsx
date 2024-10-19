import { Toast } from "@/Components/Alert/Toast";
import Button from "@/Components/Button/Button";
import InputError from "@/Components/Error/InputError";
import InputLabel from "@/Components/Input/InputLabel";
import InputSelect from "@/Components/Input/InputSelect";
import MultiSelect from "@/Components/Input/MultiSelect";
import TextInput from "@/Components/Input/TextInput";
import BackpageLayout from "@/Layouts/BackpageLayout";
import { GENDERS } from "@/Constant/Gender";
import { RELIGIONS } from "@/Constant/Religion";
import { EMPLOYEE_STATUSES } from "@/Constant/Status";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import SelectTwo from "@/Components/Input/InputSelectTwo";

export default function EditPenyuluhPage() {
    const { pplById, villageIds, villages, bpps, errors } = usePage().props;
    const [options, setOptions] = useState([]); //untuk menyimpan options multi select nya bentuknya [{value, label}]
    const [selectedValues, setSelectedValues] = useState(villageIds); //value options yang di pilih
    // console.log(villageIds);
    const { data, setData, put, progress, processing, recentlySuccessful } = useForm({
        nik: pplById.account.nik,
        bpp_id: pplById.bpp_id,
        name: pplById.name,
        email: pplById.email,
        foto: pplById.foto,
        address: pplById.address,
        phone_number: pplById.phone_number,
        role: "PPL",
        password: null,
        nip: pplById.nip,
        employee_status: pplById.employee_status,
        front_title: pplById.front_title,
        back_title: pplById.back_title,
        place_of_birth: pplById.place_of_birth,
        date_of_birth: pplById.date_of_birth.split('T')[0],
        gender: pplById.gender,
        religion: pplById.religion,
        areas_of_expertise: pplById.areas_of_expertise,
        last_education: pplById.last_education,
        field_of_education: pplById.field_of_education,
        major: pplById.major,
        school_name: pplById.school_name,
        work_location: pplById.work_location,
        date_sk: pplById.date_sk.split('T')[0],
        date_spmt: pplById.date_spmt.split('T')[0],
        position: pplById.position,
        provinsi: pplById.provinsi,
        regency: pplById.regency,
        post_code: pplById.post_code,
        villages: pplById
    });

    villages.forEach((village) => {
        if (!options.some(option => option.value === village.id)) {
            options.push({
                value: village.id,
                label: village.name
            });
        }
    });

    // handle selected value commodities
    useEffect(() => {
        setData({
            ...data,
            villages: selectedValues,
        });
    }, [selectedValues]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        // set default password with nip
        if (name === 'nip') {
            setData((prevData) => ({
                ...prevData,
                password: value
            }));
        }
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

        put(route('ppl.update', { ppl: pplById.nip }), {
            data: formData,
            onSuccess: () => {
                Toast.fire({
                    icon: "success",
                    title: "Data berhasil di edit.",
                });
            }
        });
    };

    return (
        <BackpageLayout>
            <Head title="Create Penyuluh" />
            <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid grid-rows-10 lg:grid-flow-col gap-3">
                        {[
                            { label: 'NIK*', name: 'nik', type: 'text', placeholder: 'NIK...' },
                            { label: 'NIP*', name: 'nip', type: 'text', placeholder: 'NIP...' },
                            { label: 'Nama*', name: 'name', type: 'text', placeholder: 'Nama...' },
                            { label: 'Gelar Depan', name: 'front_title', type: 'text', placeholder: 'Gelar Depan...' },
                            { label: 'Gelar Belakang', name: 'back_title', type: 'text', placeholder: 'Gelar Belakang...' },
                            { label: 'Alamat*', name: 'address', type: 'text', placeholder: 'Alamat...' },
                            { label: 'Nomor Telepon*', name: 'phone_number', type: 'number', placeholder: 'Nomor Telepon...' },
                            { label: 'Tempat Lahir*', name: 'place_of_birth', type: 'text', placeholder: 'Tempat Lahir...' },
                            { label: 'Tanggal Lahir*', name: 'date_of_birth', type: 'date', placeholder: 'Tanggal Lahir...' },
                            { label: 'Jenis Kelamin*', name: 'gender', type: 'text', placeholder: 'Jenis Kelamin...' }, //
                            { label: 'Agama*', name: 'religion', type: 'text', placeholder: 'Agama...' }, //
                            { label: 'Status Pegawai*', name: 'employee_status', type: 'text', placeholder: 'Status Pegawai...' }, //
                            { label: 'Bidang Keahlian*', name: 'areas_of_expertise', type: 'text', placeholder: 'Bidang Keahlian...' },
                            { label: 'Pendidikan Terakhir*', name: 'last_education', type: 'text', placeholder: 'Pendidikan Terakhir...' },
                            { label: 'Bidang Pendidikan*', name: 'field_of_education', type: 'text', placeholder: 'Bidang Pendidikan...' },
                            { label: 'Jurusan*', name: 'major', type: 'text', placeholder: 'Jurusan...' },
                            { label: 'Nama Sekolah*', name: 'school_name', type: 'text', placeholder: 'Nama Sekolah...' },
                            { label: 'Tanggal SK*', name: 'date_sk', type: 'date', placeholder: 'Tanggal SK...' },
                            { label: 'Tanggal SPMT*', name: 'date_spmt', type: 'date', placeholder: 'Tanggal SPMT...' },
                            // { label: 'Lokasi Kerja*', name: 'work_location', type: 'text', placeholder: 'Lokasi Kerja...' },
                            // { label: 'Lokasi Kerja*', name: 'work_location', type: 'text', placeholder: 'Lokasi Kerja...' },
                            { label: 'Lokasi Kerja (BPP)*', name: 'bpp_id', type: 'text', placeholder: 'Lokasi Kerja (BPP)...' },
                            { label: 'Posisi*', name: 'position', type: 'text', placeholder: 'Posisi...' },
                            { label: 'Provinsi*', name: 'provinsi', type: 'text', placeholder: 'Provinsi...' },
                            { label: 'Kabupaten*', name: 'regency', type: 'text', placeholder: 'Kabupaten...' },
                            { label: 'Kode Pos*', name: 'post_code', type: 'number', placeholder: 'Kode Pos...' },
                            { label: 'Email*', name: 'email', type: 'email', placeholder: 'Email...' },
                            { label: 'Kata Sandi* (masukan kata sandi baru untuk update)', name: 'password', type: 'text', placeholder: 'Kata Sandi...' },
                        ].map((input, index) => (
                            <>
                                {input.name === 'employee_status' &&
                                    <div key={index} className="">
                                        <InputLabel>{input.label}</InputLabel>
                                        <InputSelect
                                            error={errors.employee_status}
                                            defaultValue={data.employee_status}
                                            onChange={handleChange}
                                            id="employee_status"
                                            name="employee_status"
                                        >
                                            <option value={null} defaultChecked>-- Pilih status pegawai --</option>
                                            {EMPLOYEE_STATUSES.length > 0 && EMPLOYEE_STATUSES.map((employeeStatus, i) => (
                                                <option key={i} value={employeeStatus}>{employeeStatus}</option>
                                            ))}
                                        </InputSelect>
                                        <InputError message={errors.employee_status} />
                                    </div>
                                }
                                {input.name === 'gender' &&
                                    <div key={index} className="">
                                        <InputLabel>{input.label}</InputLabel>
                                        <InputSelect
                                            error={errors.gender}
                                            defaultValue={data.gender}
                                            onChange={handleChange}
                                            id="gender"
                                            name="gender"
                                        >
                                            <option value={null} defaultChecked>-- Pilih jenis kelamin --</option>
                                            {GENDERS.length > 0 && GENDERS.map((gender, i) => (
                                                <option key={i} value={gender}>{gender}</option>
                                            ))}
                                        </InputSelect>
                                        <InputError message={errors.gender} />
                                    </div>
                                }
                                {input.name === 'religion' &&
                                    <div key={index} className="">
                                        <InputLabel>{input.label}</InputLabel>
                                        <InputSelect
                                            error={errors.religion}
                                            defaultValue={data.religion}
                                            onChange={handleChange}
                                            id="religion"
                                            name="religion"
                                        >
                                            <option value={null} defaultChecked>-- Pilih agama --</option>
                                            {RELIGIONS.length > 0 && RELIGIONS.map((religion, i) => (
                                                <option key={i} value={religion}>{religion}</option>
                                            ))}
                                        </InputSelect>
                                        <InputError message={errors.religion} />
                                    </div>
                                }
                                {input.name !== 'employee_status' && input.name !== 'religion' && input.name !== 'gender' && input.name !== 'bpp_id' &&
                                    <div key={index} className="">
                                        <InputLabel>{input.label}</InputLabel>
                                        <TextInput
                                            type={input.type}
                                            name={input.name}
                                            placeholder={input.placeholder}
                                            value={data[input.name]}
                                            onChange={handleChange}
                                            error={errors[input.name]}
                                        />
                                        <InputError message={errors[input.name]} />
                                    </div>
                                }
                                {input.name === 'bpp_id' &&
                                    <div key={index} className="">
                                        <InputLabel>Lokasi Kerja (BPP)*</InputLabel>
                                        <SelectTwo
                                            entities={bpps}
                                            selectedEntityId={data.bpp_id}
                                            setSelectedEntityId={(id) => setData({ ...data, bpp_id: id })}
                                            label={'-- Pilih BPP --'}
                                            placeholder={'Cari BPP...'}
                                            error={errors.bpp_id}
                                        />
                                        <InputError message={errors.bpp_id} />
                                    </div>
                                }
                            </>
                        ))}

                        <div className="">
                            <InputLabel>Foto</InputLabel>
                            <input
                                type="file"
                                name="foto"
                                onChange={handleChange}
                                className="w-full rounded-md bg-white border border-gray-400 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            <InputError message={errors.foto} />
                        </div>
                        <div className="">
                            <InputLabel>Wilayah Binaan*</InputLabel>
                            <MultiSelect title={'-- Pilih wilayah binaan --'} onChange={setSelectedValues} options={options} value={selectedValues} error={errors.villages} />
                            <InputError message={errors.villages} />
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 my-2">
                        <Link href={`/ppl`}>
                            <Button type="button" className='bg-red-500 hover:bg-red-600'>Batal</Button>
                        </Link>
                        <Button disabled={processing} type="submit">{processing ? 'Simpan...' : 'Simpan'}</Button>
                    </div>
                </form>
            </div>
        </BackpageLayout>
    );
}
