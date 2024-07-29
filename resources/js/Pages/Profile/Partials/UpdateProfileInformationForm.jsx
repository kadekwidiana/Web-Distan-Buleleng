import { useForm, usePage, Link } from '@inertiajs/react';
import InputLabel from '@/Components/Input/InputLabel';
import TextInput from '@/Components/Input/TextInput';
import InputError from '@/Components/Error/InputError';
import Button from '@/Components/Button/Button';
import { Toast } from '@/Components/Alert/Toast';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const { props: { auth: { user } } } = usePage();

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        nik: user.nik,
        address: user.address,
        phone_number: user.phone_number,
        role: user.role,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        post(route('profile.update', { userId: user.id }), {
            data: formData,
            onSuccess: () => {
                Toast.fire({
                    icon: "success",
                    title: "Profil anda berhasil di update.",
                });
            }
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-semibold text-gray-900">Informasi Profil</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Perbarui informasi profil Anda, pastikan semua data sudah benar sebelum menyimpannya.
                </p>
            </header>

            <form onSubmit={submit} className="mt-4 space-y-2" encType="multipart/form-data">
                <div className="">
                    <InputLabel>NIK</InputLabel>
                    <TextInput id='nik' name='nik' value={data.nik} onChange={handleChange} required />
                    <InputError message={errors.nik} />
                </div>
                <div className="">
                    <InputLabel>Nama Lengkap</InputLabel>
                    <TextInput id='name' name='name' value={data.name} onChange={handleChange} required />
                    <InputError message={errors.name} />
                </div>
                <div className="">
                    <InputLabel>Email</InputLabel>
                    <TextInput id='email' name='email' value={data.email} onChange={handleChange} required />
                    <InputError message={errors.email} />
                </div>
                <div className="">
                    <InputLabel>No. Telepon</InputLabel>
                    <TextInput id='phone_number' name='phone_number' value={data.phone_number} onChange={handleChange} required />
                    <InputError message={errors.phone_number} />
                </div>
                <div className="">
                    <InputLabel>Jabatan/Role</InputLabel>
                    <TextInput id='role' name='role' value={data.role} onChange={handleChange} required readOnly />
                    <InputError message={errors.role} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex justify-end items-center gap-4">
                    <Button disabled={processing} type="submit">{processing ? 'Simpan...' : 'Simpan'}</Button>
                </div>
            </form>
        </section>
    );
}
