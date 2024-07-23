import { Carousel, Modal } from 'flowbite-react';
import React, { useState } from 'react';
import Button from '../Button/Button';

export default function DetailGapoktan({ openModal, setOpenModal, gapoktan }) {
    let photos = [];
    try {
        photos = JSON.parse(gapoktan.photo) || [];
    } catch (e) {
        photos = [];
    }

    return (
        <Modal size='3xl' show={openModal} onClose={() => setOpenModal(false)} className='bg-black/20'>
            <Modal.Header>{gapoktan.name}</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <div className="h-80">
                        <Carousel>
                            {photos.length > 0 ? photos.map((photo, index) => (
                                <img key={index} src={photo || "https://flowbite.com/docs/images/carousel/carousel-1.svg"} alt={`Photo ${index + 1}`} className='w-full' />
                            )) :
                                <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="Default" />
                            }
                        </Carousel>
                    </div>


                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                            <tbody>
                                <tr className="bg-white">
                                    <td className="pr-2 py-2 w-1/5">Nama Gapoktan</td>
                                    <td className="px-2 py-2 w-3">:</td>
                                    <td className="px-2 py-2 w-full">{gapoktan.name}</td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="pr-2 py-2 w-1/5">Ketua</td>
                                    <td className="px-2 py-2 w-3">:</td>
                                    <td className="px-2 py-2 w-full">{gapoktan.leader}</td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="pr-2 py-2 w-1/5">Sekretaris</td>
                                    <td className="px-2 py-2 w-3">:</td>
                                    <td className="px-2 py-2 w-full">{gapoktan.secretary}</td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="pr-2 py-2 w-1/5">Bendahara</td>
                                    <td className="px-2 py-2 w-3">:</td>
                                    <td className="px-2 py-2 w-full">{gapoktan.treasurer}</td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="pr-2 py-2 w-1/5">Jumlah Anggota</td>
                                    <td className="px-2 py-2 w-3">:</td>
                                    <td className="px-2 py-2 w-full">{gapoktan.number_of_members}</td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="pr-2 py-2 w-1/5">Sejak</td>
                                    <td className="px-2 py-2 w-3">:</td>
                                    <td className="px-2 py-2 w-full">{gapoktan.since}</td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="pr-2 py-2 w-1/5">Alamat</td>
                                    <td className="px-2 py-2 w-3">:</td>
                                    <td className="px-2 py-2 w-full">{gapoktan.address}</td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="pr-2 py-2 w-1/5">SK Konfirmasi</td>
                                    <td className="px-2 py-2 w-3">:</td>
                                    <td className="px-2 py-2 w-full">{gapoktan.confirmation_sk}</td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="pr-2 py-2 w-1/5">Nomor SK</td>
                                    <td className="px-2 py-2 w-3">:</td>
                                    <td className="px-2 py-2 w-full">{gapoktan.confirmation_sk_no}</td>
                                </tr>
                                {/* <tr className="bg-white">
                                    <td className="pr-2 py-2 w-1/5">Unit Usaha</td>
                                    <td className="px-2 py-2 w-3">:</td>
                                    <td className="px-2 py-2 w-full">{JSON.parse(gapoktan.business_unit).jasa_lainnya}</td>
                                </tr> */}
                                <tr className="bg-white">
                                    <td className="pr-2 py-2 w-1/5">Usaha Pertanian</td>
                                    <td className="px-2 py-2 w-3">:</td>
                                    <td className="px-2 py-2 w-full">{gapoktan.farming_business}</td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="pr-2 py-2 w-1/5">Proses Usaha</td>
                                    <td className="px-2 py-2 w-3">:</td>
                                    <td className="px-2 py-2 w-full">{gapoktan.business_process}</td>
                                </tr>
                                {/* <tr className="bg-white">
                                    <td className="pr-2 py-2 w-1/5">Peralatan dan Mesin</td>
                                    <td className="px-2 py-2 w-3">:</td>
                                    <td className="px-2 py-2 w-full">{JSON.parse(gapoktan.tools_and_machines).traktor}</td>
                                </tr> */}
                                <tr className="bg-white">
                                    <td className="pr-2 py-2 w-1/5">Deskripsi</td>
                                    <td className="px-2 py-2 w-3">:</td>
                                    <td className="px-2 py-2 w-full">{gapoktan.description}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="text-base leading-relaxed text-gray-500">
                        With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
                        companies around the world are updating their terms of service agreements to comply.
                    </p>
                    <p className="text-base leading-relaxed text-gray-500">
                        The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
                        to ensure a common set of data rights in the European Union. It requires organizations to notify users as
                        soon as possible of high-risk data breaches that could personally affect them.
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer className='flex justify-end'>
                <Button onClick={() => setOpenModal(false)}>Tutup</Button>
            </Modal.Footer>
        </Modal>
    );
}
