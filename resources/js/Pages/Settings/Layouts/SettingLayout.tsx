import { Link, usePage } from "@inertiajs/react"
import { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

import { buttonVariants } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"
import { Toaster } from "@/Components/ui/toaster"

const sidebarNavItems = [
    {
        title: "Profile",
        href: route("settings.profile.edit"),
    },
    {
        title: "Account",
        href: route("settings.account.edit"),
    },
    {
        title: "Security",
        href: route("settings.security.edit"),
    },
]

export default function SettingLayout({ children }: PropsWithChildren) {
    return (
        <>
            <div className="space-y-6 p-10 pb-16">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Settings
                    </h2>

                    <p className="text-muted-foreground">
                        Manage your account settings and set e-mail preferences.
                    </p>
                </div>

                <Separator className="my-6" />

                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        <SidebarNav items={sidebarNavItems} />
                    </aside>

                    <div className="flex-1 lg:max-w-2xl">{children}</div>
                </div>
            </div>

            <Toaster />
        </>
    )
}

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string
        title: string
    }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
    const { url } = usePage()

    return (
        <nav
            className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
                className
            )}
            {...props}
        >
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        url === new URL(item.href).pathname
                            ? "bg-muted hover:bg-muted"
                            : "hover:bg-transparent hover:underline",
                        "justify-start"
                    )}
                >
                    {item.title}
                </Link>
            ))}
        </nav>
    )
}
