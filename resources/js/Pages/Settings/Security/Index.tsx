import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import SettingsLayout from "../Layouts/SettingLayout";
import { Separator } from "@/Components/ui/separator";
import SecurityForm from "./SecurityForm";

export default function Security({ auth }: PageProps) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Security" />

            <SettingsLayout>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium">Security</h3>
                        <p className="text-sm text-muted-foreground">
                            Ensure your account is using a long, random password
                            to stay secure.
                        </p>
                    </div>

                    <Separator />

                    <SecurityForm />
                </div>
            </SettingsLayout>
        </MainLayout>
    );
}
