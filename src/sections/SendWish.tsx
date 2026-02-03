import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { Send, User, Mail, MessageSquare, Heart, CheckCircle } from 'lucide-react';
import { BorderBeam } from '@/components/ui/border-beam';

gsap.registerPlugin(ScrollTrigger);

// Security: Input validation constants to prevent abuse and ensure data integrity
const MAX_NAME_LENGTH = 50;
const MAX_EMAIL_LENGTH = 100;
const MAX_WISH_LENGTH = 500;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Security: Sanitize user input to prevent header injection and other attacks
const sanitizeInput = (input: string, allowNewlines = false): string => {
  let sanitized = input.replace(/[<>]/g, ''); // Remove potential HTML tags
  if (!allowNewlines) {
    sanitized = sanitized.replace(/[\r\n]/g, ' '); // Normalize line breaks
  }
  return sanitized.trim();
};

interface FormErrors {
  name?: string;
  email?: string;
  wish?: string;
}

const SendWish = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    wish: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  // Security: Validate form inputs before submission
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name: required, length limit, no special characters
    const sanitizedName = sanitizeInput(formData.name);
    if (!sanitizedName) {
      newErrors.name = 'Name is required';
    } else if (sanitizedName.length > MAX_NAME_LENGTH) {
      newErrors.name = `Name must be ${MAX_NAME_LENGTH} characters or less`;
    } else if (!/^[\p{L}\p{M}\s'-]+$/u.test(sanitizedName)) {
      newErrors.name = 'Name contains invalid characters';
    }

    // Validate email: required, format, length limit
    const sanitizedEmail = sanitizeInput(formData.email).toLowerCase();
    if (!sanitizedEmail) {
      newErrors.email = 'Email is required';
    } else if (sanitizedEmail.length > MAX_EMAIL_LENGTH) {
      newErrors.email = `Email must be ${MAX_EMAIL_LENGTH} characters or less`;
    } else if (!EMAIL_REGEX.test(sanitizedEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate wish: required, length limit
    const sanitizedWish = sanitizeInput(formData.wish, true);
    if (!sanitizedWish) {
      newErrors.wish = 'Please write a birthday wish';
    } else if (sanitizedWish.length > MAX_WISH_LENGTH) {
      newErrors.wish = `Wish must be ${MAX_WISH_LENGTH} characters or less`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Security: Validate inputs before processing
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Security: Use sanitized inputs for mailto link
    const sanitizedName = sanitizeInput(formData.name);
    const sanitizedEmail = sanitizeInput(formData.email).toLowerCase();
    const sanitizedWish = sanitizeInput(formData.wish, true);

    // Prepare email content
    const subject = `Happy Birthday Wish for Bubu from ${sanitizedName}`;

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

      if (!response.ok) {
        throw new Error('Failed to send wish');
      }

      // Show success state
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Premium confetti celebration
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#E1C68D', '#C0C0C0', '#F5ECD7'],
        disableForReducedMotion: true
      });
    } catch (error) {
      console.error('Error sending wish:', error);
      setIsSubmitting(false);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Security: Enforce length limits during typing
    let maxLength = MAX_WISH_LENGTH;
    if (name === 'name') maxLength = MAX_NAME_LENGTH;
    if (name === 'email') maxLength = MAX_EMAIL_LENGTH;

    const truncatedValue = value.slice(0, maxLength);

    setFormData(prev => ({
      ...prev,
      [name]: truncatedValue,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 bg-charcoal-100 flex items-center"
    >
      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 opacity-0">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-12 h-px divider-premium" />
            <Heart className="w-5 h-5 text-gold-400" />
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-gold-400">Send Your Love</span>
            <Heart className="w-5 h-5 text-gold-400" />
            <div className="w-12 h-px divider-premium" />
          </div>

          <h2 className="font-serif-display text-4xl md:text-6xl font-semibold text-white mb-6">
            Send a <span className="text-gradient-gold">Wish</span>
          </h2>

          <p className="font-serif-body text-platinum-300 max-w-md mx-auto text-lg">
            Write your heartfelt birthday message and send it directly to Bubu's email.
          </p>
        </div>

        {/* Form */}
        {!isSubmitted ? (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative card-premium rounded-xl p-8 md:p-12 opacity-0 overflow-hidden"
          >
            <BorderBeam size={300} duration={12} delay={9} />

            {/* Name Field */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-platinum-200 mb-2 tracking-wide">
                Your Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-400/60" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  maxLength={MAX_NAME_LENGTH}
                  className={`w-full border rounded-lg py-3 pl-10 pr-4 text-white placeholder-platinum-500/50 focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20 bg-charcoal-200'
                      : 'border-gold-500/20 focus:border-gold-500 focus:ring-gold-500/20 bg-charcoal-200/50'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-platinum-200 mb-2 tracking-wide">
                Your Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold-400/60" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  maxLength={MAX_EMAIL_LENGTH}
                  className={`w-full border rounded-lg py-3 pl-10 pr-4 text-white placeholder-platinum-500/50 focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20 bg-charcoal-200'
                      : 'border-gold-500/20 focus:border-gold-500 focus:ring-gold-500/20 bg-charcoal-200/50'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Wish Field */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-platinum-200 mb-2 tracking-wide">
                Your Birthday Wish
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gold-400/60" />
                <textarea
                  name="wish"
                  value={formData.wish}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write your heartfelt birthday message..."
                  maxLength={MAX_WISH_LENGTH}
                  className={`w-full border rounded-lg py-3 pl-10 pr-4 text-white placeholder-platinum-500/50 focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.wish
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20 bg-charcoal-200'
                      : 'border-gold-500/20 focus:border-gold-500 focus:ring-gold-500/20 bg-charcoal-200/50'
                  }`}
                />
              </div>
              {errors.wish && (
                <p className="mt-2 text-sm text-red-400">{errors.wish}</p>
              )}
              <p className="mt-2 text-xs text-platinum-500/60 text-right">
                {formData.wish.length}/{MAX_WISH_LENGTH} characters
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg font-bold text-charcoal-100 transition-all hover:shadow-premium hover:glow-gold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 btn-premium"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Wish
                </>
              )}
            </button>

            {/* Note */}
            <p className="text-center text-platinum-500/60 text-sm mt-4">
              Your email will be sent automatically
            </p>
          </form>
        ) : (
          <div className="card-premium rounded-xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gold-500 flex items-center justify-center mx-auto mb-6 glow-gold">
              <CheckCircle className="w-8 h-8 text-charcoal-100" />
            </div>
            <h3 className="font-serif-display text-2xl font-semibold text-white mb-3">
              Wish Sent!
            </h3>
            <p className="text-platinum-300 mb-8 font-serif-body">
              Your warm wish has been sent to Bubu! Thank you for sharing your love.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', wish: '' });
              }}
              className="mt-6 text-gold-400 hover:text-gold-300 text-sm font-bold uppercase tracking-wider transition-colors"
            >
              Send another wish
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SendWish;