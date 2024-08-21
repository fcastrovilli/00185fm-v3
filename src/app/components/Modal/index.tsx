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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <dialog
        ref={dialogRef}
        onClose={onDismiss}
        className="w-[90%] h-[90%] relative rounded-lg p-4"
      >
        <button className="absolute top-4 right-4 text-2xl" onClick={onDismiss}>
          ✕
        </button>
        {children}
      </dialog>
    </div>,
    document.getElementById('modal-root')!,
  )
}
