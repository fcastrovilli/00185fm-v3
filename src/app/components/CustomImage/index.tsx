import Image from 'next/image'
import { Image as ImageType } from '@/payload-types'
import { cn } from '@/app/lib/utils'

type Props = {
  image: ImageType | undefined
  size: 'small' | 'big'
  alt: string
  className?: string
  quality?: number
}

export function CustomImage({ image, alt, size, className, quality = 65 }: Props) {
  if (typeof image === 'object') {
    return (
      <Image
        className={cn(className, 'h-full w-full object-cover')}
        priority
        width={image.sizes?.[size]?.width || image.width!}
        height={image.sizes?.[size]?.height || image.height!}
        src={image.sizes?.[size]?.url || image.url!}
        alt={image.credit || alt}
        quality={quality}
        placeholder="blur"
        blurDataURL={image.blurHash!}
      />
    )
  }
}
