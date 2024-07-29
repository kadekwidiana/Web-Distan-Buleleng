import { Modal } from 'flowbite-react';
import React, { useState } from 'react';
import axios from 'axios';
import TextInputArea from '../Input/TextInputArea';
import TextInput from '../Input/TextInput';
import Button from '../Button/Button';
import { router } from '@inertiajs/react';
import { Toast } from '../Alert/Toast';
import InputLabel from '../Input/InputLabel';

export default function ModalInputUserOwnerLand({ openModal, setOpenModal }) {
    const [nik, setNik] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const resetForm = () => {
        setNik('');
        setName('');
        setAddress('');
        setPhoneNumber('');
        setErrors({});
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        try {
            const response = await axios.post('/owner', {
                nik,
                name,
                address,
                phone_number: phoneNumber,
            });
            resetForm();
            setOpenModal(false);
            router.reload();
            Toast.fire({
                icon: "success",
                title: "Data berhasil di simpan.",
            });
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

    return (
        <Modal show={openModal} onClose={() => {
            resetForm();
            setOpenModal(false);
        }}>
            <Modal.Header>Tambah Data Pemilik Lahan</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <div>
                        <InputLabel htmlFor="nik">NIK</InputLabel>
                        <TextInput
                            id="nik"
                            value={nik}
                            onChange={(e) => setNik(e.target.value)}
                            required
                            error={errors.nik}
                            placeholder="Masukkan NIK"
                        />
                        {errors.nik && <p className="text-red-500 text-sm">{errors.nik}</p>}
                    </div>
                    <div>
                        <InputLabel htmlFor="name">Nama</InputLabel>
                        <TextInput
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            error={errors.name}
                            placeholder="Masukkan Nama"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div>
                        <InputLabel htmlFor="phone_number">Nomor Telepon</InputLabel>
                        <TextInput
                            id="phone_number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            error={errors.phone_number}
                            placeholder="Masukkan Nomor Telepon"
                        />
                        {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
                    </div>
                    <div>
                        <InputLabel htmlFor="address">Alamat</InputLabel>
                        <TextInputArea
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            placeholder="Masukkan Alamat"
                            error={errors.address ? errors.address : ''}
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
                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Menyimpan...' : 'Simpan'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
