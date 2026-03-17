import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Search } from 'lucide-react';

interface HeroProps {
  onScan: (input: string) => void;
}

export function Hero({ onScan }: HeroProps) {
  const [input, setInput] = useState('');
  const [network, setNetwork] = useState<'TRON' | 'BSC'>('TRON');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onScan(input);
    }
  };

  return (
    <section id="scan" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(#00D1FF 1px, transparent 1px), linear-gradient(90deg, #00D1FF 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
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
            <Shield className="w-20 h-20 text-[#00FFA3] relative z-10" strokeWidth={1.5} />
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
          Check wallet safety, detect scams, and validate transactions on TRON & BSC networks.
        </motion.p>

        {/* Network Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center gap-4 mb-8"
        >
          <button
            onClick={() => setNetwork('TRON')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              network === 'TRON'
                ? 'bg-[#FF0013] text-white shadow-lg shadow-[#FF0013]/50'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            🔷 TRON (TRC20)
          </button>
          <button
            onClick={() => setNetwork('BSC')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              network === 'BSC'
                ? 'bg-[#F3BA2F] text-black shadow-lg shadow-[#F3BA2F]/50'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            🟡 BSC (BEP20)
          </button>
        </motion.div>

        {/* Search Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto"
        >
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00FFA3] to-[#00D1FF] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            
            {/* Input Container */}
            <div className="relative bg-[#0F172A] rounded-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center">
                <Search className="absolute left-6 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter Wallet Address or TX Hash..."
                  className="w-full py-6 pl-16 pr-40 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-8 py-4 bg-gradient-to-r from-[#00FFA3] to-[#00D1FF] text-black font-bold rounded-xl hover:shadow-lg hover:shadow-[#00FFA3]/50 transition-all active:scale-95"
                >
                  Scan Now
                </button>
              </div>
            </div>
          </div>

          {/* Helper Text */}
          <p className="text-sm text-gray-500 mt-4">
            🔒 We never ask for private keys or access to your funds
          </p>
        </motion.form>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
        >
          {[
            { label: 'Wallets Scanned', value: '1M+' },
            { label: 'Detection Accuracy', value: '99.9%' },
            { label: 'Scams Detected', value: '50K+' },
            { label: 'Networks Supported', value: '2' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
            >
              <div className="text-3xl font-bold text-[#00FFA3] mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}