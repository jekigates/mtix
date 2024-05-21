import { Head, useForm } from "@inertiajs/react"
import { FormEventHandler, useEffect } from "react"

import { InputMessage } from "@/Components/InputMessage"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import GuestLayout from "@/Layouts/GuestLayout"

export default function ResetPassword({
    token,
    email,
}: {
    token: string
    email: string
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    })

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation")
        }
    }, [])

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route("password.store"))
    }

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form onSubmit={submit} className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputMessage>{errors.email}</InputMessage>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        autoFocus={true}
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputMessage>{errors.password}</InputMessage>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">
                        Confirm Password
                    </Label>

                    <Input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                    />

                    <InputMessage>{errors.password_confirmation}</InputMessage>
                </div>

                <div className="flex items-center justify-end">
                    <Button className="ms-4" disabled={processing}>
                        Reset Password
                    </Button>
                </div>
            </form>
        </GuestLayout>
    )
}
