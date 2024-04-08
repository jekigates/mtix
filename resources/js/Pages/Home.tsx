import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import MainLayout from "@/Layouts/MainLayout";

export default function Home({ auth }: PageProps) {
    return (
        <>
            <Head title="Home" />

            <MainLayout user={auth.user}>
                <p>Home</p>
            </MainLayout>
        </>
    );
}
