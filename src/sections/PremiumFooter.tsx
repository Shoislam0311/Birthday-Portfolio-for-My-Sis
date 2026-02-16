import { motion } from 'framer-motion';
import { Github, Twitter, Instagram, Heart } from 'lucide-react';
import GlowButton from '../components/ui/glow-button';

export default function PremiumFooter() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com',
    },
  ];

  return (
    <footer className="relative bg-electric-charcoal border-t border-electric-violet/10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-electric-violet/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-electric-violet-dark/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Logo/Brand */}
          <div className="text-center md:text-left">
            <h3 className="font-serif-display text-3xl font-bold mb-2 text-white">
              <span className="text-gradient-violet">Bubu</span>
            </h3>
            <p className="text-electric-soft-grey/60 font-serif-body text-lg">
              Special Birthday Edition
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-12 h-12 rounded-full border border-electric-violet/20 bg-electric-violet/5 flex items-center justify-center transition-all duration-300 group-hover:border-electric-violet/50 group-hover:bg-electric-violet/10 group-hover:glow-violet-soft">
                    <Icon className="w-5 h-5 text-electric-violet-light group-hover:text-electric-violet" />
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center md:text-right">
            <GlowButton
              variant="outline"
              onClick={() => {
                const sendWish = document.getElementById('send-wish');
                sendWish?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Send Your Wish
            </GlowButton>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12">
          <div className="divider-violet" />
        </div>

        {/* Bottom Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-electric-soft-grey/60">
            <span className="font-sans-luxury text-sm">
              © {currentYear} Special Edition. Made with
            </span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-electric-violet fill-electric-violet" />
            </motion.span>
            <span className="font-sans-luxury text-sm">
              for Bubu's Birthday
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="text-electric-soft-grey/60 hover:text-electric-violet transition-colors duration-300"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-electric-soft-grey/60 hover:text-electric-violet transition-colors duration-300"
            >
              Terms
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-electric-violet to-transparent opacity-50" />
    </footer>
  );
}
