import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface MovieCardProps extends React.HTMLAttributes<HTMLDivElement> {
    movie: App.Data.MovieData;
}

export function MovieCard({ movie, className, ...props }: MovieCardProps) {
    return (
        <div
            className={cn("group relative space-y-3 text-center", className)}
            {...props}
        >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 h-72">
                <img
                    src={movie.image}
                    alt={movie.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>

            <div className="space-y-1 text-sm">
                <h3 className="font-medium leading-none min-h-12">
                    {movie.title}
                </h3>

                <div className="space-x-1">
                    {movie.genres?.map((genre) => (
                        <Button
                            size={"xs"}
                            variant={"outline"}
                            className="cursor-not-allowed text-primary"
                        >
                            {genre.name}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}
