import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { usePage } from "@inertiajs/react";
import { Icons } from "./Icons";

export function MainNav() {
    const { url } = usePage();

    return (
        <div className="mr-4 hidden md:flex">
            <Link
                href={route("dashboard")}
                className="mr-6 flex items-center space-x-2"
            >
                <Icons.logo className="h-6 w-6" />
                <span className="hidden font-bold sm:inline-block">
                    CinemaXXI
                </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm lg:gap-6">
                <Link
                    href={route("dashboard")}
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        url === "/" ? "text-foreground" : "text-foreground/60"
                    )}
                >
                    Now Playing
                </Link>
                <Link
                    href="#"
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                    Theaters
                </Link>
                <Link
                    href="#"
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                    Up Coming
                </Link>
                <Link
                    href="#"
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                    Playing In - Jakarta{" >"}
                </Link>
            </nav>
        </div>
    );
}
