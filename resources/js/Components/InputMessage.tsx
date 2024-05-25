import React from "react"

import { cn } from "@/lib/utils"

const InputMessage = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    return children ? (
        <p
            ref={ref}
            className={cn(
                "text-[0.8rem] font-medium text-destructive",
                className
            )}
            {...props}
        >
            {children}
        </p>
    ) : null
})
InputMessage.displayName = "InputMessage"

export { InputMessage }
