import { useEffect, FormEventHandler } from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { PageProps } from "@/types";

export default function Login({
    auth,
    status,
    canResetPassword,
}: PageProps<{
    status?: string;
    canResetPassword: boolean;
}>) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <MainLayout user={auth.user}>
            <Head title="Login" />

            <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">MTix</CardTitle>
                    <CardDescription>Mobile Ticketing</CardDescription>
                </CardHeader>

                <CardContent>
                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    autoComplete="username"
                                    autoFocus={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="Your valid email"
                                />

                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">
                                        PIN/Password
                                    </Label>

                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="ml-auto inline-block text-sm underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                    )}
                                </div>

                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="PIN/Password"
                                />

                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="terms"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />

                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remember me
                                </label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={processing}
                            >
                                Login
                            </Button>
                        </div>

                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link
                                href={route("register")}
                                className="underline"
                            >
                                Sign up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </MainLayout>
    );
}
