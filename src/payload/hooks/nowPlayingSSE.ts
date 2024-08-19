import type { GlobalAfterChangeHook, PayloadRequest } from 'payload'

import { NowPlaying } from '@/payload-types'
import { connectionManager } from '../utils/sse'

const NowPlayingSSE: GlobalAfterChangeHook = async ({
  doc,
  req,
}: {
  doc: NowPlaying
  req: PayloadRequest
}) => {
  if (!doc.episode || doc.is_live === undefined) return
  let np: NowPlaying = doc

  if (typeof doc.episode === 'number') {
    np.episode = await req.payload.findByID({
      collection: 'episodes',
      id: doc.episode,
      depth: 1,
    })
    connectionManager.sendEvent(np)
  } else {
    connectionManager.sendEvent(np)
  }
}

export default NowPlayingSSE
