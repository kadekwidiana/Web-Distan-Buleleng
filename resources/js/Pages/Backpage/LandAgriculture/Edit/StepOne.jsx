import { Toast } from '@/Components/Alert/Toast';
import BannerInfoAddOwnerLand from '@/Components/Banner/InfoAddOwnerLand';
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
import { Banner } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import { useShallow } from 'zustand/react/shallow';

export default function StepOneCreateLandAgriculturePage() {
  // use store supaya bisa tersimpan di session/storage dan nanti di gunakan di createStepTwo untuk simpan relasi landAgriculture dan commodity nya, karena field commodities tidak ada di tabel landAgriculture (many to many anntara landAgriculture dan commodity)
  const { optionsSelected, setOptionsSelected } = useStore(
    useShallow((state) => (
      {
        optionsSelected: state.optionsSelected,
        setOptionsSelected: state.setOptionsSelected,
      }
    )),
  );

  const { landAgriculture, landAgricultureById, commodityIds, district, villages, poktans, subaks, typeLandAgricultures, owners, commodities, errors } = usePage().props;
  const [options, setOptions] = useState([]); //untuk menyimpan options multi select nya bentuknya [{value, label}]
  const [selectedValues, setSelectedValues] = useState(optionsSelected ?? commodityIds); //value options yang di pilih
  const { data, setData, post, progress, processing, recentlySuccessful } = useForm({
    village_id: landAgriculture?.village_id ?? landAgricultureById?.village_id,
    poktan_id: landAgriculture?.poktan_id ?? landAgricultureById?.poktan_id,
    subak_id: landAgriculture?.subak_id ?? landAgricultureById?.subak_id,
    type_land_agriculture_id: landAgriculture?.type_land_agriculture_id ?? landAgricultureById?.type_land_agriculture_id,
    owner_id: landAgriculture?.owner_id ?? landAgricultureById?.owner_id,
    commodities: selectedValues, // data commodities guna bisa validasi ke BE
    status: landAgriculture?.status ?? landAgricultureById?.status,
  });

  console.log(landAgricultureById?.owner_id);

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

    post(route('landAgricultures.update.step.one', { districtId: district.id, landAgricultureId: landAgricultureById.id }), {
      data: formData
    });
  };

  return (
    <BackpageLayout>
      <Head title="Edit Lahan Pertanian" />
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
              <div className="">
                <BannerInfoAddOwnerLand />
              </div>
              <div className="">
                <InputLabel>Pemilik</InputLabel>
                <SelectTwo
                  entities={owners}
                  selectedEntityId={data.owner_id}
                  setSelectedEntityId={(id) => setData({ ...data, owner_id: id })}
                  otherEntity={'nik'}
                  label={'-- Pilih pemilik --'}
                  placeholder={'Cari pemilik berdasarkan nama/nik...'}
                  error={errors.owner_id}
                />
                <InputError message={errors.owner_id} />
              </div>

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
            </div>
            <div className="flex flex-col gap-3">
              <div className="">
                <InputLabel>Poktan (Pilih jika tergabung dalam poktan)</InputLabel>
                <SelectTwo
                  entities={poktans}
                  selectedEntityId={data.poktan_id}
                  setSelectedEntityId={(id) => setData({ ...data, poktan_id: id })}
                  label={'-- Pilih poktan --'}
                  placeholder={'Cari poktan...'}
                  error={errors.poktan_id}
                />
                <InputError message={errors.poktan_id} />
              </div>
              <div className="">
                <InputLabel>Subak (Pilih jika tergabung dalam subak)</InputLabel>
                <SelectTwo
                  entities={subaks}
                  selectedEntityId={data.subak_id}
                  setSelectedEntityId={(id) => setData({ ...data, subak_id: id })}
                  label={'-- Pilih subak --'}
                  placeholder={'Cari subak...'}
                  error={errors.subak_id}
                />
                <InputError message={errors.subak_id} />
              </div>
              <div className="">
                <InputLabel>Jenis Lahan</InputLabel>
                <InputSelect
                  error={errors.type_land_agriculture_id}
                  defaultValue={data.type_land_agriculture_id}
                  onChange={handleChange}
                  id="type_land_agriculture_id"
                  name="type_land_agriculture_id"
                >
                  <option value={null} defaultChecked>-- Pilih jenis lahan --</option>
                  {typeLandAgricultures.length > 0 && typeLandAgricultures.map((typeLandAgriculture, index) => (
                    <option key={index} value={typeLandAgriculture.id}>{typeLandAgriculture.name}</option>
                  ))}
                </InputSelect>
                <InputError message={errors.type_land_agriculture_id} />
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
                <InputLabel>Komoditas Lahan</InputLabel>
                <MultiSelect title={'Pilih komoditas'} onChange={setSelectedValues} options={options} value={selectedValues} error={errors.commodities} />
                <InputError message={errors.commodities} />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 my-2">
            <Link href={`/lahan_pertanian/kecamatan/${district.id}/back`}>
              <Button type="button" className='bg-red-500 hover:bg-red-600'>Batal</Button>
            </Link>
            <Button disabled={processing} type="submit">{processing ? 'Lanjut...' : 'Lanjut'}</Button>
          </div>
        </form>
      </div>
    </BackpageLayout>
  )
}
