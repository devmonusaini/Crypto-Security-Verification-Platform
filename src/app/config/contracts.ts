// USDT Token Addresses
export const USDT_ADDRESSES = {
  BSC: '0x55d398326f99059fF775485246999027B3197955', // USDT on BSC
  TRON: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', // USDT on TRON (TRC20)
} as const;

// Minimal ERC20 ABI for balance checking
export const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
] as const;

// Network IDs
export const NETWORK_IDS = {
  BSC: 56,
  TRON: 728126428,
} as const;
