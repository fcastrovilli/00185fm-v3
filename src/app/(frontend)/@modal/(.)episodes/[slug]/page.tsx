import { Episode, Artist, Show } from '@/payload-types'
import { Modal } from '@/app/components/Modal'
import { generateStaticParams as generateEpisodeParams } from '@/app/(frontend)/episodes/[slug]/page'
import { queryEpisodeBySlug } from '@/app/query'
import Image from 'next/image'
import { Image as ImageType } from '@/payload-types'

export const generateStaticParams = generateEpisodeParams

type Props = {
  params: {
    slug: string
  }
}

export default async function EpisodePage({ params }: Props) {
  const episode: Episode = await queryEpisodeBySlug({ slug: params.slug })
  function CustomImage() {
    if (episode.image) {
      return (
        <Image
          width={(episode.image as ImageType).sizes?.small?.width!}
          height={(episode.image as ImageType).sizes?.small?.height!}
          src={(episode.image as ImageType).sizes?.small?.url!}
          alt={(episode.image as ImageType).credit || episode.title}
        />
      )
    }
  }
  return (
    <Modal>
      <h1 className="text-3xl font-semibold">{episode.title}</h1>
      <h2>{(episode.curatedBy as Artist).name}</h2>
      <h3>{(episode.show as Show).title}</h3>
      <h4>{episode.publishedAt}</h4>
      <CustomImage />
    </Modal>
  )
}
