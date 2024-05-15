import { Fragment } from "react/jsx-runtime"

import { formatRupiah } from "@/Common/helpers"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Separator } from "@/Components/ui/separator"

export function ProductCard({
    product,
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & {
    product: any
}) {
    return (
        <div key={product.id}>
            <div className="grid w-full items-start gap-x-6 gap-y-8 grid-cols-12 lg:gap-x-8">
                <a
                    href={product.image}
                    className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 col-span-3"
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover object-center"
                    />
                </a>

                <div className="col-span-9 space-y-4">
                    {Object.values(product.product_variants).length > 0 ? (
                        Object.values(product.product_variants).map(
                            (product_variant: any) => (
                                <Card key={product_variant.id}>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {product.name} (
                                            {product_variant.name[0]})
                                        </CardTitle>

                                        <p>
                                            {product_variant.price
                                                ? formatRupiah(
                                                      product_variant.price
                                                  )
                                                : formatRupiah(product.price)}
                                        </p>
                                    </CardHeader>

                                    <CardContent className="text-xs text-muted-foreground">
                                        <p>
                                            {product.name}{" "}
                                            {product_variant.name}
                                        </p>
                                    </CardContent>
                                </Card>
                            )
                        )
                    ) : (
                        <div className="flex justify-between">
                            <div>
                                <h3 className="font-medium leading-none">
                                    {product.name}
                                </h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {product.name}
                                </p>
                            </div>
                            <p className="text-sm font-medium">
                                {formatRupiah(product.price)}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <Separator className="my-4" />
        </div>
        // <div
        //     className={cn("group relative space-y-3 text-center", className)}
        //     {...props}
        // >
        //     <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 h-72">
        //         <img
        //             src={movie.image}
        //             alt={movie.title}
        //             className="h-full w-full object-cover object-center"
        //         />
        //     </div>

        //     <div className="space-y-1 text-sm">
        //         <h3 className="font-medium leading-none min-h-12">
        //             {movie.title}
        //         </h3>

        //         <div className="space-x-1">
        //             <Button
        //                 size={"xs"}
        //                 variant={"outline"}
        //                 className="cursor-not-allowed text-primary"
        //             >
        //                 {movie.type}
        //             </Button>

        //             <Button
        //                 size={"xs"}
        //                 variant={"outline"}
        //                 className="cursor-not-allowed text-primary"
        //             >
        //                 {movie.minimum_age === 0
        //                     ? "SU"
        //                     : movie.minimum_age + "+"}
        //             </Button>
        //         </div>
        //     </div>
        // </div>
    )
}
