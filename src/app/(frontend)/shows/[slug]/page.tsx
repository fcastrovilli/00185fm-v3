import { payload } from '@/payload'
import ShowComponent from '@/app/components/Show'
import { ShowProvider } from '@/app/components/Show/server'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const shows = await payload.find({
    collection: 'shows',
    draft: false,
    limit: 1000,
  })

  return shows.docs?.map(({ slug }) => slug)
}

export default async function ShowPage({ params }: Props) {
  const { show, episodes: init_paginated_episodes } = await ShowProvider({ params })
  return <ShowComponent show={show} init_paginated_episodes={init_paginated_episodes} />
}
