import { Head, Link } from "@inertiajs/react"
import { PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"

import { columns } from "./Components/Columns"
import { DataTableToolbar } from "./Components/DataTableToolbar"
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
import { DataTable } from "@/Components/ui/data-table"
import AdminLayout from "@/Layouts/AdminLayout"
import { PageProps } from "@/types"

export default function Index({ auth, infos }: PageProps) {
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
                                <BreadcrumbPage>Infos</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            }
        >
            <Head title="Infos" />

            {infos.length > 0 ? (
                <div className="space-y-4">
                    <div className="flex items-center">
                        <div className="ml-auto flex items-center gap-2">
                            <Link
                                href={route("admin.infos.create")}
                                className={cn(
                                    buttonVariants({
                                        size: "sm",
                                    }),
                                    "h-8 gap-1"
                                )}
                            >
                                <PlusCircle className="h-3.5 w-3.5" />

                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add Info
                                </span>
                            </Link>
                        </div>
                    </div>

                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Infos</CardTitle>

                            <CardDescription>
                                Manage and stay abreast with the latest news and
                                updates.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <DataTable
                                columns={columns}
                                data={infos}
                                DataTableToolbar={DataTableToolbar}
                            />
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="h-full flex flex-col gap-4">
                    <div className="flex items-center">
                        <h1 className="text-lg font-semibold md:text-2xl">
                            Infos
                        </h1>
                    </div>

                    <div
                        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
                        x-chunk="dashboard-02-chunk-1"
                    >
                        <div className="flex flex-col items-center gap-1 text-center">
                            <h3 className="text-2xl font-bold tracking-tight">
                                You have no infos
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Start disseminating information by adding a new
                                info.
                            </p>

                            <Link
                                href={route("admin.infos.create")}
                                className={cn(buttonVariants(), "mt-4")}
                            >
                                Add Info
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    )
}
