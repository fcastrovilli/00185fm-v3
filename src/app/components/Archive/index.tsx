'use client'
import { SearchAction } from '@/app/components/Search/server'
import { usePathname, useSearchParams } from 'next/navigation'

import { useEffect, useState } from 'react'
import { PaginatedDocs } from 'payload'
import { Episode, Search } from '@/payload-types'
import EpisodeCard from '../Cards/EpisodeCard'
import Link from 'next/link'
import { getPaginatedEpisodes } from '@/app/actions'
import { useInView } from 'react-intersection-observer'

type Props = {
  init_episodes: PaginatedDocs<Episode>
}

const ArchiveComponent = ({ init_episodes }: Props) => {
  const [nextPage, setNextPage] = useState(init_episodes.nextPage)
  const [hasNextPage, setHasNextPage] = useState(init_episodes.hasNextPage)
  const [scrollTrigger, isInView] = useInView()

  const [episodes, setEpisodes] = useState<Episode[] | undefined>(init_episodes.docs)

  const [searchEpisodes, setSearchEpisodes] = useState<Search[] | undefined>(undefined)
  const [searchShows, setSearchShows] = useState<Search[] | undefined>(undefined)
  const [searchArtists, setSearchArtists] = useState<Search[] | undefined>(undefined)

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const text = searchParams.get('search') ?? undefined

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
    setEpisodes(episodes?.concat(result.docs))
  }

  useEffect(() => {
    if (text) {
      SearchAction({ text }).then((search) => {
        setEpisodes(undefined)
        setSearchEpisodes(search.docs.filter((doc) => doc.doc.relationTo === 'episodes'))
        setSearchShows(search.docs.filter((doc) => doc.doc.relationTo === 'shows'))
        setSearchArtists(search.docs.filter((doc) => doc.doc.relationTo === 'artists'))
      })
    } else {
      if (pathname === '/archive') {
        getPaginatedEpisodes({ pageParam: 1 }).then((episodes) => {
          setEpisodes(episodes.docs)
          setSearchEpisodes(undefined)
          setSearchShows(undefined)
          setSearchArtists(undefined)
        })
      }
    }
  }, [text, pathname])

  return (
    <div>
      <h2 className="text-3xl font-semibold">Archive</h2>
      {searchEpisodes?.length === 0 && searchShows?.length === 0 && searchArtists?.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold">No results found</h1>
          <p className="text-xl">Try searching for something else</p>
        </div>
      )}
      {searchEpisodes && searchEpisodes.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold">Episodes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchEpisodes.map((result) => {
              return (
                <div key={result.id}>
                  <h3 className="text-2xl">{result.title}</h3>
                  <Link scroll={false} href={`/episodes/${result.slug}`}>
                    Go to episode
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      )}
      {searchShows && searchShows.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold">Shows</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchShows.map((result) => {
              return (
                <div key={result.id}>
                  <h3 className="text-2xl">{result.title}</h3>
                  <Link scroll={false} href={`/shows/${result.slug}`}>
                    Go to show
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      )}
      {searchArtists && searchArtists.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold">Artists</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchArtists.map((result) => {
              return (
                <div key={result.id}>
                  <h3 className="text-2xl">{result.title}</h3>
                  <Link scroll={false} href={`/artists/${result.slug}`}>
                    Go to artist
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      )}
      {episodes && (
        <div>
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
      )}
    </div>
  )
}

// import { getPaginatedEpisodes } from '@/app/actions'
// import { Episode } from '@/payload-types'
// import { PaginatedDocs } from 'payload'
// import { useEffect, useState } from 'react'
// import { useInView } from 'react-intersection-observer'
// import EpisodeCard from '../Cards/EpisodeCard'

// type Props = {
//   init_paginated_episodes: PaginatedDocs<Episode>
//   children: React.ReactNode
// }

// const ArchiveComponent = ({ init_paginated_episodes, children }: Props) => {
//   const [nextPage, setNextPage] = useState(init_paginated_episodes.nextPage)
//   const [hasNextPage, setHasNextPage] = useState(init_paginated_episodes.hasNextPage)
//   const [episodes, setEpisodes] = useState(init_paginated_episodes.docs)
//   const [scrollTrigger, isInView] = useInView()

//   useEffect(() => {
//     if (isInView && hasNextPage) {
//       fetchNextPage()
//     }
//   })

//   async function fetchNextPage() {
//     const result = await getPaginatedEpisodes({
//       pageParam: nextPage as number,
//     })
//     setNextPage(result.nextPage)
//     setHasNextPage(result.hasNextPage)
//     setEpisodes(episodes.concat(result.docs))
//   }

//   return (
//     <div>
//       {children}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {episodes.map((episode) => (
//           <EpisodeCard episode={episode} key={episode.id} />
//         ))}
//       </div>
//       <div className="w-full flex justify-center">
//         {(hasNextPage && (
//           <div className="text-2xl" ref={scrollTrigger}>
//             Loading...
//           </div>
//         )) || <p className="text-2xl">No more episodes to load</p>}
//       </div>
//     </div>
//   )
// }

export default ArchiveComponent
