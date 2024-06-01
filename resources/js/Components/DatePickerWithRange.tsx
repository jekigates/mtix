import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"

import { Button } from "./ui/button"
import { Calendar } from "@/Components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"

interface DatePickerWithRangeProps
    extends React.HTMLAttributes<HTMLDivElement> {
    fromDate: Date
    toDate: Date
    onDateChange: (dateRange: DateRange | undefined) => void
}

export function DatePickerWithRange({
    fromDate,
    toDate,
    onDateChange,
    className,
}: DatePickerWithRangeProps) {
    const [date, setDate] = useState<DateRange | undefined>({
        from: fromDate,
        to: toDate,
    })

    const handleDateChange = (newDate: DateRange | undefined) => {
        setDate(newDate)
        onDateChange(newDate)
    }

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleDateChange}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
