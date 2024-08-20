import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import Link from 'next/link'

export default async function Archive() {
  const payload = await getPayloadHMR({ config: configPromise })

  const shows = await payload.find({
    collection: 'shows',
    depth: 1,
    limit: 12,
  })
  return (
    <div className="p-4">
      <h1>Shows</h1>
      <ul>
        {shows.docs.map((show) => (
          <li key={show.slug}>
            <Link href={`/shows/${show.slug}`}>{show.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
