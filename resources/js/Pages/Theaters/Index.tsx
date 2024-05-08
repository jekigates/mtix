import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";

export default function Index({
    auth,
    selected_city,
    brands,
    cities,
}: PageProps<{
    selected_city: App.Data.CityData;
}>) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Theaters" />

            <div className="mx-auto lg:max-w-4xl px-4 py-6 lg:px-8">
                <h1 className="mb-4">Theaters In City {selected_city.name}</h1>

                <Tabs defaultValue={brands[0].id}>
                    <TabsList className="grid w-full grid-cols-3">
                        {brands.map((brand) => (
                            <TabsTrigger key={brand.id} value={brand.id}>
                                {brand.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {brands.map((brand) => (
                        <TabsContent key={brand.id} value={brand.id}>
                            <p>test</p>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </MainLayout>
    );
}
