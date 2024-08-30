import { queryEpisodeBySlug } from '@/app/query'
import { notFound } from 'next/navigation'

export async function EpisodeProvider({ params }: { params: { slug: string } }) {
  const episode = await queryEpisodeBySlug({ slug: params.slug })
  if (!episode) {
    notFound()
  }

  return { episode }
}
