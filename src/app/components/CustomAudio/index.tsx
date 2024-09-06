import { Audio } from '@/payload-types'

type Props = {
  audio: Audio | undefined
}

export function CustomAudio({ audio }: Props) {
  if (audio) {
    return <audio controls src={audio.url!}></audio>
  }
}
