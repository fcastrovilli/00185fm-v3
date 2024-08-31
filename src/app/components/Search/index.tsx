'use client'

import { useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export function SearchComponent() {
  const searchParams = useSearchParams()
  const [text, setText] = useState<string>(searchParams.get('search') ?? '')
  const { replace } = useRouter()
  const pathname = usePathname()

  const params = new URLSearchParams(searchParams)

  function handleSearch() {
    if (text && text !== '') {
      params.set('search', text)
    } else {
      params.delete('search')
    }
    replace(`${pathname == '/archive' ? pathname : '/archive'}?${params.toString()}`)
  }

  return (
    <form
      className="flex flex-row gap-2"
      action={() => {
        handleSearch()
      }}
    >
      <input
        className="border border-black"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  )
}
