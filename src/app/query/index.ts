import { payload } from '@/payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'

export const queryPaginatedEpisodes = cache(async ({ pageParam = 1 }: { pageParam?: number }) => {
  const { isEnabled: draft } = draftMode()
  const result = await payload.find({
    collection: 'episodes',
    limit: 12,
    depth: 1,
    draft,
    page: pageParam,
    pagination: true,
    overrideAccess: draft,
  })
  return result
})

export const queryEpisodeBySlug = cache(async ({ slug }: { slug: string | null | undefined }) => {
  const { isEnabled: draft } = draftMode()

  const result = await payload.find({
    collection: 'episodes',
    limit: 1,
    depth: 1,
    draft,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export const queryArtistBySlug = cache(async ({ slug }: { slug: string | null | undefined }) => {
  const { isEnabled: draft } = draftMode()

  const result = await payload?.find({
    collection: 'artists',
    limit: 1,
    depth: 1,
    draft,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result?.docs?.[0] || null
})

export const queryEpisodesByArtist = cache(async ({ artist: artistId }: { artist: string }) => {
  const { isEnabled: draft } = draftMode()

  const result = await payload?.find({
    collection: 'episodes',
    limit: 12,
    depth: 1,
    draft,
    overrideAccess: draft,
    where: {
      curatedBy: {
        equals: artistId,
      },
    },
  })

  return result?.docs || []
})

export const queryShowBySlug = cache(async ({ slug }: { slug: string | null | undefined }) => {
  const { isEnabled: draft } = draftMode()

  const result = await payload.find({
    collection: 'shows',
    limit: 1,
    draft,
    overrideAccess: draft,
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export const queryEpisodesByShow = cache(async ({ show }: { show: string | null | undefined }) => {
  const { isEnabled: draft } = draftMode()

  const result = await payload.find({
    collection: 'episodes',
    limit: 12,
    draft,
    overrideAccess: draft,
    depth: 1,
    where: {
      'show.slug': {
        equals: show,
      },
    },
  })

  return result.docs || []
})

export const queryTags = cache(async () => {
  const result = await payload.find({
    collection: 'tags',
    depth: 0,
    pagination: false,
  })

  return result.docs || []
})
