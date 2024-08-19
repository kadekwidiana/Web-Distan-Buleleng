import { Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextInputArea from '../Input/TextInputArea';
import TextInput from '../Input/TextInput';
import Button from '../Button/Button';
import { router, usePage } from '@inertiajs/react';
import { Toast } from '../Alert/Toast';
import InputLabel from '../Input/InputLabel';
import Swal from 'sweetalert2';

export default function ModalInputUserOwnerLand({ openModal, setOpenModal, personById, isUpdate }) {
    const { auth } = usePage().props;
    const isAdmin = auth.user.role === 'ADMIN';
    const [nik, setNik] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isUpdate && personById) {
            setNik(personById.nik);
            setName(personById.name);
            setAddress(personById.address);
            setPhoneNumber(personById.phone_number);
        } else {
            resetForm();
        }
    }, [isUpdate, personById]);

    const resetForm = () => {
        setNik('');
        setName('');
        setAddress('');
        setPhoneNumber('');
        setErrors({});
        setLoading(false);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setErrors({});
        try {
            if (isUpdate && personById) {
                console.log('calll')
                await axios.post(`/pemilik-penggarap/${personById.id}/update`, {
                    nik,
                    name,
                    address,
                    phone_number: phoneNumber,
                });
                Toast.fire({
                    icon: "success",
                    title: "Data berhasil di edit.",
                });
            } else {
                await axios.post('/pemilik-penggarap', {
                    nik,
                    name,
                    address,
                    phone_number: phoneNumber,
                });
                Toast.fire({
                    icon: "success",
                    title: "Data berhasil di simpan.",
                });
            }
            resetForm();
            setOpenModal(false);
            router.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    const submitConfirmation = (e) => {
        e.preventDefault(); // Pastikan form tidak submit secara otomatis
        Swal.fire({
            title: "Konfirmasi Data",
            text: "Apakah Anda yakin data yang diinput sudah benar? Setelah disimpan, data ini hanya dapat diubah oleh ADMIN.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Simpan",
            cancelButtonText: "Periksa Kembali",
        }).then((result) => {
            if (result.isConfirmed) {
                handleSubmit();
            }
        });
    };

    return (
        <Modal show={openModal} onClose={() => {
            resetForm();
            setOpenModal(false);
        }}>
            <Modal.Header>Tambah Data Pemilik/Penggarap Lahan</Modal.Header>
            <Modal.Body>
                <form onSubmit={submitConfirmation} className="space-y-2">
                    <div>
                        <InputLabel htmlFor="nik">NIK*</InputLabel>
                        <TextInput
                            id="nik"
                            value={nik}
                            onChange={(e) => setNik(e.target.value)}
                            required
                            error={errors.nik}
                            placeholder="NIK..."
                        />
                        {errors.nik && <p className="text-red-500 text-sm">{errors.nik}</p>}
                    </div>
                    <div>
                        <InputLabel htmlFor="name">Nama*</InputLabel>
                        <TextInput
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            error={errors.name}
                            placeholder="Nama..."
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div>
                        <InputLabel htmlFor="phone_number">Nomor Telepon</InputLabel>
                        <TextInput
                            id="phone_number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            error={errors.phone_number}
                            placeholder="Nomor Telepon..."
                        />
                        {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
                    </div>
                    <div>
                        <InputLabel htmlFor="address">Alamat*</InputLabel>
                        <TextInputArea
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            placeholder="Alamat..."
                            error={errors.address}
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className='flex justify-end gap-2'>
                <Button className='bg-red-500 hover:bg-red-600' onClick={() => {
                    resetForm();
                    setOpenModal(false);
                }} disabled={loading}>
                    Batal
                </Button>
                <Button onClick={isAdmin ? handleSubmit : submitConfirmation} disabled={loading}>
                    {loading ? 'Simpan...' : 'Simpan'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
