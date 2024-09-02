import Tags from './Tags'
import Dates from './Dates'

export default async function Filter() {
  return (
    <div className="grid grid-cols-2 h-full">
      <Tags />
      <Dates />
    </div>
  )
}
