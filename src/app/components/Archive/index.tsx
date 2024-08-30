'use client'

import { getPaginatedEpisodes } from '@/app/actions'
import { Episode } from '@/payload-types'
import { PaginatedDocs } from 'payload'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import EpisodeCard from '../Cards/EpisodeCard'

type Props = {
  init_paginated_episodes: PaginatedDocs<Episode>
  children: React.ReactNode
}

const ArchiveComponent = ({ init_paginated_episodes, children }: Props) => {
  const [nextPage, setNextPage] = useState(init_paginated_episodes.nextPage)
  const [hasNextPage, setHasNextPage] = useState(init_paginated_episodes.hasNextPage)
  const [episodes, setEpisodes] = useState(init_paginated_episodes.docs)
  const [scrollTrigger, isInView] = useInView()

  useEffect(() => {
    if (isInView && hasNextPage) {
      fetchNextPage()
    }
  })

  async function fetchNextPage() {
    const result = await getPaginatedEpisodes({
      pageParam: nextPage as number,
    })
    setNextPage(result.nextPage)
    setHasNextPage(result.hasNextPage)
    setEpisodes(episodes.concat(result.docs))
  }

  return (
    <div>
      {children}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

export default ArchiveComponent
