import { Link, router, usePage } from "@inertiajs/react"
import {
    CircleUser,
    Cog,
    CupSoda,
    Film,
    Home,
    LogIn,
    Menu,
    Package2,
    Projector,
    Timer,
} from "lucide-react"
import { PropsWithChildren, ReactNode, useEffect, useState } from "react"

import { cn } from "@/lib/utils"

import { Button } from "@/Components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"
import { User } from "@/types"

const navItems = [
    {
        title: "Home",
        href: route("owner.home"),
        icon: Home,
    },
    {
        title: "Movies",
        href: "/owner/movies",
        icon: Film,
    },
    {
        title: "Products",
        href: "/owner/products",
        icon: CupSoda,
    },
    {
        title: "Studios",
        href: "/owner/studios",
        icon: Projector,
    },
    {
        title: "Showtimes",
        href: "/owner/showtimes",
        icon: Timer,
    },
]

interface NavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string
        title: string
        icon: React.ComponentType<{ className?: string }>
    }[]
}

export default function Owner({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.metaKey || e.ctrlKey) {
                if (
                    (e.target instanceof HTMLElement &&
                        e.target.isContentEditable) ||
                    e.target instanceof HTMLInputElement ||
                    e.target instanceof HTMLTextAreaElement ||
                    e.target instanceof HTMLSelectElement
                ) {
                    return
                }

                if (user) {
                    switch (e.key) {
                        case "p":
                            e.preventDefault()
                            router.visit(route("settings.profile.edit"))
                            break
                        case "q":
                            e.preventDefault()
                            router.post(route("logout"))
                            break
                    }
                }
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <MainNav items={navItems} />
                <MobileNav items={navItems} />

                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    {header ?? (
                        <div className="ml-auto flex-1 sm:flex-initial"></div>
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="rounded-full"
                            >
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle user menu
                                </span>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-60">
                            <DropdownMenuItem
                                onClick={() =>
                                    router.visit(route("settings.profile.edit"))
                                }
                            >
                                <Cog className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={() => router.post(route("logout"))}
                            >
                                <LogIn className="mr-2 h-4 w-4" />
                                <span>Logout</span>
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <main className="min-h-[calc(100vh_-_theme(spacing.16))] flex-1 bg-background p-4 md:p-10">
                {children}
            </main>
        </div>
    )
}

function MainNav({ items }: NavProps) {
    const { url } = usePage()

    return (
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
                href={route("owner.home")}
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">21 Cineplex</span>
            </Link>

            {items.map((item) => {
                let pathname = ""
                try {
                    pathname = new URL(item.href).pathname
                } catch (error) {}

                return (
                    <Link
                        key={item.href}
                        href={pathname === "" ? "" : item.href}
                        className={cn(
                            "transition-colors hover:text-foreground",
                            url === pathname
                                ? "text-foreground"
                                : "text-muted-foreground"
                        )}
                    >
                        {item.title}
                    </Link>
                )
            })}
        </nav>
    )
}

function MobileNav({ items }: NavProps) {
    const [open, setOpen] = useState(false)
    const { url } = usePage()

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />

                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-6 text-lg font-medium">
                    <Link
                        href={route("owner.home")}
                        className="flex items-center gap-2 text-lg font-semibold"
                    >
                        <Package2 className="h-6 w-6" />

                        <span className="sr-only">21 Cineplex</span>
                    </Link>

                    {items.map((item) => {
                        let pathname = ""
                        try {
                            pathname = new URL(item.href).pathname
                        } catch (error) {}

                        return (
                            <Link
                                key={item.href}
                                href={pathname === "" ? "" : item.href}
                                onClick={() => {
                                    router.visit(
                                        pathname === "" ? "" : item.href
                                    )
                                    setOpen(false)
                                }}
                                className={cn(
                                    "flex items-center gap-4 hover:text-foreground",
                                    url === pathname
                                        ? ""
                                        : "text-muted-foreground"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.title}
                            </Link>
                        )
                    })}
                </nav>
            </SheetContent>
        </Sheet>
    )
}
