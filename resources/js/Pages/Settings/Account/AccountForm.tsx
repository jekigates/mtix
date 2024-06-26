import { router, useForm, usePage } from "@inertiajs/react"
import { Check, ChevronsUpDown } from "lucide-react"
import { FormEventHandler, useEffect, useState } from "react"

import { cn } from "@/lib/utils"

import { InputDescription } from "@/Components/InputDescription"
import { InputMessage } from "@/Components/InputMessage"
import { Button } from "@/Components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/Components/ui/command"
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
import { Textarea } from "@/Components/ui/textarea"
import { useToast } from "@/Components/ui/use-toast"
import { PageProps } from "@/types"

export default function AccountForm({
    provinces,
}: {
    provinces: App.Data.ProvinceData[]
}) {
    const user = usePage<PageProps>().props.auth.user
    const { errors } = usePage().props
    const { toast } = useToast()

    const { data, setData, processing } = useForm({
        address: user.address,
        province_id: user.province_id,
        city_id: user.city_id,
        gender: user.gender,
        dob: new Date(user.dob),
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        let updateData: any = {
            dob: null,
        }

        if (year !== "" && month !== "" && day !== "") {
            const dob = new Date(
                parseInt(year),
                parseInt(month) - 1,
                parseInt(day)
            )

            const formattedDob = dob.toISOString().split("T")[0]

            updateData.dob = formattedDob
        }

        router.patch(
            route("settings.account.update"),
            {
                ...data,
                ...updateData,
            },
            {
                onSuccess: () => {
                    toast({
                        description: "Your account has been updated.",
                    })
                },
            }
        )
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
    const [day, setDay] = useState(data.dob.getDate().toString())
    const [month, setMonth] = useState(data.dob.getMonth().toString())
    const [year, setYear] = useState(data.dob.getFullYear().toString())
    const [days, setDays] = useState(
        Array.from({ length: 31 }, (_, i) => i + 1)
    )
    const [months, setMonths] = useState(
        Array.from({ length: 12 }, (_, i) =>
            new Date(0, i).toLocaleString("default", { month: "long" })
        )
    )
    const [years, setYears] = useState(
        Array.from(
            {
                length:
                    new Date().getFullYear() -
                    17 -
                    (new Date().getFullYear() - 100) +
                    1,
            },
            (_, i) => new Date().getFullYear() - 17 - i
        )
    )

    useEffect(() => {
        // These code to get total months of a year which makes min 17 years old age minimal
        const today = new Date()
        today.setFullYear(today.getFullYear() - 17)
        let monthsInYear =
            today.getFullYear().toString() === year ? today.getMonth() + 1 : 12

        setMonths(
            Array.from({ length: monthsInYear }, (_, i) =>
                new Date(0, i).toLocaleString("default", { month: "long" })
            )
        )

        if (parseInt(month) + 1 > monthsInYear) {
            setMonth("")
        }

        if (month !== "") {
            // filter days based on month and year
            let daysInMonth = 0
            if (
                today.getFullYear().toString() === year &&
                parseInt(month) === today.getMonth()
            ) {
                daysInMonth = today.getDate()
            } else {
                daysInMonth = new Date(
                    year === "" ? 0 : parseInt(year),
                    parseInt(month) + 1,
                    0
                ).getDate()
            }

            if (parseInt(day) > daysInMonth) {
                setDay("")
            }

            setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1))
        }

        if (year !== "" && month !== "" && day !== "") {
            setData(
                "dob",
                new Date(parseInt(year), parseInt(month), parseInt(day))
            )
        }
    }, [day, month, year])

    return (
        <form onSubmit={submit} className="space-y-8">
            <div className="grid gap-2">
                <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Account ID
                </p>

                <p className="text-sm text-muted-foreground">{user.id}</p>
            </div>

            <div className="grid gap-2">
                <Label
                    htmlFor="address"
                    className={errors.address ? "text-destructive" : ""}
                >
                    Address as per your ID
                </Label>

                <Textarea
                    id="address"
                    name="address"
                    value={data.address}
                    autoComplete="address"
                    onChange={(e) => setData("address", e.target.value)}
                    placeholder="Correspondence address based on ID/KTP"
                />

                <InputDescription>
                    Enter your full address as it appears on your ID.
                </InputDescription>
                <InputMessage>{errors.address}</InputMessage>
            </div>

            <div className="grid gap-2">
                <Label
                    htmlFor="province_id"
                    className={errors.province_id ? "text-destructive" : ""}
                >
                    Province
                </Label>

                <Popover open={openProvince} onOpenChange={setOpenProvince}>
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
                                          province.id === data.province_id
                                  )?.name
                                : "Select province..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="p-0 w-full">
                        <Command>
                            <CommandInput placeholder="Search province..." />

                            <CommandList>
                                <CommandEmpty>No province found.</CommandEmpty>

                                <CommandGroup>
                                    {provinces.map((province) => (
                                        <CommandItem
                                            key={province.id}
                                            onSelect={() => {
                                                setData(
                                                    "province_id",
                                                    province.id
                                                )
                                                setOpenProvince(false)
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
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                <InputDescription>
                    Select your province of residence.
                </InputDescription>
                <InputMessage>{errors.province_id}</InputMessage>
            </div>

            <div className="grid gap-2">
                <Label
                    htmlFor="city_id"
                    className={errors.city_id ? "text-destructive" : ""}
                >
                    City
                </Label>

                <Popover open={openCity} onOpenChange={setOpenCity}>
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
                                        province.id === data.province_id
                                )
                                ?.cities?.find(
                                    (city) => city.id === data.city_id
                                )?.name ?? "Select city..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="p-0 w-full">
                        <Command>
                            <CommandInput placeholder="Search city..." />

                            <CommandList>
                                <CommandEmpty>No city found.</CommandEmpty>

                                <CommandGroup>
                                    {provinces
                                        .find(
                                            (province) =>
                                                province.id === data.province_id
                                        )
                                        ?.cities?.map((city) => (
                                            <CommandItem
                                                key={city.id}
                                                onSelect={() => {
                                                    setData("city_id", city.id)
                                                    setOpenCity(false)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        data.city_id === city.id
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                                {city.name}
                                            </CommandItem>
                                        ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                <InputDescription>
                    Select your city of residence.
                </InputDescription>
                <InputMessage>{errors.city_id}</InputMessage>
            </div>

            <div className="grid gap-2">
                <Label
                    htmlFor="gender"
                    className={errors.gender ? "text-destructive" : ""}
                >
                    Gender
                </Label>

                <Select
                    onValueChange={(e) => {
                        setData("gender", e)
                    }}
                    defaultValue={data.gender}
                    name="gender"
                >
                    <SelectTrigger id="gender">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="male">Male</SelectItem>

                        <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                </Select>

                <InputDescription>
                    Select your gender identity.
                </InputDescription>
                <InputMessage>{errors.gender}</InputMessage>
            </div>

            <div className="grid gap-2">
                <Label
                    htmlFor="day"
                    className={errors.dob ? "text-destructive" : ""}
                >
                    Birth Date
                </Label>

                <div className="grid grid-cols-3 gap-2">
                    <Select onValueChange={setDay} value={day} name="day">
                        <SelectTrigger id="day">
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

                    <Select onValueChange={setMonth} value={month} name="month">
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

                    <Select onValueChange={setYear} value={year} name="year">
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

                <InputDescription>
                    Your date of birth is used to calculate your age.
                </InputDescription>
                <InputMessage>{errors.dob}</InputMessage>
            </div>

            <div className="flex items-center gap-4">
                <Button disabled={processing}>Update account</Button>
            </div>
        </form>
    )
}
