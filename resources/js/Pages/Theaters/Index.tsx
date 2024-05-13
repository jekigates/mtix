import { Head, Link } from "@inertiajs/react"
import { ChevronDown } from "lucide-react"

import { buttonVariants } from "@/Components/ui/button"
import { Separator } from "@/Components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import MainLayout from "@/Layouts/MainLayout"
import { PageProps } from "@/types"

export default function Index({ auth, city, brands, movie }: PageProps) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Theaters" />

            <div className="mx-auto lg:max-w-4xl px-4 py-6 lg:px-8">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-1">
                        Theaters in {movie?.title}
                        <Link
                            href={route("cities.index")}
                            className="text-primary flex items-center gap-1"
                        >
                            {city.name}
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </Link>
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Discover theaters playing your favorite movies near you.
                    </p>
                </div>

                <Separator className="my-4" />

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
                            <div className="flex flex-col gap-2">
                                {city.theaters?.map(
                                    (theater) =>
                                        theater.brand_id === brand.id && (
                                            <Link
                                                key={theater.id}
                                                href={
                                                    movie
                                                        ? route(
                                                              "movies.showtimes",
                                                              {
                                                                  id: movie.id,
                                                                  theater_id:
                                                                      theater.id,
                                                              }
                                                          )
                                                        : route(
                                                              "theaters.show",
                                                              theater.id
                                                          )
                                                }
                                                className={buttonVariants({
                                                    variant: "outline",
                                                })}
                                            >
                                                <div className="w-full font-semibold">
                                                    {theater.location?.name}{" "}
                                                    {brand.name}
                                                </div>
                                            </Link>
                                        )
                                )}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </MainLayout>
    )
}
