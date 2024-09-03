import Badge from '../../Badge'
import { ScrollArea, ScrollBar } from '../../ui/scroll-area'
import { getGroupedDates } from './server'

export default async function Dates() {
  const dates = await getGroupedDates()

  return (
    <ScrollArea className="h-fit max-w-prose">
      <div className="flex flex-col gap-4 sm:flex-row">
        {dates.dates.reverse().map((date) => {
          return (
            <div key={date.year} className="flex flex-row items-start sm:flex-col sm:items-center">
              <h3 className="w-fit text-2xl">{date.year}</h3>
              <div className="flex flex-row items-center justify-start gap-2 sm:flex-col sm:justify-center">
                {date.months.map((month) => (
                  <Badge key={month} text={month} size="md" />
                ))}
              </div>
            </div>
          )
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
