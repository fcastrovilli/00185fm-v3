import Tags from './Tags'
import Dates from './Dates'
import { getGroupedDates } from './Dates/server'
import { queryTags } from '@/app/query'

export async function generateStaticParams() {
  return {
    all_dates: await getGroupedDates(),
    all_tags: await queryTags(),
  }
}

export default async function Filter() {
  const all_dates = await getGroupedDates()
  const all_tags = await queryTags()
  return (
    <div className="grid h-full grid-cols-2 gap-2">
      <Tags all_tags={all_tags} />
      <Dates all_dates={all_dates} />
    </div>
  )
}
