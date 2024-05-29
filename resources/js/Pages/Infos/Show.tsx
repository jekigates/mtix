import { Head } from "@inertiajs/react"

import MainContent from "@/Components/MainContent"
import { Separator } from "@/Components/ui/separator"
import MainLayout from "@/Layouts/MainLayout"
import { PageProps } from "@/types"

export default function Show({ auth, info }: PageProps) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Info Detail" />

            <MainContent>
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        {info.title}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Dibuat pada : {info.created_at}
                    </p>
                </div>

                <Separator className="my-4" />

                <div className="sm:col-span-8 space-y-1">
                    <h4 className="text-sm font-semibold leading-none">
                        Description
                    </h4>

                    <div
                        className="text-sm font-normal leading-snug text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: info.description }}
                    ></div>
                </div>
            </MainContent>
        </MainLayout>
    )
}
