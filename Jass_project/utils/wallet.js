import { fetchJSON } from '../utils/api.js';
import { setAccessToken } from '../config/api.js';

export async function ensureMetamask() {
  // window.ethereum이 없는 경우
  if (typeof window.ethereum === 'undefined') {
    throw new Error("MetaMask가 설치되지 않았습니다.");
  }
  
  const eth = window.ethereum;
  
  // providers 배열이 있는 경우 (여러 지갑)
  if (eth.providers && Array.isArray(eth.providers) && eth.providers.length > 0) {
    // MetaMask를 우선적으로 찾기
    const metamask = eth.providers.find((p) => {
      try {
        return p && p.isMetaMask === true;
      } catch (e) {
        return false;
      }
    });
    
    if (metamask) {
      return metamask;
    }
    
    // MetaMask가 없으면 EVM 호환 지갑 찾기 (Solana 제외)
    const evmWallet = eth.providers.find((p) => {
      try {
        // Solana 지갑은 request 메서드가 다를 수 있음
        return p && typeof p.request === 'function' && !p.isPhantom;
      } catch (e) {
        return false;
      }
    });
    
    return evmWallet || eth.providers[0];
  }
  
  // 단일 지갑인 경우
  // Solana 지갑인지 확인 (Phantom 등)
  if (eth.isPhantom || (eth._metamask && !eth.isMetaMask)) {
    throw new Error("MetaMask를 사용해주세요. Solana 지갑은 지원하지 않습니다.");
  }
  
  return eth;
}

export async function connectWallet() {
  try {
    const eth = await ensureMetamask();
    
    // MetaMask인지 확인
    if (!eth.isMetaMask && eth.providers) {
      const metamask = eth.providers?.find(p => p.isMetaMask);
      if (metamask) {
        return await metamask.request({ method: "eth_requestAccounts" }).then(accounts => accounts[0]);
      }
    }
    
    const accounts = await eth.request({ method: "eth_requestAccounts" });
    return accounts[0];
  } catch (e) {
    // Solana 관련 오류 무시
    if (e.message && e.message.includes('Solana')) {
      throw new Error("MetaMask를 사용해주세요. Solana 지갑은 지원하지 않습니다.");
    }
    throw e;
  }
}

async function switchToBSCMainnet() {
  try {
    const eth = await ensureMetamask();
    const chainIdHex = await eth.request({ method: "eth_chainId" });

    // BSC mainnet = 0x38 (56)
    if (chainIdHex === "0x38") return;

    try {
      await eth.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }],
      });
    } catch (e) {
      // 등록 안 되어 있으면 추가 후 재시도
      if (e.code === 4902) {
        await eth.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x38",
              chainName: "BNB Smart Chain",
              nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
              blockExplorerUrls: ["https://bscscan.com/"],
            },
          ],
        });

        // 추가 후 스위치 재시도
        await eth.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }],
        });
      } else {
        throw e;
      }
    }
  } catch (e) {
    // Solana 관련 오류는 무시하고 재시도
    if (e.message && !e.message.includes('Solana')) {
      throw e;
    }
  }
}

async function getChainId() {
  const eth = await ensureMetamask();
  const chainIdHex = await eth.request({ method: "eth_chainId" });
  return parseInt(chainIdHex, 16);
}

export async function signInWithWallet(address) {
  try {
    const eth = await ensureMetamask();

    // BSC 네트워크로 전환
    await switchToBSCMainnet();
    
    // 실제 체인 ID 가져오기
    const chainId = await getChainId();

    // nonce 발급
    const nonceResp = await fetchJSON("/auth/nonce", {
      method: "POST",
      body: JSON.stringify({ address }),
    });

    // SIWE 메시지 생성 및 서명
    const message = buildSiweMessage(address, nonceResp.nonce, chainId);
    const signature = await requestSignature(message, address);

    // verify 및 JWT 발급
    const verifyResp = await fetchJSON("/auth/verify", {
      method: "POST",
      body: JSON.stringify({ message, signature }),
    });

    setAccessToken(verifyResp.accessToken);
    return verifyResp;
  } catch (e) {
    // Solana 관련 오류 처리
    if (e.message && e.message.includes('Solana')) {
      throw new Error("MetaMask를 사용해주세요. Solana 지갑은 지원하지 않습니다.");
    }
    throw e;
  }
}

function buildSiweMessage(address, nonce, chainId) {
  const domain = window.location.host;
  const uri = window.location.origin;
  const issuedAt = new Date().toISOString();
  
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
    `Issued At: ${issuedAt}`
  ].join('\n');
}

async function requestSignature(message, address) {
  try {
    const eth = await ensureMetamask();
    return await eth.request({
      method: "personal_sign",
      params: [message, address],
    });
  } catch (err) {
    if (err?.code === 4001) {
      throw new Error("사용자가 서명을 거절했습니다.");
    }
    // Solana 관련 오류 처리
    if (err.message && err.message.includes('Solana')) {
      throw new Error("MetaMask를 사용해주세요.");
    }
    throw err;
  }
}