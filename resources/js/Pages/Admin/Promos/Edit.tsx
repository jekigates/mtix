import { Head, Link, router, useForm, usePage } from "@inertiajs/react"
import { ChevronLeft, Upload } from "lucide-react"
import { FormEventHandler, useRef, useState } from "react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"

import { DatePickerWithRange } from "./Components/DatePickerWithRange"
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
import { useToast } from "@/Components/ui/use-toast"
import AdminLayout from "@/Layouts/AdminLayout"
import { PageProps } from "@/types"
import { handleUpload } from "@/utils"

export default function Edit({ auth, promo }: PageProps) {
    const { toast } = useToast()

    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(promo.valid_start_date),
        to: new Date(promo.valid_end_date),
    })

    const { errors } = usePage().props

    const { data, setData, processing, reset, clearErrors } = useForm({
        name: promo.name,
        discount: promo.discount,
        valid_start_date: new Date(promo.valid_start_date),
        valid_end_date: new Date(promo.valid_end_date),
        description: promo.description,
        image: new File([], ""),
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        let updateData: any = {
            valid_start_date: null,
            valid_end_date: null,
        }

        if (date) {
            if (date.from) {
                let utcDateFrom = new Date(
                    Date.UTC(
                        date.from.getFullYear(),
                        date.from.getMonth(),
                        date.from.getDate()
                    )
                )
                updateData.valid_start_date = utcDateFrom
            }

            if (date.to) {
                let utcDateTo = new Date(
                    Date.UTC(
                        date.to.getFullYear(),
                        date.to.getMonth(),
                        date.to.getDate()
                    )
                )
                updateData.valid_end_date = utcDateTo
            }
        }

        router.post(
            route("admin.promos.update", promo.id),
            {
                _method: "PATCH",
                ...data,
                ...updateData,
            },
            {
                onSuccess: () =>
                    toast({
                        description: "Your promo has been updated.",
                    }),
            }
        )
    }

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [imageUrl, setImageUrl] = useState(promo.image)

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
                                <BreadcrumbPage>Edit Promo</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            }
        >
            <Head title="Edit Promo" />

            <form onSubmit={submit} className="grid flex-1 auto-rows-max gap-4">
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
                        Edit Promo
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
                            Update Promo
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
                                        <p
                                            className={cn(
                                                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                                                errors.valid_start_date ||
                                                    errors.valid_end_date
                                                    ? "text-destructive"
                                                    : ""
                                            )}
                                        >
                                            Promo Valid Date
                                        </p>

                                        <div className="grid gap-2">
                                            <DatePickerWithRange
                                                date={date}
                                                setDate={setDate}
                                            />
                                        </div>

                                        <InputMessage>
                                            {errors.valid_start_date}
                                            {errors.valid_end_date}
                                        </InputMessage>
                                    </div>

                                    <div className="grid gap-3">
                                        <p
                                            className={cn(
                                                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                                                errors.description
                                                    ? "text-destructive"
                                                    : ""
                                            )}
                                        >
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
                        Update Promo
                    </Button>
                </div>
            </form>
        </AdminLayout>
    )
}
