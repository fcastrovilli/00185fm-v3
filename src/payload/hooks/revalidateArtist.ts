import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Artist } from '@/payload-types'

export const revalidateArtist: CollectionAfterChangeHook<Artist> = ({
  doc,
  previousDoc,
  req: { payload },
  operation,
}) => {
  if (operation !== 'create') {
    if (doc._status === 'published') {
      const path = `/artists/${doc.slug}`

      payload.logger.info(`Revalidating artist at path: ${path}`)

      revalidatePath(path)
    }

    // If the artist was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/artists/${previousDoc.slug}`

      payload.logger.info(`Revalidating old artist at path: ${oldPath}`)

      revalidatePath(oldPath)
    }
  }

  return doc
}
