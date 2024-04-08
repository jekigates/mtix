import { useEffect, FormEventHandler } from "react";
import MainLayout from "@/Layouts/MainLayout";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import { Alert, AlertDescription } from "@/Components/ui/alert";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone_number: "",
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
                                    maxLength={6}
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">
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
                                    maxLength={6}
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
