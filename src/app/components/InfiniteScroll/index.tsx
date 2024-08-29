// 'use client'

// import { Artist, Episode, Show } from '@/payload-types'
// import Link from 'next/link'
// import { getPaginatedEpisodes } from '@/app/actions'
// import { PaginatedDocs } from 'payload'

// type Props = {
//   init_data: PaginatedDocs<Episode>
//   children: React.ReactNode
// }

// const InfiniteScroll = ({ init_data, children }: Props) => {
//   const episodes = init_data
//   return (
//     <div>
//       {children}
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {episodes.docs.map((episode) => (
//           <div key={episode.id} className="bg-slate-300/70 p-4 rounded-lg flex flex-col gap-2 my-2">
//             <Link scroll={false} href={`/episodes/${episode.slug}`}>Title: {episode.title}</Link>
//             <Link scroll={false} href={`/shows/${(episode.show as Show).slug}`}>
//               Show: {(episode.show as Show).title}
//             </Link>
//             {(episode.curatedBy as Artist[]).map((curatedBy) => (
//               <Link scroll={false} key={curatedBy.id} href={`/artists/${curatedBy.slug}`}>
//                 Curated By: {curatedBy.name}
//               </Link>
//             ))}
//           </div>
//         ))}
//       </div>
//       <div className="text-3xl text-center w-full">Load more...</div>
//     </div>
//   )
// }

// export default InfiniteScroll
