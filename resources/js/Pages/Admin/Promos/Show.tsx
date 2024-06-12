import { Head, Link } from "@inertiajs/react"
import { ChevronLeft } from "lucide-react"

import { cn } from "@/lib/utils"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import { buttonVariants } from "@/Components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import AdminLayout from "@/Layouts/AdminLayout"
import { PageProps } from "@/types"
import { formatRupiah } from "@/utils"

export default function Create({ auth, promo }: PageProps) {
    return (
        <AdminLayout
            user={auth.user}
            header={
                <div className="w-full flex-1">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={route("admin.home")}>
                                        Dashboard
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={route("admin.promos.index")}>
                                        Promos
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbPage>Show Promo</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            }
        >
            <Head title="Show Promo" />

            <div className="grid flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href={route("admin.promos.index")}
                        className={cn(
                            buttonVariants({
                                variant: "outline",
                                size: "icon",
                            }),
                            "h-7 w-7"
                        )}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>

                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        Show Promo
                    </h1>
                </div>

                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-0">
                            <CardHeader>
                                <CardTitle>Promo Details</CardTitle>

                                <CardDescription>
                                    Manage the details of the promo in this
                                    section.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Promo ID
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            {promo.id}
                                        </p>
                                    </div>

                                    <div className="grid gap-3">
                                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Promo Name
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            {promo.name}
                                        </p>
                                    </div>

                                    <div className="grid gap-3">
                                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Promo Discount
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            {formatRupiah(promo.discount)}
                                        </p>
                                    </div>

                                    <div className="grid gap-3">
                                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Promo Valid Start Date
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            {promo.valid_start_date}
                                        </p>
                                    </div>

                                    <div className="grid gap-3">
                                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Promo Valid End Date
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            {promo.valid_end_date}
                                        </p>
                                    </div>

                                    <div className="grid gap-3">
                                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Promo Description
                                        </p>

                                        <p
                                            className="text-sm text-muted-foreground"
                                            dangerouslySetInnerHTML={{
                                                __html: promo.description,
                                            }}
                                        ></p>
                                    </div>

                                    <div className="grid gap-3">
                                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Promo Created At
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            {promo.created_at}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <Card
                            className="overflow-hidden"
                            x-chunk="dashboard-07-chunk-4"
                        >
                            <CardHeader>
                                <CardTitle>Promo Image</CardTitle>

                                <CardDescription>
                                    Visual representation of the promo.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="grid gap-3">
                                    <img
                                        alt="Promo image"
                                        className="aspect-square w-full rounded-md object-cover"
                                        height="300"
                                        src={promo.image}
                                        width="300"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
