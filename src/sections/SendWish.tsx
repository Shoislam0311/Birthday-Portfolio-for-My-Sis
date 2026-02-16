import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { Send, Heart, CheckCircle } from 'lucide-react';
import { BorderBeam } from '@/components/ui/border-beam';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitizeInput = (input: string, allowNewlines = false): string => {
  if (!input) return '';
  let sanitized = input.replace(/<[^>]*>?/gm, '').replace(/[<>]/g, '');
  if (!allowNewlines) sanitized = sanitized.replace(/[\r\n]/g, ' ');
  return sanitized.trim();
};

interface FormErrors {
  name?: string;
  email?: string;
  wish?: string;
}

const SendWish = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', wish: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    gsap.fromTo(headerRef.current, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
    });
    gsap.fromTo(formRef.current, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: formRef.current, start: 'top 85%' }
    });
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const sanitizedName = sanitizeInput(formData.name);
    if (!sanitizedName) newErrors.name = 'Name is required';
    const sanitizedEmail = sanitizeInput(formData.email).toLowerCase();
    if (!sanitizedEmail || !EMAIL_REGEX.test(sanitizedEmail)) newErrors.email = 'Valid email is required';
    const sanitizedWish = sanitizeInput(formData.wish, true);
    if (!sanitizedWish) newErrors.wish = 'Wish is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    const sanitizedName = sanitizeInput(formData.name);
    const sanitizedEmail = sanitizeInput(formData.email).toLowerCase();
    const sanitizedWish = sanitizeInput(formData.wish, true);
    const subject = `A Premium Birthday Wish for Bubu from ${sanitizedName}`;

    try {
      const response = await fetch("https://formsubmit.co/ajax/zuyairiaislam5@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: sanitizedName,
          email: sanitizedEmail,
          message: sanitizedWish,
          _subject: subject,
          _captcha: "false",
          _template: "table"
        })
      });

      if (!response.ok) throw new Error('Failed to send wish');

      setIsSubmitted(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6C3CF0', '#2A0E3F', '#E6E8EC'],
      });
      toast.success("Transmission archived successfully.");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Transmission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="send-wish" className="py-32 bg-premium-black relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-premium-violet/10 border border-premium-violet/20 text-premium-violet text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Heart className="w-3 h-3" />
            <span>Encrypted Message</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6">
            SEND YOUR <span className="text-gradient-violet">WISHES</span>
          </h2>
          <p className="text-premium-grey/50 max-w-lg mx-auto uppercase tracking-widest text-xs">
            Join the elite circle and leave your mark on this special edition.
          </p>
        </div>

        {!isSubmitted ? (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto glass-premium p-8 md:p-12 rounded-3xl relative overflow-hidden border-white/5 opacity-0"
          >
            <BorderBeam size={300} duration={12} delay={9} colorFrom="#6C3CF0" colorTo="#2A0E3F" />

            <div className="space-y-8">
              <div>
                <label className="block text-xs font-bold text-premium-violet uppercase tracking-[0.2em] mb-3">Identity</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl py-4 px-6 text-white placeholder-white/20 focus:outline-none focus:border-premium-violet/50 transition-all`}
                />
                {errors.name && <p className="text-red-500 text-[10px] mt-2 uppercase tracking-widest">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-premium-violet uppercase tracking-[0.2em] mb-3">Direct Contact</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl py-4 px-6 text-white placeholder-white/20 focus:outline-none focus:border-premium-violet/50 transition-all`}
                />
                {errors.email && <p className="text-red-500 text-[10px] mt-2 uppercase tracking-widest">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-premium-violet uppercase tracking-[0.2em] mb-3">Your Message</label>
                <textarea
                  name="wish"
                  rows={4}
                  placeholder="Write your legacy..."
                  value={formData.wish}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border ${errors.wish ? 'border-red-500' : 'border-white/10'} rounded-xl py-4 px-6 text-white placeholder-white/20 focus:outline-none focus:border-premium-violet/50 transition-all resize-none`}
                />
                {errors.wish && <p className="text-red-500 text-[10px] mt-2 uppercase tracking-widest">{errors.wish}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 rounded-xl bg-premium-violet text-white font-bold uppercase tracking-widest hover:bg-premium-violet/90 transition-all flex items-center justify-center gap-3 glow-violet"
              >
                {isSubmitting ? 'Transmitting...' : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Transmission
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="max-w-xl mx-auto glass-premium p-12 rounded-3xl text-center border-premium/20">
            <div className="w-20 h-20 rounded-full bg-premium-violet/20 flex items-center justify-center mx-auto mb-8 border border-premium-violet/50">
              <CheckCircle className="w-10 h-10 text-premium-violet" />
            </div>
            <h3 className="text-3xl font-bold mb-4">TRANSMISSION RECEIVED</h3>
            <p className="text-premium-grey/50 mb-8 uppercase tracking-widest text-xs">
              Your message has been archived in the 2026 vault.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-premium-violet font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
            >
              New Transmission
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SendWish;
