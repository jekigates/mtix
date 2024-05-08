import { InputDescription } from "@/Components/InputDescription";
import { InputMessage } from "@/Components/InputMessage";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { PageProps } from "@/types";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function ProfileForm({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            phone_number: user.phone_number,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("settings.profile.update"));
    };

    return (
        <form onSubmit={submit} className="space-y-8">
            <div className="grid gap-2">
                <Label
                    htmlFor="name"
                    className={errors.name ? "text-destructive" : ""}
                >
                    Name
                </Label>

                <Input
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    autoComplete="name"
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder="Your Name"
                    maxLength={50}
                />

                <InputDescription>
                    Your name as it appears on the site.
                </InputDescription>
                <InputMessage>{errors.name}</InputMessage>
            </div>

            <div className="grid gap-2">
                <Label
                    htmlFor="email"
                    className={errors.email ? "text-destructive" : ""}
                >
                    Email
                </Label>

                <Input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    autoComplete="username"
                    onChange={(e) => setData("email", e.target.value)}
                    placeholder="Your valid email"
                    maxLength={50}
                />

                <InputDescription>
                    You can manage verified email addresses in your email
                    settings.
                </InputDescription>
                <InputMessage>{errors.email}</InputMessage>
            </div>

            <div className="grid gap-2">
                <Label
                    htmlFor="phone_number"
                    className={errors.phone_number ? "text-destructive" : ""}
                >
                    Phone Number
                </Label>

                <Input
                    id="phone_number"
                    type="number"
                    name="phone_number"
                    value={data.phone_number}
                    autoComplete="phone_number"
                    autoFocus={true}
                    onChange={(e) => setData("phone_number", e.target.value)}
                    placeholder="Phone Number"
                    maxLength={16}
                />

                <InputDescription>
                    Enter your phone number for receiving updates and
                    verification purposes.
                </InputDescription>
                <InputMessage>{errors.phone_number}</InputMessage>
            </div>

            {mustVerifyEmail && user.email_verified_at === null && (
                <div>
                    <p className="text-sm">
                        Your email address is unverified.{" "}
                        <Link
                            href={route("verification.send")}
                            method="post"
                            as="button"
                            className="underline text-sm text-muted-foreground hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Click here to re-send the verification email.
                        </Link>
                    </p>

                    {status === "verification-link-sent" && (
                        <div className="font-medium text-sm text-green-600">
                            A new verification link has been sent to your email
                            address.
                        </div>
                    )}
                </div>
            )}

            <div className="flex items-center gap-4">
                <Button disabled={processing}>Update profile</Button>

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
    );
}
