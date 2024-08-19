import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/checks'

export const Audio: CollectionConfig = {
  slug: 'audio',
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    description: 'Manage all the audio files.',
  },
  upload: {
    mimeTypes: ['audio/*'],
    focalPoint: false,
    crop: false,
  },
  fields: [],
}
