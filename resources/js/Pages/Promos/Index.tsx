import { Head } from "@inertiajs/react"

import { PromoCard } from "./Components/PromoCard"
import MainContent from "@/Components/MainContent"
import { Separator } from "@/Components/ui/separator"
import MainLayout from "@/Layouts/MainLayout"
import { PageProps } from "@/types"

export default function Index({ auth, promos }: PageProps) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Promos" />

            <MainContent>
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Explore Promotions
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Limited-time offers on your favorite items. Don't miss
                        out!
                    </p>
                </div>

                <Separator className="my-4" />

                <div className="mt-6 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 space-x-4">
                    {promos.map((promo) => (
                        <PromoCard
                            href={route("promos.show", promo.id)}
                            key={promo.id}
                            promo={promo}
                        />
                    ))}
                </div>
            </MainContent>
        </MainLayout>
    )
}
