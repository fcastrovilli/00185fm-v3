import type { GlobalConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from '../access/checks'
import nowplayingHandler from '../endpoints/handleNowPlaying'
import sseHandler from '../endpoints/handleSSE'

import NowPlayingSSE from '../hooks/nowPlayingSSE'

export const NowPlaying: GlobalConfig = {
  slug: 'now_playing',
  label: 'Now Playing',
  access: {
    read: isAdminOrEditor,
    update: isAdmin,
  },
  admin: {
    description:
      'Configure the Now Playing feature for the app. This is automatically updated when a new episode is playing but you can also manually manage it.',
  },
  hooks: {
    afterChange: [NowPlayingSSE],
  },
  endpoints: [
    {
      path: '/update',
      method: 'post',
      handler: nowplayingHandler,
    },
    {
      path: '/sse',
      method: 'get',
      handler: sseHandler,
    },
  ],
  fields: [
    // {
    //   name: 'skip_song',
    //   type: 'ui',
    //   label: 'Skip Song',
    //   admin: {
    //     components: {
    //       Field: '@/components/SkipSong#SkipSongComponent',
    //     },
    //   },
    // },
    // {
    //   name: 'restart_icecast',
    //   type: 'ui',
    //   label: 'Restart Icecast',
    //   admin: {
    //     components: {
    //       Field: '@/components/RestartIcecast#RestartIcecastComponent',
    //     },
    //   },
    // },
    {
      type: 'row',
      fields: [
        {
          name: 'episode',
          type: 'relationship',
          label: 'Episode',
          relationTo: 'episodes',
        },
        {
          name: 'is_live',
          label: 'Live',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
        },
        {
          name: 'artist',
          label: 'Artist',
          type: 'text',
        },
      ],
    },
  ],
}
