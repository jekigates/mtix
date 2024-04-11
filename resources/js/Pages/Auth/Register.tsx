import { useEffect, FormEventHandler, useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Textarea } from "@/Components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

// combobox
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/Components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";

export default function Register() {
    // Birth Date
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [days, setDays] = useState(
        Array.from({ length: 31 }, (_, i) => i + 1)
    );
    const [months, setMonths] = useState(
        Array.from({ length: 12 }, (_, i) =>
            new Date(0, i).toLocaleString("default", { month: "long" })
        )
    );
    const [years, setYears] = useState(
        Array.from({ length: 2007 - 1924 + 1 }, (_, i) => 2007 - i)
    );

    useEffect(() => {
        const today = new Date();
        today.setFullYear(today.getFullYear() - 17);
        let monthsInYear =
            today.getFullYear().toString() == year ? today.getMonth() + 1 : 12;

        setMonths(
            Array.from({ length: monthsInYear }, (_, i) =>
                new Date(0, i).toLocaleString("default", { month: "long" })
            )
        );

        if (parseInt(month) + 1 > monthsInYear) {
            setMonth("");
        }

        if (month !== "") {
            const daysInMonth = new Date(
                year === "" ? 0 : parseInt(year),
                parseInt(month) + 1,
                0
            ).getDate();

            if (parseInt(day) > daysInMonth) {
                setDay("");
            }

            setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
        }

        setData("dob", "");
        if (year !== "" && month !== "" && day !== "") {
            setData(
                "dob",
                `${year}-${(parseInt(month) + 1)
                    .toString()
                    .padStart(2, "0")}-${day.padStart(2, "0")}`
            );
        }
    }, [day, month, year]);

    // Default Forms
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone_number: "",
        address: "",
        province: "DKI Jakarta",
        city: "Jakarta Barat",
        gender: "Male",
        dob: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    // Provinces & Cities
    const provinces = [
        {
            name: "Jawa Barat",
            cities: [
                "Bandung",
                "Bogor",
                "Depok",
                "Cimahi",
                "Tasikmalaya",
                "Cirebon",
                "Sukabumi",
                "Karawang",
                "Purwakarta",
                "Subang",
            ],
        },
        {
            name: "Sumatera Utara",
            cities: [
                "Medan",
                "Siantar",
                "Tebing Tinggi",
                "Pematangsiantar",
                "Gunungsitoli",
                "Padangsidimpuan",
                "Nias Selatan",
                "Nias",
                "Labuhanbatu",
                "Labuhanbatu Utara",
            ],
        },
        {
            name: "Bali",
            cities: [
                "Denpasar",
                "Singaraja",
                "Semarang",
                "Klungkung",
                "Gianyar",
                "Bangli",
                "Buleleng",
                "Karangasem",
                "Jembrana",
            ],
        },
        {
            name: "Sulawesi Selatan",
            cities: [
                "Makassar",
                "Parepare",
                "Palopo",
                "Watampone",
                "Sengkang",
                "Makale",
                "Malangke",
                "Wajo",
                "Bone",
                "Pinrang",
            ],
        },
        {
            name: "DKI Jakarta",
            cities: [
                "Jakarta Pusat",
                "Jakarta Selatan",
                "Jakarta Timur",
                "Jakarta Barat",
                "Jakarta Utara",
            ],
        },
        {
            name: "Jawa Timur",
            cities: [
                "Surabaya",
                "Malang",
                "Sidoarjo",
                "Gresik",
                "Jember",
                "Mojokerto",
                "Lamongan",
                "Kediri",
                "Blitar",
                "Probolinggo",
            ],
        },
        {
            name: "Nusa Tenggara Barat",
            cities: [
                "Mataram",
                "Lombok Barat",
                "Lombok Tengah",
                "Lombok Timur",
                "Sumbawa",
                "Sumbawa Barat",
                "Dompu",
                "Bima",
                "Nusa Tenggara Barat",
                "Lombok Utara",
            ],
        },
        {
            name: "Riau",
            cities: [
                "Pekanbaru",
                "Dumai",
                "Bengkalis",
                "Rokan Hulu",
                "Rokan Hilir",
                "Siak",
                "Pelalawan",
                "Kuantan Singingi",
                "Indragiri Hulu",
                "Indragiri Hilir",
            ],
        },
        {
            name: "Daerah Istimewa Yogyakarta",
            cities: [
                "Yogyakarta",
                "Bantul",
                "Kulon Progo",
                "Gunungkidul",
                "Sleman",
            ],
        },
        {
            name: "Jawa Tengah",
            cities: [
                "Semarang",
                "Solo",
                "Yogyakarta",
                "Pekalongan",
                "Kudus",
                "Klaten",
                "Semarang",
                "Surakarta",
                "Demak",
                "Boyolali",
            ],
        },
    ];

    const [cities, setCities] = useState(
        provinces.find((province) => province.name === data.province)?.cities
    );

    const [openProvince, setOpenProvince] = useState(false);
    const [openCity, setOpenCity] = useState(false);

    useEffect(() => {
        let newCities = provinces.find(
            (province) => province.name === data.province
        )?.cities;
        setCities(newCities);

        if (newCities?.find((city) => city === data.city) === undefined) {
            setData("city", "");
        }
    }, [data.province]);

    return (
        <MainLayout>
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
                                    name="phone_number"
                                    value={data.phone_number}
                                    autoComplete="phone_number"
                                    autoFocus={true}
                                    onChange={(e) =>
                                        setData("phone_number", e.target.value)
                                    }
                                    placeholder="Phone Number"
                                    maxLength={16}
                                />
                                <InputError message={errors.phone_number} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">
                                    Full Name as per your ID
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    autoComplete="name"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder="Your Name"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="Your valid email"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="address">
                                    Address as per your ID
                                </Label>
                                <Textarea
                                    id="address"
                                    name="address"
                                    value={data.address}
                                    autoComplete="address"
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    placeholder="Correspondence address based on ID/KTP"
                                />
                                <InputError message={errors.address} />
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
                                            {data.province
                                                ? provinces.find(
                                                      (province) =>
                                                          province.name ===
                                                          data.province
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
                                                                    province.name
                                                                }
                                                                value={
                                                                    province.name
                                                                }
                                                                onSelect={(
                                                                    currentValue
                                                                ) => {
                                                                    setData(
                                                                        "province",
                                                                        currentValue ===
                                                                            data.province
                                                                            ? ""
                                                                            : currentValue
                                                                    );
                                                                    setOpenProvince(
                                                                        false
                                                                    );
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        data.province ===
                                                                            province.name
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
                                <InputError message={errors.province} />
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
                                                        province.name ===
                                                        data.province
                                                )
                                                ?.cities.find(
                                                    (city) => city === data.city
                                                )
                                                ? data.city
                                                : "Select city..."}
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
                                                    {cities?.map((city) => (
                                                        <CommandItem
                                                            key={city}
                                                            value={city}
                                                            onSelect={(
                                                                currentValue
                                                            ) => {
                                                                setData(
                                                                    "city",
                                                                    currentValue ===
                                                                        data.city
                                                                        ? ""
                                                                        : currentValue
                                                                );
                                                                setOpenCity(
                                                                    false
                                                                );
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    data.city ===
                                                                        city
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                            {city}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <InputError message={errors.city} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Select
                                    onValueChange={(e) => {
                                        setData("gender", e);
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
                                <InputError message={errors.gender} />
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
                                                        key={index}
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
                                                        key={index}
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
                                                {years.map((year) => (
                                                    <SelectItem
                                                        key={year}
                                                        value={year.toString()}
                                                    >
                                                        {year}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <InputError message={errors.dob} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">PIN/Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="6 digits Number"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Re-type PIN/Password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
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
                                <InputError
                                    message={errors.password_confirmation}
                                />
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
    );
}
