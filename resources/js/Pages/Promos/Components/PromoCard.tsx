import { InertiaLinkProps, Link } from "@inertiajs/react"

import { cn } from "@/lib/utils"

import { formatDate } from "@/utils"

export function PromoCard({
    promo,
    className,
    ...props
}: InertiaLinkProps & { promo: App.Data.PromoData }) {
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
    )
}
