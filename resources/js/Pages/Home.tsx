import { Head, router } from "@inertiajs/react"
import Autoplay from "embla-carousel-autoplay"

import MainContent from "@/Components/MainContent"
import { MovieCard } from "@/Components/MovieCard"
import {
    Carousel,
    CarouselContent,
    CarouselDots,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel"
import { Separator } from "@/Components/ui/separator"
import MainLayout from "@/Layouts/MainLayout"
import { PageProps } from "@/types"

export default function Home({ auth, banners, movies }: PageProps) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Home" />

            <MainContent>
                <Carousel
                    className="w-full"
                    plugins={[
                        Autoplay({
                            delay: 3000,
                        }),
                    ]}
                    opts={{ loop: true }}
                >
                    <CarouselContent>
                        {banners.map((banner, index) => (
                            <CarouselItem
                                key={banner.id}
                                onClick={() => {
                                    router.visit(
                                        route("banners.show", banner.id)
                                    )
                                }}
                            >
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 h-40 md:h-56">
                                    <img
                                        src={banner.image}
                                        alt={`Banner ${index + 1}`}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                        {/* {infos.map((info) => (
                            <CarouselItem
                                key={info.id}
                                onClick={() => {
                                    router.visit(route("infos.show", info.id))
                                }}
                            >
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 h-40 md:h-56">
                                    <img
                                        src={info.image}
                                        alt={info.title}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                            </CarouselItem>
                        ))}

                        {promos.map((promo) => (
                            <CarouselItem
                                key={promo.id}
                                onClick={() => {
                                    router.visit(route("promos.show", promo.id))
                                }}
                            >
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 h-40 md:h-56">
                                    <img
                                        src={promo.banner_image}
                                        alt={promo.name}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                            </CarouselItem>
                        ))} */}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                    <CarouselDots className="absolute bottom-4 left-1/2 -translate-x-1/2" />
                </Carousel>

                <div className="mt-6 space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Watch Now
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Top picks for you. Updated daily.
                    </p>
                </div>

                <Separator className="my-4" />

                <div className="mt-6 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 space-x-4">
                    {movies.map((movie) => (
                        <MovieCard
                            href={route("movies.show", movie.id)}
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>
            </MainContent>
        </MainLayout>
    )
}
