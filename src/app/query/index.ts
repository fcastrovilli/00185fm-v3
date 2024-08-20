import { payload } from '@/payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'

export const queryEpisodeBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const result = await payload.find({
    collection: 'episodes',
    limit: 1,
    depth: 1,
    draft,
    overrideAccess: true,
    where: {
      and: [
        {
          slug: {
            equals: slug,
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

  return result.docs?.[0] || null
})

export const queryArtistBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const result = await payload?.find({
    collection: 'artists',
    limit: 1,
    depth: 1,
    draft,
    overrideAccess: true,
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

  return result?.docs || []
})

export const queryShowBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const result = await payload.find({
    collection: 'shows',
    limit: 1,
    draft,
    overrideAccess: true,
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export const queryEpisodesByShow = cache(async ({ show }: { show: string }) => {
  const { isEnabled: draft } = draftMode()

  const result = await payload.find({
    collection: 'episodes',
    limit: 12,
    draft,
    overrideAccess: true,
    depth: 1,
    where: {
      and: [
        {
          'show.slug': {
            equals: show,
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

  return result.docs || []
})
