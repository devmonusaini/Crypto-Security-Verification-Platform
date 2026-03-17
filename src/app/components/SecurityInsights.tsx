import { motion } from 'motion/react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity, TrendingUp, Shield, AlertCircle } from 'lucide-react';

interface SecurityInsightsProps {
  result: any;
}

// Mock data for charts
const transactionHistory = [
  { date: 'Mar 10', transactions: 45, volume: 2300 },
  { date: 'Mar 11', transactions: 52, volume: 3100 },
  { date: 'Mar 12', transactions: 38, volume: 1900 },
  { date: 'Mar 13', transactions: 61, volume: 4200 },
  { date: 'Mar 14', transactions: 55, volume: 3800 },
  { date: 'Mar 15', transactions: 48, volume: 2900 },
  { date: 'Mar 16', transactions: 72, volume: 5100 },
];

const riskDistribution = [
  { name: 'Low Risk', value: 65, color: '#00FFA3' },
  { name: 'Medium Risk', value: 25, color: '#FFB800' },
  { name: 'High Risk', value: 10, color: '#FF3B3B' },
];

const tokenAnalysis = [
  { category: 'Legitimate', count: 850 },
  { category: 'Suspicious', count: 120 },
  { category: 'Scam', count: 30 },
];

export function SecurityInsights({ result }: SecurityInsightsProps) {
  return (
    <section className="py-24 px-4 relative">
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
              Security Insights
            </span>{' '}
            Panel
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Detailed analysis and visualization of wallet security data
          </p>
        </motion.div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Transaction History Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-[#00D1FF]" />
                <h3 className="text-xl font-bold">Transaction History</h3>
              </div>
              <span className="text-sm text-gray-400">Last 7 days</span>
            </div>
            
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={transactionHistory}>
                <defs>
                  <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D1FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00D1FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="date" stroke="#888" tick={{ fill: '#888' }} />
                <YAxis stroke="#888" tick={{ fill: '#888' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0F172A', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="transactions" 
                  stroke="#00D1FF" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorTransactions)" 
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="text-gray-400">Total Transactions</div>
              <div className="text-[#00D1FF] font-bold">{result.transactionCount}</div>
            </div>
          </motion.div>

          {/* Risk Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-[#00FFA3]" />
                <h3 className="text-xl font-bold">Risk Distribution</h3>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0F172A', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 space-y-2">
              {riskDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-400">{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Token Legitimacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-[#FFB800]" />
                <h3 className="text-xl font-bold">Token Legitimacy</h3>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={tokenAnalysis}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="category" stroke="#888" tick={{ fill: '#888' }} />
                <YAxis stroke="#888" tick={{ fill: '#888' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0F172A', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {tokenAnalysis.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 0 ? '#00FFA3' : index === 1 ? '#FFB800' : '#FF3B3B'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Contract Verification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-[#9D4EDD]" />
                <h3 className="text-xl font-bold">Detailed Analysis</h3>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Contract Verification</div>
                  <div className="font-semibold">
                    {result.contractVerified ? '✅ Verified' : '⚠️ Unverified'}
                  </div>
                </div>
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                  style={{
                    backgroundColor: result.contractVerified ? '#00FFA320' : '#FFB80020'
                  }}
                >
                  {result.contractVerified ? '✓' : '!'}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Blacklist Status</div>
                  <div className="font-semibold">
                    {result.isBlacklisted ? '🚫 Blacklisted' : '✅ Clear'}
                  </div>
                </div>
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                  style={{
                    backgroundColor: result.isBlacklisted ? '#FF3B3B20' : '#00FFA320'
                  }}
                >
                  {result.isBlacklisted ? '✕' : '✓'}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <div className="text-sm text-gray-400 mb-1">First Activity</div>
                  <div className="font-semibold">
                    {new Date(result.firstSeen).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {Math.floor((Date.now() - new Date(result.firstSeen).getTime()) / (1000 * 60 * 60 * 24))} days ago
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Network</div>
                  <div className="font-semibold flex items-center gap-2">
                    {result.network === 'TRON' ? '🔷' : '🟡'} {result.network}
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {result.network === 'TRON' ? 'TRC20' : 'BEP20'}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-white/10 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-6">Security Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-400 mb-2">Overall Risk Level</div>
              <div 
                className="text-3xl font-bold"
                style={{
                  color: result.riskScore < 30 ? '#00FFA3' : result.riskScore < 70 ? '#FFB800' : '#FF3B3B'
                }}
              >
                {result.riskScore < 30 ? 'Low' : result.riskScore < 70 ? 'Medium' : 'High'}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-2">Total Balance</div>
              <div className="text-3xl font-bold">{result.balance} USDT</div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-2">Total Transactions</div>
              <div className="text-3xl font-bold">{result.transactionCount}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
