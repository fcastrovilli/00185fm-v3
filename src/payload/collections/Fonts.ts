import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/checks'

export const Fonts: CollectionConfig = {
  slug: 'fonts',
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    description:
      'Manage all the fonts for the app. The only font type allowed is WOFF2. Please make sure to use the correct file extension.',
    useAsTitle: 'name',
  },
  upload: {
    mimeTypes: ['.woff2', 'application/font-woff2'],
    focalPoint: false,
    crop: false,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        data.mimeType = 'application/font-woff2'
      },
    ],
  },
  fields: [
    {
      name: 'name',
      label: 'Font Name',
      type: 'text',
      required: true,
      defaultValue: 'Untitled',
      admin: {
        position: 'sidebar',
        description: 'The font family to use. Please do not include spaces.',
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            return value.replace(/\s/g, '-')
          },
        ],
      },
    },
  ],
}
