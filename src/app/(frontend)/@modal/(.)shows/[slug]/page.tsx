import { Show, Artist, Episode } from '@/payload-types'
import Link from 'next/link'
import { Modal } from '@/app/components/Modal'
import { generateStaticParams as generateShowParams } from '@/app/(frontend)/shows/[slug]/page'
import { queryEpisodesByShow, queryShowBySlug } from '@/app/query'

export const generateStaticParams = generateShowParams

type Props = {
  params: {
    slug: string
  }
}

export default async function ShowPage({ params }: Props) {
  const show: Show = await queryShowBySlug({ slug: params.slug })
  const episodes: Episode[] = await queryEpisodesByShow({ show: show.slug })
  return (
    <Modal>
      <h1 className="text-3xl font-semibold">{show.title}</h1>
      <h2>{(show.curatedBy as Artist[]).map((artist) => artist.name).join(', ')}</h2>
      <div className="mt-4">
        {episodes.map((episode) => (
          <div
            key={episode.slug}
            className="bg-slate-300/70 p-4 rounded-lg flex flex-col gap-2 my-2"
          >
            <Link scroll={false} href={`/episodes/${episode.slug}`}>
              {episode.title}
            </Link>
          </div>
        ))}
      </div>
    </Modal>
  )
}
