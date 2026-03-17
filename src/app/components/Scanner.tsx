import { motion, AnimatePresence } from 'motion/react';
import { Shield, AlertTriangle, XCircle, CheckCircle, X, Download, Copy } from 'lucide-react';
import { useState } from 'react';

interface ScannerProps {
  isScanning: boolean;
  result: any;
  onClose: () => void;
}

export function Scanner({ isScanning, result, onClose }: ScannerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'safe':
        return {
          icon: CheckCircle,
          color: '#00FFA3',
          bgColor: 'bg-[#00FFA3]/10',
          borderColor: 'border-[#00FFA3]/30',
          label: 'Verified Safe',
          glow: 'shadow-[#00FFA3]/50',
        };
      case 'suspicious':
        return {
          icon: AlertTriangle,
          color: '#FFB800',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/30',
          label: 'Suspicious Activity',
          glow: 'shadow-yellow-500/50',
        };
      case 'danger':
        return {
          icon: XCircle,
          color: '#FF3B3B',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/30',
          label: 'High Risk',
          glow: 'shadow-red-500/50',
        };
      default:
        return {
          icon: Shield,
          color: '#00D1FF',
          bgColor: 'bg-cyan-500/10',
          borderColor: 'border-cyan-500/30',
          label: 'Analyzing...',
          glow: 'shadow-cyan-500/50',
        };
    }
  };

  return (
    <AnimatePresence>
      {(isScanning || result) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0F172A] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold">Security Scan Results</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scanning Animation */}
            {isScanning && (
              <div className="p-12 text-center">
                <motion.div
                  className="relative w-32 h-32 mx-auto mb-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute inset-0 border-4 border-[#00D1FF]/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-transparent border-t-[#00D1FF] rounded-full"></div>
                  <Shield className="absolute inset-0 m-auto w-16 h-16 text-[#00D1FF]" />
                </motion.div>

                <h3 className="text-xl font-semibold mb-4">Scanning Blockchain...</h3>
                
                {/* Scanning Steps */}
                <div className="space-y-3 max-w-md mx-auto text-left">
                  {[
                    'Detecting network...',
                    'Verifying wallet address...',
                    'Analyzing transaction history...',
                    'Checking blacklist database...',
                    'Calculating risk score...',
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.4 }}
                      className="flex items-center gap-3 text-gray-400"
                    >
                      <motion.div
                        className="w-2 h-2 bg-[#00FFA3] rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                      {step}
                    </motion.div>
                  ))}
                </div>

                {/* Scanning Bar */}
                <div className="mt-8 bg-white/5 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#00D1FF] to-[#00FFA3]"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3, ease: 'easeInOut' }}
                  />
                </div>
              </div>
            )}

            {/* Results */}
            {result && !isScanning && (
              <div className="p-6 space-y-6">
                {/* Status Badge */}
                {(() => {
                  const statusInfo = getStatusInfo(result.status);
                  const StatusIcon = statusInfo.icon;
                  
                  return (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`${statusInfo.bgColor} ${statusInfo.borderColor} border-2 rounded-2xl p-8 text-center`}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="inline-block mb-4"
                      >
                        <StatusIcon 
                          className="w-20 h-20 mx-auto" 
                          style={{ color: statusInfo.color }}
                          strokeWidth={1.5}
                        />
                      </motion.div>
                      <h3 className="text-3xl font-bold mb-2">{statusInfo.label}</h3>
                      <p className="text-gray-400">
                        Network: <span className="text-white font-semibold">{result.network}</span>
                      </p>
                    </motion.div>
                  );
                })()}

                {/* Risk Score */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold">Risk Score</h4>
                    <span className="text-3xl font-bold" style={{
                      color: result.riskScore < 30 ? '#00FFA3' : result.riskScore < 70 ? '#FFB800' : '#FF3B3B'
                    }}>
                      {result.riskScore}/100
                    </span>
                  </div>
                  <div className="bg-white/5 rounded-full h-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.riskScore}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{
                        background: result.riskScore < 30 
                          ? 'linear-gradient(to right, #00FFA3, #00D1FF)' 
                          : result.riskScore < 70 
                          ? 'linear-gradient(to right, #FFB800, #FF8800)'
                          : 'linear-gradient(to right, #FF3B3B, #FF0000)'
                      }}
                    />
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-sm text-gray-400 mb-1">Transactions</div>
                    <div className="text-2xl font-bold">{result.transactionCount}</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-sm text-gray-400 mb-1">Balance</div>
                    <div className="text-2xl font-bold">{result.balance} USDT</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-sm text-gray-400 mb-1">Blacklist Status</div>
                    <div className="text-lg font-bold" style={{ color: result.isBlacklisted ? '#FF3B3B' : '#00FFA3' }}>
                      {result.isBlacklisted ? '🚫 Blacklisted' : '✅ Clear'}
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-sm text-gray-400 mb-1">Contract Status</div>
                    <div className="text-lg font-bold" style={{ color: result.contractVerified ? '#00FFA3' : '#FFB800' }}>
                      {result.contractVerified ? '✅ Verified' : '⚠️ Unverified'}
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-sm text-gray-400 mb-2">Wallet Address</div>
                  <div className="font-mono text-sm break-all text-gray-300">{result.address}</div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Copy className="w-5 h-5" />
                    {copied ? 'Copied!' : 'Copy Results'}
                  </button>
                  <button className="flex-1 py-3 px-4 bg-gradient-to-r from-[#00FFA3] to-[#00D1FF] text-black rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" />
                    Download Report
                  </button>
                </div>

                {/* Warning Message */}
                {result.suspiciousActivity && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 flex items-start gap-3"
                  >
                    <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-yellow-500 mb-1">Suspicious Activity Detected</div>
                      <div className="text-sm text-gray-400">
                        This wallet has shown patterns consistent with potentially fraudulent activity. Exercise extreme caution.
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
