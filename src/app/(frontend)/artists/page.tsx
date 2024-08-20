import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import Link from 'next/link'

export default async function Archive() {
  const payload = await getPayloadHMR({ config: configPromise })

  const artists = await payload.find({
    collection: 'artists',
    depth: 1,
    limit: 12,
  })
  return (
    <div className="p-4">
      <h1>Artists</h1>
      <ul>
        {artists.docs.map((artist) => (
          <li key={artist.slug}>
            <Link href={`/artists/${artist.slug}`}>{artist.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
