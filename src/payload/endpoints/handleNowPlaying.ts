import { addDataAndFileToRequest } from '@payloadcms/next/utilities'

import type { PayloadHandler, PayloadRequest } from 'payload'
import type { Episode } from '@/payload-types'

type NowPlaying = {
  id: string
  is_live: boolean
}

const nowplayingHandler: PayloadHandler = async (req: PayloadRequest) => {
  await addDataAndFileToRequest(req)
  const np: NowPlaying = req.data as NowPlaying
  try {
    if (!np.id || np.is_live === undefined || np.is_live === null) {
      console.error('Bad request')
      return new Response('Bad request', { status: 400 })
    }
    let episode: Episode | null = null

    episode = await req.payload.findByID({
      collection: 'episodes',
      id: np.id,
      depth: 0,
    })

    if (!episode) {
      return new Response('Episode not found', { status: 404 })
    }

    await req.payload.updateGlobal({
      slug: 'now_playing',
      data: {
        episode: episode.id,
        is_live: np.is_live,
      },
    })

    return new Response('Well done!')
  } catch (error) {
    return new Response('Now Playing update failed', { status: 500 })
  }
}

export default nowplayingHandler
