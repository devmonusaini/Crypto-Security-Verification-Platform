import React from 'react';
import { motion } from 'motion/react';
import { Copy, Zap } from 'lucide-react';
import { useState } from 'react';

interface QuickStartProps {
  onScan: (address: string) => void;
}

const exampleAddresses = [
  {
    network: 'BSC',
    address: '0x55d398326f99059fF775485246999027B3197955',
    label: 'Official USDT (BSC) Contract',
    icon: '🟡',
  },
  {
    network: 'BSC',
    address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
    label: 'DAI (BSC) Contract',
    icon: '🟡',
  },
];

export function QuickStart({ onScan }: QuickStartProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (address: string, index: number) => {
    navigator.clipboard.writeText(address);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-white/10 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-[#00FFA3]" />
            <h3 className="text-2xl font-bold">Quick Start - Try These Examples</h3>
          </div>

          <p className="text-gray-400 mb-6">
            Click on any address below to scan it instantly, or copy it to use in the search above.
          </p>

          <div className="space-y-3">
            {exampleAddresses.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all group"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="text-2xl">{example.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-400 mb-1">{example.label}</div>
                    <div className="font-mono text-sm text-gray-300 truncate">{example.address}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(example.address, index)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-all"
                    title="Copy address"
                  >
                    {copiedIndex === index ? (
                      <span className="text-[#00FFA3] text-sm">✓</span>
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  <button
                    onClick={() => onScan(example.address)}
                    className="px-4 py-2 bg-gradient-to-r from-[#00FFA3] to-[#00D1FF] text-black text-sm font-bold rounded-lg hover:shadow-lg hover:shadow-[#00FFA3]/30 transition-all active:scale-95"
                  >
                    Scan
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
