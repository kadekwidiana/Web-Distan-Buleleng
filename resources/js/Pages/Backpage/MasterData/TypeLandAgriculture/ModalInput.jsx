import { Toast } from "@/Components/Alert/Toast";
import Button from "@/Components/Button/Button";
import InputLabel from "@/Components/Input/InputLabel";
import InputSelect from "@/Components/Input/InputSelect";
import SelectTwo from "@/Components/Input/InputSelectTwo";
import TextInput from "@/Components/Input/TextInput";
import TextInputArea from "@/Components/Input/TextInputArea";
import { DATA_STATUSES } from "@/Utils/Constan/Status";
import { router } from "@inertiajs/react";
import axios from "axios";
import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";

export default function ModalInputTypeLandAgriculture({ openModal, setOpenModal, layerGroups, typeLandAgricultureById, isUpdate }) {
    const [layerGroupId, setLayerGroupId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isUpdate && typeLandAgricultureById) {
            setLayerGroupId(typeLandAgricultureById.layer_group_id);
            setName(typeLandAgricultureById.name);
            setDescription(typeLandAgricultureById.description);
        } else {
            resetForm();
        }
    }, [isUpdate, typeLandAgricultureById]);

    const resetForm = () => {
        setName('');
        setLayerGroupId('');
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
        formData.append('layer_group_id', layerGroupId);
        formData.append('description', description);

        try {
            if (isUpdate && typeLandAgricultureById) {
                await axios.post(`/master-data/jenis-lahan-pertanian/${typeLandAgricultureById.id}/update`, formData);
                Toast.fire({
                    icon: "success",
                    title: "Data berhasil di edit.",
                });
            } else {
                await axios.post('/master-data/jenis-lahan-pertanian', formData);
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
            <Modal.Header>{isUpdate ? 'Edit Jenis Pertanian' : 'Tambah Jenis Pertanian'}</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-2" encType="multipart/form-data">
                    <div className="">
                        <InputLabel>Layer Grup*</InputLabel>
                        <SelectTwo
                            entities={layerGroups}
                            selectedEntityId={layerGroupId}
                            setSelectedEntityId={setLayerGroupId}
                            label={'-- Pilih layer grup --'}
                            placeholder={'Cari layer grup...'}
                            error={errors.layer_group_id}
                        />
                        {errors.layer_group_id && <p className="text-red-500 text-sm">{errors.layer_group_id}</p>}
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
                    // resetForm();
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
