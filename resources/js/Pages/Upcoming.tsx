import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import MainLayout from "@/Layouts/MainLayout";
import { Separator } from "@/Components/ui/separator";
import { MovieCard } from "@/Components/MovieCard";

export default function Upcoming({
    auth,
    movies,
}: PageProps<{
    movies: App.Data.MovieData[];
}>) {
    return (
        <>
            <MainLayout user={auth.user}>
                <Head title="Upcoming" />

                <div className="mx-auto lg:max-w-4xl px-4 py-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                                Coming Soon
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                New releases arriving shortly. Stay tuned!
                            </p>
                        </div>
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
