import InputError from "@/Components/InputError";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler, useEffect, useState } from "react";
import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

// Combobox
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
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
            address: user.address,
            province: user.province,
            city: user.city,
            gender: user.gender,
            dob: new Date(user.dob),
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data.dob);

        patch(route("profile.update"));
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

    // Birth Date
    const [day, setDay] = useState(data.dob.getDate().toString());
    const [month, setMonth] = useState(data.dob.getMonth().toString());
    const [year, setYear] = useState(data.dob.getFullYear().toString());
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

        if (year !== "" && month !== "" && day !== "") {
            setData(
                "dob",
                new Date(parseInt(year), parseInt(month), parseInt(day))
            );
        } else {
            setData("dob", new Date(user.dob));
        }
    }, [day, month, year]);

    return (
        <Card>
            <form onSubmit={submit} className="max-w-xl">
                <CardHeader>
                    <CardTitle className="text-lg">
                        Profile Information
                    </CardTitle>

                    <CardDescription>
                        Update your account's profile information and email
                        address.
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label
                            htmlFor="phone_number"
                            className={
                                errors.phone_number ? "text-destructive" : ""
                            }
                        >
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
                        <Label
                            htmlFor="name"
                            className={errors.name ? "text-destructive" : ""}
                        >
                            Name
                        </Label>

                        <Input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            autoComplete="name"
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Your Name"
                            maxLength={50}
                        />

                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label
                            htmlFor="email"
                            className={errors.email ? "text-destructive" : ""}
                        >
                            Email
                        </Label>

                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="Your valid email"
                            maxLength={50}
                        />

                        <InputError message={errors.email} />
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

                        <InputError message={errors.address} />
                    </div>

                    <div className="grid gap-2">
                        <Label
                            htmlFor="province"
                            className={
                                errors.province ? "text-destructive" : ""
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
                                            {provinces.map((province) => (
                                                <CommandItem
                                                    key={province.name}
                                                    value={province.name}
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
                                                        setOpenProvince(false);
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
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        <InputError message={errors.province} />
                    </div>

                    <div className="grid gap-2">
                        <Label
                            htmlFor="city"
                            className={errors.city ? "text-destructive" : ""}
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
                                    id="city"
                                >
                                    {provinces
                                        .find(
                                            (province) =>
                                                province.name === data.province
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
                                                        setOpenCity(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            data.city === city
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
                        <Label
                            htmlFor="gender"
                            className={errors.gender ? "text-destructive" : ""}
                        >
                            Gender
                        </Label>

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
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                            </SelectContent>
                        </Select>

                        <InputError message={errors.gender} />
                    </div>

                    <div className="grid gap-2">
                        <Label className={errors.dob ? "text-destructive" : ""}>
                            Birth Date
                        </Label>

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

                            <Select onValueChange={setMonth} value={month}>
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

                            <Select onValueChange={setYear} value={year}>
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

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="text-sm">
                                Your email address is unverified.{" "}
                                <Link
                                    href={route("verification.send")}
                                    method="post"
                                    as="button"
                                    className="underline text-sm text-muted-foreground hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Click here to re-send the verification
                                    email.
                                </Link>
                            </p>

                            {status === "verification-link-sent" && (
                                <div className="font-medium text-sm text-green-600">
                                    A new verification link has been sent to
                                    your email address.
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>

                <CardFooter>
                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Save</Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-muted-foreground">
                                Saved.
                            </p>
                        </Transition>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
}
