'use server'

import { cache } from 'react'
import { payload } from '@/payload'
import { draftMode } from 'next/headers'

export const getPaginatedEpisodes = cache(async ({ pageParam }: { pageParam?: number }) => {
  const { isEnabled: draft } = draftMode()
  const result = await payload.find({
    collection: 'episodes',
    limit: 10,
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
