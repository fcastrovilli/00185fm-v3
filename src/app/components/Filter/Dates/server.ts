import { payload } from '@/payload'

type Month =
  | 'jan'
  | 'feb'
  | 'mar'
  | 'apr'
  | 'may'
  | 'jun'
  | 'jul'
  | 'aug'
  | 'sep'
  | 'oct'
  | 'nov'
  | 'dec'

type MonthsGroupedByYear = {
  dates: [
    {
      year: number
      months: Month[]
    },
  ]
}

async function getGroupedDates(): Promise<MonthsGroupedByYear> {
  // Connect to the database if not already connected

  // Aggregate by year and month
  const allDates = await payload.db.collections['episodes'].aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$publishedAt' },
          month: { $month: '$publishedAt' },
        },
      },
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 }, // Ensure sorting by year and month
    },
  ])

  // Convert months to abbreviated string format
  const monthNames: Month[] = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ]

  // Transform into desired format
  const groupedDates: MonthsGroupedByYear = { dates: [] }

  allDates.forEach(({ _id: { year, month } }) => {
    // Find the year in groupedDates
    let yearEntry = groupedDates.dates.find((entry) => entry.year === year)

    // If the year doesn't exist, create a new entry
    if (!yearEntry) {
      yearEntry = { year, months: [] }
      groupedDates.dates.push(yearEntry)
    }

    // Add the month to the year's months array
    if (month >= 1 && month <= 12) {
      yearEntry.months.push(monthNames[month - 1]) // Convert month number to month name
    }
  })

  return groupedDates
}

export { getGroupedDates }
