import { Head } from "@inertiajs/react"

import { ProductCard } from "./Components/ProductCard"
import { ScrollArea, ScrollBar } from "@/Components/ui/scroll-area"
import { Separator } from "@/Components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import MainLayout from "@/Layouts/MainLayout"
import { PageProps } from "@/types"

export default function Product({ auth, theater }: PageProps) {
    const categories: any = Object.values(
        theater.theater_products?.reduce((acc: any, curr) => {
            if (curr.product && curr.product?.category) {
                const category_id = curr.product.category_id
                const product_id = curr.product_id
                const product_name = curr.product.name
                const product_price = curr.product.price
                const product_image = curr.product.image
                const stock = curr.stock

                if (!acc[category_id]) {
                    acc[category_id] = {
                        id: category_id,
                        name: curr.product.category.name,
                        products: {},
                    }
                }

                if (!acc[category_id].products[product_id]) {
                    acc[category_id].products[product_id] = {
                        id: product_id,
                        name: product_name,
                        price: product_price,
                        image: product_image,
                        product_variants: {},
                    }
                }

                if (curr.product_variant) {
                    const product_variant_id = curr.product_variant.id
                    const product_variant_name = curr.product_variant.name
                    const product_variant_price = curr.product_variant.price

                    acc[category_id].products[product_id].product_variants[
                        product_variant_id
                    ] = {
                        id: product_variant_id,
                        name: product_variant_name,
                        stock: stock,
                        price: product_variant_price,
                    }
                } else {
                    acc[category_id].products[product_id].stock = stock
                }
            }

            return acc
        }, {})
    )

    return (
        <MainLayout user={auth.user}>
            <Head title="Theater Products" />

            <div className="mx-auto lg:max-w-4xl px-4 py-6 lg:px-8">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        {theater.location?.name} {theater.brand?.name}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        {theater.location?.address}
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Telepon : {theater.location?.contact}
                    </p>
                </div>

                <Separator className="my-4" />

                <Tabs defaultValue={categories[0].id}>
                    <div className="relative">
                        <ScrollArea>
                            <div className="w-full relative h-10">
                                <TabsList className="flex absolute h-10">
                                    {categories.map((category: any) => (
                                        <TabsTrigger
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>

                    {categories.map((category: any) => (
                        <TabsContent key={category.id} value={category.id}>
                            {Object.values(category.products).map(
                                (product: any) => (
                                    <ProductCard
                                        product={product}
                                        key={product.id}
                                    />
                                )
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </MainLayout>
    )
}