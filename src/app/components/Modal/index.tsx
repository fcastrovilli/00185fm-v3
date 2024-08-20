'use client'

import { type ComponentRef, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const dialogRef = useRef<ComponentRef<'dialog'>>(null)

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal()
    }
  }, [])

  function onDismiss() {
    router.back()
  }

  return createPortal(
    <div>
      <dialog ref={dialogRef} onClose={onDismiss}>
        {children}
        <button onClick={onDismiss} />
      </dialog>
    </div>,
    document.getElementById('modal-root')!,
  )
}
