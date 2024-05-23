import { Head } from "@inertiajs/react"

import AdminLayout from "@/Layouts/AdminLayout"
import { PageProps } from "@/types"

export default function Home({ auth }: PageProps) {
    return (
        <AdminLayout user={auth.user}>
            <Head title="Home" />

            <h1>Home admin</h1>
        </AdminLayout>
    )
}
