'use client'
import { SearchAction } from '@/app/components/Search/server'
import { useSearchParams } from 'next/navigation'

import { useEffect, useState } from 'react'
import { PaginatedDocs } from 'payload'
import { Episode, Search } from '@/payload-types'
import EpisodeCard from '../Cards/EpisodeCard'
import Link from 'next/link'

type Props = {
  init_episodes: PaginatedDocs<Episode> | undefined
  init_search: PaginatedDocs<Search> | undefined
}

const ArchiveComponent = ({ init_episodes, init_search }: Props) => {
  const [search, setSearch] = useState<PaginatedDocs<Search> | undefined>(init_search)
  const [episodes, setEpisodes] = useState<PaginatedDocs<Episode> | undefined>(init_episodes)

  const searchParams = useSearchParams()
  const text = searchParams.get('search') ?? undefined

  useEffect(() => {
    if (text) {
      SearchAction({ text }).then(({ search }) => {
        setSearch(search)
        setEpisodes(undefined)
      })
    } else {
      SearchAction({ text: undefined }).then(({ episodes }) => {
        setEpisodes(episodes)
        setSearch(undefined)
      })
    }
    console.log(text)
  }, [text])

  // if (text) {
  //   SearchAction({ text }).then(({ search }) => {
  //     setSearch(search)
  //   })
  // } else {
  //   SearchAction({ text: undefined }).then(({ episodes }) => {
  //     setEpisodes(episodes)
  //   })
  // }

  return (
    <div>
      {search && (
        <div>
          <h3 className="text-3xl font-semibold">Search Results</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {search.docs.map((result) => {
              if (result.doc.relationTo === 'episodes') {
                return (
                  <div key={result.id}>
                    <h3 className="text-2xl">{result.title}</h3>
                    <Link href={`/episodes/${result.doc.value}`}>Go to episode</Link>
                  </div>
                )
              } else if (result.doc.relationTo === 'shows') {
                return (
                  <div key={result.id}>
                    <h3 className="text-2xl">{result.title}</h3>
                    <Link href={`/shows/${result.doc.value}`}>Go to show</Link>
                  </div>
                )
              } else if (result.doc.relationTo === 'artists') {
                return (
                  <div key={result.id}>
                    <h3 className="text-2xl">{result.title}</h3>
                    <Link href={`/artists/${result.doc.value}`}>Go to artist</Link>
                  </div>
                )
              }
            })}
          </div>
        </div>
      )}
      {episodes && (
        <div>
          <h3 className="text-3xl font-semibold">Episodes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {episodes.docs.map((episode) => (
              <EpisodeCard episode={episode} key={episode.id} />
            ))}
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
