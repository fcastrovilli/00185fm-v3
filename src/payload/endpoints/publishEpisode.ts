import type { PayloadHandler, PayloadRequest } from 'payload'

import { addDataAndFileToRequest } from '@payloadcms/next/utilities'

const publishEpisode: PayloadHandler = async (req: PayloadRequest) => {
  await addDataAndFileToRequest(req)
  const today = new Date()
  const start = today.setHours(0, 0, 0, 0)
  const end = today.setHours(23, 59, 59, 999)

  await req.payload.update({
    collection: 'episodes',
    where: {
      and: [
        {
          publishedAt: {
            greater_than: start,
          },
        },
        {
          publishedAt: {
            less_than: end,
          },
        },
        {
          public: {
            equals: false,
          },
        },
      ],
    },
    data: {
      public: true,
      defaultPlaylist: true,
    },
  })
  return new Response('Published!!')
}

export default publishEpisode
