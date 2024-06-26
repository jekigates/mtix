import { Transition } from "@headlessui/react"
import { useForm } from "@inertiajs/react"
import { FormEventHandler, useRef } from "react"

import { InputMessage } from "@/Components/InputMessage"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"

export default function SecurityForm() {
    const passwordInput = useRef<HTMLInputElement>(null)
    const currentPasswordInput = useRef<HTMLInputElement>(null)

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    })

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault()

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation")
                    passwordInput.current?.focus()
                }

                if (errors.current_password) {
                    reset("current_password")
                    currentPasswordInput.current?.focus()
                }
            },
        })
    }

    return (
        <form onSubmit={updatePassword} className="space-y-8">
            <div className="grid gap-2">
                <Label
                    htmlFor="current_password"
                    className={
                        errors.current_password ? "text-destructive" : ""
                    }
                >
                    Current Password
                </Label>

                <Input
                    id="current_password"
                    type="password"
                    value={data.current_password}
                    autoComplete="current-password"
                    onChange={(e) =>
                        setData("current_password", e.target.value)
                    }
                    ref={currentPasswordInput}
                />

                <InputMessage>{errors.current_password}</InputMessage>
            </div>

            <div className="grid gap-2">
                <Label
                    htmlFor="password"
                    className={errors.password ? "text-destructive" : ""}
                >
                    New Password
                </Label>

                <Input
                    id="password"
                    type="password"
                    value={data.password}
                    autoComplete="new-password"
                    onChange={(e) => setData("password", e.target.value)}
                    ref={passwordInput}
                />

                <InputMessage>{errors.password}</InputMessage>
            </div>

            <div className="grid gap-2">
                <Label
                    htmlFor="password_confirmation"
                    className={
                        errors.password_confirmation ? "text-destructive" : ""
                    }
                >
                    Confirm Password
                </Label>

                <Input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    autoComplete="new-password"
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                />

                <InputMessage>{errors.password_confirmation}</InputMessage>
            </div>

            <div className="flex items-center gap-4">
                <Button disabled={processing}>Update security</Button>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-muted-foreground">Saved.</p>
                </Transition>
            </div>
        </form>
    )
}
