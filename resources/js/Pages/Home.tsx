import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import MainLayout from "@/Layouts/MainLayout";
import { Separator } from "@/Components/ui/separator";
import { MovieCard } from "@/Components/MovieCard";
import {
    Carousel,
    CarouselContent,
    CarouselDots,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Home({ auth, promos, movies }: PageProps) {
    return (
        <>
            <MainLayout user={auth.user}>
                <Head title="Home" />

                <div className="mx-auto lg:max-w-4xl px-4 py-6 lg:px-8">
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
                            {promos.map((promo) => (
                                <CarouselItem key={promo.id}>
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 h-40 md:h-56">
                                        <img
                                            src={promo.banner_image}
                                            alt={promo.name}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
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
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            </MainLayout>
        </>
    );
}
