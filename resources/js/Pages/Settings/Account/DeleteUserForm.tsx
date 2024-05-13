import { useForm } from "@inertiajs/react"
import { FormEventHandler, useRef } from "react"

import { InputMessage } from "@/Components/InputMessage"
import { Button } from "@/Components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"

export default function DeleteUserForm() {
    const passwordInput = useRef<HTMLInputElement>(null)

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    })

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault()

        destroy(route("settings.account.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        })
    }

    const closeModal = () => {
        reset()
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Account</DialogTitle>

                    <DialogDescription>
                        You're going to delete your account. Are you sure?
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={deleteUser}>
                    <div className="grid gap-2 mb-4">
                        <Input
                            type="password"
                            value={data.password}
                            autoFocus={true}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="PIN/Password"
                            className="block"
                            ref={passwordInput}
                        />

                        <InputMessage>{errors.password}</InputMessage>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button variant="destructive" disabled={processing}>
                            Delete Account
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
