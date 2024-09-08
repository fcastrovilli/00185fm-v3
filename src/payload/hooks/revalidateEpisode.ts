import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Episode } from '@/payload-types'

export const revalidateEpisode: CollectionAfterChangeHook<Episode> = ({
  doc,
  previousDoc,
  req: { payload },
  operation,
}) => {
  if (operation !== 'create') {
    if (doc._status === 'published') {
      const path = `/episodes/${doc.slug}`

      payload.logger.info(`Revalidating episode at path: ${path}`)

      revalidatePath(path)
    }

    // If the episode was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/episodes/${previousDoc.slug}`

      payload.logger.info(`Revalidating old episode at path: ${oldPath}`)

      revalidatePath(oldPath)
    }
  }

  return doc
}
