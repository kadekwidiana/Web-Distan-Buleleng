import { useRef } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/Input/InputLabel';
import TextInputPassword from '@/Components/Input/TextInputPassword';
import InputError from '@/Components/Error/InputError';
import Button from '@/Components/Button/Button';
import { Toast } from '@/Components/Alert/Toast';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef(null);
    const currentPasswordInput = useRef(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                Toast.fire({
                    icon: "success",
                    title: "Kata sandi berhasil di ubah.",
                });
            },
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-semibold text-gray-900">Ubah kata sandi</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Pastikan akun Anda menggunakan kata sandi yang panjang dan acak agar tetap aman.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-4 space-y-2">

                <div className="">
                    <InputLabel>Password Saat Ini</InputLabel>
                    <TextInputPassword
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        autoComplete="current-password"
                    />
                    <InputError message={errors.current_password} />
                </div>
                <div className="">
                    <InputLabel>Password Baru</InputLabel>
                    <TextInputPassword
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} />
                </div>
                <div className="">
                    <InputLabel>Konfirmasi Password</InputLabel>
                    <TextInputPassword
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} />
                </div>
                <div className="flex justify-end items-center gap-4">
                    <Button disabled={processing} type="submit">{processing ? 'Simpan...' : 'Simpan'}</Button>
                </div>
            </form>
        </section>
    );
}
