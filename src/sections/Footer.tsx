import { motion } from 'framer-motion';
import { Instagram, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Github className="w-5 h-5" />, href: '#', label: 'Github' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-premium-black border-t border-white/5 py-20 relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-premium-violet/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center gap-12">
          {/* Logo/Title */}
          <div className="text-center">
            <h2 className="text-2xl font-extrabold tracking-tighter mb-2">
              SPECIAL <span className="text-premium-violet">2026</span>
            </h2>
            <p className="text-premium-grey/40 text-xs uppercase tracking-[0.4em]">
              Premium Birthday Edition
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                aria-label={social.label}
                whileHover={{ y: -5, color: '#6C3CF0' }}
                className="text-premium-grey/40 transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-xs h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Copyright */}
          <div className="text-center">
            <p className="text-premium-grey/30 text-[10px] uppercase tracking-[0.3em]">
              &copy; {currentYear} Limited Edition • All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
