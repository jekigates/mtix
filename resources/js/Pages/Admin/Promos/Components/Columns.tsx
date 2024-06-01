import { ColumnDef } from "@tanstack/react-table"

import { DataTableRowActions } from "./DataTableViewOptions"
import { Checkbox } from "@/Components/ui/checkbox"
import { DataTableColumnHeader } from "@/Components/ui/data-table-column-header"
import { formatRupiah } from "@/utils"

export const columns: ColumnDef<App.Data.PromoData>[] = [
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
            <DataTableColumnHeader
                column={column}
                title="Name"
                className="font-medium"
            />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex">
                    <span className="max-w-[500px] truncate font-medium">
                        {row.getValue("name")}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "discount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Discount" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex">
                    <span className="max-w-[100px] truncate">
                        {formatRupiah(row.getValue("discount"))}
                    </span>
                </div>
            )
        },
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
