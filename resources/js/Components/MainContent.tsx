import { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

export default function MainContent({
    children,
    maxWidth = "max-w-4xl",
    className = "",
}: PropsWithChildren<{ maxWidth?: string; className?: string }>) {
    return (
        <div
            className={cn(
                `mx-auto ${maxWidth} w-full px-4 py-6 lg:px-8`,
                className
            )}
        >
            {children}
        </div>
    )
}
