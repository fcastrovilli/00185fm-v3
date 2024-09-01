import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/checks'

export const Search: CollectionConfig = {
  slug: 'search',
  access: {
    read: isAdminOrEditor,
    create: () => false,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    useAsTitle: 'title',
    description:
      'This is a collection of automatically created search results. These results are used by the global site search and will be updated automatically as documents in the CMS are created or updated.',
    enableRichTextRelationship: false,
  },
  fields: [
    {
      name: 'title',
      admin: {
        readOnly: true,
      },
      type: 'text',
    },
    {
      name: 'priority',
      admin: {
        position: 'sidebar',
      },
      type: 'number',
    },
    {
      name: 'doc',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      index: true,
      maxDepth: 1,
      relationTo: ['episodes', 'shows', 'artists'],
      required: true,
      type: 'relationship',
    },
  ],
}
