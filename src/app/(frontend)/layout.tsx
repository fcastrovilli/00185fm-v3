export const metadata = {
  title: '00185fm',
  description: '00185fm is the New Weird Italia radio station ✨',
}

import { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

import '../styles/globals.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="grid h-screen grid-rows-[auto,1fr,auto]">
        <Nav />
        <main className="overflow-y-scroll">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
