import { ColumnDef } from "@tanstack/react-table"

import { DataTableRowActions } from "./DataTableViewOptions"
import { DataTableColumnHeader } from "@/Components/ui/data-table-column-header"

export const columns: ColumnDef<App.Data.LocationData>[] = [
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
        id: "province",
        accessorKey: "city.province.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Province" />
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        id: "city",
        accessorKey: "city.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="City" />
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "user.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="User" />
        ),
    },
    {
        accessorKey: "contact",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Contact" />
        ),
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
