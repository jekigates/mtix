import { router } from "@inertiajs/react"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/Components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"

interface DataTableRowActionsProps<
    TData extends { id: string; status: string },
> {
    row: Row<TData>
}

export function DataTableRowActions<
    TData extends {
        id: string
        status: string
        theater_products_count: number
    },
>({ row }: DataTableRowActionsProps<TData>) {
    const { id, status, theater_products_count } = row.original

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <DotsHorizontalIcon className="h-4 w-4" />

                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem
                    onClick={() =>
                        router.visit(route("admin.products.show", id))
                    }
                >
                    Show
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() =>
                        router.visit(route("admin.products.edit", id))
                    }
                >
                    Edit
                </DropdownMenuItem>

                {status === "archived" && theater_products_count === 0 && (
                    <>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={() =>
                                router.delete(
                                    route("admin.products.destroy", id)
                                )
                            }
                        >
                            Delete
                            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
