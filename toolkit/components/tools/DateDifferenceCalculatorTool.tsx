"use client";

import { useMemo, useState } from "react";
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  parseISO,
  isValid,
  format,
} from "date-fns";
import { ToolCheckbox, StatCard } from "@/components/tools/ui";

function parseDateInput(value: string): Date | null {
  if (!value) return null;
  const d = parseISO(value);
  return isValid(d) ? d : null;
}

export default function DateDifferenceCalculatorTool() {
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-12-31");
  const [includeEndDate, setIncludeEndDate] = useState(true);

  const result = useMemo(() => {
    const start = parseDateInput(startDate);
    const end = parseDateInput(endDate);
    if (!start || !end) return null;

    const [earlier, later] = start <= end ? [start, end] : [end, start];
    const swapped = start > end;

    let days = differenceInDays(later, earlier);
    if (includeEndDate) days += 1;

    const years = differenceInYears(later, earlier);
    const months = differenceInMonths(later, earlier);
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;

    const yearsPart = differenceInYears(later, earlier);
    const afterYears = new Date(earlier);
    afterYears.setFullYear(afterYears.getFullYear() + yearsPart);
    const monthsPart = differenceInMonths(later, afterYears);
    const afterMonths = new Date(afterYears);
    afterMonths.setMonth(afterMonths.getMonth() + monthsPart);
    let breakdownDays = differenceInDays(later, afterMonths);
    if (includeEndDate) breakdownDays += 1;

    return {
      swapped,
      days,
      weeks,
      remainingDays,
      months,
      years,
      breakdown: { years: yearsPart, months: monthsPart, days: breakdownDays },
      startLabel: format(earlier, "MMM d, yyyy"),
      endLabel: format(later, "MMM d, yyyy"),
    };
  }, [startDate, endDate, includeEndDate]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="start-date" className="mb-1 block text-sm font-medium text-gray-700">
            Start date
          </label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>
        <div>
          <label htmlFor="end-date" className="mb-1 block text-sm font-medium text-gray-700">
            End date
          </label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>
      </div>

      <ToolCheckbox
        label="Include end date in count (inclusive range)"
        checked={includeEndDate}
        onChange={setIncludeEndDate}
      />

      {!result && <p className="text-sm text-gray-500">Enter valid dates to calculate the difference.</p>}

      {result && (
        <>
          {result.swapped && (
            <p className="text-sm text-amber-700">End date is before start date — showing absolute difference.</p>
          )}
          <p className="text-sm text-gray-600">
            From {result.startLabel} to {result.endLabel}
            {includeEndDate ? " (inclusive)" : " (exclusive of end date)"}
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total days" value={result.days.toLocaleString()} />
            <StatCard label="Weeks" value={result.weeks.toLocaleString()} />
            <StatCard label="Months (approx)" value={result.months.toLocaleString()} />
            <StatCard label="Years (approx)" value={result.years.toLocaleString()} />
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-900">Breakdown</p>
            <p className="mt-1 text-gray-700">
              {result.breakdown.years} year{result.breakdown.years !== 1 ? "s" : ""},{" "}
              {result.breakdown.months} month{result.breakdown.months !== 1 ? "s" : ""},{" "}
              {result.breakdown.days} day{result.breakdown.days !== 1 ? "s" : ""}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Plus {result.remainingDays} extra day{result.remainingDays !== 1 ? "s" : ""} beyond full weeks
            </p>
          </div>
        </>
      )}
    </div>
  );
}
