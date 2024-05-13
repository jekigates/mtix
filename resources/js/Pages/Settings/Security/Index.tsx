import SettingLayout from "../Layouts/SettingLayout"
import { Head } from "@inertiajs/react"

import SecurityForm from "./SecurityForm"
import { Separator } from "@/Components/ui/separator"
import MainLayout from "@/Layouts/MainLayout"
import { PageProps } from "@/types"

export default function Security({ auth }: PageProps) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Security" />

            <SettingLayout>
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
            </SettingLayout>
        </MainLayout>
    )
}
