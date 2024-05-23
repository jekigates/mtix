import { Head, Link, router } from "@inertiajs/react"
import { ChevronLeft, Crown, Store, UserRound } from "lucide-react"
import { useState } from "react"

import MainContent from "@/Components/MainContent"
import { Button, buttonVariants } from "@/Components/ui/button"
import { Label } from "@/Components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group"
import { Separator } from "@/Components/ui/separator"
import MainLayout from "@/Layouts/MainLayout"
import { PageProps } from "@/types"

export default function SelectRole({
    auth,
    roles,
}: PageProps<{
    roles: string[]
}>) {
    const [selectedRole, setSelectedRole] = useState(roles[0])

    return (
        <MainLayout user={auth.user}>
            <Head title="Select Role" />

            <MainContent className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="flex flex-col space-y-2">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Select Your Role
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        You have multiple roles associated with your account.
                        Please select the role you want to use for this session.
                    </p>
                </div>

                <Separator className="my-4" />

                <RadioGroup
                    defaultValue={roles[0]}
                    className="grid grid-cols-3 gap-4"
                    onValueChange={(e) => setSelectedRole(e)}
                >
                    {roles.includes("admin") && (
                        <div>
                            <RadioGroupItem
                                value="admin"
                                id="admin"
                                className="peer sr-only"
                            />

                            <Label
                                htmlFor="admin"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <Crown className="mb-3 h-6 w-6" />
                                Admin
                            </Label>
                        </div>
                    )}

                    {roles.includes("owner") && (
                        <div>
                            <RadioGroupItem
                                value="owner"
                                id="owner"
                                className="peer sr-only"
                            />

                            <Label
                                htmlFor="owner"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <Store className="mb-3 h-6 w-6" />
                                Owner
                            </Label>
                        </div>
                    )}

                    {roles.includes("customer") && (
                        <div>
                            <RadioGroupItem
                                value="customer"
                                id="customer"
                                className="peer sr-only"
                            />

                            <Label
                                htmlFor="customer"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <UserRound className="mb-3 h-6 w-6" />
                                Customer
                            </Label>
                        </div>
                    )}
                </RadioGroup>

                <Separator className="my-4" />

                <div className="flex items-center space-x-2 sm:w-1/2 sm:mx-auto">
                    <Link
                        href={route("logout")}
                        className={buttonVariants({
                            variant: "outline",
                        })}
                        as="button"
                        method="post"
                    >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                    </Link>

                    <Button
                        className="flex-1"
                        onClick={() => {
                            switch (selectedRole) {
                                case "admin":
                                    router.visit(route("admin.home"))
                                    break
                                case "owner":
                                    break
                                case "customer":
                                    router.visit(route("home"))
                                    break
                            }
                        }}
                    >
                        Continue
                    </Button>
                </div>
            </MainContent>
        </MainLayout>
    )
}
