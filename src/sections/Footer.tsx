import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Crown, Heart, Star, Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate footer elements on scroll
      gsap.fromTo('.footer-section',
        { 
          opacity: 0, 
          y: 40 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate social icons
      gsap.fromTo('.social-icon',
        { 
          scale: 0,
          opacity: 0 
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          stagger: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Parallax effect for background elements
      gsap.to('.footer-bg', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  const quickLinks = [
    'Achievements',
    'Gallery',
    'Timeline',
    'Contact'
  ];

  const achievements = [
    'Excellence Award 2024',
    'Master Craftsmanship',
    'Innovation Leader',
    'Legacy Builder'
  ];

  return (
    <footer ref={footerRef} className="relative w-full bg-luxury-black border-t border-luxury-violet/20 overflow-hidden">
      {/* Background Elements */}
      <div className="footer-bg absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-luxury-violet/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-luxury-teal/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(rgba(108, 60, 240, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108, 60, 240, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="footer-section lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Crown className="w-8 h-8 text-luxury-violet" />
                <h3 className="text-2xl font-bold text-luxury-grey uppercase tracking-wide">
                  SPECIAL EDITION
                </h3>
              </div>
              <p className="text-luxury-grey/70 leading-relaxed mb-6 max-w-md">
                Celebrating extraordinary achievements and the legacy of excellence. 
                A premium collection of memories, milestones, and masterful creations.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-luxury-violet">
                <Heart className="w-4 h-4" />
                <span>Crafted with passion for the exceptional</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4 className="text-lg font-bold text-luxury-grey mb-6 uppercase tracking-wide">
                NAVIGATION
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-luxury-grey/70 hover:text-luxury-violet transition-colors duration-300 font-medium"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Achievements */}
            <div className="footer-section">
              <h4 className="text-lg font-bold text-luxury-grey mb-6 uppercase tracking-wide">
                ACHIEVEMENTS
              </h4>
              <ul className="space-y-3">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Star className="w-3 h-3 text-luxury-teal flex-shrink-0" />
                    <span className="text-luxury-grey/70 text-sm font-medium">
                      {achievement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="footer-section py-12 border-t border-luxury-violet/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-luxury-violet/10 border border-luxury-violet/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-luxury-violet" />
              </div>
              <div>
                <p className="text-sm font-semibold text-luxury-grey uppercase tracking-wide">
                  Connect
                </p>
                <p className="text-sm text-luxury-grey/70">
                  hello@premiumedition.com
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-luxury-teal/10 border border-luxury-teal/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-luxury-teal" />
              </div>
              <div>
                <p className="text-sm font-semibold text-luxury-grey uppercase tracking-wide">
                  Reach
                </p>
                <p className="text-sm text-luxury-grey/70">
                  +1 (555) 123-4567
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-luxury-plum/10 border border-luxury-plum/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-luxury-plum" />
              </div>
              <div>
                <p className="text-sm font-semibold text-luxury-grey uppercase tracking-wide">
                  Location
                </p>
                <p className="text-sm text-luxury-grey/70">
                  Premium District
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-section py-8 border-t border-luxury-violet/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-luxury-violet" />
                <span className="text-sm font-bold text-luxury-grey tracking-wide">
                  SPECIAL EDITION 2026
                </span>
              </div>
              <div className="hidden md:block w-1 h-1 rounded-full bg-luxury-grey/30" />
              <span className="text-sm text-luxury-grey/60">
                All rights reserved
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-luxury-grey/70 uppercase tracking-wide">
                Follow the journey:
              </span>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="social-icon w-10 h-10 rounded-full border border-luxury-violet/20 hover:border-luxury-violet hover:bg-luxury-violet/10 flex items-center justify-center text-luxury-violet hover:text-luxury-grey transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Final Accent */}
        <div className="footer-section py-6 border-t border-luxury-violet/10">
          <div className="flex items-center justify-center gap-4">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-luxury-violet" />
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-luxury-violet animate-pulse" />
              <Heart className="w-4 h-4 text-luxury-teal" />
              <Crown className="w-4 h-4 text-luxury-plum animate-pulse" />
            </div>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-luxury-violet" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;