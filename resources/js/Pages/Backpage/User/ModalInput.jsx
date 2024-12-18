import { Toast } from "@/Components/Alert/Toast";
import Button from "@/Components/Button/Button";
import InputLabel from "@/Components/Input/InputLabel";
import InputSelect from "@/Components/Input/InputSelect";
import TextInput from "@/Components/Input/TextInput";
import TextInputArea from "@/Components/Input/TextInputArea";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";
import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";

export default function ModalInputUser({ openModal, setOpenModal, personById, isUpdate }) {
    const [nik, setNik] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('ADMIN');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isUpdate && personById) {
            setNik(personById.nik);
            setName(personById.name);
            setAddress(personById.address);
            setPhoneNumber(personById.phone_number);
            setEmail(personById.email);
            setRole(personById.role);
        } else {
            resetForm();
        }
    }, [isUpdate, personById]);

    const resetForm = () => {
        setNik('');
        setName('');
        setAddress('');
        setPhoneNumber('');
        setEmail('');
        setPassword('');
        setRole('ADMIN');
        setErrors({});
        setLoading(false);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setErrors({});
        try {
            if (isUpdate && personById) {
                // console.log('calll');
                await axios.post(`/data-pengguna/${personById.id}/update`, {
                    nik,
                    name,
                    address,
                    phone_number: phoneNumber,
                    email,
                    password,
                    role
                });
                Toast.fire({
                    icon: "success",
                    title: "Data berhasil di edit.",
                });
            } else {
                await axios.post('/data-pengguna', {
                    nik,
                    name,
                    address,
                    phone_number: phoneNumber,
                    email,
                    password,
                    role
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

    return (
        <Modal show={openModal} onClose={() => {
            resetForm();
            setOpenModal(false);
        }}>
            <Modal.Header>Tambah Data Pengguna</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-2">
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
                    <div>
                        <InputLabel htmlFor="email">Email*</InputLabel>
                        <TextInput
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            error={errors.email}
                            placeholder="Email..."
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div>
                        <InputLabel htmlFor="password">Password*</InputLabel>
                        <TextInput
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            error={errors.password}
                            placeholder="Password..."
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <div>
                        <InputLabel htmlFor="role">Role*</InputLabel>
                        <InputSelect
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            error={errors.role}
                        >
                            {/* <option value="" defaultChecked>-- Pilih Role --</option> */}
                            <option value="ADMIN" >ADMIN</option>
                        </InputSelect>
                        {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
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
                    {loading ? 'Simpan...' : 'Simpan'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
