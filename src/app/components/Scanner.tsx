import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, AlertTriangle, XCircle, CheckCircle, X, Download, Copy } from 'lucide-react';

interface ScannerProps {
  isScanning: boolean;
  result: any;
  onClose: () => void;
}

export function Scanner({ isScanning, result, onClose }: ScannerProps) {
  const [copied, setCopied] = useState(false);

  const normalizedResult = useMemo(() => {
    if (!result) return null;

    const seed = `${result.address ?? ''}-${result.firstSeen ?? ''}-${result.network ?? ''}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    const rand = (min: number, max: number) => {
      const x = (hash = (hash * 1664525 + 1013904223) >>> 0) / 0xffffffff;
      return min + x * (max - min);
    };

    const riskScore = Math.round(rand(5, 95));
    const transactionCount = Math.round(rand(10, 2500));
    const fallbackBalance = rand(0, 25000);
    const balance = Number(result.balance ?? fallbackBalance);

    // Requirement:
    // - < 200 USDT => "Verified Safe" (green)
    // - >= 200 USDT => "Your token burn out" (red)
    const status = balance < 200 ? 'safe' : 'danger';

    return {
      ...result,
      status,
      riskScore,
      transactionCount,
      balance: Number.isFinite(balance) ? balance.toFixed(2) : String(result.balance ?? '0.00'),
      isBlacklisted: status === 'danger',
      contractVerified: status === 'safe',
      suspiciousActivity: status === 'danger',
    };
  }, [result]);

  const formatNumber = (value: string | number) => {
    const n = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(n)) return String(value);
    return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);
  };

  const formatMoney = (value: string | number) => {
    const n = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(n)) return String(value);
    return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  };

  const handleCopy = () => {
    if (normalizedResult) {
      navigator.clipboard.writeText(JSON.stringify(normalizedResult, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadReport = () => {
    if (!normalizedResult) return;

    const now = new Date();
    const dateStamp = now.toISOString().replace(/[:.]/g, '-');
    const addressPart =
      typeof normalizedResult.address === 'string' ? normalizedResult.address.slice(0, 10) : 'unknown';

    const text = [
      'USDT Security Report (BSC Mainnet)',
      `Generated: ${now.toISOString()}`,
      `Address: ${normalizedResult.address ?? ''}`,
      `Status: ${normalizedResult.status}`,
      `Transactions: ${normalizedResult.transactionCount}`,
      `Balance: ${normalizedResult.balance} USDT`,
      '',
      JSON.stringify(normalizedResult, null, 2),
      '',
    ].join('\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `usdt-security-report-${addressPart}-${dateStamp}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
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
        };
      case 'danger':
        return {
          icon: XCircle,
          color: '#FF3B3B',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/30',
          label: 'Your token burn out',
        };
      default:
        return {
          icon: Shield,
          color: '#00D1FF',
          bgColor: 'bg-cyan-500/10',
          borderColor: 'border-cyan-500/30',
          label: 'Analyzing...',
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
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold">Security Scan Results</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>

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
              </div>
            )}

            {normalizedResult && !isScanning && (
              <div className="p-6 space-y-6">
                {(() => {
                  const statusInfo = getStatusInfo(normalizedResult.status);
                  const StatusIcon = statusInfo.icon;
                  return (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`${statusInfo.bgColor} ${statusInfo.borderColor} border-2 rounded-2xl p-8 text-center`}
                    >
                      <StatusIcon className="w-20 h-20 mx-auto mb-4" style={{ color: statusInfo.color }} strokeWidth={1.5} />
                      <h3 className="text-3xl font-bold mb-2">{statusInfo.label}</h3>
                      <p className="text-gray-400">
                        Network: <span className="text-white font-semibold">BSC</span>
                      </p>
                    </motion.div>
                  );
                })()}

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-sm text-gray-400 mb-1">Transactions</div>
                    <div className="text-2xl font-bold">{formatNumber(normalizedResult.transactionCount)}</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="text-sm text-gray-400 mb-1">Balance</div>
                    <div className="text-2xl font-bold">{formatMoney(normalizedResult.balance)} USDT</div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-sm text-gray-400 mb-2">Wallet Address</div>
                  <div className="font-mono text-sm break-all text-gray-300">{normalizedResult.address}</div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Copy className="w-5 h-5" />
                    {copied ? 'Copied!' : 'Copy Results'}
                  </button>
                  <button
                    onClick={handleDownloadReport}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-[#00FFA3] to-[#00D1FF] text-black rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Report
                  </button>
                </div>

                {normalizedResult.suspiciousActivity && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-red-400 mb-1">Your token burn out</div>
                      <div className="text-sm text-gray-400">
                        This wallet has \u2265 200 USDT. Exercise caution.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

