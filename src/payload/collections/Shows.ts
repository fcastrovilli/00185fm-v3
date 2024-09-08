import type { CollectionConfig } from 'payload'
import { authenticatedOrPublished, isAdminOrEditor } from '../access/checks'
import { slugField } from '../fields/slug'
import { versionsField } from '../fields/versions'
import { generatePreviewPath } from '../utils/generatePreviewPath'
import { revalidateShow } from '../hooks/revalidateShow'

export const Shows: CollectionConfig = {
  slug: 'shows',
  access: {
    read: authenticatedOrPublished,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  ...versionsField(),
  admin: {
    useAsTitle: 'title',
    description: 'Manage all the shows.',
    defaultColumns: ['title', 'curatedBy', '_status', 'image'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          path: `/shows/${typeof data?.slug === 'string' ? data.slug : ''}`,
        })
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (doc) =>
      generatePreviewPath({ path: `/shows/${typeof doc?.slug === 'string' ? doc.slug : ''}` }),
  },
  hooks: {
    afterChange: [revalidateShow],
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
