import Tags from './Tags'
import Dates from './Dates'

export default async function Filter() {
  return (
    <div className="grid h-full grid-cols-2">
      <Tags />
      <Dates />
    </div>
  )
}
