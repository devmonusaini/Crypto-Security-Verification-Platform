import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {

      setIsScrolled(window.scrollY > 50);
    };


    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Security', href: '#security' },
    { label: 'Alerts', href: '#alerts' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0B0F19]/95 backdrop-blur-xl border-b border-white/10 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-[#00FFA3]/30 rounded-lg blur-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <div className="relative p-2 bg-gradient-to-br from-[#00FFA3] to-[#00D1FF] rounded-lg">
                <Shield className="w-6 h-6 text-black" strokeWidth={2} />
              </div>
            </div>
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                USDT Security
              </div>
              <div className="text-xs text-gray-400">Blockchain Verification</div>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className="text-gray-300 hover:text-[#00FFA3] transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FFA3] group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#scan"
              className="px-6 py-2.5 bg-gradient-to-r from-[#00FFA3] to-[#00D1FF] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#00FFA3]/30 transition-all active:scale-95"
            >
              Scan Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() =>{ 
              setIsScrolled(true); // Ensure navbar is solid when mobile menu is open
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0B0F19]/95 backdrop-blur-xl border-t border-white/10 py-4"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-300 hover:text-[#00FFA3] transition-colors px-4 py-2 hover:bg-white/5 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#scan"
                className="mx-4 px-6 py-3 bg-gradient-to-r from-[#00FFA3] to-[#00D1FF] text-black font-bold rounded-lg text-center hover:shadow-lg hover:shadow-[#00FFA3]/30 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Scan Now
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
