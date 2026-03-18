import { http, createConfig } from 'wagmi'
import { bsc } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'
import { PROJECT_ID } from '../../../env';

export const config = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http(),
  },
  connectors: [
    injected(),
    walletConnect({
      projectId: PROJECT_ID,
    }),
  ],
})