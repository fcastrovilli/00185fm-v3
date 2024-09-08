import type { CollectionConfig } from 'payload'
import { authenticatedOrPublished, isAdminOrEditor } from '../access/checks'
import { slugField } from '../fields/slug'
import { versionsField } from '../fields/versions'
import { generatePreviewPath } from '../utils/generatePreviewPath'
import { revalidateArtist } from '../hooks/revalidateArtist'

export const Artists: CollectionConfig = {
  slug: 'artists',
  access: {
    read: authenticatedOrPublished,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    useAsTitle: 'name',
    description: 'Manage all the curators.',
    defaultColumns: ['name', '_status'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          path: `/artists/${typeof data?.slug === 'string' ? data.slug : ''}`,
        })
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (doc) =>
      generatePreviewPath({ path: `/artists/${typeof doc?.slug === 'string' ? doc.slug : ''}` }),
  },
  hooks: {
    afterChange: [revalidateArtist],
  },
  ...versionsField(),
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
