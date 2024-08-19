import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '../access/checks'

export const Schedule: GlobalConfig = {
  slug: 'schedule',
  access: {
    read: isAdminOrEditor,
    update: isAdminOrEditor,
  },
  admin: {
    description: 'Configure the schedule for the app.',
  },
  fields: [
    {
      name: 'episode',
      type: 'relationship',
      relationTo: 'episodes', // "pages" is the slug of an existing collection
      required: true,
    },
  ],
}
