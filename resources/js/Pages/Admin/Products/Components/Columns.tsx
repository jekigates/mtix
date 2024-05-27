import { ColumnDef } from "@tanstack/react-table"

import { DataTableRowActions } from "./DataTableViewOptions"
import { Badge } from "@/Components/ui/badge"
import { Checkbox } from "@/Components/ui/checkbox"
import { DataTableColumnHeader } from "@/Components/ui/data-table-column-header"

export const columns: ColumnDef<App.Data.ProductData>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex">
                    <span className="max-w-[200px] truncate">
                        {row.getValue("name")}
                    </span>
                </div>
            )
        },
    },
    {
        id: "category",
        accessorKey: "category.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex">
                    <span className="max-w-[100px] truncate">
                        {row.getValue("category")}
                    </span>
                </div>
            )
        },
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
