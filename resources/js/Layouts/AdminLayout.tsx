import { Link, router, usePage } from "@inertiajs/react"
import {
    Bell,
    CircleUser,
    Cog,
    CupSoda,
    Film,
    Home,
    LineChart,
    LogIn,
    Menu,
    Newspaper,
    Package,
    Popcorn,
    ShoppingCart,
    Tag,
    Theater,
    Users,
} from "lucide-react"
import { PropsWithChildren, ReactNode, useEffect, useState } from "react"

import { cn } from "@/lib/utils"

import { Icons } from "@/Components/Icons"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Input } from "@/Components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"
import { User } from "@/types"

export default function Admin({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [open, setOpen] = useState(false)
    const { url } = usePage()

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
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link
                            href={route("admin.home")}
                            className="flex items-center gap-2 font-semibold"
                        >
                            <Icons.logo className="h-6 w-6" />

                            <span className="">21 Cineplex</span>
                        </Link>

                        <Button
                            variant="outline"
                            size="icon"
                            className="ml-auto h-8 w-8"
                        >
                            <Bell className="h-4 w-4" />

                            <span className="sr-only">
                                Toggle notifications
                            </span>
                        </Button>
                    </div>

                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <Link
                                href={route("admin.home")}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                    url === "/admin"
                                        ? "bg-muted text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                <Home className="h-4 w-4" />
                                Dashboard
                            </Link>

                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <Film className="h-4 w-4" />
                                Movies
                            </Link>

                            <Link
                                href={route("admin.products.index")}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                    url === "/admin/products"
                                        ? "bg-muted text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                <CupSoda className="h-4 w-4" />
                                Products
                            </Link>

                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <Theater className="h-4 w-4" />
                                Theaters
                            </Link>

                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <Users className="h-4 w-4" />
                                Customers
                            </Link>

                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <Tag className="h-4 w-4" />
                                Promos
                            </Link>

                            <Link
                                href="#"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <Newspaper className="h-4 w-4" />
                                Infos
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 bg-background sm:bg-transparent px-4 lg:h-[60px] sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />

                                <span className="sr-only">
                                    Toggle navigation menu
                                </span>
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

                                <Link
                                    href={route("admin.home")}
                                    className={cn(
                                        "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
                                        url === "/admin"
                                            ? "bg-muted text-foreground"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </Link>

                                <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Film className="h-5 w-5" />
                                    Movies
                                </Link>

                                <Link
                                    href={route("admin.products.index")}
                                    className={cn(
                                        "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground",
                                        url === "/admin/products"
                                            ? "bg-muted text-foreground"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    <CupSoda className="h-5 w-5" />
                                    Products
                                </Link>

                                <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Theater className="h-5 w-5" />
                                    Theaters
                                </Link>

                                <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Users className="h-5 w-5" />
                                    Customers
                                </Link>

                                <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Tag className="h-5 w-5" />
                                    Promos
                                </Link>

                                <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Newspaper className="h-5 w-5" />
                                    Infos
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>

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

                <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
            </div>
        </div>
    )
}
