import { getPaginatedEpisodesByShow } from '@/app/actions'
import { queryShowBySlug } from '@/app/query'
import { Episode, Show } from '@/payload-types'
import { notFound } from 'next/navigation'
import { PaginatedDocs } from 'payload'

export async function ShowProvider({ params }: { params: { slug: string } }) {
  const show: Show = await queryShowBySlug({ slug: params.slug })

  if (!show) {
    notFound()
  }

  const episodes: PaginatedDocs<Episode> = await getPaginatedEpisodesByShow({
    show_slug: show.slug,
    pageParam: 1,
  })

  return {
    show,
    episodes,
  }
}
