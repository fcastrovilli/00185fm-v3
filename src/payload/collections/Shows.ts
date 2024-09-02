import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/checks'
import { slugField } from '../fields/slug'

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
    defaultColumns: ['title', 'curatedBy', 'image'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      index: true,
    },
    {
      label: 'Curated By',
      name: 'curatedBy',
      type: 'relationship',
      relationTo: 'artists',
      required: true,
      hasMany: true,
      index: true,
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
    ...slugField(),
  ],
}
