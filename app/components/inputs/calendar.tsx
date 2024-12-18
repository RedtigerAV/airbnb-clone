"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range"
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalendarProps {
    value: Range;
    disabledDates?: Date[];
    onChange: (value: RangeKeyDict) => void
}

export function Calendar({ value, disabledDates, onChange }: CalendarProps) {
    return (
        <DateRange
            ranges={[value]}
            rangeColors={['#262626']}
            date={new Date()}
            direction="vertical"
            showDateDisplay={false}
            minDate={new Date()}
            disabledDates={disabledDates || []}
            onChange={onChange} />
    )
}