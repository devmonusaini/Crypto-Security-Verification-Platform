import { motion } from 'motion/react';
import { AlertTriangle, XCircle, CheckCircle, Info, Shield } from 'lucide-react';

const alerts = [
  {
    type: 'warning',
    icon: AlertTriangle,
    title: 'Suspicious Wallet Activity Detected',
    description: 'Wallet 0x7a2...f4d has shown unusual transaction patterns in the last 24 hours',
    time: '2 minutes ago',
    network: 'BSC',
    color: '#FFB800',
  },
  {
    type: 'danger',
    icon: XCircle,
    title: 'Blacklisted Address',
    description: 'Address TRx5...9kL has been flagged for fraudulent activity and is on the global blacklist',
    time: '15 minutes ago',
    network: 'TRON',
    color: '#FF3B3B',
  },
  {
    type: 'success',
    icon: CheckCircle,
    title: 'Verified Safe Wallet',
    description: 'Wallet 0x3f8...2ba has been verified as legitimate with low risk score',
    time: '1 hour ago',
    network: 'BSC',
    color: '#00FFA3',
  },
  {
    type: 'info',
    icon: Info,
    title: 'New Scam Pattern Identified',
    description: 'Our AI has detected a new phishing technique targeting USDT holders. Stay vigilant.',
    time: '3 hours ago',
    network: 'ALL',
    color: '#00D1FF',
  },
];

export function AlertSystem() {
  return (
    <section id="alerts" className="py-24 px-4 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <motion.div
              className="w-3 h-3 bg-red-500 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <span className="text-red-500 font-semibold">LIVE ALERTS</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Real-time{' '}
            <span className="bg-gradient-to-r from-[#FF3B3B] to-[#FFB800] bg-clip-text text-transparent">
              Security Alerts
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Stay informed about potential threats and security events
          </p>
        </motion.div>

        {/* Alert Cards */}
        <div className="space-y-4 max-w-5xl mx-auto">
          {alerts.map((alert, index) => {
            const Icon = alert.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="group relative"
              >
                {/* Glow Effect */}
                <div 
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition duration-500"
                  style={{
                    background: `linear-gradient(to right, ${alert.color}40, ${alert.color}20)`,
                  }}
                />

                {/* Alert Card */}
                <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all overflow-hidden">
                  {/* Left Border */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: alert.color ,transformOrigin: 'top' }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                   
                  />

                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <motion.div
                      className="flex-shrink-0 p-3 rounded-xl"
                      style={{
                        backgroundColor: `${alert.color}20`,
                      }}
                      animate={alert.type === 'danger' || alert.type === 'warning' ? {
                        scale: [1, 1.1, 1],
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <Icon 
                        className="w-6 h-6" 
                        style={{ color: alert.color }}
                        strokeWidth={2}
                      />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-lg font-bold">{alert.title}</h3>
                        <span className="flex-shrink-0 text-xs text-gray-500">{alert.time}</span>
                      </div>
                      
                      <p className="text-gray-400 mb-3 leading-relaxed">
                        {alert.description}
                      </p>

                      <div className="flex items-center gap-3">
                        <span 
                          className="text-xs px-3 py-1 rounded-full font-semibold"
                          style={{
                            backgroundColor: `${alert.color}20`,
                            color: alert.color,
                          }}
                        >
                          {alert.network}
                        </span>
                        <span className="text-xs text-gray-500">
                          {alert.type.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pulse Animation for Critical Alerts */}
                  {(alert.type === 'danger' || alert.type === 'warning') && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: alert.color }}
                      animate={{
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Alert Subscription CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-white/10 rounded-2xl p-8 text-center">
            <Shield className="w-12 h-12 text-[#00FFA3] mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Stay Protected 24/7</h3>
            <p className="text-gray-400 mb-6">
              Get instant notifications about security threats, blacklisted addresses, and suspicious activities in real-time
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-[#00FFA3] to-[#00D1FF] text-black font-bold rounded-xl hover:shadow-lg hover:shadow-[#00FFA3]/30 transition-all">
                Enable Alerts
              </button>
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-semibold transition-all">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>

        {/* Security Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Threats Blocked', value: '15K+', color: '#FF3B3B' },
            { label: 'Active Alerts', value: '247', color: '#FFB800' },
            { label: 'Users Protected', value: '500K+', color: '#00FFA3' },
            { label: 'Response Time', value: '<1s', color: '#00D1FF' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.7 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 text-center"
            >
              <div 
                className="text-2xl font-bold mb-1"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}