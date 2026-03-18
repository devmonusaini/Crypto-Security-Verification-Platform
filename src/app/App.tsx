import { useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './config/wagmi';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Scanner } from './components/Scanner';
import { QuickStart } from './components/QuickStart';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { TrustSection } from './components/TrustSection';
import { SecurityInsights } from './components/SecurityInsights';
import { AlertSystem } from './components/AlertSystem';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { WalletIntegrations } from './components/WalletIntegrations';

const queryClient = new QueryClient();

export default function App() {
  const [scanInput, setScanInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const handleScan = (input: string) => {
    setScanInput(input);
    setIsScanning(true);
    setScanResult(null);

    // Simulate scanning with mock data
    setTimeout(() => {
      // Detect network type based on input
      const isTron = input.startsWith('T') || Math.random() > 0.5;
      const network = isTron ? 'TRON' : 'BSC';
      
      // Generate mock scan result
      const riskScore = Math.floor(Math.random() * 100);
      const status = riskScore < 30 ? 'safe' : riskScore < 70 ? 'suspicious' : 'danger';
      
      setScanResult({
        network,
        address: input,
        riskScore,
        status,
        isBlacklisted: riskScore > 80,
        transactionCount: Math.floor(Math.random() * 1000),
        balance: (Math.random() * 10000).toFixed(2),
        firstSeen: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        contractVerified: Math.random() > 0.3,
        suspiciousActivity: riskScore > 50,
      });
      
      setIsScanning(false);
    }, 3000);
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-[#0B0F19] text-white">
          {/* Background Effects */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00FFA3]/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <Navbar />
            <Hero onScan={handleScan} />
            
            {(isScanning || scanResult) && (
              <Scanner 
                isScanning={isScanning} 
                result={scanResult}
                onClose={() => {
                  setScanResult(null);
                  setIsScanning(false);
                }}
              />
            )}
            
            <QuickStart onScan={handleScan} />
            <Features />
            <WalletIntegrations />
            <HowItWorks />
            <TrustSection />
            
            {scanResult && <SecurityInsights result={scanResult} />}
            
            <AlertSystem />
            <Footer />
            <ScrollToTop />
          </div>
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}