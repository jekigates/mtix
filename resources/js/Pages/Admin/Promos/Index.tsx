import { Head, Link } from "@inertiajs/react"
import { PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"

import { columns } from "./Components/Columns"
import { DataTable } from "./Components/DataTable"
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

export default function Index({ auth, promos }: PageProps) {
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
                                <BreadcrumbPage>Promos</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            }
        >
            <Head title="Promos" />

            {promos.length > 0 ? (
                <div className="space-y-4">
                    <div className="flex items-center">
                        <div className="ml-auto flex items-center gap-2">
                            <Link
                                href={route("admin.promos.create")}
                                className={cn(
                                    buttonVariants({
                                        size: "sm",
                                    }),
                                    "h-8 gap-1"
                                )}
                            >
                                <PlusCircle className="h-3.5 w-3.5" />

                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add Promo
                                </span>
                            </Link>
                        </div>
                    </div>

                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Promos</CardTitle>

                            <CardDescription>
                                Manage and keep track of ongoing promotions,
                                discounts, and special offers.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <DataTable columns={columns} data={promos} />
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="h-full flex flex-col gap-4">
                    <div className="flex items-center">
                        <h1 className="text-lg font-semibold md:text-2xl">
                            Promos
                        </h1>
                    </div>

                    <div
                        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
                        x-chunk="dashboard-02-chunk-1"
                    >
                        <div className="flex flex-col items-center gap-1 text-center">
                            <h3 className="text-2xl font-bold tracking-tight">
                                You have no promos
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Start boosting your business visibility and
                                sales by adding a new promo.
                            </p>

                            <Link
                                href={route("admin.promos.create")}
                                className={cn(buttonVariants(), "mt-4")}
                            >
                                Add Promo
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    )
}
