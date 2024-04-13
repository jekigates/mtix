import { Icons } from "@/Components/Icons";
import { Button } from "./ui/button";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Link, router } from "@inertiajs/react";

export function MobileNav() {
    const [open, setOpen] = useState(false);

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
            <SheetContent side="left" className="pr-0">
                <Link
                    href={route("dashboard")}
                    onClick={() => {
                        router.visit(route("dashboard"));
                        setOpen(false);
                    }}
                    className="flex items-center"
                >
                    <Icons.logo className="mr-2 h-4 w-4" />
                    <span className="font-bold">CinemaXXI</span>
                </Link>

                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                    <div className="flex flex-col space-y-3">
                        <Link
                            href={route("dashboard")}
                            onClick={() => {
                                router.visit(route("dashboard"));
                                setOpen(false);
                            }}
                            className="flex items-center"
                        >
                            Now Playing
                        </Link>

                        <Link
                            href="#"
                            onClick={() => {
                                setOpen(false);
                            }}
                            className="flex items-center"
                        >
                            Theaters
                        </Link>

                        <Link
                            href="#"
                            onClick={() => {
                                setOpen(false);
                            }}
                            className="flex items-center"
                        >
                            Up Coming
                        </Link>

                        <Link
                            href="#"
                            onClick={() => {
                                setOpen(false);
                            }}
                            className="flex items-center"
                        >
                            Playing In - Jakarta{" >"}
                        </Link>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
