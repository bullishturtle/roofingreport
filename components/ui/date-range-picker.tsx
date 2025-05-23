"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

interface DateRangePickerProps {
  startDate?: Date
  endDate?: Date
  onStartDateChange: (date?: Date) => void
  onEndDateChange: (date?: Date) => void
}

export function DateRangePicker({ startDate, endDate, onStartDateChange, onEndDateChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const formatDate = (date?: Date) => {
    return date ? format(date, "PPP") : "Select date"
  }

  const handleClear = () => {
    onStartDateChange(undefined)
    onEndDateChange(undefined)
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {startDate || endDate ? (
            <span>
              {formatDate(startDate)} - {formatDate(endDate)}
            </span>
          ) : (
            <span>Select date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-sm font-medium mb-1">Start Date</div>
              <Calendar mode="single" selected={startDate} onSelect={onStartDateChange} initialFocus />
            </div>
            <div>
              <div className="text-sm font-medium mb-1">End Date</div>
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={onEndDateChange}
                initialFocus
                disabled={(date) => (startDate ? date < startDate : false)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleClear}>
              Clear
            </Button>
            <Button size="sm" onClick={() => setIsOpen(false)}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
