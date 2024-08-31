import { getPaginatedEpisodes } from '@/app/actions'
import ArchiveComponent from '@/app/components/Archive'
import type { Metadata } from 'next/types'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Archive() {
  const episodes = await getPaginatedEpisodes({
    pageParam: 1,
  })
  return <ArchiveComponent init_episodes={episodes} />
}

export function generateMetadata(): Metadata {
  return {
    title: `00185fm | Archive`,
  }
}
