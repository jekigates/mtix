import { Head, useForm } from "@inertiajs/react"
import { FormEventHandler, useEffect } from "react"

import { InputMessage } from "@/Components/InputMessage"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import GuestLayout from "@/Layouts/GuestLayout"

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: "",
    })

    useEffect(() => {
        return () => {
            reset("password")
        }
    }, [])

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route("password.confirm"))
    }

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-muted-foreground">
                This is a secure area of the application. Please confirm your
                password before continuing.
            </div>

            <form onSubmit={submit} className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>

                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoFocus={true}
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputMessage className="mt-2">
                        {errors.password}
                    </InputMessage>
                </div>

                <div className="flex items-center justify-end">
                    <Button className="ms-4" disabled={processing}>
                        Confirm
                    </Button>
                </div>
            </form>
        </GuestLayout>
    )
}
