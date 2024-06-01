import { Head, Link, useForm } from "@inertiajs/react"
import { addDays } from "date-fns"
import { ChevronLeft, Upload } from "lucide-react"
import { FormEventHandler, useRef, useState } from "react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"

import { DatePickerWithRange } from "@/Components/DatePickerWithRange"
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
import { handleUpload } from "@/utils"

export default function Create({ auth }: PageProps) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            name: "",
            description: "",
            discount: 0,
            valid_start_date: addDays(new Date(), 7),
            valid_end_date: addDays(new Date(), 14),
            image: new File([], ""),
        })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route("admin.promos.store"))
    }

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [imageUrl, setImageUrl] = useState("")

    const handleDateChange = (dateRange: DateRange | undefined) => {
        if (dateRange?.from && dateRange?.to) {
            setData("valid_start_date", dateRange.from)
            setData("valid_end_date", dateRange.to)
        }
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
                                    <Link href={route("admin.promos.index")}>
                                        Promos
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbPage>Create Promo</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            }
        >
            <Head title="Create Promo" />

            <form
                onSubmit={submit}
                className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4"
            >
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
                        Create Promo
                    </h1>

                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button
                            variant="outline"
                            size="sm"
                            type="reset"
                            onClick={() => {
                                reset()
                                clearErrors()
                                setImageUrl("")
                            }}
                        >
                            Reset
                        </Button>

                        <Button size="sm" disabled={processing}>
                            Save Promo
                        </Button>
                    </div>
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
                                        <Label
                                            htmlFor="name"
                                            className={
                                                errors.name
                                                    ? "text-destructive"
                                                    : ""
                                            }
                                        >
                                            Promo Name
                                        </Label>

                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            autoComplete="name"
                                            autoFocus={true}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="w-full"
                                        />

                                        <InputMessage>
                                            {errors.name}
                                        </InputMessage>
                                    </div>

                                    <div className="grid gap-3">
                                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Promo Description
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

                                    <div className="grid gap-3">
                                        <Label
                                            htmlFor="discount"
                                            className={
                                                errors.discount
                                                    ? "text-destructive"
                                                    : ""
                                            }
                                        >
                                            Promo Discount
                                        </Label>

                                        <Input
                                            id="discount"
                                            type="number"
                                            value={data.discount}
                                            autoComplete="discount"
                                            onChange={(e) => {
                                                if (e.target.value !== "") {
                                                    setData(
                                                        "discount",
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                            }}
                                            className="w-full"
                                        />

                                        <InputMessage>
                                            {errors.discount}
                                        </InputMessage>
                                    </div>

                                    <div className="grid gap-3">
                                        <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Promo Valid Date
                                        </p>

                                        <DatePickerWithRange
                                            fromDate={data.valid_start_date}
                                            toDate={data.valid_end_date}
                                            onDateChange={handleDateChange}
                                        />

                                        <InputMessage>
                                            {errors.valid_start_date}
                                            {errors.valid_end_date}
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
                                <CardTitle>Promo Image</CardTitle>

                                <CardDescription>
                                    Visual representation of the promo.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="grid gap-3">
                                    {imageUrl ? (
                                        <img
                                            alt="Promo image"
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
                </div>

                <div className="flex items-center justify-center gap-2 md:hidden">
                    <Button
                        variant="outline"
                        size="sm"
                        type="reset"
                        onClick={() => {
                            reset()
                            clearErrors()
                            setImageUrl("")
                        }}
                    >
                        Reset
                    </Button>

                    <Button size="sm" disabled={processing}>
                        Save Promo
                    </Button>
                </div>
            </form>
        </AdminLayout>
    )
}
