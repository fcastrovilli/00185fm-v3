'use client'

import { Show, Artist, Episode } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { getPaginatedEpisodesByShow } from '@/app/actions'
import EpisodeCard from '../Cards/EpisodeCard'

type Props = {
  show: Show
  init_paginated_episodes: PaginatedDocs<Episode>
}

export default function ShowComponent({ init_paginated_episodes, show }: Props) {
  const [nextPage, setNextPage] = useState(init_paginated_episodes.nextPage)
  const [hasNextPage, setHasNextPage] = useState(init_paginated_episodes.hasNextPage)
  const [episodes, setEpisodes] = useState(init_paginated_episodes.docs)
  const [scrollTrigger, isInView] = useInView()

  async function fetchNextPage() {
    const result = await getPaginatedEpisodesByShow({
      pageParam: nextPage as number,
      show_slug: show.slug,
    })
    setNextPage(result.nextPage)
    setHasNextPage(result.hasNextPage)
    setEpisodes(episodes.concat(result.docs))
  }

  useEffect(() => {
    if (isInView && hasNextPage) {
      fetchNextPage()
    }
  })

  return (
    <div>
      <h1 className="text-3xl font-semibold">{show.title}</h1>
      <h2>{(show.curatedBy as Artist[]).map((artist) => artist.name).join(', ')}</h2>
      <div className="flex flex-col gap-4">
        {episodes.map((episode) => (
          <EpisodeCard episode={episode} key={episode.id} />
        ))}
      </div>
      <div className="w-full flex justify-center">
        {(hasNextPage && (
          <div className="text-2xl" ref={scrollTrigger}>
            Loading...
          </div>
        )) || <p className="text-2xl">No more episodes to load</p>}
      </div>
    </div>
  )
}
