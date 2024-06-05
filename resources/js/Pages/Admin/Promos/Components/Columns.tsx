import { ColumnDef } from "@tanstack/react-table"

import { DataTableRowActions } from "./DataTableViewOptions"
import { DataTableColumnHeader } from "@/Components/ui/data-table-column-header"
import { formatRupiah } from "@/utils"

export const columns: ColumnDef<App.Data.PromoData>[] = [
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
            <DataTableColumnHeader
                column={column}
                title="Name"
                className="font-medium"
            />
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
        accessorKey: "discount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Discount" />
        ),
        cell: ({ row }) => (
            <div className="flex">
                <span className="max-w-[100px] truncate">
                    {formatRupiah(row.getValue("discount"))}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "valid_start_date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Valid Start Date" />
        ),
    },
    {
        accessorKey: "valid_end_date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Valid End Date" />
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
