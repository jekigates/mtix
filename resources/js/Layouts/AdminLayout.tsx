import { Link, router, usePage } from "@inertiajs/react"
import {
    CircleUser,
    Cog,
    CupSoda,
    Film,
    GalleryHorizontal,
    Home,
    LogIn,
    Menu,
    Newspaper,
    Tag,
    Theater,
    Users,
} from "lucide-react"
import { PropsWithChildren, ReactNode, useEffect, useState } from "react"

import { cn } from "@/lib/utils"

import { Icons } from "@/Components/Icons"
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
        href: route("admin.home"),
        icon: Home,
    },
    {
        title: "Movies",
        href: "/admin/movies",
        icon: Film,
    },
    {
        title: "Products",
        href: route("admin.products.index"),
        icon: CupSoda,
    },
    {
        title: "Theaters",
        href: "/admin/theaters",
        icon: Theater,
    },
    {
        title: "Customers",
        href: "/admin/customers",
        icon: Users,
    },
    {
        title: "Banners",
        href: "/admin/banners",
        icon: GalleryHorizontal,
    },
    {
        title: "Promos",
        href: "/admin/promos ",
        icon: Tag,
    },
    {
        title: "Infos",
        href: route("admin.infos.index"),
        icon: Newspaper,
    },
]

interface navProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string
        title: string
        icon: React.ComponentType<{ className?: string }>
    }[]
}

export default function Admin({
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
        <div className="flex min-h-screen w-full">
            <SidebarNav items={navItems} />

            <div className="flex flex-col flex-1 max-w-full">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] sm:px-6">
                    <MobileNav items={navItems} />

                    {header ?? <div className="w-full flex-1"></div>}

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
                </header>

                <main className="flex-1 p-4 sm:px-6">{children}</main>
            </div>
        </div>
    )
}

function SidebarNav({ items }: navProps) {
    const { url } = usePage()

    return (
        <div className="hidden border-r bg-muted/40 lg:block lg:min-w-[220px] xl:min-w-[280px]">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link
                        href={route("admin.home")}
                        className="flex items-center gap-2 font-semibold"
                    >
                        <Icons.logo className="h-6 w-6" />

                        <span className="">21 Cineplex</span>
                    </Link>
                </div>

                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
                                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                        url === pathname
                                            ? "bg-muted text-primary"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.title}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>
        </div>
    )
}

function MobileNav({ items }: navProps) {
    const [open, setOpen] = useState(false)
    const { url } = usePage()

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 lg:hidden"
                >
                    <Menu className="h-5 w-5" />

                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                    <Link
                        href={route("admin.home")}
                        className="flex items-center gap-2 text-lg font-semibold"
                    >
                        <Icons.logo className="h-6 w-6" />

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
                                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
                                    url === pathname
                                        ? "bg-muted text-foreground"
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
