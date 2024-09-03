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
    <div className="container flex flex-col gap-4 sm:grid sm:grid-cols-5 md:px-10 lg:px-24">
      <div className="order-last col-span-3 sm:order-first sm:h-full">
        <ArchiveComponent init_episodes={episodes} />
      </div>
      <div className="order-first col-span-2 h-min sm:order-last sm:h-full">
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
