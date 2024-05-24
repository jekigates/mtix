import { Link } from "@inertiajs/react"
import { ColumnDef } from "@tanstack/react-table"

import { formatRupiah } from "@/Common/helpers"
import { buttonVariants } from "@/Components/ui/button"
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
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("price"))
            const formatted = formatRupiah(price)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        id: "category",
        accessorKey: "category.name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category" />
        ),
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
        cell: ({ row }) => {
            return (
                <Link href="#" className={buttonVariants()}>
                    Edit
                </Link>
            )
        },
    },
]
