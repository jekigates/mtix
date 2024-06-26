import { Head, Link, useForm } from "@inertiajs/react"
import {
    Check,
    ChevronLeft,
    ChevronsUpDown,
    PlusCircle,
    Upload,
} from "lucide-react"
import { FormEventHandler, useRef, useState } from "react"

import { cn } from "@/lib/utils"

import { InputMessage } from "@/Components/InputMessage"
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
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/Components/ui/command"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table"
import { Textarea } from "@/Components/ui/textarea"
import AdminLayout from "@/Layouts/AdminLayout"
import { PageProps } from "@/types"
import { handleUpload } from "@/utils"

export default function Create({
    auth,
    categories,
    statuses,
}: PageProps<{
    statuses: string[]
}>) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            name: "",
            description: "",
            recipe: "",
            category_id: "",
            status: "",
            image: new File([], ""),
            variants: [{ name: "", price: 1000 }],
        })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route("admin.products.store"))
    }

    const [openCategoryId, setOpenCategoryId] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [imageUrl, setImageUrl] = useState("")

    const errorVariants = errors as Record<string, string>

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
                                    <Link href={route("admin.products.index")}>
                                        Products
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbPage>Create Product</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            }
        >
            <Head title="Create Product" />

            <form onSubmit={submit} className="grid flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href={route("admin.products.index")}
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
                        Create Product
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
                            Save Product
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-0">
                            <CardHeader>
                                <CardTitle>Product Details</CardTitle>

                                <CardDescription>
                                    Manage product information in this section.
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
                                            Product Name
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
                                            htmlFor="description"
                                            className={
                                                errors.description
                                                    ? "text-destructive"
                                                    : ""
                                            }
                                        >
                                            Product Description
                                        </Label>

                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputMessage>
                                            {errors.description}
                                        </InputMessage>
                                    </div>

                                    <div className="grid gap-3">
                                        <Label
                                            htmlFor="recipe"
                                            className={
                                                errors.recipe
                                                    ? "text-destructive"
                                                    : ""
                                            }
                                        >
                                            Product Recipe
                                        </Label>

                                        <Textarea
                                            id="recipe"
                                            value={data.recipe}
                                            onChange={(e) =>
                                                setData(
                                                    "recipe",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputMessage>
                                            {errors.recipe}
                                        </InputMessage>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card x-chunk="dashboard-07-chunk-1">
                            <CardHeader>
                                <CardTitle>Product Variant</CardTitle>

                                <CardDescription>
                                    Manage the different versions of your
                                    product.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Variant Name</TableHead>

                                            <TableHead>Variant Price</TableHead>

                                            <TableHead>
                                                <span className="sr-only">
                                                    Action
                                                </span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {(() => {
                                            const newVariants = [
                                                ...data.variants,
                                            ]

                                            return newVariants.map(
                                                (variant, index) => {
                                                    return (
                                                        <TableRow
                                                            key={`variant-${index}`}
                                                        >
                                                            <TableCell className="font-semibold">
                                                                <div className="grid gap-2">
                                                                    <Label
                                                                        htmlFor={`name-${index}`}
                                                                        className="sr-only"
                                                                    >
                                                                        Variant
                                                                        Name
                                                                    </Label>

                                                                    <Input
                                                                        id={`name-${index}`}
                                                                        type="text"
                                                                        value={
                                                                            variant.name
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            variant.name =
                                                                                e.target.value
                                                                            setData(
                                                                                "variants",
                                                                                newVariants
                                                                            )
                                                                        }}
                                                                        className={
                                                                            errorVariants[
                                                                                `variants.${index}.name`
                                                                            ]
                                                                                ? "border-destructive"
                                                                                : ""
                                                                        }
                                                                    />

                                                                    <InputMessage>
                                                                        {
                                                                            errorVariants[
                                                                                `variants.${index}.name`
                                                                            ]
                                                                        }
                                                                    </InputMessage>
                                                                </div>
                                                            </TableCell>

                                                            <TableCell>
                                                                <div className="grid gap-2">
                                                                    <Label
                                                                        htmlFor={`price-${index}`}
                                                                        className="sr-only"
                                                                    >
                                                                        Variant
                                                                        Price
                                                                    </Label>

                                                                    <Input
                                                                        id={`price-${index}`}
                                                                        type="number"
                                                                        defaultValue={
                                                                            variant.price
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            if (
                                                                                e
                                                                                    .target
                                                                                    .value !==
                                                                                ""
                                                                            ) {
                                                                                variant.price =
                                                                                    parseInt(
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                setData(
                                                                                    "variants",
                                                                                    newVariants
                                                                                )
                                                                            }
                                                                        }}
                                                                        className={
                                                                            errorVariants[
                                                                                `variants.${index}.price`
                                                                            ]
                                                                                ? "border-destructive"
                                                                                : ""
                                                                        }
                                                                    />

                                                                    <InputMessage>
                                                                        {
                                                                            errorVariants[
                                                                                `variants.${index}.price`
                                                                            ]
                                                                        }
                                                                    </InputMessage>
                                                                </div>
                                                            </TableCell>

                                                            <TableCell>
                                                                <Button
                                                                    type="button"
                                                                    variant="destructive"
                                                                    disabled={
                                                                        newVariants.length <=
                                                                        1
                                                                    }
                                                                    onClick={() => {
                                                                        if (
                                                                            newVariants.length >
                                                                            1
                                                                        ) {
                                                                            newVariants.splice(
                                                                                index,
                                                                                1
                                                                            )
                                                                            setData(
                                                                                "variants",
                                                                                newVariants
                                                                            )
                                                                        }
                                                                    }}
                                                                >
                                                                    Remove
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                }
                                            )
                                        })()}
                                    </TableBody>
                                </Table>
                            </CardContent>

                            <CardFooter className="justify-center border-t p-4">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="gap-1"
                                    onClick={() => {
                                        setData("variants", [
                                            ...data.variants,
                                            {
                                                name: "",
                                                price: 0,
                                            },
                                        ])
                                    }}
                                    type="button"
                                >
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    Add Variant
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card x-chunk="dashboard-07-chunk-2">
                            <CardHeader>
                                <CardTitle>Product Category</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label
                                            htmlFor="category_id"
                                            className={
                                                errors.category_id
                                                    ? "text-destructive"
                                                    : ""
                                            }
                                        >
                                            Category
                                        </Label>

                                        <Popover
                                            open={openCategoryId}
                                            onOpenChange={setOpenCategoryId}
                                        >
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={
                                                        openCategoryId
                                                    }
                                                    className="justify-between"
                                                    id="category_id"
                                                >
                                                    {data.category_id
                                                        ? categories.find(
                                                              (category) =>
                                                                  category.id ===
                                                                  data.category_id
                                                          )?.name
                                                        : "Select category..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent className="p-0 w-full">
                                                <Command>
                                                    <CommandInput placeholder="Search category..." />

                                                    <CommandList>
                                                        <CommandEmpty>
                                                            No category found.
                                                        </CommandEmpty>

                                                        <CommandGroup>
                                                            {categories.map(
                                                                (category) => (
                                                                    <CommandItem
                                                                        key={
                                                                            category.id
                                                                        }
                                                                        onSelect={() => {
                                                                            setData(
                                                                                "category_id",
                                                                                category.id
                                                                            )
                                                                            setOpenCategoryId(
                                                                                false
                                                                            )
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                data.category_id ===
                                                                                    category.id
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                        {
                                                                            category.name
                                                                        }
                                                                    </CommandItem>
                                                                )
                                                            )}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>

                                        <InputMessage>
                                            {errors.category_id}
                                        </InputMessage>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-3">
                            <CardHeader>
                                <CardTitle>Product Status</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="status">Status</Label>

                                        <Select
                                            value={data.status}
                                            onValueChange={(e) =>
                                                setData("status", e)
                                            }
                                            name="status"
                                        >
                                            <SelectTrigger
                                                id="status"
                                                aria-label="Select status"
                                            >
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {statuses.map(
                                                    (status, index) => (
                                                        <SelectItem
                                                            key={`status-${index}`}
                                                            value={status}
                                                        >
                                                            {status}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>

                                        <InputMessage>
                                            {errors.status}
                                        </InputMessage>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card
                            className="overflow-hidden"
                            x-chunk="dashboard-07-chunk-4"
                        >
                            <CardHeader>
                                <CardTitle>Product Image</CardTitle>

                                <CardDescription>
                                    Visual representation of the product.
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
                        Save Product
                    </Button>
                </div>
            </form>
        </AdminLayout>
    )
}
