'use server'

import { cache } from 'react'
import { payload } from '@/payload'
import { draftMode } from 'next/headers'

export const getPaginatedEpisodes = cache(async ({ pageParam }: { pageParam?: number }) => {
  const { isEnabled: draft } = draftMode()
  const result = await payload.find({
    collection: 'episodes',
    limit: 15,
    depth: 1,
    draft,
    page: pageParam,
    pagination: true,
    overrideAccess: true,
    where: {
      public: {
        equals: true,
      },
    },
  })
  return result
})

export const getPaginatedEpisodesByShow = cache(
  async ({
    show_slug,
    pageParam,
  }: {
    show_slug: string | null | undefined
    pageParam?: number
  }) => {
    const { isEnabled: draft } = draftMode()

    const result = await payload.find({
      collection: 'episodes',
      limit: 5,
      draft,
      overrideAccess: true,
      pagination: true,
      page: pageParam,
      depth: 1,
      where: {
        and: [
          {
            'show.slug': {
              equals: show_slug,
            },
          },
          {
            public: {
              equals: true,
            },
          },
        ],
      },
    })

    return result
  },
)

export const getPaginatedEpisodesByArtist = cache(
  async ({ artistId, pageParam }: { artistId: string | null | undefined; pageParam?: number }) => {
    const { isEnabled: draft } = draftMode()

    const result = await payload?.find({
      collection: 'episodes',
      limit: 5,
      depth: 1,
      page: pageParam,
      pagination: true,
      draft,
      overrideAccess: true,
      where: {
        and: [
          {
            curatedBy: {
              equals: artistId,
            },
          },
          {
            public: {
              equals: true,
            },
          },
        ],
      },
    })

    return result
  },
)
