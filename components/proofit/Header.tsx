'use client'

import { useEffect, useState } from 'react'
import { getAccessToken, removeAccessToken } from '@/lib/api'
import { connectWallet, signInWithWallet } from '@/lib/wallet'

export function Header() {
  const [walletStatus, setWalletStatus] = useState('Not signed in')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const token = getAccessToken()
    if (token) {
      setWalletStatus('Connected')
    }
  }, [])

  const handleConnectWallet = async () => {
    try {
      setIsLoading(true)
      const address = await connectWallet()
      await signInWithWallet(address)
      setWalletStatus('Connected')
      window.dispatchEvent(new CustomEvent('walletConnected'))
    } catch (e: any) {
      alert(e.message || '지갑 연결에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = () => {
    removeAccessToken()
    setWalletStatus('Not signed in')
    window.dispatchEvent(new CustomEvent('walletDisconnected'))
  }

  return (
    <>
      <button
        id="btnWallet"
        style={{ display: 'none' }}
        onClick={handleConnectWallet}
      />
      <header className="app-header">
        <div className="header-content">
          <div className="header-logo">
            <h2>Proofit Demo</h2>
          </div>
          <div className="header-actions">
            {getAccessToken() ? (
              <button
                onClick={handleDisconnect}
                className="wallet-button"
                disabled={isLoading}
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={handleConnectWallet}
                className="wallet-button"
                disabled={isLoading}
              >
                Connect Wallet
              </button>
            )}
            <span className="wallet-status muted">{walletStatus}</span>
          </div>
        </div>
      </header>
    </>
  )
}
