import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="flex h-20 items-center justify-between border-b px-4">
      <div className="text-3xl font-semibold">
        <Link href={'/'}>00185fm</Link>
      </div>
      <div className="flex gap-4">
        <Link href={'/archive'}>Archive</Link>
        <Link href={'/shows'}>Shows</Link>
      </div>
    </nav>
  )
}
