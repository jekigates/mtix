import { cn } from "@/lib/utils";
import React from "react";

const InputMessage = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    return (
        <p
            ref={ref}
            className={cn(
                "text-[0.8rem] font-medium text-destructive",
                className
            )}
            {...props}
        />
    );
});
InputMessage.displayName = "InputMessage";

export { InputMessage };
