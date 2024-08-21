import { Artist, Show } from '@/payload-types'
import { payload } from '@/payload'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import type { Metadata } from 'next/types'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Archive() {
  const { isEnabled: draft } = draftMode()

  const episodes = await payload.find({
    collection: 'episodes',
    draft,
    overrideAccess: true,
    depth: 1,
    limit: 12,
    where: {
      public: {
        equals: true,
      },
    },
  })
  return (
    <div>
      <h1 className="text-3xl font-semibold">Archive</h1>
      {episodes.docs.map((episode) => (
        <div key={episode.id} className="bg-slate-300/70 p-4 rounded-lg flex flex-col gap-2 my-2">
          <Link href={`/episodes/${episode.slug}`}>Title: {episode.title}</Link>
          <Link href={`/shows/${(episode.show as Show).slug}`}>
            Show: {(episode.show as Show).title}
          </Link>
          <Link href={`/artists/${(episode.curatedBy as Artist).slug}`}>
            Curated By: {(episode.curatedBy as Artist).name}
          </Link>
        </div>
      ))}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `00185fm | Archive`,
  }
}
