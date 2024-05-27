import { Head } from "@inertiajs/react"
import { ChevronLeft } from "lucide-react"

import { ProductCard } from "./Components/ProductCard"
import MainContent from "@/Components/MainContent"
import { Button } from "@/Components/ui/button"
import { ScrollArea, ScrollBar } from "@/Components/ui/scroll-area"
import { Separator } from "@/Components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import MainLayout from "@/Layouts/MainLayout"
import { PageProps } from "@/types"

export default function Index({ auth, theater }: PageProps) {
    const categories: any = Object.values(
        theater.theater_products?.reduce((acc: any, curr) => {
            if (curr.product && curr.product?.category) {
                const category_id = curr.product.category_id
                const product_id = curr.product_id
                const product_name = curr.product.name
                const product_description = curr.product.description
                const product_image = curr.product.image

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
                        description: product_description,
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
                        price: product_variant_price,
                    }
                }
            }

            return acc
        }, {})
    )

    return (
        <MainLayout user={auth.user}>
            <Head title="Theater Products" />

            <MainContent>
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Food & Beverage - {theater.location?.name}{" "}
                        {theater.brand?.name}
                    </h2>

                    <Button
                        size="fit"
                        variant="link"
                        onClick={() => {
                            window.history.back()
                        }}
                    >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
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
            </MainContent>
        </MainLayout>
    )
}
