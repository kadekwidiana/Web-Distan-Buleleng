import { Toast } from "@/Components/Alert/Toast";
import Button from "@/Components/Button/Button";
import InputLabel from "@/Components/Input/InputLabel";
import SelectTwo from "@/Components/Input/InputSelectTwo";
import TextInput from "@/Components/Input/TextInput";
import TextInputArea from "@/Components/Input/TextInputArea";
import { router } from "@inertiajs/react";
import axios from "axios";
import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";

export default function ModalInputCommodity({ openModal, setOpenModal, typeAgricultures, commodityById, isUpdate }) {
    console.log(isUpdate);
    const [typeAgricultureId, setTypeAgricultureId] = useState('');
    const [name, setName] = useState('');
    const [icon, setIcon] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isUpdate && commodityById) {
            setTypeAgricultureId(commodityById.type_agriculture_id);
            setName(commodityById.name);
            setDescription(commodityById.description);
            if (commodityById.icon) {
                setPreviewImage(`/storage/${commodityById.icon}`);
            }
        } else {
            resetForm();
        }
    }, [isUpdate, commodityById]);

    const resetForm = () => {
        setTypeAgricultureId('');
        setName('');
        setIcon(null);
        setPreviewImage(null);
        setDescription('');
        setErrors({});
        setLoading(false);
    };

    const handleIconChange = (e) => {
        const file = e.target.files[0];
        setIcon(file);
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        } else {
            setPreviewImage(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const formData = new FormData();
        formData.append('type_agriculture_id', typeAgricultureId);
        formData.append('name', name);
        if (icon) formData.append('icon', icon);
        formData.append('description', description);

        try {
            if (isUpdate && commodityById) {
                await axios.post(`/master-data/komoditas/${commodityById.id}/update`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                Toast.fire({
                    icon: "success",
                    title: "Data berhasil di edit.",
                });
            } else {
                await axios.post('/master-data/komoditas', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
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
            if (!isUpdate) {
                resetForm();
            }
            setOpenModal(false);
        }}>
            <Modal.Header>{isUpdate ? 'Edit Komoditas' : 'Tambah Komoditas'}</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-2" encType="multipart/form-data">
                    <div>
                        <InputLabel>Jenis Pertanian*</InputLabel>
                        <SelectTwo
                            entities={typeAgricultures}
                            selectedEntityId={typeAgricultureId}
                            setSelectedEntityId={setTypeAgricultureId}
                            label={'-- Pilih jenis pertanian --'}
                            placeholder={'Cari jenis pertanian...'}
                            error={errors.type_agriculture_id}
                        />
                        {errors.type_agriculture_id && <p className="text-red-500 text-sm">{errors.type_agriculture_id}</p>}
                    </div>
                    <div>
                        <InputLabel htmlFor="name">Nama Komoditas*</InputLabel>
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
                        {previewImage && (
                            <div className="mt-2">
                                <img src={previewImage} alt="Preview" className="h-20 w-20 object-cover rounded-lg" />
                            </div>
                        )}
                        <InputLabel htmlFor="icon">Icon{!isUpdate && '*'}</InputLabel>
                        <input
                            id="icon"
                            type="file"
                            onChange={handleIconChange}
                            className="w-full rounded-md bg-white border border-gray-400 text-black transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter focus:outline-none focus-visible:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.icon && <p className="text-red-500 text-sm">{errors.icon}</p>}
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
