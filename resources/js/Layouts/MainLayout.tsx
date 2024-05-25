import { Link, router, usePage } from "@inertiajs/react"
import {
    Bell,
    CircleHelp,
    Cog,
    CreditCard,
    Gem,
    Gift,
    History,
    Info,
    Layers,
    Lock,
    LogIn,
    Phone,
    Tag,
    UserRound,
    UsersRound,
} from "lucide-react"
import { PropsWithChildren, useEffect, useState } from "react"

import { cn } from "@/lib/utils"

import { Icons } from "@/Components/Icons"
import { ModeToggle } from "@/Components/ModeToggle"
import { Button } from "@/Components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Separator } from "@/Components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"
import { User } from "@/types"

export default function Main({
    user,
    children,
}: PropsWithChildren<{ user?: User }>) {
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
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
                <MainNav />
                <MobileNav />

                <div className="flex w-full items-center gap-2 justify-end md:ml-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">About Us</Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() =>
                                    router.visit(route("infos.index"))
                                }
                            >
                                <Info className="mr-2 h-4 w-4" />
                                <span>Info 21</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() =>
                                    router.visit(route("promos.index"))
                                }
                            >
                                <Tag className="mr-2 h-4 w-4" />
                                <span>Promotions</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <CircleHelp className="mr-2 h-4 w-4" />
                                <span>FAQ</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Lock className="mr-2 h-4 w-4" />
                                <span>Privacy Policy</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <UsersRound className="mr-2 h-4 w-4" />
                                <span>Investor Relations</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Phone className="mr-2 h-4 w-4" />
                                <span>Contact Us</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">My MTix</Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-60">
                                <DropdownMenuItem
                                    onClick={() =>
                                        router.visit(
                                            route("settings.profile.edit")
                                        )
                                    }
                                >
                                    <Cog className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                    <DropdownMenuShortcut>
                                        ⇧⌘P
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <span>Balance : Rp 0</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem>
                                    <Gift className="mr-2 h-4 w-4" />
                                    <span>My Voucher</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Gem className="mr-2 h-4 w-4" />
                                    <span>Partner Loyalty Rewards</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Bell className="mr-2 h-4 w-4" />
                                    <span>Inbox</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    <span>Top Up M-Tix</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <History className="mr-2 h-4 w-4" />
                                    <span>Purchase History</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Layers className="mr-2 h-4 w-4" />
                                    <span>Top Up History</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                    onClick={() => router.post(route("logout"))}
                                >
                                    <LogIn className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                    <DropdownMenuShortcut>
                                        ⇧⌘Q
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">MTix</Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() => router.visit(route("login"))}
                                >
                                    <LogIn className="mr-2 h-4 w-4" />
                                    <span>Login</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() =>
                                        router.visit(route("register"))
                                    }
                                >
                                    <UserRound className="mr-2 h-4 w-4" />
                                    <span>Registration</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    <span>Top Up M-Tix</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    <ModeToggle />
                </div>
            </header>

            <main className="flex-1 relative">{children}</main>

            <SiteFooter />
        </div>
    )
}

function MainNav() {
    const { url } = usePage()

    return (
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
                href={route("home")}
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
                <Icons.logo className="h-6 w-6" />
                <span className="hidden font-bold sm:inline-block text-nowrap">
                    21 Cineplex
                </span>
            </Link>

            <Link
                href={route("home")}
                className={cn(
                    "transition-colors hover:text-foreground",
                    url === "/" ? "text-foreground" : "text-muted-foreground"
                )}
            >
                Playing
            </Link>

            <Link
                href={route("theaters.index")}
                className={cn(
                    "transition-colors hover:text-foreground",
                    url.startsWith("/theaters")
                        ? "text-foreground"
                        : "text-muted-foreground"
                )}
            >
                Theaters
            </Link>

            <Link
                href={route("upcoming")}
                className={cn(
                    "transition-colors hover:text-foreground",
                    url === "/upcoming"
                        ? "text-foreground"
                        : "text-muted-foreground"
                )}
            >
                Upcoming
            </Link>
        </nav>
    )
}

function MobileNav() {
    const [open, setOpen] = useState(false)
    const { url } = usePage()

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                    <svg
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                    >
                        <path
                            d="M3 5H11"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M3 12H16"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M3 19H21"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>

            <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                    <Link
                        href={route("home")}
                        onClick={() => {
                            router.visit(route("home"))
                            setOpen(false)
                        }}
                        className="flex items-center gap-2 text-lg font-semibold"
                    >
                        <Icons.logo className="h-6 w-6" />
                        <span>21 Cineplex</span>
                    </Link>

                    <Link
                        href={route("home")}
                        onClick={() => {
                            router.visit(route("home"))
                            setOpen(false)
                        }}
                        className={cn(
                            "hover:text-foreground",
                            url === "/" ? "" : "text-muted-foreground"
                        )}
                    >
                        Playing
                    </Link>

                    <Link
                        href={route("theaters.index")}
                        onClick={() => {
                            router.visit(route("theaters.index"))
                            setOpen(false)
                        }}
                        className={cn(
                            "hover:text-foreground",
                            url.startsWith("/theaters")
                                ? ""
                                : "text-muted-foreground"
                        )}
                    >
                        Theaters
                    </Link>

                    <Link
                        href={route("upcoming")}
                        onClick={() => {
                            router.visit(route("upcoming"))
                            setOpen(false)
                        }}
                        className={cn(
                            "hover:text-foreground",
                            url === "/upcoming" ? "" : "text-muted-foreground"
                        )}
                    >
                        Upcoming
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    )
}

function SiteFooter() {
    return (
        <footer className="border-t text-muted-foreground p-4 bg-background">
            <div className="mb-2 flex h-4 items-center space-x-2 text-xs">
                <a
                    href="http://www.21cineplex.com/21profile"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium transition-colors hover:text-foreground hover:underline underline-offset-4"
                >
                    Profile
                </a>

                <Separator orientation="vertical" />

                <a
                    href="http://www.21cineplex.com/termofuse"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium transition-colors hover:text-foreground hover:underline underline-offset-4"
                >
                    Terms of Use
                </a>

                <Separator orientation="vertical" />

                <a
                    href="http://www.21cineplex.com/jobs"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium transition-colors hover:text-foreground hover:underline underline-offset-4"
                >
                    Jobs Opportunities
                </a>

                <Separator orientation="vertical" />

                <a
                    href="http://www.21cineplex.com/credits"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium transition-colors hover:text-foreground hover:underline underline-offset-4"
                >
                    Credit
                </a>

                <Separator orientation="vertical" />

                <a
                    href="http://www.21cineplex.com/page/page-info-iklan"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium transition-colors hover:text-foreground hover:underline underline-offset-4"
                >
                    Info Iklan
                </a>

                <Separator orientation="vertical" />

                <a
                    href="http://www.21cineplex.com/sitemap"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium transition-colors hover:text-foreground hover:underline underline-offset-4"
                >
                    Sitemap
                </a>
            </div>

            <p className="text-[10px]">
                All materials and contents (text, graphics, and every
                attributes) of 21Cineplex or 21Cineplex.com website are
                copyrights and trademarks of 21Cineplex. No part of this website
                may be reproduced in any form without our written permission.
                Misuse of the entire content or any part, multiply, translate,
                use, or utilize it without written permission from 21Cineplex
                will be subject to criminal and / or civil penalties.{" "}
                <span className="text-white">admin@mtix-web-01</span>
            </p>
        </footer>
    )
}
