import { Head } from "@inertiajs/react"

import { formatDate } from "@/Common/helpers"
import { Separator } from "@/Components/ui/separator"
import MainLayout from "@/Layouts/MainLayout"
import { PageProps } from "@/types"

export default function Show({ auth, promo }: PageProps) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Promo Detail" />

            <div className="mx-auto lg:max-w-4xl px-4 py-6 lg:px-8">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        {promo.name}
                    </h2>

                    <p className="text-sm text-green-500">
                        Berlaku Mulai : {formatDate(promo.valid_start_date)} -{" "}
                        {formatDate(promo.valid_end_date)}
                    </p>
                </div>

                <Separator className="my-4" />

                <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4">
                        <img
                            src={promo.image}
                            alt={promo.name}
                            className="w-full object-cover object-center"
                        />
                    </div>

                    <div className="sm:col-span-8 space-y-1">
                        <h4 className="text-sm font-semibold leading-none">
                            Description
                        </h4>

                        <div className="text-sm font-normal leading-snug text-muted-foreground">
                            {promo.description}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
