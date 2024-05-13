import { Head, Link, useForm } from "@inertiajs/react"
import { Check, ChevronsUpDown } from "lucide-react"
import { FormEventHandler, useEffect, useState } from "react"

import { cn } from "@/lib/utils"

import { InputMessage } from "@/Components/InputMessage"
import { Alert, AlertDescription } from "@/Components/ui/alert"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
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
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import { Separator } from "@/Components/ui/separator"
import { Textarea } from "@/Components/ui/textarea"
import MainLayout from "@/Layouts/MainLayout"
import { PageProps } from "@/types"

export default function Register({ auth, provinces }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone_number: "",
        address: "",
        province_id: "",
        city_id: "",
        gender: "Male",
        dob: "",
    })

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation")
        }
    }, [])

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route("register"))
    }

    const [openProvince, setOpenProvince] = useState(false)
    const [openCity, setOpenCity] = useState(false)

    useEffect(() => {
        if (
            provinces
                .find((province) => province.id === data.province_id)
                ?.cities?.find((city) => city.id === data.city_id) === undefined
        ) {
            setData("city_id", "")
        }
    }, [data.province_id])

    // Birth Date
    const [day, setDay] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")
    const [days, setDays] = useState(
        Array.from({ length: 31 }, (_, i) => i + 1)
    )
    const [months, setMonths] = useState(
        Array.from({ length: 12 }, (_, i) =>
            new Date(0, i).toLocaleString("default", { month: "long" })
        )
    )
    const [years, setYears] = useState(
        Array.from({ length: 2007 - 1924 + 1 }, (_, i) => 2007 - i)
    )

    useEffect(() => {
        const today = new Date()
        today.setFullYear(today.getFullYear() - 17)
        let monthsInYear =
            today.getFullYear().toString() == year ? today.getMonth() + 1 : 12

        setMonths(
            Array.from({ length: monthsInYear }, (_, i) =>
                new Date(0, i).toLocaleString("default", { month: "long" })
            )
        )

        if (parseInt(month) + 1 > monthsInYear) {
            setMonth("")
        }

        if (month !== "") {
            const daysInMonth = new Date(
                year === "" ? 0 : parseInt(year),
                parseInt(month) + 1,
                0
            ).getDate()

            if (parseInt(day) > daysInMonth) {
                setDay("")
            }

            setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1))
        }

        if (year !== "" && month !== "" && day !== "") {
            setData(
                "dob",
                `${year}-${(parseInt(month) + 1)
                    .toString()
                    .padStart(2, "0")}-${day.padStart(2, "0")}`
            )
        } else {
            setData("dob", "")
        }
    }, [day, month, year])

    return (
        <MainLayout user={auth.user}>
            <Head title="Register" />

            <Card className="mx-auto max-w-xl my-4">
                <CardHeader>
                    <CardTitle className="text-xl">MTix Registration</CardTitle>

                    <Separator />

                    <Alert variant="warning">
                        <AlertDescription>
                            <ul className="list-disc ps-2">
                                <li>
                                    Fill in your profile data as per your ID
                                    (Lengkapi data sesuai dengan
                                    KTP/SIM/PASPOR).
                                </li>

                                <li>
                                    Fill in your active mobile number and email
                                    ID (Masukkan nomor dan email yang benar).
                                </li>

                                <li>
                                    In case of transaction discrepancy, we can
                                    only validate your account with your ID
                                    (Dalam hal terjadinya perbedaan transaksi,
                                    kami hanya dapat melakukan verifikasi sesuai
                                    dengan data KTP/SIM/PASPOR).
                                </li>
                            </ul>
                        </AlertDescription>
                    </Alert>
                </CardHeader>

                <CardContent>
                    <form onSubmit={submit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="phone_number">
                                    Phone Number
                                </Label>

                                <Input
                                    id="phone_number"
                                    type="number"
                                    value={data.phone_number}
                                    autoComplete="phone_number"
                                    autoFocus={true}
                                    onChange={(e) =>
                                        setData("phone_number", e.target.value)
                                    }
                                    placeholder="Phone Number"
                                    maxLength={16}
                                />

                                <InputMessage>
                                    {errors.phone_number}
                                </InputMessage>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">
                                    Full Name as per your ID
                                </Label>

                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    autoComplete="name"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder="Your Name"
                                />

                                <InputMessage>{errors.name}</InputMessage>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="Your valid email"
                                />

                                <InputMessage>{errors.email}</InputMessage>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="address">
                                    Address as per your ID
                                </Label>

                                <Textarea
                                    id="address"
                                    value={data.address}
                                    autoComplete="address"
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    placeholder="Correspondence address based on ID/KTP"
                                />

                                <InputMessage>{errors.address}</InputMessage>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="province">Province</Label>

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
                                            id="province"
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

                                    <PopoverContent className="p-0">
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
                                                                {province.name}
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

                            <div className="grid gap-2">
                                <Label htmlFor="city">City</Label>

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
                                            id="city"
                                        >
                                            {provinces
                                                .find(
                                                    (province) =>
                                                        province.id ===
                                                        data.province_id
                                                )
                                                ?.cities?.find(
                                                    (city) =>
                                                        city.id === data.city_id
                                                )?.name ?? "Select city..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent className="p-0">
                                        <Command>
                                            <CommandInput placeholder="Search city..." />

                                            <CommandList>
                                                <CommandEmpty>
                                                    No city found.
                                                </CommandEmpty>

                                                <CommandGroup>
                                                    {provinces
                                                        .find(
                                                            (province) =>
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
                                                                    {city.name}
                                                                </CommandItem>
                                                            )
                                                        )}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                                <InputMessage>{errors.city_id}</InputMessage>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="gender">Gender</Label>

                                <Select
                                    onValueChange={(e) => {
                                        setData("gender", e)
                                    }}
                                    defaultValue={data.gender}
                                >
                                    <SelectTrigger id="gender">
                                        <SelectValue placeholder="Gender" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="Male">
                                            Male
                                        </SelectItem>

                                        <SelectItem value="Female">
                                            Female
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                <InputMessage>{errors.gender}</InputMessage>
                            </div>

                            <div className="grid gap-2">
                                <Label>Birth Date</Label>

                                <div className="grid grid-cols-3 gap-2">
                                    <Select onValueChange={setDay} value={day}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Day" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Day</SelectLabel>
                                                {days.map((day, index) => (
                                                    <SelectItem
                                                        key={`day-${index}`}
                                                        value={day.toString()}
                                                    >
                                                        {day}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    <Select
                                        onValueChange={setMonth}
                                        value={month}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Month" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Month</SelectLabel>
                                                {months.map((month, index) => (
                                                    <SelectItem
                                                        key={`month-${index}`}
                                                        value={index.toString()}
                                                    >
                                                        {month}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    <Select
                                        onValueChange={setYear}
                                        value={year}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Year" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Year</SelectLabel>
                                                {years.map((year, index) => (
                                                    <SelectItem
                                                        key={`year-${index}`}
                                                        value={year.toString()}
                                                    >
                                                        {year}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <InputMessage>{errors.dob}</InputMessage>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">PIN/Password</Label>

                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="6 digits Number"
                                />

                                <InputMessage>{errors.password}</InputMessage>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Re-type PIN/Password
                                </Label>

                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    placeholder="6 digits Number"
                                />

                                <InputMessage>
                                    {errors.password_confirmation}
                                </InputMessage>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                Create an account
                            </Button>
                        </div>

                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href={route("login")} className="underline">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </MainLayout>
    )
}
