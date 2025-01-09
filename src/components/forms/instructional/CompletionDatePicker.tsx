import { useState, useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from "./types";

interface CompletionDatePickerProps {
  setValue: UseFormSetValue<FormData>;
}

export function CompletionDatePicker({ setValue }: CompletionDatePickerProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [daysInMonth, setDaysInMonth] = useState<number[]>([]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      const days = new Date(parseInt(selectedYear), months.indexOf(selectedMonth) + 1, 0).getDate();
      setDaysInMonth(Array.from({ length: days }, (_, i) => i + 1));
    }
  }, [selectedMonth, selectedYear]);

  const handleDateChange = (type: 'month' | 'year' | 'day', value: string) => {
    if (type === 'month') setSelectedMonth(value);
    if (type === 'year') setSelectedYear(value);
    if (type === 'day') setSelectedDay(value);

    if (selectedMonth && selectedYear && (type === 'day' ? value : selectedDay)) {
      const newDate = new Date(
        parseInt(type === 'year' ? value : selectedYear),
        type === 'month' ? months.indexOf(value) : months.indexOf(selectedMonth),
        parseInt(type === 'day' ? value : selectedDay)
      );
      setValue("completionDate", newDate);
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="completionDate" className="text-base">
        What is the desired completion date? <span className="text-red-500">*</span>
      </Label>
      <div className="grid grid-cols-3 gap-4">
        <Select value={selectedMonth} onValueChange={(value) => handleDateChange('month', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedYear} onValueChange={(value) => handleDateChange('year', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select 
          value={selectedDay} 
          onValueChange={(value) => handleDateChange('day', value)}
          disabled={!selectedMonth || !selectedYear}
        >
          <SelectTrigger>
            <SelectValue placeholder="Day" />
          </SelectTrigger>
          <SelectContent>
            {daysInMonth.map((day) => (
              <SelectItem key={day} value={day.toString()}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}