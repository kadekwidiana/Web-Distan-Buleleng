import { useForm, usePage, Link } from '@inertiajs/react';
import InputError from '@/Components/Error/InputError';
import Button from '@/Components/Button/Button';
import { Toast } from '@/Components/Alert/Toast';

export default function UpdateFotoUser({ mustVerifyEmail, status, className = '' }) {
    const { props: { auth: { user } } } = usePage();

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        nik: user.nik,
        foto: user.foto,
        address: user.address,
        phone_number: user.phone_number,
        role: user.role,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            setData({
                ...data,
                [name]: files[0],
            });
        } else {
            setData({
                ...data,
                [name]: value,
            });
        }
    };

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        post(route('profile.update', { userId: user.id }), {
            data: formData,
            onSuccess: () => {
                Toast.fire({
                    icon: "success",
                    title: "Foto profil anda berhasil di update.",
                });
            }
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-semibold text-gray-900">Foto Profil</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Unggah dan perbarui foto profil Anda, foto harus dalam format SVG, PNG, JPG (MAX.2MB)
                </p>
            </header>
            <div className="flex justify-center mt-2">
                <img src={user.foto ? `/storage/${user.foto}` : 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg'} alt="" className='max-h-64 border rounded-sm' />
            </div>
            <form onSubmit={submit} className="mt-2 space-y-2" encType="multipart/form-data">
                <div className="">
                    <div className="flex justify-between gap-2">
                        <input type="file" onChange={handleChange} id='foto' name='foto' className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
                        <Button disabled={processing} type="submit">{processing ? 'Simpan...' : 'Simpan'}</Button>
                    </div>
                    <InputError message={errors.foto} />
                </div>
            </form>
        </section>
    );
}
