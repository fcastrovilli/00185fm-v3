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

export default function RootLayout({ children, modal }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        {modal}
        <div id="modal-root"></div>
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
