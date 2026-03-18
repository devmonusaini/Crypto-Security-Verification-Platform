import { motion } from 'motion/react';
import { Wallet, Shield, Zap, Lock, Check } from 'lucide-react';

export function WalletIntegrations() {
  const wallets = [
    {
      name: 'MetaMask',
      icon: '🦊',
      description: 'Most popular Ethereum wallet',
      features: ['BSC Network', 'Secure', 'Browser Extension'],
      color: 'from-orange-500 to-orange-600',
    },
    {
      name: 'Trust Wallet',
      icon: '💎',
      description: 'Multi-chain mobile wallet',
      features: ['BSC Network', 'Mobile First', 'Built-in DApps'],
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'WalletConnect',
      icon: '🔗',
      description: 'Universal connection protocol',
      features: ['200+ Wallets', 'QR Code Scan', 'Cross-platform'],
      color: 'from-cyan-500 to-cyan-600',
    },
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: 'No Private Keys',
      description: 'We never request or store your private keys',
    },
    {
      icon: Shield,
      title: 'Read-Only Access',
      description: 'Only view public blockchain data',
    },
    {
      icon: Zap,
      title: 'Instant Connection',
      description: 'Connect in seconds with one click',
    },
  ];

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#00FFA3] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#00D1FF] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#00FFA3] to-[#00D1FF] bg-clip-text text-transparent">
              Connect Your Wallet
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Seamlessly integrate with popular crypto wallets for instant address verification
          </p>
        </motion.div>

        {/* Wallet Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {wallets.map((wallet, index) => (
            <motion.div
              key={wallet.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              {/* Card Glow */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${wallet.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`}></div>
              
              {/* Card Content */}
              <div className="relative bg-[#0F172A] border border-white/10 rounded-2xl p-8 h-full">
                {/* Icon */}
                <div className="text-6xl mb-4">{wallet.icon}</div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {wallet.name}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400 mb-6">
                  {wallet.description}
                </p>
                
                {/* Features */}
                <div className="space-y-2">
                  {wallet.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-[#00FFA3]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#00FFA3]/10 via-transparent to-[#00D1FF]/10 border border-[#00FFA3]/20 rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-white mb-2">
              Bank-Level Security
            </h3>
            <p className="text-gray-400">
              Your security is our top priority
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#00FFA3]/20 to-[#00D1FF]/20 rounded-2xl mb-4">
                  <feature.icon className="w-8 h-8 text-[#00FFA3]" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How to Connect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full">
            <Wallet className="w-5 h-5 text-[#00FFA3]" />
            <span className="text-gray-300">
              Click "Connect Wallet" in the navigation bar to get started
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
