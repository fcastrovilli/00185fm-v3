import type { PayloadHandler, PayloadRequest } from 'payload'

import { addDataAndFileToRequest } from '@payloadcms/next/utilities'
import { NextResponse } from 'next/server'

import { connectionManager } from '../utils/sse'

const sseHandler: PayloadHandler = async (req: PayloadRequest) => {
  await addDataAndFileToRequest(req)

  const { readable, writable } = new TransformStream()
  const writer = writable.getWriter()

  // Add the connection to the manager
  const connectionId = connectionManager.addConnection(writer)

  // Remove the connection on abort
  req.signal?.addEventListener('abort', () => {
    connectionManager.removeConnection(connectionId)
    writer.close()
  })

  return new NextResponse(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}

export default sseHandler
