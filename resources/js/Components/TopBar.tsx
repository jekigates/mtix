import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import { User } from "@/types";
import {
    LogIn,
    Menu,
    Package2,
    UserRound,
    CreditCard,
    Info,
    Tag,
    CircleHelp,
    Lock,
    UsersRound,
    Phone,
    Clapperboard,
    Theater,
    Megaphone,
    Gift,
    Bell,
    Gem,
    History,
    Layers,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { usePage } from "@inertiajs/react";

export default function TopBar({ user }: PropsWithChildren<{ user?: User }>) {
    const { url, component } = usePage();

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href={route("home")}
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">AJMP Kalbar</span>
                </Link>
                <Link
                    href={route("home")}
                    className={`flex items-center gap-2 transition-colors hover:text-foreground ${
                        url === "/"
                            ? "text-foreground"
                            : "text-muted-foreground"
                    }`}
                >
                    <Clapperboard className="h-4 w-4" />
                    Now Playing
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                    <Theater className="h-4 w-4" />
                    Theaters
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                    <Megaphone className="h-4 w-4" />
                    Up Coming
                </Link>
                <Link
                    href="#"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Playing In - Jakarta {">"}
                </Link>
            </nav>
            <Sheet>
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
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Package2 className="h-6 w-6" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <Link
                            href={route("home")}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Now Playing
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Theaters
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Up Coming
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Playing In - Jakarta {">"}
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex flex-1 items-center justify-end gap-4 md:gap-2 lg:gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="outline">About Us</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
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
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Link
                                    href={route("profile.edit")}
                                    className="flex items-center"
                                >
                                    <UserRound className="mr-2 h-4 w-4" />
                                    <span>{user.name}</span>
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Link href="#">
                                    <span>Balance : Rp 0</span>
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem>
                                <Link href="#" className="flex items-center">
                                    <Gift className="mr-2 h-4 w-4" />
                                    <span>My Voucher</span>
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Link href="#" className="flex items-center">
                                    <Gem className="mr-2 h-4 w-4" />
                                    <span>Partner Loyalty Rewards</span>
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Link href="#" className="flex items-center">
                                    <Bell className="mr-2 h-4 w-4" />
                                    <span>Inbox</span>
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Link href="#" className="flex items-center">
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    <span>Top Up M-Tix</span>
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Link href="#" className="flex items-center">
                                    <History className="mr-2 h-4 w-4" />
                                    <span>Purchase History</span>
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Link href="#" className="flex items-center">
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
                                <Link href="#" className="flex items-center">
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    <span>Top Up M-Tix</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </header>
    );
}
