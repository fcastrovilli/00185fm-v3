import type { CollectionConfig } from 'payload'
import { authenticatedOrPublished, isAdminOrEditor } from '../access/checks'
import { Episode } from '@/payload-types'
import publishEpisode from '../endpoints/publishEpisode'
import { generatePreviewPath } from '../utils/generatePreviewPath'
import { slugField } from '../fields/slug'
import { versionsField } from '../fields/versions'
import { revalidateEpisode } from '../hooks/revalidateEpisode'

export const Episodes: CollectionConfig = {
  slug: 'episodes',
  access: {
    read: authenticatedOrPublished,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    description: 'Manage all the episodes.',
    useAsTitle: 'title',
    defaultColumns: ['title', 'curatedBy', 'show', '_status', 'publishedAt', 'tags'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          path: `/episodes/${typeof data?.slug === 'string' ? data.slug : ''}`,
        })
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (doc) =>
      generatePreviewPath({ path: `/episodes/${typeof doc?.slug === 'string' ? doc.slug : ''}` }),
  },
  ...versionsField(),
  endpoints: [
    {
      method: 'post',
      path: '/publish',
      handler: publishEpisode,
    },
  ],
  hooks: {
    afterChange: [revalidateEpisode],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              index: true,
            },
            {
              type: 'row',
              fields: [
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
                  name: 'show',
                  type: 'relationship',
                  relationTo: 'shows',
                  required: true,
                  hasMany: false,
                  index: true,
                },
              ],
            },
            {
              name: 'publishedAt',
              type: 'date',
              label: 'Published At',
              admin: {
                description:
                  'If the publish date is future, the episode will be published automatically on that date.',
                date: {
                  displayFormat: 'dd/MM/yyyy HH:mm',
                  timeFormat: 'HH:mm',
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
            {
              name: 'description',
              type: 'richText',
            },
          ],
        },
        {
          label: 'Files',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'audio',
                  type: 'upload',
                  relationTo: 'audio',
                  filterOptions: {
                    mimeType: { contains: 'audio' },
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'images',
                  filterOptions: {
                    mimeType: { contains: 'image' },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'defaultPlaylist',
      type: 'checkbox',
      label: 'Default Playlist',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Should this episode be added to the default playlist?',
      },
    },
    {
      name: 'playlists',
      type: 'relationship',
      relationTo: 'playlists',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
      defaultValue: () => [1],
      hooks: {
        beforeChange: [
          async ({ siblingData }: { siblingData: Partial<Episode> }) => {
            if (siblingData && siblingData.defaultPlaylist && !siblingData.playlists?.includes(1)) {
              siblingData.playlists?.push(1)
            } else if (siblingData && !siblingData.defaultPlaylist) {
              siblingData.playlists = siblingData.playlists?.filter((id) => id !== 1)
            }
          },
        ],
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
}
