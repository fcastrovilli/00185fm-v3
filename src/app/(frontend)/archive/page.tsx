import ArchiveComponent from '@/app/components/Archive'
import { SearchAction } from '@/app/components/Search/server'
import type { Metadata } from 'next/types'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Archive() {
  const search = await SearchAction({ text: '' })
  return <ArchiveComponent init_episodes={search.episodes} init_search={search.search} />
}

export function generateMetadata(): Metadata {
  return {
    title: `00185fm | Archive`,
  }
}
