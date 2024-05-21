import { Head, useForm } from "@inertiajs/react"
import { FormEventHandler } from "react"

import { InputMessage } from "@/Components/InputMessage"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import GuestLayout from "@/Layouts/GuestLayout"

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route("password.email"))
    }

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-muted-foreground">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 font-medium text-sm text-primary">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="grid gap-4">
                <div className="grid gap-2">
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        autoFocus={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputMessage>{errors.email}</InputMessage>
                </div>

                <div className="flex items-center justify-end">
                    <Button className="ms-4" disabled={processing}>
                        Email Password Reset Link
                    </Button>
                </div>
            </form>
        </GuestLayout>
    )
}
