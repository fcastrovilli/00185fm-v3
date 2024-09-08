import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Show } from '@/payload-types'

export const revalidateShow: CollectionAfterChangeHook<Show> = ({
  doc,
  previousDoc,
  req: { payload },
  operation,
}) => {
  if (operation !== 'create') {
    if (doc._status === 'published') {
      const path = `/shows/${doc.slug}`

      payload.logger.info(`Revalidating show at path: ${path}`)

      revalidatePath(path)
    }

    // If the show was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/shows/${previousDoc.slug}`

      payload.logger.info(`Revalidating old show at path: ${oldPath}`)

      revalidatePath(oldPath)
    }
  }

  return doc
}
