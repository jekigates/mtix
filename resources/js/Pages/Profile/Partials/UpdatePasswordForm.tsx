import { useRef, FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";

export default function UpdatePasswordForm({
    className = "",
}: {
    className?: string;
}) {
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
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="current_password">Current Password</Label>

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
                    <Label htmlFor="password">New Password</Label>

                    <Input
                        id="password"
                        type="password"
                        value={data.password}
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        ref={passwordInput}
                    />

                    <InputError message={errors.password} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">
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

                    <InputError message={errors.password_confirmation} />
                </div>

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Save</Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
