import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import SettingsLayout from "./Layouts/SettingLayout";
import { Separator } from "@/Components/ui/separator";
import ProfileForm from "./ProfileForm";

export default function Profile({
    auth,
    mustVerifyEmail,
    status,
}: PageProps<{
    mustVerifyEmail: boolean;
    status?: string;
}>) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Profile" />

            <SettingsLayout>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium">Profile</h3>
                        <p className="text-sm text-muted-foreground">
                            This is how others will see you on the site.
                        </p>
                    </div>

                    <Separator />

                    <ProfileForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </div>
            </SettingsLayout>
        </MainLayout>
    );
}
