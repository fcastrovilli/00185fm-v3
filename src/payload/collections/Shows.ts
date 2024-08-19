import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/checks'

export const Shows: CollectionConfig = {
  slug: 'shows',
  access: {
    read: isAdminOrEditor,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    useAsTitle: 'title',
    description: 'Manage all the shows.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      label: 'Curated By',
      name: 'curatedBy',
      type: 'relationship',
      relationTo: 'artists',
      required: true,
      hasMany: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'images',
      filterOptions: {
        mimeType: { contains: 'image/*' },
      },
    },
  ],
}
