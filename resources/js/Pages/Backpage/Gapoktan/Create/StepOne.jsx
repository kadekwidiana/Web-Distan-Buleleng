import { Toast } from '@/Components/Alert/Toast';
import Button from '@/Components/Button/Button';
import Checkbox from '@/Components/Input/Checkbox';
import InputError from '@/Components/Input/InputError';
import InputLabel from '@/Components/Input/InputLabel';
import InputSelect from '@/Components/Input/InputSelect';
import TextInput from '@/Components/Input/TextInput';
import BackpageLayout from '@/Layouts/BackpageLayout'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import React from 'react'

export default function StepOneCreateGapoktanPage() {
  const { gapoktan, district, villages, errors } = usePage().props;
  const { data, setData, post, progress, processing, recentlySuccessful } = useForm({
    village_id: gapoktan?.village_id ?? '',
    name: gapoktan?.name ?? '',
    leader: gapoktan?.leader ?? '',
    secretary: gapoktan?.secretary ?? '',
    treasurer: gapoktan?.treasurer ?? '',
    number_of_members: gapoktan?.number_of_members ?? '',
    since: gapoktan?.since ?? '',
    confirmation_sk: gapoktan?.confirmation_sk ?? '',
    confirmation_sk_no: gapoktan?.confirmation_sk_no ?? '',
    business_unit: gapoktan?.business_unit ?? {
      sp_produksi: false,
      pemasaran: false,
      keuangan_mikro: false,
      jasa_lainnya: ''
    },
    farming_business: gapoktan?.farming_business ?? '',
    business_process: gapoktan?.business_process ?? '',
    tools_and_machines: gapoktan?.tools_and_machines ?? {
      traktor: '',
      hand_traktor: '',
      pompa_air: '',
      mesin_penggiling_padi: '',
      mesin_pengering: '',
      lainnya: '',
    },
  });

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

    post(route('gapoktans.store.step.one', { districtId: district.id }), {
      data: formData
    });
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
                <InputSelect
                  error={errors.village_id}
                  defaultValue={data.village_id}
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
                <InputLabel>Nama Gapoktan</InputLabel>
                <TextInput error={errors.name} defaultValue={data.name} onChange={handleChange} id='name' name='name' placeholder="Nama gapoktan.." />
                <InputError message={errors.name} />
              </div>
              <div className="">
                <InputLabel>Ketua</InputLabel>
                <TextInput error={errors.leader} defaultValue={data.leader} onChange={handleChange} id='leader' name='leader' placeholder="Ketua.." />
                <InputError message={errors.leader} />
              </div>
              <div className="">
                <InputLabel>Sekretaris</InputLabel>
                <TextInput error={errors.secretary} defaultValue={data.secretary} onChange={handleChange} id='secretary' name='secretary' placeholder="Sekretaris.." />
                <InputError message={errors.secretary} />
              </div>
              <div className="">
                <InputLabel>Bendahara</InputLabel>
                <TextInput error={errors.treasurer} defaultValue={data.treasurer} onChange={handleChange} id='treasurer' name='treasurer' placeholder="Bendahara.." />
                <InputError message={errors.treasurer} />
              </div>
              <div className="">
                <InputLabel>Jumlah Anggota</InputLabel>
                <TextInput error={errors.number_of_members} defaultValue={data.number_of_members} type="number" onChange={handleChange} id='number_of_members' name='number_of_members' placeholder="Jumlah anggota.." />
                <InputError message={errors.number_of_members} />
              </div>
              <div className="">
                <InputLabel>Tahun Pembentukan</InputLabel>
                <TextInput error={errors.since} defaultValue={data.since} type="number" placeholder="YYYY" onChange={handleChange} id='since' name='since' />
                <InputError message={errors.since} />
              </div>
              <div className="">
                <InputLabel>SK Pengukuhan</InputLabel>
                <TextInput error={errors.confirmation_sk} defaultValue={data.confirmation_sk} onChange={handleChange} id='confirmation_sk' name='confirmation_sk' placeholder="SK Pengukuhan.." />
                <InputError message={errors.confirmation_sk} />
              </div>
              <div className="">
                <InputLabel>No. SK Pengukuhan</InputLabel>
                <TextInput error={errors.confirmation_sk_no} defaultValue={data.confirmation_sk_no} onChange={handleChange} id='confirmation_sk_no' name='confirmation_sk_no' placeholder="No. SK Pengukuhan.." />
                <InputError message={errors.confirmation_sk_no} />
              </div>
            </div>
            <div className="flex flex-col gap-3">

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
                    <span className="ms-2 text-base text-gray-800">Keuangan mikro/Simpan pinjam</span>
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
                <TextInput error={errors.farming_business} defaultValue={data.farming_business} onChange={handleChange} id='farming_business' name='farming_business' placeholder="Bisnis pertanian.." />
                <InputError message={errors.farming_business} />
              </div>
              <div className="">
                <InputLabel>Usaha Olah</InputLabel>
                <TextInput error={errors.business_process} defaultValue={data.business_process} onChange={handleChange} id='business_process' name='business_process' placeholder="Proses bisnis.." />
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
            </div>
          </div>
          <div className="flex justify-end gap-4 my-2">
            <Link href={`/kelembagaan-pertanian/gapoktan/kecamatan/${district.id}/back`}>
              <Button type="button" className='bg-red-500 hover:bg-red-600'>Batal</Button>
            </Link>
            <Button disabled={processing} type="submit">{processing ? 'Lanjut...' : 'Lanjut'}</Button>
          </div>
        </form>
      </div>
    </BackpageLayout>
  )
}
