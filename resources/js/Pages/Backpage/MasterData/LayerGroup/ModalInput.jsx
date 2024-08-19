import { Toast } from "@/Components/Alert/Toast";
import Button from "@/Components/Button/Button";
import InputLabel from "@/Components/Input/InputLabel";
import InputSelect from "@/Components/Input/InputSelect";
import SelectTwo from "@/Components/Input/InputSelectTwo";
import TextInput from "@/Components/Input/TextInput";
import TextInputArea from "@/Components/Input/TextInputArea";
import { DATA_STATUSES } from "@/Constant/Status";
import { router } from "@inertiajs/react";
import axios from "axios";
import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";

export default function ModalInputLayerGroup({ openModal, setOpenModal, layerGroupById, isUpdate }) {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('ACTIVE');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isUpdate && layerGroupById) {
            setName(layerGroupById.name);
            setStatus(layerGroupById.status);
            setDescription(layerGroupById.description);
        } else {
            resetForm();
        }
    }, [isUpdate, layerGroupById]);

    const resetForm = () => {
        setName('');
        setStatus('ACTIVE');
        setDescription('');
        setErrors({});
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const formData = new FormData();
        formData.append('name', name);
        formData.append('status', status);
        formData.append('description', description);

        try {
            if (isUpdate && layerGroupById) {
                await axios.post(`/master-data/layer-grup/${layerGroupById.id}/update`, formData);
                Toast.fire({
                    icon: "success",
                    title: "Data berhasil di edit.",
                });
            } else {
                await axios.post('/master-data/layer-grup', formData);
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
            if (!isUpdate) {
                resetForm();
            }
            setOpenModal(false);
        }}>
            <Modal.Header>{isUpdate ? 'Edit Layer Grup' : 'Tambah Layer Grup'}</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-2" encType="multipart/form-data">
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
                    <div className="">
                        <InputLabel>Status*</InputLabel>
                        <InputSelect
                            error={errors.status}
                            onChange={(e) => setStatus(e.target.value)}
                            id="status"
                            name="status"
                            value={status}
                        >
                            {DATA_STATUSES.map((status, index) => (
                                <option key={index} value={status.value}>{status.label}</option>
                            ))}
                        </InputSelect>
                        {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                    </div>
                    <div>
                        <InputLabel htmlFor="description">Deskripsi</InputLabel>
                        <TextInputArea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Deskripsi..."
                            error={errors.description ? errors.description : ''}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
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
