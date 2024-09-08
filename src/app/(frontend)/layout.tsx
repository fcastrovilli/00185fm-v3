export const metadata = {
  title: '00185fm',
  description: '00185fm is the New Weird Italia radio station ✨',
}

import { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
  modal: ReactNode
}

import '../styles/globals.css'
import Nav from '../components/Header'
import Footer from '../components/Footer'
import { LivePreviewListener } from '../components/LivePreviewListener'
import Schedule from '../components/Schedule'
import { AdminBar } from '../components/AdminBar'
import { draftMode } from 'next/headers'

export default function RootLayout({ children, modal }: LayoutProps) {
  const { isEnabled } = draftMode()
  return (
    <html lang="en">
      <body>
        {modal}
        <div id="modal-root"></div>
        <AdminBar
          adminBarProps={{
            preview: isEnabled,
          }}
        />
        <LivePreviewListener />
        <div className="grid h-screen grid-rows-[auto,1fr,auto]">
          <Nav />
          <main className="h-full overflow-hidden p-4">
            {children}
            <Schedule />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
