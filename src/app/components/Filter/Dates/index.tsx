import Badge from '../../Badge'
import { ScrollArea, ScrollBar } from '../../ui/scroll-area'
import { getGroupedDates } from './server'

export default async function Dates() {
  const dates = await getGroupedDates()

  return (
    <ScrollArea>
      <div className="flex flex-row gap-4">
        {dates.dates.reverse().map((date) => {
          return (
            <div key={date.year} className="flex flex-col items-center">
              <h3 className="w-fit text-2xl">{date.year}</h3>
              <div className="flex flex-col items-center justify-center gap-2">
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
