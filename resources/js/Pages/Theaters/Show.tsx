import { Head, Link } from "@inertiajs/react"
import { Clock3, MapPin, Utensils } from "lucide-react"
import { Fragment } from "react/jsx-runtime"

import { cn } from "@/lib/utils"

import MainContent from "@/Components/MainContent"
import { Button, buttonVariants } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { Separator } from "@/Components/ui/separator"
import MainLayout from "@/Layouts/MainLayout"
import { PageProps } from "@/types"
import { formatDate, formatRupiah, formatTime } from "@/utils"

export default function Show({ auth, theater }: PageProps) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Theater Detail" />

            <MainContent>
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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="link" size="fit">
                                <MapPin className="mr-2 h-4 w-4" />
                                Location
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-4xl">
                            <DialogHeader>
                                <DialogTitle>Location Map</DialogTitle>

                                <DialogDescription>
                                    This is the map of the location. You can use
                                    it to get directions.
                                </DialogDescription>
                            </DialogHeader>

                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3184468390505!2d106.65155647453119!3d-6.221673660934562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fbbff86ad0c5%3A0x7637aedafd55dea8!2sMall%20%40%20Alam%20Sutera!5e0!3m2!1sid!2sid!4v1715597703692!5m2!1sid!2sid"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full"
                                height={400}
                            ></iframe>
                        </DialogContent>
                    </Dialog>

                    <Link
                        href={route("theaters.products.index", theater.id)}
                        className={cn(
                            buttonVariants({
                                variant: "link",
                                size: "fit",
                            })
                        )}
                    >
                        <Utensils className="mr-2 h-4 w-4" />
                        Food & Beverage
                    </Link>
                </div>

                <Separator className="my-4" />

                {theater.theater_movies?.map((theater_movie) => (
                    <Fragment key={theater_movie.id}>
                        <div className="grid w-full items-start gap-x-6 gap-y-8 grid-cols-12 lg:gap-x-8">
                            <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 col-span-3">
                                <img
                                    src={theater_movie.movie?.image}
                                    alt={theater_movie.movie?.title}
                                    className="object-cover object-center"
                                />
                            </div>

                            <div className="col-span-9">
                                <h3 className="font-medium leading-none">
                                    {theater_movie.movie?.title}
                                </h3>

                                <div className="space-x-1 mt-2">
                                    <Button
                                        size={"xs"}
                                        variant={"outline"}
                                        className="cursor-not-allowed text-primary"
                                    >
                                        {theater_movie.movie?.type}
                                    </Button>

                                    <Button
                                        size={"xs"}
                                        variant={"outline"}
                                        className="cursor-not-allowed text-primary"
                                    >
                                        {theater_movie.movie?.minimum_age === 0
                                            ? "SU"
                                            : theater_movie.movie?.minimum_age +
                                              "+"}
                                    </Button>
                                </div>

                                <section
                                    aria-labelledby="information-heading"
                                    className="mt-2"
                                >
                                    <h3
                                        id="information-heading"
                                        className="sr-only"
                                    >
                                        Movie information
                                    </h3>

                                    <div>
                                        <h4 className="sr-only">Runtime</h4>

                                        <div className="flex items-center text-muted-foreground">
                                            <div className="flex items-center">
                                                <Clock3 className="h-4 w-4 flex-shrink-0" />
                                            </div>

                                            <p className="ml-2 text-sm font-medium">
                                                {theater_movie.movie?.runtime}{" "}
                                                Minutes
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        <Card className="mt-4">
                            <CardHeader>
                                <div className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-sm font-medium">
                                        {theater_movie.showtimes?.[0]?.start_at
                                            ? formatDate(
                                                  theater_movie.showtimes[0]
                                                      .start_at
                                              )
                                            : "No start date"}
                                    </CardTitle>

                                    <p className="text-sm font-medium">
                                        {formatRupiah(theater_movie.price)}
                                    </p>
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

                        <Separator className="my-4" />
                    </Fragment>
                ))}
            </MainContent>
        </MainLayout>
    )
}
