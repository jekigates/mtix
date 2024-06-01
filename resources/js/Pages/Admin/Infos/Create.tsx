import { Head, Link, useForm } from "@inertiajs/react"
import { ChevronLeft } from "lucide-react"
import { FormEventHandler } from "react"

import { cn } from "@/lib/utils"

import { InputMessage } from "@/Components/InputMessage"
import RichTextEditor from "@/Components/TextEditor"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import { Button, buttonVariants } from "@/Components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import AdminLayout from "@/Layouts/AdminLayout"
import { PageProps } from "@/types"

export default function Create({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            title: "",
            description: "",
        })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route("admin.infos.store"))
    }

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
                                    <Link href={route("admin.infos.index")}>
                                        Infos
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbPage>Create Info</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            }
        >
            <Head title="Create Info" />

            <form
                onSubmit={submit}
                className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4"
            >
                <div className="flex items-center gap-4">
                    <Link
                        href={route("admin.infos.index")}
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
                        Create Info
                    </h1>
                </div>

                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-0">
                            <CardHeader>
                                <CardTitle>Info Details</CardTitle>

                                <CardDescription>
                                    Manage the details of the info in this
                                    section.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label
                                            htmlFor="title"
                                            className={
                                                errors.title
                                                    ? "text-destructive"
                                                    : ""
                                            }
                                        >
                                            Info Title
                                        </Label>

                                        <Input
                                            id="title"
                                            type="text"
                                            value={data.title}
                                            autoFocus={true}
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                            className="w-full"
                                        />

                                        <InputMessage>
                                            {errors.title}
                                        </InputMessage>
                                    </div>

                                    <div className="grid gap-3">
                                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Info Description
                                        </p>

                                        <RichTextEditor
                                            value={data.description}
                                            onChange={(value) =>
                                                setData("description", value)
                                            }
                                        />

                                        <InputMessage>
                                            {errors.description}
                                        </InputMessage>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="border-t px-6 py-4">
                                <Button size="sm" disabled={processing}>
                                    Save Info
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </form>
        </AdminLayout>
    )
}
