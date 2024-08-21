import { payload } from '@/payload'
import { Show, Artist, Episode } from '@/payload-types'
import Link from 'next/link'
import { queryEpisodesByShow, queryShowBySlug } from '@/app/query'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const shows = await payload.find({
    collection: 'shows',
    draft: false,
    limit: 1000,
  })

  return shows.docs?.map(({ slug }) => slug)
}

export default async function ShowPage({ params }: Props) {
  const show: Show = await queryShowBySlug({ slug: params.slug })

  if (!show) {
    notFound()
  }

  const episodes: Episode[] = await queryEpisodesByShow({ show: show.slug })
  return (
    <div>
      <h1 className="text-3xl font-semibold">{show.title}</h1>
      <h2>{(show.curatedBy as Artist[])[0].name}</h2>
      <div className="mt-4">
        {episodes.map((episode) => (
          <div
            key={episode.slug}
            className="bg-slate-300/70 p-4 rounded-lg flex flex-col gap-2 my-2"
          >
            <Link href={`/episodes/${episode.slug}`}>{episode.title}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
