import { Episode, Show, Tag } from '@/payload-types'
import Image from 'next/image'

type Props = {
  episode: Episode
}

export default function Hover({ episode }: Props) {
  return (
    <div>
      <Image
        src="/img/hovercard_1000.webp"
        className="relative z-20"
        alt={episode.title}
        width={350}
        height={350}
      />
      <div className="absolute inset-0 z-10 grid grid-rows-3">
        <div className="row-start-3 mx-2 mb-4 flex items-center justify-center rounded-md bg-white/85 text-center text-black shadow-[rgba(255,255,255,0.85)_0px_0px_20px_5px] sm:mb-5 md:mb-6">
          <div>
            <div className="text-xs sm:text-sm lg:text-base">
              <p className="line-clamp-1 font-semibold uppercase leading-none">{episode.title}</p>
              <p className="line-clamp-1 leading-none">{(episode.show as Show).title}</p>
            </div>
            <p className="line-clamp-1 text-xs uppercase italic leading-tight">
              {(episode.tags as Tag[]).map((tag) => `#${tag.name}`).join(' ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
