// Resolve Path
import path from 'path'
import { fileURLToPath } from 'url'

// Payload
// import { payloadCloudPlugin } from '@payloadcms/plugin-cloud'
import { searchPlugin } from '@payloadcms/plugin-search'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { s3Storage } from '@payloadcms/storage-s3'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'

// Image Optimization
import sharp from 'sharp'

// Collections
import {
  Users,
  Artists,
  Audio,
  Episodes,
  Images,
  Playlists,
  Shows,
  Tags,
} from './payload/collections'

// Globals
import { NowPlaying, Schedule } from './payload/globals'

// Hooks
import { createDefaultPlaylist } from './payload/hooks/initDefault'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  csrf: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''].filter(Boolean),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  onInit: async (payload) => {
    await createDefaultPlaylist(payload)
  },
  collections: [Users, Artists, Audio, Episodes, Images, Playlists, Shows, Tags],
  globals: [NowPlaying, Schedule],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        [Audio.slug]: {
          disableLocalStorage: true,
          prefix: 'audio',
        },
        [Images.slug]: {
          disableLocalStorage: true,
          prefix: 'images',
        },
      },
      disableLocalStorage: true,
      bucket: process.env.S3_BUCKET || '',
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY || '',
          secretAccessKey: process.env.S3_SECRET_KEY || '',
        },
        endpoint: process.env.S3_ENDPOINT || '',
        region: process.env.S3_REGION || '',
      },
    }),
    searchPlugin({
      collections: ['episodes', 'shows', 'artists'],
      defaultPriorities: {
        episodes: 10,
        shows: 20,
        artists: 30,
      },
      searchOverrides: {
        slug: 'search',
        fields: ({ defaultFields }) => [
          ...defaultFields,
          {
            name: 'slug',
            type: 'text',
            admin: {
              readOnly: true,
            },
          },
        ],
      },
      beforeSync: ({ originalDoc, searchDoc }) => {
        return {
          ...searchDoc,
          slug: originalDoc.slug,
        }
      },
    }),
    // payloadCloudPlugin(),
  ],
})
