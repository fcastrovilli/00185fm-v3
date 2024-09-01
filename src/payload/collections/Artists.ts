import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/checks'
import { slugField } from '../fields/slug'

export const Artists: CollectionConfig = {
  slug: 'artists',
  access: {
    read: isAdminOrEditor,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    useAsTitle: 'name',
    description: 'Manage all the curators.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'bio',
      type: 'richText',
    },
    ...slugField('name'),
  ],
}
