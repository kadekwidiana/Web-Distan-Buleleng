import BackpageLayout from '@/Layouts/BackpageLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import UpdateFotoUser from './Partials/UpdateFoto';

export default function EditProfilePage({ mustVerifyEmail, status }) {
    return (
        <BackpageLayout>
            <Head title="Profile" />
            <div className="min-h-[84dvh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-sm border border-stroke bg-white shadow-default p-4">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="rounded-sm border border-stroke bg-white shadow-default p-4">
                            <UpdateFotoUser />
                        </div>
                        <div className="rounded-sm border border-stroke bg-white shadow-default p-4">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </BackpageLayout>
    );
}
