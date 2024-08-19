import { Banner } from 'flowbite-react'
import React, { useState } from 'react'
import Button from '../Button/Button'
import ModalInputUserOwnerLand from '../Modal/InputUserOwnerLand';

export default function BannerInfoAddOwnerLand() {
    const [openModal, setOpenModal] = useState(false);
    return (
        <Banner>
            <div className="flex w-full flex-col justify-between rounded-md border-t-4 border-blue-500 bg-blue-100 p-4 shadow-sm md:flex-row lg:max-w-7xl">
                <div className="mb-3 mr-4 flex flex-col">
                    <h3>Petunjuk.</h3>
                    <p className="flex items-center text-sm font-normal text-gray-600">
                        Tambah data Pemilik/Penggarap lahan jika belum terdaftar dalam sistem.
                    </p>
                </div>
                <div className="flex shrink-0 items-center">
                    <Button onClick={() => setOpenModal(true)} type='button' href="#">Tambah data</Button>
                </div>
                <ModalInputUserOwnerLand openModal={openModal} setOpenModal={setOpenModal} />
            </div>
        </Banner>
    )
}
