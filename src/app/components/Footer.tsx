import { motion } from 'motion/react';
import { Shield, Mail, FileText, Lock, Twitter, Github, MessageCircle } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Security', href: '#security' },
      { label: 'API Documentation', href: '#api' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
      { label: 'Disclaimer', href: '#disclaimer' },
    ],
    support: [
      { label: 'Help Center', href: '#help' },
      { label: 'Contact Us', href: '#contact' },
      { label: 'Report Scam', href: '#report' },
      { label: 'FAQ', href: '#faq' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter', color: '#1DA1F2' },
    { icon: Github, href: '#', label: 'GitHub', color: '#fff' },
    { icon: MessageCircle, href: '#', label: 'Discord', color: '#5865F2' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-[#0B0F19]/80 backdrop-blur-lg">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-[#00FFA3]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-[#00D1FF]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-[#00FFA3] to-[#00D1FF] rounded-lg">
                  <Shield className="w-6 h-6 text-black" strokeWidth={2} />
                </div>
                <span className="text-xl font-bold">USDT Security</span>
              </div>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                Advanced blockchain security platform for verifying USDT wallets and transactions on TRON and BSC networks. Protect your crypto assets with our AI-powered threat detection.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" style={{ color: social.color }} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#00FFA3] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#00FFA3] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#00FFA3] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Security Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 p-6 bg-gradient-to-r from-[#00FFA3]/10 to-[#00D1FF]/10 border border-[#00FFA3]/20 rounded-xl"
        >
          <div className="flex items-start gap-4">
            <Lock className="w-6 h-6 text-[#00FFA3] flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold mb-2 text-[#00FFA3]">🔒 Security & Privacy Notice</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                <strong>We do not store private keys or access funds.</strong> All security scans are performed using publicly available blockchain data. This platform is for verification purposes only. We do not have access to your wallet, cannot perform transactions on your behalf, and never ask for sensitive information like private keys, seed phrases, or passwords. Always verify wallet addresses and exercise caution when interacting with unknown parties.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              © {currentYear} USDT Security Platform. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#00FFA3] rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              <span>•</span>
              <span>Made with ❤️ for crypto security</span>
            </div>
          </div>
        </motion.div>

        {/* Supported Networks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex items-center justify-center gap-8 flex-wrap"
        >
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Supported Networks:</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
            <span className="text-[#FF0013]">🔷</span>
            <span className="text-sm font-semibold">TRON (TRC20)</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
            <span className="text-[#F3BA2F]">🟡</span>
            <span className="text-sm font-semibold">BSC (BEP20)</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00FFA3] to-transparent opacity-30"></div>
    </footer>
  );
}
