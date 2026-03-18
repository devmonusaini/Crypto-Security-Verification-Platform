import { motion } from 'motion/react';
import { ArrowRight, FileSearch, Cpu, BarChart3, FileCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: FileSearch,
    title: 'Enter Wallet or TX Hash',
    description: 'Paste your wallet address or transaction hash from BSC mainnet',
    color: '#00D1FF',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'System Scans Blockchain',
    description: 'Our advanced scanner analyzes blockchain data in real-time across networks',
    color: '#00FFA3',
  },
  {
    number: '03',
    icon: BarChart3,
    title: 'AI Risk Engine Analyzes',
    description: 'Machine learning algorithms calculate risk score and detect anomalies',
    color: '#FFB800',
  },
  {
    number: '04',
    icon: FileCheck,
    title: 'Get Instant Security Report',
    description: 'Receive comprehensive security analysis with actionable insights',
    color: '#9D4EDD',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FFA3]/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It{' '}
            <span className="bg-gradient-to-r from-[#00FFA3] to-[#00D1FF] bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Four simple steps to complete security analysis
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Connecting Line (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent z-0">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                      style={{ transformOrigin: 'left' }}
                    />
                    <motion.div
                      className="absolute right-0 top-1/2 -translate-y-1/2"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.8 }}
                    >
                      <ArrowRight className="w-5 h-5 text-white/40" />
                    </motion.div>
                  </div>
                )}

                {/* Step Card */}
                <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group">
                  {/* Step Number */}
                  <div 
                    className="absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl border-4 border-[#0B0F19]"
                    style={{
                      backgroundColor: step.color,
                      color: '#0B0F19',
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <motion.div
                    className="mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div 
                      className="inline-flex p-4 rounded-xl"
                      style={{
                        backgroundColor: `${step.color}15`,
                      }}
                    >
                      <Icon 
                        className="w-10 h-10" 
                        style={{ color: step.color }}
                        strokeWidth={1.5}
                      />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>

                  {/* Progress Indicator */}
                  <motion.div
                    className="mt-6 h-1 rounded-full"
                    style={{ backgroundColor: `${step.color}20` }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: step.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a 
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00FFA3] to-[#00D1FF] text-black font-bold rounded-xl hover:shadow-xl hover:shadow-[#00FFA3]/30 transition-all active:scale-95"
          >
            Start Scanning Now
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}