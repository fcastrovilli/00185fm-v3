import { getPaginatedEpisodes } from '@/app/actions'
import type { Metadata } from 'next/types'
import ArchiveComponent from '@/app/components/Archive'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Archive() {
  const episodes = await getPaginatedEpisodes({ pageParam: 1 })
  return (
    <div>
      <ArchiveComponent init_paginated_episodes={episodes}>
        <h1 className="text-3xl font-bold">Archive</h1>
      </ArchiveComponent>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `00185fm | Archive`,
  }
}
