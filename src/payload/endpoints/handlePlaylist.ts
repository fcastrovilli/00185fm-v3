import { addDataAndFileToRequest } from '@payloadcms/next/utilities'

import type { PayloadHandler, PayloadRequest } from 'payload'
import type { Audio } from '@/payload-types'

const playlistHandler: PayloadHandler = async (req: PayloadRequest) => {
  await addDataAndFileToRequest(req)
  const title: string | undefined = req.routeParams?.title as string

  // Check if title is defined
  if (!title || title === '')
    return Response.json({
      message: 'Playlist not found!',
    })

  const playlists = await req.payload.find({
    collection: 'playlists',
    depth: 1,
    pagination: false,
    where: {
      title: {
        equals: title,
      },
    },
  })
  if (playlists.totalDocs === 0)
    return Response.json({
      message: 'Playlist not found!',
    })

  const playlist = playlists.docs[0]

  const baseUrl = process.env.APP_BASE_URL ?? req.origin
  let m3uContent = '#EXTM3U\n\n'

  // Search for episodes with the playlist title
  const episodes = await req.payload.find({
    collection: 'episodes',
    depth: 1,
    pagination: false,
    where: {
      and: [
        {
          playlists: {
            equals: playlist.id,
          },
        },
        {
          public: {
            equals: true,
          },
        },
      ],
    },
  })

  if (episodes.totalDocs === 0)
    return new Response(m3uContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    })

  const parsed_audio_urls: { id: string; title: string; url: string }[] = []

  // Parse audio ids, titles and urls
  episodes.docs.forEach((episode) => {
    if (!episode.audio) return
    parsed_audio_urls.push({
      id: episode.id,
      title: episode.title
        .normalize('NFD') // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
        .trim()
        .replace(/['"“”^<>.;:,]/g, '')
        .replace(/\s+/g, ' '),
      url: (episode.audio as Audio).url || '',
    })
  })

  // Create M3U file
  parsed_audio_urls.forEach((audio) => {
    m3uContent += `#EXTINF:id="${audio.id}",title="${audio.title}"\n${baseUrl}${audio.url}\n\n`
  })

  return new Response(m3uContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}

export default playlistHandler
