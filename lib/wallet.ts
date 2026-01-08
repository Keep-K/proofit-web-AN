import { fetchJSON } from './api'
import { setAccessToken } from './api'

declare global {
  interface Window {
    ethereum?: any
  }
}

export async function ensureMetamask() {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask가 설치되지 않았습니다.')
  }

  const eth = window.ethereum

  if (eth.providers && Array.isArray(eth.providers) && eth.providers.length > 0) {
    const metamask = eth.providers.find((p: any) => {
      try {
        return p && p.isMetaMask === true
      } catch (e) {
        return false
      }
    })

    if (metamask) {
      return metamask
    }

    const evmWallet = eth.providers.find((p: any) => {
      try {
        return p && typeof p.request === 'function' && !p.isPhantom
      } catch (e) {
        return false
      }
    })

    return evmWallet || eth.providers[0]
  }

  if (eth.isPhantom || (eth._metamask && !eth.isMetaMask)) {
    throw new Error('MetaMask를 사용해주세요. Solana 지갑은 지원하지 않습니다.')
  }

  return eth
}

export async function connectWallet(): Promise<string> {
  try {
    const eth = await ensureMetamask()

    if (!eth.isMetaMask && eth.providers) {
      const metamask = eth.providers?.find((p: any) => p.isMetaMask)
      if (metamask) {
        return await metamask
          .request({ method: 'eth_requestAccounts' })
          .then((accounts: string[]) => accounts[0])
      }
    }

    const accounts = await eth.request({ method: 'eth_requestAccounts' })
    return accounts[0]
  } catch (e: any) {
    if (e.message && e.message.includes('Solana')) {
      throw new Error('MetaMask를 사용해주세요. Solana 지갑은 지원하지 않습니다.')
    }
    throw e
  }
}

async function switchToBSCMainnet() {
  try {
    const eth = await ensureMetamask()
    const chainIdHex = await eth.request({ method: 'eth_chainId' })

    if (chainIdHex === '0x38') return

    try {
      await eth.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }],
      })
    } catch (e: any) {
      if (e.code === 4902) {
        await eth.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x38',
              chainName: 'BNB Smart Chain',
              nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
              rpcUrls: ['https://bsc-dataseed.binance.org/'],
              blockExplorerUrls: ['https://bscscan.com/'],
            },
          ],
        })

        await eth.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x38' }],
        })
      } else {
        throw e
      }
    }
  } catch (e: any) {
    if (e.message && !e.message.includes('Solana')) {
      throw e
    }
  }
}

async function getChainId(): Promise<number> {
  const eth = await ensureMetamask()
  const chainIdHex = await eth.request({ method: 'eth_chainId' })
  return parseInt(chainIdHex, 16)
}

export async function signInWithWallet(address: string) {
  try {
    const eth = await ensureMetamask()

    await switchToBSCMainnet()

    const chainId = await getChainId()

    const nonceResp = await fetchJSON<{ nonce: string }>('/auth/nonce', {
      method: 'POST',
      body: JSON.stringify({ address }),
    })

    const message = buildSiweMessage(address, nonceResp.nonce, chainId)
    const signature = await requestSignature(message, address)

    const verifyResp = await fetchJSON<{ accessToken: string }>('/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ message, signature }),
    })

    setAccessToken(verifyResp.accessToken)
    return verifyResp
  } catch (e: any) {
    if (e.message && e.message.includes('Solana')) {
      throw new Error('MetaMask를 사용해주세요. Solana 지갑은 지원하지 않습니다.')
    }
    throw e
  }
}

function buildSiweMessage(address: string, nonce: string, chainId: number): string {
  const domain = window.location.host
  const uri = window.location.origin
  const issuedAt = new Date().toISOString()

  return [
    `${domain} wants you to sign in with your Ethereum account:`,
    address,
    '',
    'Sign in to Proofit Demo.',
    '',
    `URI: ${uri}`,
    'Version: 1',
    `Chain ID: ${chainId}`,
    `Nonce: ${nonce}`,
    `Issued At: ${issuedAt}`,
  ].join('\n')
}

async function requestSignature(message: string, address: string): Promise<string> {
  try {
    const eth = await ensureMetamask()
    return await eth.request({
      method: 'personal_sign',
      params: [message, address],
    })
  } catch (err: any) {
    if (err?.code === 4001) {
      throw new Error('사용자가 서명을 거절했습니다.')
    }
    if (err.message && err.message.includes('Solana')) {
      throw new Error('MetaMask를 사용해주세요.')
    }
    throw err
  }
}
