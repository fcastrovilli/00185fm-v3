import { payload } from '@/payload'
import { Show, Artist, Episode } from '@/payload-types'
import Link from 'next/link'
import { queryEpisodesByShow, queryShowBySlug } from '@/app/query'
import { notFound } from 'next/navigation'
import ShowComponent from '@/app/components/Show'

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
  return <ShowComponent show={show} episodes={episodes} />
}
