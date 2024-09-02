import Image from 'next/image'
import { Image as ImageType } from '@/payload-types'

type Props = {
  image: ImageType
  size: 'small' | 'big'
  alt: string
}

export function CustomImage({ image, alt, size }: Props) {
  if (image) {
    return (
      <Image
        className="h-full w-full object-cover"
        priority
        width={image.sizes?.[size]?.width!}
        height={image.sizes?.[size]?.height!}
        src={image.sizes?.[size]?.url!}
        alt={image.credit || alt}
      />
    )
  }
}
