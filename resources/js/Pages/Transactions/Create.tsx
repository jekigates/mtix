import { Head, router } from "@inertiajs/react"
import { useState } from "react"

import { formatRupiah } from "@/Common/helpers"
import { Alert, AlertDescription } from "@/Components/ui/alert"
import { Button } from "@/Components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Separator } from "@/Components/ui/separator"
import MainLayout from "@/Layouts/MainLayout"
import { PageProps } from "@/types"

export default function Create({
    auth,
    movie,
    showtime,
    qty,
}: PageProps<{
    qty: number
}>) {
    const seats: any = Object.values(
        showtime.studio?.seats?.reduce((acc: any, curr) => {
            const id = curr.id
            const row_code = curr.row_code
            const column_number = curr.column_number

            if (!acc[row_code]) {
                acc[row_code] = {
                    row_code,
                    column_numbers: {},
                }
            }

            acc[row_code].column_numbers[column_number] = {
                id,
                column_number,
            }

            return acc
        }, {})
    )

    const [selectedSeats, setSelectedSeats] = useState<any[]>([])

    return (
        <MainLayout user={auth.user}>
            <Head title="Create Transaction" />

            <div className="px-4 py-6 lg:px-8 text-sm">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <img src="/images/seats/free.png" />
                        Available
                    </div>

                    <div className="flex items-center gap-1 text-muted-foreground">
                        <img src="/images/seats/booking.png" />
                        Your Seats
                    </div>

                    <div className="flex items-center gap-1 text-muted-foreground">
                        <img src="/images/seats/booked.png" />
                        Sold
                    </div>
                </div>

                <Separator className="my-4" />

                <table>
                    <tbody>
                        <tr>
                            <td colSpan={3} className="font-semibold">
                                {movie.title}
                            </td>
                        </tr>

                        <tr>
                            <td className="text-muted-foreground">Seats</td>
                            <td className="text-muted-foreground">:</td>
                            <td className="font-semibold">
                                {selectedSeats.length > 0
                                    ? selectedSeats
                                          .map((selected_seat) => {
                                              const seat =
                                                  showtime.studio?.seats?.find(
                                                      (seat) =>
                                                          seat.id ===
                                                          selected_seat
                                                  )

                                              return `${seat?.row_code}${seat?.column_number}`
                                          })
                                          .sort()
                                          .join(", ")
                                    : "-"}
                            </td>
                        </tr>

                        <tr>
                            <td className="text-muted-foreground">Tickets</td>
                            <td className="text-muted-foreground">:</td>
                            <td className="font-semibold">
                                {selectedSeats.length} / {qty}
                            </td>
                        </tr>

                        <tr>
                            <td className="text-muted-foreground">Cinema</td>
                            <td className="text-muted-foreground">:</td>
                            <td className="font-semibold">
                                {showtime.studio?.theater?.location?.name}{" "}
                                {showtime.studio?.theater?.brand?.name}
                            </td>
                        </tr>

                        <tr>
                            <td className="text-muted-foreground">Studio</td>
                            <td className="text-muted-foreground">:</td>
                            <td className="font-semibold">
                                {showtime.studio?.number}
                            </td>
                        </tr>

                        <tr>
                            <td className="text-muted-foreground">Datetime</td>
                            <td className="text-muted-foreground">:</td>
                            <td className="font-semibold">
                                {showtime.start_at}
                            </td>
                        </tr>

                        <tr>
                            <td className="text-muted-foreground">
                                Total Payment
                            </td>
                            <td className="text-muted-foreground">:</td>
                            <td className="font-semibold">
                                {formatRupiah(
                                    selectedSeats.length *
                                        (showtime.theater_movie?.price ?? 0)
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Separator className="my-4" />

                <ScrollArea>
                    <table
                        align="center"
                        cellSpacing={0}
                        cellPadding={0}
                        border={0}
                    >
                        <tbody>
                            {seats.map((seat: any) => (
                                <tr key={seat.row_code}>
                                    <td
                                        width={10}
                                        align="center"
                                        valign="middle"
                                    >
                                        {seat.row_code}
                                    </td>

                                    {Object.values(seat.column_numbers).map(
                                        (column_number: any, idx) => (
                                            <td
                                                key={column_number.id}
                                                width={25}
                                                align="center"
                                                valign="middle"
                                            >
                                                <Button
                                                    size="fit"
                                                    variant="transparent"
                                                    onClick={() => {
                                                        if (
                                                            selectedSeats.includes(
                                                                column_number.id
                                                            )
                                                        ) {
                                                            setSelectedSeats(
                                                                selectedSeats.filter(
                                                                    (id) =>
                                                                        id !==
                                                                        column_number.id
                                                                )
                                                            )
                                                        } else if (
                                                            selectedSeats.length <
                                                            qty
                                                        ) {
                                                            setSelectedSeats([
                                                                ...selectedSeats,
                                                                column_number.id,
                                                            ])
                                                        }
                                                    }}
                                                >
                                                    {selectedSeats.includes(
                                                        column_number.id
                                                    ) ? (
                                                        <img
                                                            src="/img/seats/booking.png"
                                                            width={20}
                                                            height={20}
                                                            alt="Booked"
                                                        />
                                                    ) : (
                                                        <img
                                                            src="/img/seats/free.png"
                                                            width={20}
                                                            height={20}
                                                            alt="Free"
                                                        />
                                                    )}
                                                </Button>
                                            </td>
                                        )
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ScrollArea>

                <p className="text-center mt-4 font-semibold text-2xl">
                    SCREEN
                </p>

                <Separator className="my-4" />

                <div>
                    <div className="max-w-xs mx-auto space-y-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" className="w-full">
                                    Click here to use Promo!
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Use Promo</DialogTitle>
                                    <DialogDescription>
                                        Untuk dapat menggunakan promo, silahkan
                                        download Aplikasi Cinema 21 Official di
                                        Play Store / App Store atau klik link
                                        ini.
                                    </DialogDescription>
                                </DialogHeader>

                                <DialogFooter className="sm:justify-start">
                                    <DialogClose asChild>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                        >
                                            Close
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <div className="flex items-center space-x-2">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        className="w-full"
                                        disabled={selectedSeats.length != qty}
                                    >
                                        Confirm Order
                                    </Button>
                                </DialogTrigger>

                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Confirm Order</DialogTitle>
                                        <DialogDescription>
                                            Your balance is not sufficient for
                                            this transaction, please Top up your
                                            balance using MTix Virtual Account
                                            or please refer to the Top Up menu
                                        </DialogDescription>
                                    </DialogHeader>

                                    <DialogFooter className="sm:justify-start">
                                        <DialogClose asChild>
                                            <Button
                                                type="button"
                                                variant="secondary"
                                            >
                                                Close
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <Button
                                className="w-full"
                                variant="secondary"
                                onClick={() => {
                                    router.visit(
                                        route("movies.showtimes.index", {
                                            movie: movie.id,
                                            showtime: showtime.id,
                                        })
                                    )
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>

                <Alert variant="info" className="mt-4">
                    <AlertDescription className="text-center">
                        *Sistem tidak akan memungkinkan Anda untuk meninggalkan
                        satu kursi kosong di antara kursi yang sudah dipilih.
                    </AlertDescription>
                </Alert>
            </div>
        </MainLayout>
    )
}
