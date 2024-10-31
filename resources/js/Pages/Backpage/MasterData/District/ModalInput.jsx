import { Toast } from "@/Components/Alert/Toast";
import Button from "@/Components/Button/Button";
import InputLabel from "@/Components/Input/InputLabel";
import TextInput from "@/Components/Input/TextInput";
import TextInputArea from "@/Components/Input/TextInputArea";
import { router } from "@inertiajs/react";
import axios from "axios";
import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";

export default function ModalInputDistrict({ openModal, setOpenModal, districtById, isUpdate }) {
    const [id, setId] = useState('');
    const [regencyId, setRegencyId] = useState(5108); // id kabupaten buleleng
    const [name, setName] = useState('');
    const [wide, setWide] = useState('');
    const [centerCoordinate, setCenterCoordinate] = useState('');
    const [areaJson, setAreaJson] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isUpdate && districtById) {
            setId(districtById.id);
            setRegencyId(5108);
            setName(districtById.name ?? '');
            setWide(districtById.wide ?? '');
            setCenterCoordinate(districtById.center_coordinate ? JSON.stringify(districtById.center_coordinate) : '');
            setAreaJson(districtById.area_json ? JSON.stringify(districtById.area_json) : '');
            setErrors({});
        } else {
            resetForm();
        }
    }, [isUpdate, districtById]);

    const resetForm = () => {
        setId('');
        setRegencyId(5108);
        setName('');
        setWide('');
        setCenterCoordinate('');
        setAreaJson('');
        setErrors({});
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const formData = new FormData();
        formData.append('id', id);
        formData.append('regency_id', regencyId);
        formData.append('name', name);
        formData.append('wide', wide);
        formData.append('center_coordinate', centerCoordinate);
        formData.append('area_json', areaJson);

        try {
            if (isUpdate && districtById) {
                await axios.post(`/master-data/kecamatan/${districtById.id}/update`, formData);
                Toast.fire({
                    icon: "success",
                    title: "Data berhasil di edit.",
                });
            } else {
                await axios.post('/master-data/kecamatan', formData);
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
            <Modal.Header>{isUpdate ? 'Edit Kecamatan' : 'Tambah Kecamatan'}</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="space-y-2" encType="multipart/form-data">
                    <div>
                        <InputLabel htmlFor="regency_Id">Kabupaten</InputLabel>
                        <TextInput
                            id="regency_Id"
                            value={'BULELENG'}
                            onChange={(e) => setRegencyId(e.target.value)}
                            required
                            error={errors.regency_Id}
                            placeholder="Kabupaten..."
                            readOnly
                        />
                        {errors.regency_Id && <p className="text-red-500 text-sm">{errors.regency_Id}</p>}
                    </div>
                    {!districtById?.id &&
                        <div>
                            <InputLabel htmlFor="id">Id*</InputLabel>
                            <TextInput
                                id="id"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                required
                                error={errors.id}
                                placeholder="Id..."
                            />
                            {errors.id && <p className="text-red-500 text-sm">{errors.id}</p>}
                        </div>
                    }
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
                        <InputLabel htmlFor="wide">Luas*</InputLabel>
                        <TextInput
                            id="wide"
                            value={wide}
                            onChange={(e) => setWide(e.target.value)}
                            required
                            error={errors.wide}
                            placeholder="Luas..."
                        />
                        {errors.wide && <p className="text-red-500 text-sm">{errors.wide}</p>}
                    </div>
                    <div>
                        <InputLabel htmlFor="center_coordinate">Center Kordinat*</InputLabel>
                        <TextInput
                            id="center_coordinate"
                            value={centerCoordinate}
                            onChange={(e) => setCenterCoordinate(e.target.value)}
                            required
                            error={errors.center_coordinate}
                            placeholder="Center Kordinat..."
                        />
                        {errors.center_coordinate && <p className="text-red-500 text-sm">{errors.center_coordinate}</p>}
                    </div>
                    <div>
                        <InputLabel htmlFor="area_json">Area Json*</InputLabel>
                        <TextInputArea
                            id="area_json"
                            value={areaJson}
                            onChange={(e) => setAreaJson(e.target.value)}
                            placeholder="Geometry..."
                            error={errors.area_json ? errors.area_json : ''}
                        />
                        {errors.area_json && <p className="text-red-500 text-sm">{errors.area_json}</p>}
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
