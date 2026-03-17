import { motion } from 'motion/react';
import { CheckCircle, Shield, Zap, TrendingUp } from 'lucide-react';

const trustFeatures = [
  {
    icon: CheckCircle,
    title: '100% Blockchain Verified Data',
    description: 'All data is sourced directly from blockchain networks with cryptographic verification',
  },
  {
    icon: Zap,
    title: 'Real-time TRON & BSC Analysis',
    description: 'Instant scanning with sub-second response times across both networks',
  },
  {
    icon: Shield,
    title: 'Advanced Anti-Scam Detection',
    description: 'AI-powered pattern recognition to identify fraudulent activities',
  },
];

const stats = [
  { value: '1M+', label: 'Wallets Scanned', color: '#00FFA3' },
  { value: '99.9%', label: 'Detection Accuracy', color: '#00D1FF' },
  { value: '50K+', label: 'Scams Detected', color: '#FF3B3B' },
  { value: '24/7', label: 'Monitoring', color: '#FFB800' },
];

export function TrustSection() {
  return (
    <section id="security" className="py-24 px-4 relative">
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
            Trusted by{' '}
            <span className="bg-gradient-to-r from-[#00FFA3] to-[#00D1FF] bg-clip-text text-transparent">
              Crypto Community
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Industry-leading security verification trusted by millions
          </p>
        </motion.div>

        {/* Stats Counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div 
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500"
                style={{
                  background: `linear-gradient(to right, ${stat.color}40, ${stat.color}20)`,
                }}
              />

              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className="text-4xl md:text-5xl font-bold mb-2"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-400">{stat.label}</div>

                {/* Pulse Effect */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
                  style={{ backgroundColor: stat.color }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
              >
                <Icon className="w-12 h-12 text-[#00FFA3] mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Live Monitoring Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-white/10 rounded-2xl p-8 overflow-hidden relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Live Network Activity</h3>
              <p className="text-gray-400">Real-time blockchain monitoring</p>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-3 h-3 bg-[#00FFA3] rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <span className="text-[#00FFA3] font-semibold">Live</span>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="space-y-4">
            {[
              { network: 'TRON', status: 'safe', address: 'TXm2...9kL3', time: '2s ago' },
              { network: 'BSC', status: 'suspicious', address: '0x4f5...8a2B', time: '5s ago' },
              { network: 'TRON', status: 'safe', address: 'TRp8...4mK9', time: '8s ago' },
              { network: 'BSC', status: 'safe', address: '0x9c3...1fD4', time: '12s ago' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between bg-white/5 rounded-xl p-4 border border-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'safe' ? 'bg-[#00FFA3]' : 'bg-yellow-500'
                  }`} />
                  <div>
                    <div className="font-mono text-sm">{activity.address}</div>
                    <div className="text-xs text-gray-400">{activity.network}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded ${
                    activity.status === 'safe' 
                      ? 'bg-[#00FFA3]/20 text-[#00FFA3]' 
                      : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {activity.status === 'safe' ? '✓ Safe' : '⚠ Check'}
                  </span>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#00FFA3]/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#00D1FF]/10 rounded-full blur-3xl"></div>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3">
            <Shield className="w-5 h-5 text-[#00FFA3]" />
            <span className="text-sm">Verified Security Platform • No Data Collection • Open Source</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}