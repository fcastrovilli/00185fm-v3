import { faker } from '@faker-js/faker'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Artist, Episode, Show, Tag } from '@/payload-types'
import { formatSlug } from '@/payload/fields/slug/formatSlug'

const wipe_db = true
const payload = await getPayload({ config })

const numberOfTags = Math.floor(Math.random() * 100) + 100
const numberOfArtists = Math.floor(Math.random() * 100) + 100
const numberOfShows = Math.floor(Math.random() * 100) + 100
const numberOfEpisodes = Math.floor(Math.random() * 100) + 1000

async function seed() {
  const tags: Partial<Tag>[] = []
  const artists: Partial<Artist>[] = []
  const shows: Partial<Show>[] = []
  const episodes: Partial<Episode>[] = []

  try {
    // Generate tags
    const raw_tags = await generateFakeTags()
    tags.push(...raw_tags)

    // for (let i = 0; i < numberOfTags; i += 1) {
    //   const tag = await generateFakeTag()
    //   if (tag.id) {
    //     tags.push(tag)
    //   }
    // }
    console.log(`🏷️ Generated ${tags.length} tags`)

    // Generate artists
    for (let i = 0; i < numberOfArtists; i += 1) {
      const artist = await generateFakeArtist()
      if (artist) {
        artists.push(artist)
      }
    }
    console.log(`👶 Generated ${artists.length} artists`)

    // Generate shows
    for (let i = 0; i < numberOfShows; i += 1) {
      let random_artists: string[] = []
      for (let j = 0; j < Math.floor(Math.random() * 3) + 1; j += 1) {
        random_artists.push(artists[Math.floor(Math.random() * artists.length)].id as string)
      }
      const show = await generateFakeShow(random_artists)
      if (show) {
        shows.push(show)
      }
    }
    console.log(`🎬 Generated ${shows.length} shows`)

    // Generate episodes
    for (let i = 0; i < numberOfEpisodes; i += 1) {
      const random_show = shows[Math.floor(Math.random() * shows.length)]
      const random_artists: string[] = (random_show.curatedBy as Artist[]).map(
        (artist) => artist.id as string,
      )

      let random_tags: string[] = []
      for (let j = 0; j < Math.floor(Math.random() * 5) + 1; j += 1) {
        random_tags.push(tags[Math.floor(Math.random() * tags.length)].id as string)
      }

      const episode = await generateFakeEpisode(
        random_show.id as string,
        random_artists,
        random_tags,
      )
      if (episode) {
        episodes.push(episode)
      }
    }
    console.log(`🩷 Generated ${episodes.length} episodes`)

    console.log(`🎉 !! Successfully seeded !! 🎉`)
  } catch (error) {
    console.log(error)
  }
}

async function generateFakeTags(): Promise<Partial<Tag>[]> {
  const raw_tags = faker.helpers.uniqueArray(faker.music.genre, numberOfTags)
  const data = raw_tags.map((tag) => {
    return {
      name: tag,
    }
  })
  const tags: Partial<Tag>[] = []
  try {
    for (let i = 0; i < data.length; i += 1) {
      tags.push(
        await payload.create({
          collection: 'tags',
          data: data[i],
        }),
      )
    }
  } catch (error) {
    console.log(error)
  }
  return tags
}

async function generateFakeArtist(): Promise<Partial<Artist>> {
  const name = faker.person.fullName()
  const data = {
    name: name,
    slug: formatSlug(name),
  }
  let artist: Partial<Artist> = {}
  try {
    artist = await payload.create({
      collection: 'artists',
      data: data,
    })
  } catch (error) {
    console.log(error)
  }
  return artist
}

async function generateFakeShow(artists_id: string[]): Promise<Partial<Show>> {
  const title = faker.commerce.productName()
  const slug = formatSlug(title)
  const data = {
    title: title,
    slug: slug,
    curatedBy: artists_id,
  }
  let show: Partial<Show> = {}
  try {
    show = await payload.create({
      collection: 'shows',
      data: data,
    })
  } catch (error) {
    console.log(error)
  }
  return show
}

async function generateFakeEpisode(
  show_id: string,
  artists_id: string[],
  tags_id: string[],
): Promise<Partial<Episode>> {
  const title = faker.commerce.productName()
  const slug = formatSlug(title)
  const data = {
    public: true,
    title: title,
    slug: slug,
    show: show_id,
    curatedBy: artists_id,
    tags: tags_id,
    playlists: [1],
    publishedAt: faker.date.past().toISOString(),
  }

  let episode: Partial<Episode> = {}
  try {
    episode = await payload.create({
      collection: 'episodes',
      data: data,
    })
  } catch (error) {
    console.log(error)
  }

  return episode
}

async function wipeCollections() {
  if (wipe_db) {
    try {
      await payload.delete({
        collection: 'artists',
        where: {
          id: {
            exists: true,
          },
        },
      })
      console.log('🧹 Wiped artists')
      await payload.delete({
        collection: 'shows',
        where: {
          id: {
            exists: true,
          },
        },
      })
      console.log('🧹 Wiped shows')
      await payload.delete({
        collection: 'episodes',
        where: {
          id: {
            exists: true,
          },
        },
      })
      console.log('🧹 Wiped episodes')
      await payload.delete({
        collection: 'images',
        where: {
          id: {
            exists: true,
          },
        },
      })
      console.log('🧹 Wiped images')
      await payload.delete({
        collection: 'audio',
        where: {
          id: {
            exists: true,
          },
        },
      })
      console.log('🧹 Wiped audio')
      await payload.delete({
        collection: 'tags',
        where: {
          id: {
            exists: true,
          },
        },
      })
      console.log('🧹 Wiped tags')
    } catch (e) {
      console.log(e)
    }
  }
}

await wipeCollections()
  .then(async () => await seed())
  .finally(() => process.exit(0))
