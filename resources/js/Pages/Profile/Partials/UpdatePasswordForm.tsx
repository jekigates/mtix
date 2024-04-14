import { useRef, FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

export default function UpdatePasswordForm() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

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
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <>
            <Card>
                <form onSubmit={updatePassword} className="max-w-xl">
                    <CardHeader>
                        <CardTitle className="text-lg">
                            Update Password
                        </CardTitle>

                        <CardDescription>
                            Ensure your account is using a long, random password
                            to stay secure.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label
                                htmlFor="current_password"
                                className={
                                    errors.current_password
                                        ? "text-destructive"
                                        : ""
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

                            <InputError message={errors.current_password} />
                        </div>

                        <div className="grid gap-2">
                            <Label
                                htmlFor="password"
                                className={
                                    errors.password ? "text-destructive" : ""
                                }
                            >
                                New Password
                            </Label>

                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                ref={passwordInput}
                            />

                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label
                                htmlFor="password_confirmation"
                                className={
                                    errors.password_confirmation
                                        ? "text-destructive"
                                        : ""
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
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                            />

                            <InputError
                                message={errors.password_confirmation}
                            />
                        </div>
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
        </>
    );
}
