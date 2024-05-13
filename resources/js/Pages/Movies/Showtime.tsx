import { Head, Link } from "@inertiajs/react"
import { Clock3, MapPin, Utensils } from "lucide-react"

import { cn } from "@/lib/utils"

import { formatDate, formatRupiah, formatTime } from "@/Common/helpers"
import { Button, buttonVariants } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Separator } from "@/Components/ui/separator"
import MainLayout from "@/Layouts/MainLayout"
import { PageProps } from "@/types"

export default function Show({ auth, movie, theater }: PageProps) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Movie Showtimes" />

            <div className="mx-auto lg:max-w-4xl px-4 py-6 lg:px-8">
                {theater && (
                    <>
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

                        <div className="mt-4 flex gap-8">
                            <Link
                                href=""
                                className={cn(
                                    buttonVariants({
                                        variant: "transparent",
                                        size: "fit",
                                    })
                                )}
                            >
                                <MapPin className="mr-2 h-4 w-4" />
                                Location
                            </Link>

                            <Link
                                href=""
                                className={cn(
                                    buttonVariants({
                                        variant: "transparent",
                                        size: "fit",
                                    })
                                )}
                            >
                                <Utensils className="mr-2 h-4 w-4" />
                                Food & Beverage
                            </Link>
                        </div>

                        <Separator className="my-4" />
                    </>
                )}

                <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                        <img
                            src={movie.image}
                            alt={movie.title}
                            className="object-cover object-center"
                        />
                    </div>

                    <div className="sm:col-span-8 lg:col-span-7">
                        <h2 className="text-2xl font-bold">{movie.title}</h2>

                        <section
                            aria-labelledby="information-heading"
                            className="mt-2"
                        >
                            <h3 id="information-heading" className="sr-only">
                                Movie information
                            </h3>

                            <div>
                                <h4 className="sr-only">Runtime</h4>

                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        <Clock3 className="h-4 w-4 flex-shrink-0" />
                                    </div>

                                    <p className="ml-2 text-sm font-medium">
                                        {movie.runtime} Minutes
                                    </p>
                                </div>
                            </div>

                            <div className="space-x-1 mt-6">
                                <Button
                                    size={"xs"}
                                    variant={"outline"}
                                    className="cursor-not-allowed text-primary"
                                >
                                    {movie.type}
                                </Button>

                                <Button
                                    size={"xs"}
                                    variant={"outline"}
                                    className="cursor-not-allowed text-primary"
                                >
                                    {movie.minimum_age === 0
                                        ? "SU"
                                        : movie.minimum_age + "+"}
                                </Button>
                            </div>
                        </section>

                        <ScrollArea className="h-72 rounded-md border mt-10">
                            <div className="p-4 grid gap-6">
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold leading-none">
                                        Description
                                    </h4>

                                    <div className="text-sm font-normal leading-snug text-muted-foreground">
                                        {movie.description}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold leading-none">
                                        Producer
                                    </h4>

                                    <div className="text-sm font-normal leading-snug text-muted-foreground">
                                        {movie.producer}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold leading-none">
                                        Director
                                    </h4>

                                    <div className="text-sm font-normal leading-snug text-muted-foreground">
                                        {movie.director}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold leading-none">
                                        Writer
                                    </h4>

                                    <div className="text-sm font-normal leading-snug text-muted-foreground">
                                        {movie.writer}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold leading-none">
                                        Cast
                                    </h4>

                                    <div className="text-sm font-normal leading-snug text-muted-foreground">
                                        {movie.cast}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold leading-none">
                                        Distributor
                                    </h4>

                                    <div className="text-sm font-normal leading-snug text-muted-foreground">
                                        {movie.distributor}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold leading-none">
                                        Website
                                    </h4>

                                    <div className="text-sm font-normal leading-snug text-muted-foreground">
                                        {movie.website}
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-4">
                    {movie.theater_movies?.map((theater_movie) => (
                        <Card key={theater_movie.id}>
                            <CardHeader>
                                {!theater && (
                                    <div className="flex flex-row items-center justify-between">
                                        <CardTitle className="text-sm font-medium">
                                            {
                                                theater_movie.theater?.location
                                                    ?.name
                                            }{" "}
                                            {theater_movie.theater?.brand?.name}
                                        </CardTitle>

                                        <Link
                                            href=""
                                            className={cn(
                                                buttonVariants({
                                                    variant: "transparent",
                                                    size: "fit",
                                                })
                                            )}
                                        >
                                            <Utensils className="mr-2 h-4 w-4" />
                                            F&B
                                        </Link>
                                    </div>
                                )}

                                <div
                                    className={cn(
                                        "flex flex-row items-center justify-between ",
                                        theater
                                            ? "text-sm font-medium"
                                            : "text-xs text-muted-foreground"
                                    )}
                                >
                                    <p>
                                        {theater_movie.showtimes?.[0]?.start_at
                                            ? formatDate(
                                                  theater_movie.showtimes[0]
                                                      .start_at
                                              )
                                            : "No start date"}
                                    </p>
                                    <p>{formatRupiah(theater_movie.price)}</p>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="flex gap-1 flex-wrap">
                                    {theater_movie.showtimes?.map(
                                        (showtime) => (
                                            <Button
                                                key={showtime.id}
                                                size={"sm"}
                                                variant={"outline"}
                                                className="cursor-not-allowed text-primary"
                                            >
                                                {formatTime(showtime.start_at)}
                                            </Button>
                                        )
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}
