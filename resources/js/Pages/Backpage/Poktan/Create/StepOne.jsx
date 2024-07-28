import { Toast } from '@/Components/Alert/Toast';
import Button from '@/Components/Button/Button';
import Checkbox from '@/Components/Input/Checkbox';
import InputError from '@/Components/Input/InputError';
import InputLabel from '@/Components/Input/InputLabel';
import InputSelect from '@/Components/Input/InputSelect';
import SelectTwo from '@/Components/Input/InputSelectTwo';
import MultiSelect from '@/Components/Input/MultiSelect';
import TextInput from '@/Components/Input/TextInput';
import BackpageLayout from '@/Layouts/BackpageLayout'
import { useStore } from '@/Store/Index.store';
import { ABILITY_CLASSES } from '@/Utils/Constan/Class';
import { CONFIRMATION_STATUSES, GROUP_STATUSES } from '@/Utils/Constan/Status';
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow';

export default function StepOneCreateGapoktanPage() {
  // use store supaya bisa tersimpan di session/storage dan nanti di gunakan di createStepTwo untuk simpan relasi poktan dan commodity nya, karena field commodities tidak ada di tabel poktan (many to many anntara poktan dan commodity)
  const { optionsSelected, setOptionsSelected } = useStore(
    useShallow((state) => (
      {
        optionsSelected: state.optionsSelected,
        setOptionsSelected: state.setOptionsSelected,
      }
    )),
  );

  const { poktan, district, villages, gapoktans, commodities, errors } = usePage().props;
  const [options, setOptions] = useState([]); //untuk menyimpan options multi select nya bentuknya [{value, label}]
  const [selectedValues, setSelectedValues] = useState(optionsSelected ?? []); //value options yang di pilih
  const { data, setData, post, progress, processing, recentlySuccessful } = useForm({
    village_id: poktan?.village_id ?? '',
    gapoktan_id: poktan?.gapoktan_id ?? '',
    name: poktan?.name ?? '',
    leader: poktan?.leader ?? '',
    secretary: poktan?.secretary ?? '',
    treasurer: poktan?.treasurer ?? '',
    number_of_members: poktan?.number_of_members ?? '',
    commodities: selectedValues, // data commodities guna bisa validasi ke BE
    since: poktan?.since ?? '',
    status: poktan?.status ?? 'ACTIVE',
    ability_class: poktan?.ability_class ?? 'BEGINNER',
    group_confirmation_status: poktan?.group_confirmation_status ?? 'CONFIRMED',
    year_of_class_assignment: poktan?.year_of_class_assignment ?? '',
  });

  commodities.forEach((commodity) => {
    if (!options.some(option => option.value === commodity.id)) {
      options.push({
        value: commodity.id,
        label: commodity.name
      });
    }
  });

  // handle selected value commodities
  useEffect(() => {
    setData({
      ...data,
      commodities: selectedValues,
    });
  }, [selectedValues]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // simpan commodity yg di pilih ke store
    setOptionsSelected(data.commodities);

    post(route('poktans.store.step.one', { districtId: district.id }), {
      data: formData
    });
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
          <li className={`flex items-center`}>
            Step 2
          </li>
        </ol>
      </div>
      <div className="min-h-[84dvh] rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <div className="w-full">
                <InputLabel>Kecamatan</InputLabel>
                <TextInput id='kecamatan' name='kecamatan' value={district.name} className="bg-[#e1e1e1]" readOnly />
              </div>
              <div className="">
                <InputLabel>Desa</InputLabel>
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
                <InputLabel>Gapoktan (Pilih jika tergabung dalam gapoktan)</InputLabel>
                <SelectTwo
                  entities={gapoktans}
                  selectedEntityId={data.gapoktan_id}
                  setSelectedEntityId={(id) => setData({ ...data, gapoktan_id: id })}
                  label={'-- Pilih gapoktan --'}
                  placeholder={'Cari gapoktan...'}
                  error={errors.gapoktan_id}
                />
                <InputError message={errors.gapoktan_id} />
              </div>
              <div className="">
                <InputLabel>Nama Poktan</InputLabel>
                <TextInput error={errors.name} defaultValue={data.name} onChange={handleChange} id='name' name='name' placeholder="Nama poktan..." />
                <InputError message={errors.name} />
              </div>
              <div className="">
                <InputLabel>Nama Ketua</InputLabel>
                <TextInput error={errors.leader} defaultValue={data.leader} onChange={handleChange} id='leader' name='leader' placeholder="Ketua..." />
                <InputError message={errors.leader} />
              </div>
              <div className="">
                <InputLabel>Nama Sekretaris</InputLabel>
                <TextInput error={errors.secretary} defaultValue={data.secretary} onChange={handleChange} id='secretary' name='secretary' placeholder="Sekretaris..." />
                <InputError message={errors.secretary} />
              </div>
              <div className="">
                <InputLabel>Nama Bendahara</InputLabel>
                <TextInput error={errors.treasurer} defaultValue={data.treasurer} onChange={handleChange} id='treasurer' name='treasurer' placeholder="Bendahara..." />
                <InputError message={errors.treasurer} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="">
                <InputLabel>Jumlah Anggota</InputLabel>
                <TextInput error={errors.number_of_members} defaultValue={data.number_of_members} type="number" onChange={handleChange} id='number_of_members' name='number_of_members' placeholder="00" />
                <InputError message={errors.number_of_members} />
              </div>
              <div className="">
                <InputLabel>Tahun Pembentukan</InputLabel>
                <TextInput error={errors.since} defaultValue={data.since} type="number" placeholder="YYYY" onChange={handleChange} id='since' name='since' />
                <InputError message={errors.since} />
              </div>
              <div className="">
                <InputLabel>Status</InputLabel>
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
                <InputLabel>Kelas Kemampuan</InputLabel>
                <InputSelect
                  error={errors.ability_class}
                  defaultValue={data.ability_class}
                  onChange={handleChange}
                  id="ability_class"
                  name="ability_class"
                >
                  {ABILITY_CLASSES.map((ability_class, index) => (
                    <option key={index} value={ability_class.value} >{ability_class.label}</option>
                  ))}
                </InputSelect>
                <InputError message={errors.ability_class} />
              </div>
              <div className="">
                <InputLabel>Status Konfirmasi</InputLabel>
                <InputSelect
                  error={errors.group_confirmation_status}
                  defaultValue={data.group_confirmation_status}
                  onChange={handleChange}
                  id="group_confirmation_status"
                  name="group_confirmation_status"
                >
                  {CONFIRMATION_STATUSES.map((confirm_status, index) => (
                    <option key={index} value={confirm_status.value} >{confirm_status.label}</option>
                  ))}
                </InputSelect>
                <InputError message={errors.group_confirmation_status} />
              </div>
              <div className="">
                <InputLabel>Tahun Penetapan Kelas</InputLabel>
                <TextInput error={errors.year_of_class_assignment} defaultValue={data.year_of_class_assignment} onChange={handleChange} type='number' id='year_of_class_assignment' name='year_of_class_assignment' placeholder="YYYY" />
                <InputError message={errors.year_of_class_assignment} />
              </div>
              <div className="">
                <InputLabel>Komoditas Yang Di Usahakan</InputLabel>
                <MultiSelect title={'Pilih komoditas'} onChange={setSelectedValues} options={options} value={selectedValues} error={errors.commodities} />
                <InputError message={errors.commodities} />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 my-2">
            <Link href={`/kelembagaan-pertanian/poktan/kecamatan/${district.id}/back`}>
              <Button type="button" className='bg-red-500 hover:bg-red-600'>Batal</Button>
            </Link>
            <Button disabled={processing} type="submit">{processing ? 'Lanjut...' : 'Lanjut'}</Button>
          </div>
        </form>
      </div>
    </BackpageLayout>
  )
}
