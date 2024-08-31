import { faker } from '@faker-js/faker'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Artist, Episode, Show } from '@/payload-types'
import { formatSlug } from '@/payload/fields/slug/formatSlug'

const wipe_db = true
const payload = await getPayload({ config })

async function seed() {
  const numberOfArtists = Math.floor(Math.random() * 20) + 10
  const numberOfShows = Math.floor(Math.random() * 20) + 10
  const numberOfEpisodes = Math.floor(Math.random() * 100) + 10

  const artists: Partial<Artist>[] = []
  const shows: Partial<Show>[] = []
  const episodes: Partial<Episode>[] = []

  try {
    // Generate artists
    for (let i = 0; i < numberOfArtists; i += 1) {
      const artist = await generateFakeArtist()
      artists.push(artist)
    }
    console.log(`👶 Generated ${numberOfArtists} artists`)

    // Generate shows
    for (let i = 0; i < numberOfShows; i += 1) {
      const random_artists = [
        artists[Math.floor(Math.random() * artists.length)],
        artists[Math.floor(Math.random() * artists.length)],
      ]
      const show = await generateFakeShow(random_artists.map((artist) => artist.id as string))
      shows.push(show)
    }
    console.log(`🎬 Generated ${numberOfShows} shows`)

    // Generate episodes
    for (let i = 0; i < numberOfEpisodes; i += 1) {
      const random_show = shows[Math.floor(Math.random() * shows.length)]
      const random_artists: string[] = (random_show.curatedBy as Artist[]).map(
        (artist) => artist.id as string,
      )

      const episode = await generateFakeEpisode(random_show.id as string, random_artists)
      episodes.push(episode)
    }
    console.log(`🩷 Generated ${numberOfEpisodes} episodes`)

    console.log(`🎉 !! Successfully seeded !! 🎉`)
  } catch (error) {
    console.log(error)
  }
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
): Promise<Partial<Episode>> {
  const title = faker.commerce.productName()
  const slug = formatSlug(title)
  const data = {
    public: true,
    title: title,
    slug: slug,
    show: show_id,
    curatedBy: artists_id,
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
        collection: 'search',
        where: {
          id: {
            exists: true,
          },
        },
      })
      console.log('🧹 Wiped search')
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
