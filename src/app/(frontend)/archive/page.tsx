import { getPaginatedEpisodes } from '@/app/actions'
import ArchiveComponent from '@/app/components/Archive'
import Filter from '@/app/components/Filter'
import type { Metadata } from 'next/types'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Archive() {
  const episodes = await getPaginatedEpisodes({
    pageParam: 1,
  })
  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-4 h-full">
        <ArchiveComponent init_episodes={episodes} />
      </div>
      <div className="col-span-2">
        <Filter />
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `00185fm | Archive`,
  }
}
