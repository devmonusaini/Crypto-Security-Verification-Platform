import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Shield, Search } from "lucide-react";
import { formatUnits } from "viem";
import {
  useAccount,
  useReadContract,
} from "wagmi";
import { ERC20_ABI, NETWORK_IDS, USDT_ADDRESSES } from "../config/contracts";
import { WalletConnect } from "./WalletConnect";

interface HeroProps {
  onScan: (input: string, walletUsdtBalance?: number) => void;
}

export function Hero({ onScan }: HeroProps) {
  const [input, setInput] = useState("");
  const { address, isConnected, chain } = useAccount();
  const { data: usdtBalance } = useReadContract({
    address: USDT_ADDRESSES.BSC as `0x${string}`,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: isConnected && chain?.id === NETWORK_IDS.BSC && !!address,
    },
  });

  useEffect(() => {
    if (isConnected && address) {
      setInput(address);
    } else if (!isConnected) {
      setInput("");
    }
  }, [isConnected, address]);



  const handleWalletAddressSelected = (address: string) => {
    setInput(address);
    // Optionally auto-scan when wallet is connected
    const parsedUsdt =
      usdtBalance !== undefined ? Number(formatUnits(usdtBalance as bigint, 18)) : undefined;
    onScan(address, parsedUsdt);
  };

  return (
    <section
      id="scan"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#00D1FF 1px, transparent 1px), linear-gradient(90deg, #00D1FF 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        >
          {/* Animated Nodes */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#00FFA3] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mt-20">
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-block"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-[#00FFA3]/30 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <Shield
              className="w-20 h-20 text-[#00FFA3] relative z-0"
              strokeWidth={1.5}
            />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-white via-[#00D1FF] to-[#00FFA3] bg-clip-text text-transparent">
            Secure & Verify Your USDT
          </span>
          <br />
          <span className="text-white">Instantly</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
        >
          Check wallet safety, detect scams, and validate
          transactions on BSC mainnet.
        </motion.p>

        {/* Wallet Connect Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center  justify-center mb-8"
        >
          <WalletConnect
            onAddressSelected={handleWalletAddressSelected}
          />
        </motion.div>





        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
        >
          {[
            { label: "Wallets Scanned", value: "1M+" },
            { label: "Detection Accuracy", value: "99.9%" },
            { label: "Scams Detected", value: "50K+" },
            { label: "Networks Supported", value: "1" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
            >
              <div className="text-3xl font-bold text-[#00FFA3] mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}