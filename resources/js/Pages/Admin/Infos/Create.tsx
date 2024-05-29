import { Head, Link, useForm } from "@inertiajs/react"
import { ChevronLeft, Upload } from "lucide-react"
import { FormEventHandler, useRef, useState } from "react"

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
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import AdminLayout from "@/Layouts/AdminLayout"
import { PageProps } from "@/types"
import { handleUpload } from "@/utils"

export default function Create({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            title: "",
            description: "",
            image: new File([], ""),
        })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route("admin.infos.store"))
    }

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [imageUrl, setImageUrl] = useState("")

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

                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button size="sm" disabled={processing}>
                            Save Info
                        </Button>
                    </div>
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
                                        <Label
                                            htmlFor="description"
                                            className={
                                                errors.description
                                                    ? "text-destructive"
                                                    : ""
                                            }
                                        >
                                            Info Description
                                        </Label>

                                        {/* <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                        /> */}
                                        {/* <Tiptap /> */}
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
                        </Card>
                    </div>

                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <Card
                            className="overflow-hidden"
                            x-chunk="dashboard-07-chunk-4"
                        >
                            <CardHeader>
                                <CardTitle>Info Image</CardTitle>

                                <CardDescription>
                                    Visual representation of the information.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="grid gap-3">
                                    {imageUrl ? (
                                        <img
                                            alt="Product image"
                                            className="aspect-square w-full rounded-md object-cover cursor-pointer"
                                            height="300"
                                            src={imageUrl}
                                            width="300"
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                        />
                                    ) : (
                                        <button
                                            type="button"
                                            className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                        >
                                            <Upload className="h-4 w-4 text-muted-foreground" />
                                            <span className="sr-only">
                                                Upload
                                            </span>
                                        </button>
                                    )}

                                    <InputMessage>{errors.image}</InputMessage>

                                    <Input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                setData(
                                                    "image",
                                                    e.target.files[0]
                                                )

                                                setImageUrl(handleUpload(e))
                                            }
                                        }}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex items-center justify-center gap-2 md:hidden">
                        <Button size="sm" disabled={processing}>
                            Save Info
                        </Button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    )
}
