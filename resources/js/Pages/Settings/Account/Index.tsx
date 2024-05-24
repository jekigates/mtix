import SettingLayout from "../Layouts/SettingLayout"
import { Head } from "@inertiajs/react"

import AccountForm from "./AccountForm"
import { Separator } from "@/Components/ui/separator"
import MainLayout from "@/Layouts/MainLayout"
import { PageProps } from "@/types"

export default function Account({ auth, provinces }: PageProps) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Account" />

            <SettingLayout>
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
                </div>
            </SettingLayout>
        </MainLayout>
    )
}
