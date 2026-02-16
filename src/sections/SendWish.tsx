import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { Send, Heart, CheckCircle } from 'lucide-react';
import { BorderBeam } from '@/components/ui/border-beam';

gsap.registerPlugin(ScrollTrigger);

// Security: Input validation constants to prevent abuse and ensure data integrity
const MAX_NAME_LENGTH = 50;
const MAX_EMAIL_LENGTH = 100;
const MAX_WISH_LENGTH = 500;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Security: Sanitize user input to prevent XSS and other injection attacks
const sanitizeInput = (input: string, allowNewlines = false): string => {
  if (!input) return '';
  
  // Remove HTML tags and potentially dangerous characters
  let sanitized = input
    .replace(/<[^>]*>?/gm, '') // Remove all HTML tags
    .replace(/[<>]/g, '');     // Extra safety for remaining brackets
    
  if (!allowNewlines) {
    sanitized = sanitized.replace(/[\r\n]/g, ' '); // Normalize line breaks
  }
  
  // Trim and limit consecutive spaces if not allowing newlines
  if (!allowNewlines) {
    return sanitized.trim().replace(/\s+/g, ' ');
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
    const subject = `A Birthday Wish For You from ${sanitizedName}`;

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

      // Premium confetti celebration - blue and white only
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0066ff', '#003d99', '#ffffff'],
        disableForReducedMotion: true,
        decay: 0.95,
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
      className="relative w-full py-24 bg-luxury-white flex items-center"
    >
      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-8 md:mb-12 opacity-0">
          <div className="inline-flex items-center gap-4 mb-6 md:mb-8">
            <div className="w-12 h-px bg-luxury-blue" />
            <Heart className="w-5 h-5 text-luxury-blue" />
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-luxury-blue">Send Your Love</span>
            <Heart className="w-5 h-5 text-luxury-blue" />
            <div className="w-12 h-px bg-luxury-blue" />
          </div>

          <h2 className="font-serif-display text-3xl md:text-4xl lg:text-6xl font-semibold text-black mb-4 md:mb-6">
            Send a <span className="text-gradient-blue">Wish</span>
          </h2>

          <p className="font-serif-body text-black/70 max-w-md mx-auto text-base md:text-lg">
            Write your heartfelt birthday message and send it directly to Zuyairia's email.
          </p>
        </div>

        {/* Form */}
        {!isSubmitted ? (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative bg-white/50 backdrop-blur-sm rounded-xl p-8 md:p-12 opacity-0 overflow-hidden border-2 border-black"
          >
            <BorderBeam size={300} duration={12} delay={9} />

            {/* Name Field */}
            <div className="mb-6">
              <label
                htmlFor="name-input"
                className="block text-sm font-bold text-black mb-2 tracking-wide uppercase font-serif-display cursor-pointer"
              >
                Your Name
              </label>
              <div className="relative">
                <input
                  id="name-input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  maxLength={MAX_NAME_LENGTH}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`w-full bg-transparent border-b-2 py-3 px-0 text-black placeholder-black/40 focus:outline-none focus:border-luxury-blue transition-all text-base md:text-lg ${
                    errors.name
                      ? 'border-red-500/50 focus:border-red-500'
                      : 'border-black focus:border-luxury-blue'
                  }`}
                />
              </div>
              {errors.name && (
                <p id="name-error" className="mt-2 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label
                htmlFor="email-input"
                className="block text-sm font-bold text-black mb-2 tracking-wide uppercase font-serif-display cursor-pointer"
              >
                Your Email
              </label>
              <div className="relative">
                <input
                  id="email-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  maxLength={MAX_EMAIL_LENGTH}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full bg-transparent border-b-2 py-3 px-0 text-black placeholder-black/40 focus:outline-none focus:border-luxury-blue transition-all text-base md:text-lg ${
                    errors.email
                      ? 'border-red-500/50 focus:border-red-500'
                      : 'border-black focus:border-luxury-blue'
                  }`}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="mt-2 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Wish Field */}
            <div className="mb-8">
              <label
                htmlFor="wish-input"
                className="block text-sm font-bold text-black mb-2 tracking-wide uppercase font-serif-display cursor-pointer"
              >
                Your Birthday Wish
              </label>
              <div className="relative">
                <textarea
                  id="wish-input"
                  name="wish"
                  value={formData.wish}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Write your heartfelt birthday message..."
                  maxLength={MAX_WISH_LENGTH}
                  aria-invalid={errors.wish ? "true" : "false"}
                  aria-describedby={errors.wish ? "wish-error" : undefined}
                  className={`w-full bg-transparent border-b-2 py-3 px-0 text-black placeholder-black/40 focus:outline-none focus:border-luxury-blue transition-all resize-none text-base md:text-lg ${
                    errors.wish
                      ? 'border-red-500/50 focus:border-red-500'
                      : 'border-black focus:border-luxury-blue'
                  }`}
                />
              </div>
              {errors.wish && (
                <p id="wish-error" className="mt-2 text-sm text-red-500">{errors.wish}</p>
              )}
              <p className="mt-2 text-xs text-black/40 text-right">
                {formData.wish.length}/{MAX_WISH_LENGTH} characters
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-lg font-bold text-white transition-all hover:shadow-blue-glow-soft disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-luxury-blue hover:bg-luxury-blue-dark"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
            <p className="text-center text-black/40 text-sm mt-4">
              Your email will be sent automatically
            </p>
          </form>
        ) : (
          <div
            className="card-premium bg-white/50 backdrop-blur-sm rounded-xl p-12 text-center border-2 border-black"
            role="status"
            aria-live="polite"
          >
            <div className="w-16 h-16 rounded-full bg-luxury-blue flex items-center justify-center mx-auto mb-6 glow-blue">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-serif-display text-2xl font-semibold text-black mb-3">
              Wish Sent!
            </h3>
            <p className="text-black/70 mb-8 font-serif-body">
              Your warm wish has been sent to Zuyairia! Thank you for sharing your love.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', wish: '' });
              }}
              className="mt-6 text-luxury-blue hover:text-luxury-blue-dark text-sm font-bold uppercase tracking-wider transition-colors"
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
