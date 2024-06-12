import { Head, Link, useForm, usePage } from "@inertiajs/react"
import { Check, ChevronLeft, ChevronsUpDown, PlusCircle } from "lucide-react"
import { FormEventHandler, useEffect, useState } from "react"

import { cn } from "@/lib/utils"

import { InputMessage } from "@/Components/InputMessage"
import { MultiSelect } from "@/Components/MultiSelect"
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
import { Textarea } from "@/Components/ui/textarea"
import AdminLayout from "@/Layouts/AdminLayout"
import { PageProps } from "@/types"
import { createOptions } from "@/utils"

export default function Create({ auth, brands, provinces, users }: PageProps) {
    const { errors } = usePage().props

    const { data, setData, post, processing, reset, clearErrors } = useForm({
        name: "",
        contact: "",
        address: "",
        province_id: "",
        city_id: "",
        user_id: "",
        image: new File([], ""),
        brands: [] as string[],
    })

    const [selectedBrands, setSelectedBrands] = useState<string[]>([])

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route("admin.locations.store"))
    }

    const [openProvince, setOpenProvince] = useState(false)
    const [openCity, setOpenCity] = useState(false)
    const [openUser, setOpenUser] = useState(false)

    useEffect(() => {
        if (
            provinces
                .find((province) => province.id === data.province_id)
                ?.cities?.find((city) => city.id === data.city_id) === undefined
        ) {
            setData("city_id", "")
        }
    }, [data.province_id])

    const brandOptions = createOptions(brands, "name")

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
                                    <Link href={route("admin.locations.index")}>
                                        Locations
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbPage>Create Location</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            }
        >
            <Head title="Create Location" />

            <form onSubmit={submit} className="grid flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href={route("admin.locations.index")}
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
                        Create Location
                    </h1>

                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button
                            variant="outline"
                            size="sm"
                            type="reset"
                            onClick={() => {
                                reset()
                                clearErrors()
                            }}
                        >
                            Reset
                        </Button>

                        <Button size="sm" disabled={processing}>
                            Save Location
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-0">
                            <CardHeader>
                                <CardTitle>Location Details</CardTitle>

                                <CardDescription>
                                    Manage the details of the location in this
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
                                            Location Name
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
                                            htmlFor="contact"
                                            className={
                                                errors.contact
                                                    ? "text-destructive"
                                                    : ""
                                            }
                                        >
                                            Location Contact
                                        </Label>

                                        <Input
                                            id="contact"
                                            type="number"
                                            value={data.contact}
                                            autoComplete="tel"
                                            onChange={(e) =>
                                                setData(
                                                    "contact",
                                                    e.target.value
                                                )
                                            }
                                            maxLength={16}
                                            className="w-full"
                                        />

                                        <InputMessage>
                                            {errors.contact}
                                        </InputMessage>
                                    </div>

                                    <div className="grid gap-3">
                                        <Label
                                            htmlFor="address"
                                            className={
                                                errors.address
                                                    ? "text-destructive"
                                                    : ""
                                            }
                                        >
                                            Location Address
                                        </Label>

                                        <Textarea
                                            id="address"
                                            value={data.address}
                                            autoComplete="address"
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputMessage>
                                            {errors.address}
                                        </InputMessage>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card x-chunk="dashboard-07-chunk-1">
                            <CardHeader>
                                <CardTitle>Location Theater Brand</CardTitle>

                                <CardDescription>
                                    Manage theater brands of your location.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="grid gap-3">
                                    <MultiSelect
                                        options={brandOptions}
                                        defaultValue={selectedBrands}
                                        onValueChange={(e) => {
                                            const brandIds = e
                                                .map((brandName) => {
                                                    const selectedBrand =
                                                        brands.find(
                                                            (brand) =>
                                                                brand.name ===
                                                                brandName
                                                        )
                                                    return selectedBrand
                                                        ? selectedBrand.id
                                                        : null
                                                })
                                                .filter(
                                                    (id): id is string =>
                                                        id !== null
                                                )

                                            setData("brands", brandIds)
                                            setSelectedBrands(e)
                                        }}
                                    />

                                    <InputMessage>{errors.brands}</InputMessage>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-3">
                            <CardHeader>
                                <CardTitle>Location Ownership</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label
                                            htmlFor="province_id"
                                            className={
                                                errors.province_id
                                                    ? "text-destructive"
                                                    : ""
                                            }
                                        >
                                            Province
                                        </Label>

                                        <Popover
                                            open={openProvince}
                                            onOpenChange={setOpenProvince}
                                        >
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={openProvince}
                                                    className="justify-between"
                                                    id="province_id"
                                                >
                                                    {data.province_id
                                                        ? provinces.find(
                                                              (province) =>
                                                                  province.id ===
                                                                  data.province_id
                                                          )?.name
                                                        : "Select province..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent className="p-0 w-full">
                                                <Command>
                                                    <CommandInput placeholder="Search province..." />

                                                    <CommandList>
                                                        <CommandEmpty>
                                                            No province found.
                                                        </CommandEmpty>

                                                        <CommandGroup>
                                                            {provinces.map(
                                                                (province) => (
                                                                    <CommandItem
                                                                        key={
                                                                            province.id
                                                                        }
                                                                        onSelect={() => {
                                                                            setData(
                                                                                "province_id",
                                                                                province.id
                                                                            )
                                                                            setOpenProvince(
                                                                                false
                                                                            )
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                data.province_id ===
                                                                                    province.id
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                        {
                                                                            province.name
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
                                            {errors.province_id}
                                        </InputMessage>
                                    </div>

                                    <div className="grid gap-3">
                                        <Label
                                            htmlFor="city_id"
                                            className={
                                                errors.city_id
                                                    ? "text-destructive"
                                                    : ""
                                            }
                                        >
                                            City
                                        </Label>

                                        <Popover
                                            open={openCity}
                                            onOpenChange={setOpenCity}
                                        >
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={openCity}
                                                    className="justify-between"
                                                    id="city_id"
                                                >
                                                    {provinces
                                                        .find(
                                                            (province) =>
                                                                province.id ===
                                                                data.province_id
                                                        )
                                                        ?.cities?.find(
                                                            (city) =>
                                                                city.id ===
                                                                data.city_id
                                                        )?.name ??
                                                        "Select city..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent className="p-0 w-full">
                                                <Command>
                                                    <CommandInput placeholder="Search city..." />

                                                    <CommandList>
                                                        <CommandEmpty>
                                                            No city found.
                                                        </CommandEmpty>

                                                        <CommandGroup>
                                                            {provinces
                                                                .find(
                                                                    (
                                                                        province
                                                                    ) =>
                                                                        province.id ===
                                                                        data.province_id
                                                                )
                                                                ?.cities?.map(
                                                                    (city) => (
                                                                        <CommandItem
                                                                            key={
                                                                                city.id
                                                                            }
                                                                            onSelect={() => {
                                                                                setData(
                                                                                    "city_id",
                                                                                    city.id
                                                                                )
                                                                                setOpenCity(
                                                                                    false
                                                                                )
                                                                            }}
                                                                        >
                                                                            <Check
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    data.city_id ===
                                                                                        city.id
                                                                                        ? "opacity-100"
                                                                                        : "opacity-0"
                                                                                )}
                                                                            />
                                                                            {
                                                                                city.name
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
                                            {errors.city_id}
                                        </InputMessage>
                                    </div>

                                    <div className="grid gap-3">
                                        <Label
                                            htmlFor="user_id"
                                            className={
                                                errors.user_id
                                                    ? "text-destructive"
                                                    : ""
                                            }
                                        >
                                            User
                                        </Label>

                                        <Popover
                                            open={openUser}
                                            onOpenChange={setOpenUser}
                                        >
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={openUser}
                                                    className="justify-between"
                                                    id="user_id"
                                                >
                                                    {data.user_id
                                                        ? users.find(
                                                              (user) =>
                                                                  user.id ===
                                                                  data.user_id
                                                          )?.id
                                                        : "Select user..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>

                                            <PopoverContent className="p-0 w-full">
                                                <Command>
                                                    <CommandInput placeholder="Search user..." />

                                                    <CommandList>
                                                        <CommandEmpty>
                                                            No user found.
                                                        </CommandEmpty>

                                                        <CommandGroup>
                                                            {users.map(
                                                                (user) => (
                                                                    <CommandItem
                                                                        key={
                                                                            user.id
                                                                        }
                                                                        onSelect={() => {
                                                                            setData(
                                                                                "user_id",
                                                                                user.id
                                                                            )
                                                                            setOpenUser(
                                                                                false
                                                                            )
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                data.user_id ===
                                                                                    user.id
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                        {
                                                                            user.id
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
                                            {errors.user_id}
                                        </InputMessage>
                                    </div>
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
                        }}
                    >
                        Reset
                    </Button>

                    <Button size="sm" disabled={processing}>
                        Save Location
                    </Button>
                </div>
            </form>
        </AdminLayout>
    )
}
