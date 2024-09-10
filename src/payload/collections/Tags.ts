import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/checks'

export const Tags: CollectionConfig = {
  slug: 'tags',
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    useAsTitle: 'name',
    description: 'Manage all the tags.',
    defaultColumns: ['name'],
  },
  fields: [
    {
      name: 'name',
      label: 'Tag',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}
