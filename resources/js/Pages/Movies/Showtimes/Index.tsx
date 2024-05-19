import { Head, Link, router } from "@inertiajs/react"
import { Clock3, MapPin, Utensils } from "lucide-react"
import { useState } from "react"

import { cn } from "@/lib/utils"

import { formatDate, formatRupiah, formatTime } from "@/Common/helpers"
import { Button, buttonVariants } from "@/Components/ui/button"
import { Card, CardContent, CardHeader } from "@/Components/ui/card"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { Label } from "@/Components/ui/label"
import { ScrollArea } from "@/Components/ui/scroll-area"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"
import { Separator } from "@/Components/ui/separator"
import MainLayout from "@/Layouts/MainLayout"
import { PageProps } from "@/types"

export default function Index({ auth, movie, theater }: PageProps) {
    const [qty, setQty] = useState(1)

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
                                            This is the map of the location. You
                                            can use it to get directions.
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
                                href={route(
                                    "theaters.products.index",
                                    theater.id
                                )}
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
                                        <Link
                                            href={route(
                                                "theaters.show",
                                                theater_movie.theater?.id
                                            )}
                                            className={cn(
                                                buttonVariants({
                                                    variant: "link",
                                                    size: "fit",
                                                }),
                                                "text-foreground"
                                            )}
                                        >
                                            {
                                                theater_movie.theater?.location
                                                    ?.name
                                            }{" "}
                                            {theater_movie.theater?.brand?.name}
                                        </Link>

                                        <Link
                                            href={route(
                                                "theaters.products.index",
                                                theater_movie.theater_id
                                            )}
                                            className={cn(
                                                buttonVariants({
                                                    variant: "link",
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
                                            <Dialog key={showtime.id}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        size={"sm"}
                                                        variant={"outline"}
                                                        className="text-primary"
                                                    >
                                                        {formatTime(
                                                            showtime.start_at
                                                        )}
                                                    </Button>
                                                </DialogTrigger>

                                                <DialogContent className="sm:max-w-md">
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Select Tickets
                                                        </DialogTitle>

                                                        <DialogDescription>
                                                            Please select the
                                                            number of tickets
                                                            you want to
                                                            purchase. Click save
                                                            when you're done.
                                                        </DialogDescription>
                                                    </DialogHeader>

                                                    <div className="grid gap-4">
                                                        <div className="grid gap-2">
                                                            <Label htmlFor="qty">
                                                                Ticket Quantity
                                                            </Label>

                                                            <Select
                                                                onValueChange={(
                                                                    e
                                                                ) => {
                                                                    setQty(
                                                                        parseInt(
                                                                            e
                                                                        )
                                                                    )
                                                                }}
                                                                value={qty.toString()}
                                                            >
                                                                <SelectTrigger id="qty">
                                                                    <SelectValue placeholder="Select number of tickets" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        {[
                                                                            ...Array(
                                                                                8
                                                                            ),
                                                                        ].map(
                                                                            (
                                                                                _,
                                                                                i
                                                                            ) => (
                                                                                <SelectItem
                                                                                    value={(
                                                                                        i +
                                                                                        1
                                                                                    ).toString()}
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                >
                                                                                    {i +
                                                                                        1}
                                                                                </SelectItem>
                                                                            )
                                                                        )}
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>

                                                    <DialogFooter className="sm:justify-start">
                                                        <Button
                                                            onClick={() => {
                                                                router.visit(
                                                                    route(
                                                                        "transactions.create",
                                                                        {
                                                                            movie: movie.id,
                                                                            showtime:
                                                                                movie
                                                                                    .theater_movies?.[0]
                                                                                    ?.showtimes?.[0]
                                                                                    .id,
                                                                            qty: qty,
                                                                        }
                                                                    )
                                                                )
                                                            }}
                                                        >
                                                            Continue
                                                        </Button>

                                                        <DialogClose asChild>
                                                            <Button
                                                                type="button"
                                                                variant="secondary"
                                                            >
                                                                Close
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
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
