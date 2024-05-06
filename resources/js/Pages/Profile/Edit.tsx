import MainLayout from "@/Layouts/MainLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
    provinces,
}: PageProps<{
    mustVerifyEmail: boolean;
    status?: string;
}>) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        provinces={provinces}
                    />

                    <UpdatePasswordForm />

                    <DeleteUserForm />
                </div>
            </div>
        </MainLayout>
    );
}
