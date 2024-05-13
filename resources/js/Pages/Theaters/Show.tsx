import { Head } from "@inertiajs/react"

import MainLayout from "@/Layouts/MainLayout"
import { PageProps } from "@/types"

export default function Index({ auth }: PageProps) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Theater Detail" />

            <p>Theater Detail</p>
        </MainLayout>
    )
}
