import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { cache } from 'react'
import { Show, Artist, Episode } from '@/payload-types'
import Link from 'next/link'
import { Modal } from '@/app/components/Modal'

type Props = {
  params: {
    slug: string
  }
}

export default async function ShowPage({ params }: Props) {
  const show: Show = await queryShowBySlug({ slug: params.slug })
  const episodes: Episode[] = await queryEpisodesByShow({ show: show.slug })
  return (
    <Modal>
      <h1 className="text-3xl font-semibold">{show.title}</h1>
      <h2>{(show.curatedBy as Artist[])[0].name}</h2>
      <div className="mt-4">
        {episodes.map((episode) => (
          <div
            key={episode.slug}
            className="bg-slate-300/70 p-4 rounded-lg flex flex-col gap-2 my-2"
          >
            <Link href={`/episodes/${episode.slug}`}>{episode.title}</Link>
          </div>
        ))}
      </div>
    </Modal>
  )
}

const queryShowBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'shows',
    limit: 1,
    depth: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

const queryEpisodesByShow = cache(async ({ show }: { show: string }) => {
  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'episodes',
    limit: 12,
    depth: 1,
    where: {
      'show.slug': {
        equals: show,
      },
    },
  })

  return result.docs || []
})
