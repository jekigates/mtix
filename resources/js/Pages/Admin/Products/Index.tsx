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

export default function Index({ auth, categories, products }: PageProps) {
    const categoryOptions: any = Object.values(
        categories.reduce((acc: any, curr) => {
            const id = curr.id
            const name = curr.name

            if (!acc[id]) {
                acc[id] = {
                    value: name,
                    label: name,
                }
            }

            return acc
        }, {})
    )

    const statusOptions: any = Object.values(
        products.reduce((acc: any, curr) => {
            const status = curr.status

            if (!acc[status]) {
                acc[status] = {
                    value: status,
                    label: status,
                }
            }

            return acc
        }, {})
    )

    return (
        <AdminLayout
            user={auth.user}
            header={
                <div className="w-full flex-1">
                    <Breadcrumb className="hidden md:flex">
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
                                <BreadcrumbPage>Products</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            }
        >
            <Head title="Products" />

            {products.length > 0 ? (
                <div className="space-y-4">
                    <div className="flex items-center">
                        <div className="ml-auto flex items-center gap-2">
                            <Link
                                href={route("admin.products.create")}
                                className={cn(
                                    buttonVariants({
                                        size: "sm",
                                    }),
                                    "h-8 gap-1"
                                )}
                            >
                                <PlusCircle className="h-3.5 w-3.5" />

                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add Product
                                </span>
                            </Link>
                        </div>
                    </div>

                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader>
                            <CardTitle>Products</CardTitle>

                            <CardDescription>
                                Manage your products and view their sales
                                performance.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <DataTable
                                columns={columns}
                                data={products}
                                categoryOptions={categoryOptions}
                                statusOptions={statusOptions}
                            />
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="h-full flex flex-col gap-4">
                    <div className="flex items-center">
                        <h1 className="text-lg font-semibold md:text-2xl">
                            Products
                        </h1>
                    </div>

                    <div
                        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
                        x-chunk="dashboard-02-chunk-1"
                    >
                        <div className="flex flex-col items-center gap-1 text-center">
                            <h3 className="text-2xl font-bold tracking-tight">
                                You have no products
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                You can start selling as soon as you add a
                                product.
                            </p>

                            <Link
                                href={route("admin.products.create")}
                                className={cn(buttonVariants(), "mt-4")}
                            >
                                Add Product
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    )
}
