import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/checks'
import { generateBlurHash } from '../hooks/blurHash'

export const Images: CollectionConfig = {
  slug: 'images',
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    description: 'Manage all the images.',
  },
  upload: {
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'small',
        width: 350,
        height: 350,
        position: 'centre',
        fit: 'inside',
        formatOptions: { format: 'webp' },
      },
      {
        name: 'big',
        width: 1024,
        height: 1024,
        position: 'centre',
        fit: 'inside',
        formatOptions: { format: 'webp' },
      },
    ],
    crop: true,
    focalPoint: true,
    formatOptions: { format: 'webp' },
    adminThumbnail: 'small',
  },
  hooks: {
    beforeValidate: [generateBlurHash],
  },
  fields: [
    {
      name: 'credit',
      type: 'text',
    },
    {
      name: 'blurHash',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
  ],
}
