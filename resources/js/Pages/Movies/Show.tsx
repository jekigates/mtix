import { PageProps } from "@/types";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import { Separator } from "@/Components/ui/separator";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { Clock3 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { ScrollArea } from "@/Components/ui/scroll-area";

export default function Index({ auth, movie }: PageProps) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Movie Show" />

            <div className="mx-auto lg:max-w-4xl px-4 py-6 lg:px-8">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage
                                src={
                                    "../img/ages/" + movie.minimum_age + ".png"
                                }
                            />
                        </Avatar>

                        <div className="flex-1 flex items-center justify-between">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-semibold tracking-tight">
                                    {movie.title}
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    {movie.genres
                                        ?.map((genre) => genre.name)
                                        .join(", ")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                        <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="object-cover object-center"
                            />
                        </div>

                        <div className="sm:col-span-8 lg:col-span-7 space-y-4">
                            <section aria-labelledby="information-heading">
                                <h3
                                    id="information-heading"
                                    className="sr-only"
                                >
                                    Movie information
                                </h3>

                                <div>
                                    <h4 className="sr-only">Runtime</h4>
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            <Clock3 className="h-5 w-5 flex-shrink-0" />
                                        </div>
                                        <a
                                            href="#"
                                            className="ml-2 text-sm font-medium"
                                        >
                                            {movie.runtime} Minutes
                                        </a>
                                    </div>
                                </div>
                            </section>

                            <Button
                                size={"xs"}
                                variant={"outline"}
                                className="cursor-not-allowed text-primary"
                            >
                                {movie.type}
                            </Button>

                            <div className="space-x-2">
                                <Button
                                    disabled={
                                        movie.screening_start_date === null
                                            ? true
                                            : false
                                    }
                                >
                                    Playing At
                                </Button>

                                <Button
                                    disabled={
                                        movie.screening_start_date === null
                                            ? true
                                            : false
                                    }
                                >
                                    Buy Ticket
                                </Button>
                                <Button>Trailer</Button>
                            </div>

                            <ScrollArea className="h-72 rounded-md border">
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
                </div>
            </div>
        </MainLayout>
    );
}
