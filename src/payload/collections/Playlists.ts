import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/checks'
import playlistHandler from '../endpoints/handlePlaylist'
import { randomInt } from 'crypto'

export const Playlists: CollectionConfig = {
  slug: 'playlists',
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: ({ data, req }) => {
      if (data?.title === 'default') {
        return false
      } else {
        return isAdminOrEditor({ req })
      }
    },
    delete: ({ data, req }) => {
      if (data?.title === 'default') {
        return false
      } else {
        return isAdminOrEditor({ req })
      }
    },
  },
  admin: {
    useAsTitle: 'title',
    description: 'Manage all the playlists. DO NOT DELETE THE DEFAULT ONE.',
    defaultColumns: ['title'],
  },
  endpoints: [
    {
      path: '/:title',
      method: 'get',
      handler: playlistHandler,
    },
  ],
  fields: [
    {
      name: 'id',
      type: 'number',
      required: true,
      defaultValue: randomInt(2, 9999),
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value }) => {
            return value.trim().toLowerCase()
          },
        ],
      },
    },
  ],
}
