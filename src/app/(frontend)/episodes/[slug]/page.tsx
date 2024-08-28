import { payload } from '@/payload'
import { Episode, Artist, Show, Audio } from '@/payload-types'
import { queryEpisodeBySlug } from '@/app/query'
import Image from 'next/image'
import { Image as ImageType } from '@/payload-types'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const episodes = await payload.find({
    collection: 'episodes',
    draft: false,
    limit: 1000,
    where: {
      public: {
        equals: true,
      },
    },
  })

  return episodes.docs?.map(({ slug }) => slug)
}

export default async function EpisodePage({ params }: Props) {
  const episode: Episode = await queryEpisodeBySlug({ slug: params.slug })
  if (!episode) {
    notFound()
  }
  function CustomImage() {
    if (episode.image) {
      return (
        <Image
          width={(episode.image as ImageType).sizes?.big?.width!}
          height={(episode.image as ImageType).sizes?.big?.height!}
          src={(episode.image as ImageType).sizes?.big?.url!}
          alt={(episode.image as ImageType).credit || episode.title}
        />
      )
    }
  }
  function CustomAudio() {
    if (episode.audio) {
      return <audio controls src={(episode.audio as Audio).url!}></audio>
    }
  }
  return (
    <div>
      <h1 className="text-3xl font-semibold">{episode.title}</h1>
      <h2>{(episode.curatedBy as Artist[]).map((artist) => artist.name).join(', ')}</h2>
      <h3>{(episode.show as Show).title}</h3>
      <h4>{episode.publishedAt}</h4>
      <CustomImage />
      <CustomAudio />
    </div>
  )
}
