import { motion } from 'motion/react';
import { Shield, Search, AlertTriangle, BarChart3, Globe } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Wallet Security Check',
    description: 'Comprehensive security analysis of wallet addresses with real-time threat detection and verification.',
    color: '#00FFA3',
  },
  {
    icon: Search,
    title: 'Transaction Verification',
    description: 'Verify transaction authenticity and trace the complete history of USDT transfers on the blockchain.',
    color: '#00D1FF',
  },
  {
    icon: AlertTriangle,
    title: 'Scam Detection System',
    description: 'Advanced AI-powered system to identify fraudulent activities, fake tokens, and phishing attempts.',
    color: '#FF3B3B',
  },
  {
    icon: BarChart3,
    title: 'Risk Score Analysis',
    description: 'Detailed risk assessment with scoring from 0-100 based on multiple security parameters and patterns.',
    color: '#FFB800',
  },
  {
    icon: Globe,
    title: 'BSC Mainnet Support',
    description: 'Built for Binance Smart Chain (BSC) mainnet with BEP20-focused wallet and transaction analysis.',
    color: '#9D4EDD',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#00FFA3] to-[#00D1FF] bg-clip-text text-transparent">
              Advanced Security
            </span>{' '}
            Features
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Bank-grade security tools to protect your crypto assets
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500"
                  style={{
                    background: `linear-gradient(to right, ${feature.color}40, ${feature.color}20)`,
                  }}
                />

                {/* Card */}
                <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 h-full hover:bg-white/10 transition-all">
                  {/* Icon */}
                  <div className="mb-6">
                    <div 
                      className="inline-flex p-4 rounded-xl"
                      style={{
                        backgroundColor: `${feature.color}15`,
                      }}
                    >
                      <Icon 
                        className="w-8 h-8" 
                        style={{ color: feature.color }}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>

                  {/* Decorative Element */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 rounded-full"
                    style={{ backgroundColor: feature.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-[#00FFA3]/10 to-[#00D1FF]/10 border border-[#00FFA3]/20 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold mb-3">
            🔒 Zero-Knowledge Security
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            All scans are performed using public blockchain data. We never ask for private keys, seed phrases, or access to your funds. Your security is our priority.
          </p>
        </motion.div>
      </div>
    </section>
  );
}