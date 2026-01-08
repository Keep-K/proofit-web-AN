'use client'

import { useEffect, useState } from 'react'

export function LoadingOverlay() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const show = () => setIsVisible(true)
    const hide = () => setIsVisible(false)

    window.addEventListener('walletConnecting', show)
    window.addEventListener('walletConnected', hide)
    window.addEventListener('walletDisconnected', hide)

    return () => {
      window.removeEventListener('walletConnecting', show)
      window.removeEventListener('walletConnected', hide)
      window.removeEventListener('walletDisconnected', hide)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div id="walletLoadingOverlay" className="loading-overlay" style={{ display: 'flex' }}>
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p className="loading-text">Connecting wallet...</p>
      </div>
    </div>
  )
}
