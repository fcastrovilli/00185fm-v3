'use server'

import { getPaginatedEpisodes } from '@/app/actions'
import { payload } from '@/payload'
import { Episode, Search } from '@/payload-types'
import { PaginatedDocs } from 'payload'

type Props = {
  text: string | undefined
}

export async function SearchAction({ text }: Props) {
  let search: PaginatedDocs<Search> | undefined
  let episodes: PaginatedDocs<Episode> | undefined
  if (!text || text === '') {
    episodes = await getPaginatedEpisodes({ pageParam: 1 })
    search = undefined
  } else {
    search = await payload.find({
      collection: 'search',
      limit: 10,
      where: {
        title: {
          like: text.toLowerCase(),
        },
      },
    })
    episodes = undefined
  }
  return { search, episodes }
}
