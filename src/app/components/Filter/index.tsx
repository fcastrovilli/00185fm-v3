import Tags from './Tags'
import Dates from './Dates'

export default function Filter() {
  return (
    <div className="hidden sm:grid sm:h-full sm:grid-cols-2 sm:gap-2">
      <Tags />
      <Dates />
    </div>
  )
}
