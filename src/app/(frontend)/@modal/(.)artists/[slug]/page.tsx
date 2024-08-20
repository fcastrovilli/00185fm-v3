import { Artist, Episode } from '@/payload-types'
import Link from 'next/link'
import { Modal } from '@/app/components/Modal'
import { generateStaticParams as generateArtistParams } from '@/app/(frontend)/artists/[slug]/page'
import { queryArtistBySlug, queryEpisodesByArtist } from '@/app/query'

export const generateStaticParams = generateArtistParams

type Props = {
  params: {
    slug: string
  }
}

export default async function ArtistPage({ params }: Props) {
  const artist: Artist = await queryArtistBySlug({ slug: params.slug })
  const episodes: Episode[] = await queryEpisodesByArtist({ artist: artist.id })
  return (
    <Modal>
      <h1 className="text-3xl font-semibold">{artist.name}</h1>
      <div className="mt-4">
        {episodes.map((episode) => (
          <div key={episode.id} className="bg-slate-300/70 p-4 rounded-lg flex flex-col gap-2 my-2">
            <Link href={`/episodes/${episode.slug}`}>{episode.title}</Link>
          </div>
        ))}
      </div>
    </Modal>
  )
}
