import { cn } from "@/lib/utils";
import React from "react";

const InputDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    return (
        <p
            className={cn("text-[0.8rem] text-muted-foreground", className)}
            ref={ref}
            {...props}
        />
    );
});
InputDescription.displayName = "InputDescription";

export { InputDescription };
