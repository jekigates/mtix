import { Link } from "@inertiajs/react"
import { PropsWithChildren } from "react"

import { Icons } from "@/Components/Icons"

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-muted/40">
            <div>
                <Link href="/">
                    <Icons.logo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-background shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    )
}
