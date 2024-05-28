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

interface DataTableRowActionsProps<TData> {
    row: Row<TData> | any
}

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const { id } = row.original

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
                    onClick={() => router.visit(route("admin.infos.show", id))}
                >
                    Show
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => router.visit(route("admin.infos.edit", id))}
                >
                    Edit
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() =>
                        router.delete(route("admin.infos.destroy", id))
                    }
                >
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
