'use client'
import { getSearchResult } from '@/app/components/Search/server'
import { usePathname, useSearchParams } from 'next/navigation'

import { useEffect, useState } from 'react'
import { PaginatedDocs } from 'payload'
import { Artist, Episode, Show } from '@/payload-types'
import EpisodeCard from '../Cards/EpisodeCard'
import Link from 'next/link'
import { getPaginatedEpisodes } from '@/app/actions'
import { useInView } from 'react-intersection-observer'
import { ScrollArea } from '../ui/scroll-area'

type Props = {
  init_episodes: PaginatedDocs<Episode>
}

const ArchiveComponent = ({ init_episodes }: Props) => {
  const [nextPage, setNextPage] = useState(init_episodes.nextPage)
  const [hasNextPage, setHasNextPage] = useState(init_episodes.hasNextPage)
  const [scrollTrigger, isInView] = useInView()

  const [episodes, setEpisodes] = useState<Episode[] | undefined>(init_episodes.docs)

  const [searchEpisodes, setSearchEpisodes] = useState<PaginatedDocs<Episode> | undefined>(
    undefined,
  )
  const [searchShows, setSearchShows] = useState<PaginatedDocs<Show> | undefined>(undefined)
  const [searchArtists, setSearchArtists] = useState<PaginatedDocs<Artist> | undefined>(undefined)

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
      getSearchResult({ text: text as string }).then((result) => {
        setEpisodes(undefined)
        setSearchEpisodes(result.episodes)
        setSearchShows(result.shows)
        setSearchArtists(result.artists)
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
    <ScrollArea>
      {searchEpisodes?.docs?.length === 0 &&
        searchShows?.docs?.length === 0 &&
        searchArtists?.docs?.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold">No results found</h1>
            <p className="text-xl">Try searching for something else</p>
          </div>
        )}
      {searchEpisodes && searchEpisodes.docs.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold">Episodes</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {searchEpisodes.docs.map((result) => {
              return <EpisodeCard key={result.id} episode={result} />
            })}
          </div>
        </div>
      )}
      {searchShows && searchShows.docs.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold">Shows</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {searchShows.docs.map((result) => {
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
      {searchArtists && searchArtists.docs.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold">Artists</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {searchArtists.docs.map((result) => {
              return (
                <div key={result.id}>
                  <h3 className="text-2xl">{result.name}</h3>
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
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
            {episodes.map((episode) => (
              <EpisodeCard episode={episode} key={episode.id} />
            ))}
          </div>
          <div className="flex w-full justify-center pb-16 sm:pb-0">
            {(hasNextPage && (
              <div className="text-2xl" ref={scrollTrigger}>
                Loading...
              </div>
            )) ||
              null}
          </div>
        </div>
      )}
    </ScrollArea>
  )
}

export default ArchiveComponent
