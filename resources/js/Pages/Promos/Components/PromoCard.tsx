import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { InertiaLinkProps, Link } from "@inertiajs/react";

export function PromoCard({
    promo,
    className,
    ...props
}: InertiaLinkProps & { promo: App.Data.PromoData }) {
    function formatDate(dateString: string) {
        const date = new Date(dateString);
        return `${date.getDate()} ${date.toLocaleString("default", {
            month: "long",
        })} ${date.getFullYear()}`;
    }

    return (
        <Link className={cn("group relative space-y-3", className)} {...props}>
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 h-72">
                <img
                    src={promo.image}
                    alt={promo.name}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="space-y-1 text-sm">
                <p className="text-xs text-green-400 font-semibold">
                    Valid until {formatDate(promo.valid_end_date)}
                </p>
                <h3 className="font-medium leading-none min-h-12">
                    {promo.name}
                </h3>
            </div>
        </Link>
    );
}
