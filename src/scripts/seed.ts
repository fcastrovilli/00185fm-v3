import { faker } from '@faker-js/faker'
import { getPayload, RequiredDataFromCollectionSlug } from 'payload'
import config from '@payload-config'
import { Artist, Episode, Image, Show, Tag } from '@/payload-types'
import { formatSlug } from '@/payload/fields/slug/formatSlug'
import https from 'https'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { IncomingMessage } from 'http'
import { pipeline } from 'stream'
import { promisify } from 'util'

const wipe_db = true
const payload = await getPayload({ config })
const streamPipeline = promisify(pipeline)
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const numberOfTags = Math.floor(Math.random() * 100) + 50
const numberOfArtists = Math.floor(Math.random() * 100) + 50
const numberOfShows = Math.floor(Math.random() * 100) + 50
const numberOfEpisodes = Math.floor(Math.random() * 100) + 100

async function seed() {
  const tags: Partial<Tag>[] = []
  const artists: Partial<Artist>[] = []
  const shows: Partial<Show>[] = []
  const episodes: Partial<Episode>[] = []

  try {
    // Generate tags
    const raw_tags = await generateFakeTags()
    tags.push(...raw_tags)

    payload.logger.info(`🏷️  Generated ${tags.length} tags`)

    // Generate artists
    for (let i = 0; i < numberOfArtists; i += 1) {
      const artist = await generateFakeArtist()
      if (artist) {
        artists.push(artist)
      }
    }
    payload.logger.info(`🧜‍♀️ Generated ${artists.length} artists`)

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
    payload.logger.info(`🎬 Generated ${shows.length} shows`)

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
    payload.logger.info(`🩷 Generated ${episodes.length} episodes`)

    await cleanupTmpImages()
    payload.logger.info(`🎉 !! Successfully seeded !! 🎉`)
  } catch (error) {
    console.error(error)
  }
}

async function cleanupTmpImages() {
  const directory = path.join(dirname, 'tmp_img')
  fs.rmdirSync(directory, { recursive: true })
}

async function getFakeImage(title: string) {
  const url = `https://picsum.photos/seed/${title}/1000/1000`
  const redirectedUrl = `${await getRedirectedUrl(url)}`

  const imagePath = await downloadImage(redirectedUrl)

  const imageData: Omit<Image, 'id' | 'createdAt' | 'updatedAt'> = {
    credit: faker.person.fullName(),
  }

  try {
    const image: Image = await payload.create({
      collection: 'images',
      data: imageData,
      filePath: imagePath, // Pass the local path
    })

    // Cleanup the local file after creation
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(`Failed to delete the file: ${imagePath}`, err)
      }
    })

    return image
  } catch (error) {
    // If an error occurs during creation, make sure to still clean up the file
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(`Failed to delete the file: ${imagePath} after an error`, err)
      }
    })

    throw error // Re-throw the error after cleanup
  }
}

function getRedirectedUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        // Check if it's a redirect
        if (
          response.statusCode &&
          response.statusCode >= 300 &&
          response.statusCode < 400 &&
          response.headers.location
        ) {
          resolve(response.headers.location) // Return the final redirected URL
        } else {
          reject(new Error('No redirect found'))
        }
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}

async function downloadImage(url: string): Promise<string> {
  const filePath = path.join(dirname, 'tmp_img', `image-${Date.now()}.jpg`)

  // Ensure the directory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true })

  // Download the image and save it to a local path
  const response = await new Promise<IncomingMessage>((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode === 200) {
          resolve(res)
        } else {
          reject(new Error(`Failed to download image. Status code: ${res.statusCode}`))
        }
      })
      .on('error', (err) => reject(err))
  })

  // Use streamPipeline to save the response data into the file
  await streamPipeline(response, fs.createWriteStream(filePath))

  return filePath
}

async function generateFakeTags(): Promise<Partial<Tag>[]> {
  const raw_tags = faker.helpers.uniqueArray(faker.music.genre, numberOfTags)
  const data: RequiredDataFromCollectionSlug<'tags'>[] = raw_tags.map((tag) => {
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
    console.error(error)
  }
  return tags
}

async function generateFakeArtist(): Promise<Partial<Artist>> {
  const name = faker.person.fullName()
  const data: RequiredDataFromCollectionSlug<'artists'> = {
    _status: 'published',
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
    console.error(error)
  }
  return artist
}

async function generateFakeShow(artists_id: string[]): Promise<Partial<Show>> {
  const title = faker.commerce.productName()
  const slug = formatSlug(title)
  const data: RequiredDataFromCollectionSlug<'shows'> = {
    _status: 'published',
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
    console.error(error)
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
  const status = Math.random() > 0.3 ? 'draft' : 'published'
  const data: RequiredDataFromCollectionSlug<'episodes'> = {
    _status: status,
    title: title,
    slug: slug,
    show: show_id,
    curatedBy: artists_id,
    tags: tags_id,
    image: (await getFakeImage(title)).id,
    playlists: [1],
    publishedAt: faker.date.past().toISOString(),
  }

  let episode: Partial<Episode> = {}
  try {
    episode = await payload.create({
      collection: 'episodes',
      data: data,
    })
    payload.logger.info(`✨ Created episode: "${episode.title}"`)
  } catch (error) {
    console.error(error)
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
      payload.logger.info('🧹 Wiped artists')
      await payload.delete({
        collection: 'shows',
        where: {
          id: {
            exists: true,
          },
        },
      })
      payload.logger.info('🧹 Wiped shows')
      await payload.delete({
        collection: 'episodes',
        where: {
          id: {
            exists: true,
          },
        },
      })
      payload.logger.info('🧹 Wiped episodes')
      await payload.delete({
        collection: 'images',
        where: {
          id: {
            exists: true,
          },
        },
      })
      payload.logger.info('🧹 Wiped images')
      await payload.delete({
        collection: 'audio',
        where: {
          id: {
            exists: true,
          },
        },
      })
      payload.logger.info('🧹 Wiped audio')
      await payload.delete({
        collection: 'tags',
        where: {
          id: {
            exists: true,
          },
        },
      })
      payload.logger.info('🧹 Wiped tags')
    } catch (e) {
      console.error(e)
    }
  }
}

await wipeCollections()
  .then(async () => await seed())
  .finally(() => process.exit(0))
