import { Artist, Show } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import Link from 'next/link'

export default async function Archive() {
  const payload = await getPayloadHMR({ config: configPromise })

  const episodes = await payload.find({
    collection: 'episodes',
    depth: 1,
    limit: 12,
  })
  return (
    <div className="p-4">
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
