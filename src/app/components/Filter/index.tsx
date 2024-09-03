import Tags from './Tags'
import Dates from './Dates'

export default async function Filter() {
  return (
    <div className="space-y-4 sm:grid sm:h-full sm:grid-cols-2 sm:gap-2 sm:space-y-0">
      <Tags />
      <Dates />
    </div>
  )
}
