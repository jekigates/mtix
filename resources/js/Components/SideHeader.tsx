import { Link, router } from "@inertiajs/react";
import { PropsWithChildren, useEffect } from "react";
import { User } from "@/types";
import { usePage } from "@inertiajs/react";
import { MainNav } from "@/Components/MainNav";
import { MobileNav } from "@/Components/MobileNav";
import { ModeToggle } from "@/Components/ModeToggle";
import {
    LogIn,
    UserRound,
    CreditCard,
    Info,
    Tag,
    CircleHelp,
    Lock,
    UsersRound,
    Phone,
    Gift,
    Bell,
    Gem,
    History,
    Layers,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Button } from "@/Components/ui/button";

export default function SideHeader({
    user,
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
                    return;
                }

                if (user) {
                    switch (e.key) {
                        case "p":
                            e.preventDefault();
                            router.visit(route("profile.edit"));
                            break;
                        case "q":
                            e.preventDefault();
                            router.post(route("logout"));
                            break;
                    }
                }
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <MainNav />
                <MobileNav />
                <nav className="flex flex-1 items-center justify-end gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">About Us</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Info className="mr-2 h-4 w-4" />
                                <span>Info 21</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
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
                                <DropdownMenuItem>
                                    <Link
                                        href={route("profile.edit")}
                                        className="flex items-center"
                                    >
                                        <UserRound className="mr-2 h-4 w-4" />
                                        <span>{user.name}</span>
                                    </Link>
                                    <DropdownMenuShortcut>
                                        ⇧⌘P
                                    </DropdownMenuShortcut>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Link href="#">
                                        <span>Balance : Rp 0</span>
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem>
                                    <Link
                                        href="#"
                                        className="flex items-center"
                                    >
                                        <Gift className="mr-2 h-4 w-4" />
                                        <span>My Voucher</span>
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Link
                                        href="#"
                                        className="flex items-center"
                                    >
                                        <Gem className="mr-2 h-4 w-4" />
                                        <span>Partner Loyalty Rewards</span>
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Link
                                        href="#"
                                        className="flex items-center"
                                    >
                                        <Bell className="mr-2 h-4 w-4" />
                                        <span>Inbox</span>
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Link
                                        href="#"
                                        className="flex items-center"
                                    >
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        <span>Top Up M-Tix</span>
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Link
                                        href="#"
                                        className="flex items-center"
                                    >
                                        <History className="mr-2 h-4 w-4" />
                                        <span>Purchase History</span>
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Link
                                        href="#"
                                        className="flex items-center"
                                    >
                                        <Layers className="mr-2 h-4 w-4" />
                                        <span>Top Up History</span>
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem>
                                    <Link
                                        href={route("logout")}
                                        className="flex items-center"
                                        method="post"
                                        as="button"
                                        type="button"
                                    >
                                        <LogIn className="mr-2 h-4 w-4" />
                                        <span>Logout</span>
                                    </Link>
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
                                <DropdownMenuItem>
                                    <Link
                                        href={route("login")}
                                        className="flex items-center"
                                    >
                                        <LogIn className="mr-2 h-4 w-4" />
                                        <span>Login</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link
                                        href={route("register")}
                                        className="flex items-center"
                                    >
                                        <UserRound className="mr-2 h-4 w-4" />
                                        <span>Registration</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link
                                        href="#"
                                        className="flex items-center"
                                    >
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        <span>Top Up M-Tix</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    <ModeToggle />
                </nav>
            </div>
        </header>
    );
}
