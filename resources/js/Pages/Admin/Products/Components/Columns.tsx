import { ColumnDef } from "@tanstack/react-table"

import { DataTableRowActions } from "./DataTableViewOptions"
import { Badge } from "@/Components/ui/badge"
import { DataTableColumnHeader } from "@/Components/ui/data-table-column-header"

export const columns: ColumnDef<App.Data.ProductData>[] = [
    {
        id: "image",
        cell: ({ row }) => (
            <div className="w-16 h-16">
                <img
                    alt="Promo image"
                    className="aspect-square rounded-md object-cover w-full h-full"
                    src={row.original.image}
                />
            </div>
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => (
            <div className="flex">
                <span className="max-w-[500px] truncate font-medium">
                    {row.getValue("name")}
                </span>
            </div>
        ),
    },
    {
        id: "category",
        accessorKey: "category.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ row }) => (
            <div className="flex">
                <span className="max-w-[100px] truncate">
                    {row.getValue("category")}
                </span>
            </div>
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const variant =
                row.getValue("status") === "active"
                    ? "default"
                    : row.getValue("status") === "draft"
                      ? "secondary"
                      : "outline"

            return <Badge variant={variant}>{row.getValue("status")}</Badge>
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created At" />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]
