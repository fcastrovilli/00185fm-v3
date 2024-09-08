'use client'

import Image from 'next/image'
import { Image as ImageType } from '@/payload-types'
import { cn } from '@/app/lib/utils'
import { useState } from 'react'

type Props = {
  image: ImageType | undefined
  size: 'small' | 'big'
  alt: string
  className?: string
  quality?: number
  priority?: boolean
  loading?: 'lazy' | 'eager'
}

export function CustomImage({
  image,
  alt,
  size,
  className,
  quality = 60,
  priority = false,
  loading = 'lazy',
}: Props) {
  const [isLoaded, setIsLoaded] = useState(false)

  if (typeof image === 'object') {
    return (
      <Image
        className={cn(
          className,
          `h-full w-full object-cover duration-500 ease-in-out ${isLoaded ? 'blur-0' : 'blur-sm'}`,
        )}
        priority={priority}
        width={image.sizes?.[size]?.width || image.width!}
        height={image.sizes?.[size]?.height || image.height!}
        src={image.sizes?.[size]?.url || image.url!}
        alt={image.credit || alt}
        quality={quality}
        placeholder="blur"
        blurDataURL={image.blurHash!}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
      />
    )
  }
}
