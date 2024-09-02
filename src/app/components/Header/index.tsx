import Link from 'next/link'
import { SearchComponent } from '../Search'
import { Suspense } from 'react'

export default function Nav() {
  return (
    <nav className="flex h-20 items-center justify-between border-b px-4">
      <div className="text-3xl font-semibold">
        <Link scroll={false} href={'/'}>
          00185fm
        </Link>
      </div>
      <div className="hidden gap-10 sm:flex">
        <Link scroll={false} href={'/archive'}>
          /archive
        </Link>
        <Link scroll={false} href={'/about'}>
          /about
        </Link>
        <Suspense>
          <SearchComponent />
        </Suspense>
      </div>
    </nav>
  )
}
