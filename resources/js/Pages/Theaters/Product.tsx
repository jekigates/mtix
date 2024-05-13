import { Head } from "@inertiajs/react"

import { ScrollArea, ScrollBar } from "@/Components/ui/scroll-area"
import { Separator } from "@/Components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import MainLayout from "@/Layouts/MainLayout"
import { PageProps } from "@/types"

export default function Product({
    auth,
    theater,
    // product_categories,
}: PageProps) {
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

                {/* <Tabs defaultValue={product_categories[0].id}>
                    <div className="relative">
                        <ScrollArea>
                            <div className="w-full relative h-10">
                                <TabsList className="flex absolute h-10">
                                    {product_categories.map(
                                        (product_category) => (
                                            <TabsTrigger
                                                key={product_category.id}
                                                value={product_category.id}
                                            >
                                                {product_category.name}
                                            </TabsTrigger>
                                        )
                                    )}
                                </TabsList>
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>

                    {product_categories.map((product_category) => (
                        <TabsContent
                            key={product_category.id}
                            value={product_category.id}
                        >
                            <p>hai</p>
                        </TabsContent>
                    ))}
                </Tabs> */}
            </div>
        </MainLayout>
    )
}
