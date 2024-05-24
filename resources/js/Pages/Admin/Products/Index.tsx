import { Head, Link } from "@inertiajs/react"
import { PlusCircle, Search } from "lucide-react"

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
import { Button } from "@/Components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import AdminLayout from "@/Layouts/AdminLayout"
import { PageProps } from "@/types"

export default function Index({ auth, categories, products }: PageProps) {
    return (
        <AdminLayout
            user={auth.user}
            header={
                <>
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

                    <div className="relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                        />
                    </div>
                </>
            }
        >
            <Head title="Products" />

            <div className="grid flex-1 items-start gap-4">
                <div className="flex items-center">
                    <div className="ml-auto flex items-center gap-2">
                        <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />

                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Add Product
                            </span>
                        </Button>
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
                            categories={categories}
                        />
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    )
}
