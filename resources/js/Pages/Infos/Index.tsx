import { Head, Link } from "@inertiajs/react"

import { buttonVariants } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"
import MainLayout from "@/Layouts/MainLayout"
import { PageProps } from "@/types"

export default function Index({ auth, infos }: PageProps) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Infos" />

            <div className="mx-auto lg:max-w-4xl px-4 py-6 lg:px-8">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Latest News & Updates
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Stay informed with the latest updates and information.
                        Keep up to date!
                    </p>
                </div>

                <Separator className="my-4" />

                <div className="flex flex-col gap-2">
                    {infos.map((info) => (
                        <Link
                            key={info.id}
                            href={route("infos.show", info.id)}
                            className={buttonVariants({
                                variant: "outline",
                            })}
                        >
                            <div className="w-full font-semibold">
                                {info.title}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}
