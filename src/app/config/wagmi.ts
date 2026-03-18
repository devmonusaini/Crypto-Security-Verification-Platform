import { http, createConfig } from 'wagmi'
import { bsc } from 'wagmi/chains'
import { metaMask, walletConnect, trustWallet } from 'wagmi/connectors'

export const config = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http(),
  },
  connectors: [
    metaMask(),
    trustWallet(),
    walletConnect({
      projectId: "0ce8aee287b84db4976604d12ad15af9",
    }),
  ],
})