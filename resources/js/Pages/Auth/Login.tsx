import { Head, Link, useForm } from "@inertiajs/react"
import { FormEventHandler, useEffect } from "react"

import { InputMessage } from "@/Components/InputMessage"
import { Button } from "@/Components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import { Checkbox } from "@/Components/ui/checkbox"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import MainLayout from "@/Layouts/MainLayout"
import { PageProps } from "@/types"

export default function Login({
    auth,
    status,
    canResetPassword,
}: PageProps<{
    status?: string
    canResetPassword: boolean
}>) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    })

    useEffect(() => {
        return () => {
            reset("password")
        }
    }, [])

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route("login"))
    }

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
                        <div className="mb-4 font-medium text-sm text-primary">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="grid gap-4">
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

                            <InputMessage>{errors.email}</InputMessage>
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">PIN/Password</Label>

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

                            <InputMessage>{errors.password}</InputMessage>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="terms"
                                checked={data.remember}
                                onCheckedChange={() =>
                                    setData("remember", !data.remember)
                                }
                                name="terms"
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

                        <div className="text-center text-sm">
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
    )
}
