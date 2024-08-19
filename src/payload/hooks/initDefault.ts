import type { BasePayload } from 'payload'

export const createDefaultPlaylist = async (payload: BasePayload) => {
  try {
    const playlist = await payload.find({
      collection: 'playlists',
      where: {
        title: {
          equals: 'default',
        },
      },
      limit: 1,
      pagination: false,
    })
    if (playlist.totalDocs === 0) {
      await payload.create({
        collection: 'playlists',
        data: {
          id: 1,
          title: 'default',
        },
      })
      console.log('Default Playlist Initialized')
    } else {
      console.log('Default Playlist Exists')
    }
  } catch (error) {
    console.log('Error', error)
  }
}
