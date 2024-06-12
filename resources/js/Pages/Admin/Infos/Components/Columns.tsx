import { ColumnDef } from "@tanstack/react-table"

import { DataTableRowActions } from "./DataTableViewOptions"
import { DataTableColumnHeader } from "@/Components/ui/data-table-column-header"

export const columns: ColumnDef<App.Data.InfoData>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Title"
                className="font-medium"
            />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("title")}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "description",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Description"
                className="font-medium"
            />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex">
                    <span className="max-w-[320px] truncate font-medium">
                        {row.getValue("description")}
                    </span>
                </div>
            )
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
