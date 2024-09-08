'use server'

import { payload } from '@/payload'
import { Episode, Show, Artist } from '@/payload-types'
import { draftMode } from 'next/headers'
import { PaginatedDocs } from 'payload'
import { cache } from 'react'

export const getSearchResult = cache(async ({ text }: { text: string }) => {
  const { isEnabled: draft } = draftMode()

  const episodes: PaginatedDocs<Episode> = await payload.find({
    collection: 'episodes',
    limit: 12,
    depth: 1,
    draft,
    overrideAccess: draft,
    where: {
      or: [
        {
          title: {
            contains: text?.toLowerCase(),
          },
        },
        {
          description: {
            contains: text?.toLowerCase(),
          },
        },
      ],
    },
  })
  const shows: PaginatedDocs<Show> = await payload.find({
    collection: 'shows',
    limit: 12,
    depth: 1,
    draft,
    overrideAccess: draft,
    where: {
      or: [
        {
          title: {
            contains: text?.toLowerCase(),
          },
        },
        {
          description: {
            contains: text?.toLowerCase(),
          },
        },
      ],
    },
  })
  const artists: PaginatedDocs<Artist> = await payload.find({
    collection: 'artists',
    limit: 12,
    depth: 1,
    draft,
    overrideAccess: draft,
    where: {
      or: [
        {
          name: {
            contains: text?.toLowerCase(),
          },
        },
        {
          bio: {
            contains: text?.toLowerCase(),
          },
        },
      ],
    },
  })

  return {
    episodes,
    shows,
    artists,
  }
})
