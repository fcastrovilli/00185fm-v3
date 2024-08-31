'use server'

import { payload } from '@/payload'
import { Search } from '@/payload-types'
import { PaginatedDocs } from 'payload'

type Props = {
  text: string
}

export async function SearchAction({ text }: Props) {
  let search: PaginatedDocs<Search> = await payload.find({
    collection: 'search',
    limit: 10,
    where: {
      title: {
        like: text.toLowerCase(),
      },
    },
  })
  return search
}
