import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import SettingsLayout from "../Layouts/SettingLayout";
import { Separator } from "@/Components/ui/separator";
import AccountForm from "./AccountForm";
import DeleteUserForm from "./DeleteUserForm";

export default function Account({ auth, provinces }: PageProps) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Account" />

            <SettingsLayout>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium">Account</h3>
                        <p className="text-sm text-muted-foreground">
                            Update your account settings. Set your preferred
                            language and timezone.
                        </p>
                    </div>

                    <Separator />

                    <AccountForm provinces={provinces} />

                    <Separator />

                    <div>
                        <h3 className="text-lg font-medium">Delete Account</h3>
                        <p className="text-sm text-muted-foreground">
                            Once your account is deleted, all of its resources
                            and data will be permanently deleted. Before
                            deleting your account, please download any data or
                            information that you wish to retain.
                        </p>
                    </div>

                    <Separator />

                    <DeleteUserForm />
                </div>
            </SettingsLayout>
        </MainLayout>
    );
}
