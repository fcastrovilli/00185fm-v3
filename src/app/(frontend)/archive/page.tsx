import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

export default async function Archive() {
  const payload = await getPayloadHMR({ config: configPromise })

  const episodes = await payload.find({
    collection: 'episodes',
    depth: 1,
    limit: 12,
  })
  return (
    <div className="p-4">
      <h1>Archive</h1>
      <ul>
        {episodes.docs.map((episode) => (
          <li key={episode.slug}>
            <a href={`/archive/${episode.slug}`}>{episode.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
