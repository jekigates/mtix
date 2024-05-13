import { Head, Link } from "@inertiajs/react"

import { buttonVariants } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"
import MainLayout from "@/Layouts/MainLayout"
import { PageProps } from "@/types"

export default function Index({
    auth,
    selected_city,
    cities,
}: PageProps<{
    selected_city: App.Data.CityData
}>) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Cities" />

            <div className="mx-auto lg:max-w-4xl px-4 py-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Set City - {selected_city.name}
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Explore theaters showing movies in your city.
                        </p>
                    </div>
                </div>

                <Separator className="my-4" />

                <div className="flex flex-col gap-2">
                    {cities.map((city) => (
                        <Link
                            key={city.id}
                            href={route("theaters.index", {
                                city_id: city.id,
                            })}
                            className={buttonVariants({
                                variant: "outline",
                            })}
                        >
                            <div className="w-full font-semibold">
                                {city.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}
