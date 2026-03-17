import { useEffect, useState } from 'react';
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

export default function App() {
  const [scanInput, setScanInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(true);



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
    <div className={`min-h-screen ${darkMode ? 'bg-[#0B0F19] text-white' : 'bg-white text-black'} `}>
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00FFA3]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Dark Mode Toggle */}
      {/* <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div> */}

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
        <HowItWorks />
        <TrustSection />
        
        {scanResult && <SecurityInsights result={scanResult} />}
        
        <AlertSystem />
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  );
}