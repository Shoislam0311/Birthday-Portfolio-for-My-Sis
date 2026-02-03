import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, User, Mail, MessageSquare, Heart, Sparkles, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Security: Input validation constants to prevent abuse and ensure data integrity
const MAX_NAME_LENGTH = 50;
const MAX_EMAIL_LENGTH = 100;
const MAX_WISH_LENGTH = 500;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Security: Sanitize user input to prevent header injection and other attacks
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/[\r\n]/g, ' ') // Normalize line breaks to prevent header injection
    .trim();
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
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
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
    const sanitizedWish = sanitizeInput(formData.wish);
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
    const sanitizedWish = sanitizeInput(formData.wish);

    // Create mailto link with the wish
    const subject = `Happy Birthday Wish for Zuyairia from ${sanitizedName}`;
    const body = `Dear Zuyairia,\n\n${sanitizedWish}\n\nWith love,\n${sanitizedName}\n${sanitizedEmail}`;

    const mailtoLink = `mailto:zuyairiaislam5@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success state
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
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
      className="relative w-full min-h-screen py-24 overflow-hidden flex items-center"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[150px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 opacity-0">
          <div className="inline-flex items-center gap-3 mb-6">
            <Heart className="w-5 h-5 text-purple-400 fill-purple-400" />
            <span className="text-sm font-space tracking-[0.3em] uppercase text-white/50">Send Your Love</span>
            <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4">
            Send a <span className="text-gradient">Wish</span>
          </h2>
          
          <p className="text-white/50 max-w-md mx-auto">
            Write your heartfelt birthday message and send it directly to Zuyairia&apos;s email.
          </p>
        </div>

        {/* Form */}
        {!isSubmitted ? (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-card rounded-3xl p-8 md:p-10 opacity-0"
          >
            {/* Name Field */}
            <div className="mb-6">
              <label className="block text-sm font-space text-white/60 mb-2 uppercase tracking-wider">
                Your Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  maxLength={MAX_NAME_LENGTH}
                  className={`w-full bg-white/5 border rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                      : 'border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-400 font-space">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-space text-white/60 mb-2 uppercase tracking-wider">
                Your Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  maxLength={MAX_EMAIL_LENGTH}
                  className={`w-full bg-white/5 border rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                      : 'border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400 font-space">{errors.email}</p>
              )}
            </div>

            {/* Wish Field */}
            <div className="mb-8">
              <label className="block text-sm font-space text-white/60 mb-2 uppercase tracking-wider">
                Your Birthday Wish
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-white/30" />
                <textarea
                  name="wish"
                  value={formData.wish}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write your heartfelt birthday message..."
                  maxLength={MAX_WISH_LENGTH}
                  className={`w-full bg-white/5 border rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.wish
                      ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                      : 'border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20'
                  }`}
                />
              </div>
              {errors.wish && (
                <p className="mt-2 text-sm text-red-400 font-space">{errors.wish}</p>
              )}
              <p className="mt-2 text-xs text-white/30 font-space text-right">
                {formData.wish.length}/{MAX_WISH_LENGTH} characters
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl font-space text-sm tracking-wider uppercase transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #b026ff 0%, #ff2d95 100%)',
                boxShadow: '0 0 30px rgba(176, 38, 255, 0.4)',
              }}
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
            <p className="text-center text-white/30 text-xs mt-4">
              This will open your email client to send the message
            </p>
          </form>
        ) : (
          <div className="glass-card rounded-3xl p-10 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-playfair font-bold text-white mb-2">
              Wish Sent!
            </h3>
            <p className="text-white/60 mb-6">
              Your email client should have opened. If not, you can manually send your wish to:
            </p>
            <div className="glass-card rounded-xl py-3 px-6 inline-block">
              <span className="text-gradient font-space">zuyairiaislam5@gmail.com</span>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', wish: '' });
              }}
              className="mt-6 text-white/50 hover:text-white text-sm font-space transition-colors"
            >
              Send another wish
            </button>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 animate-spin" style={{ animationDuration: '6s' }}>
          <Sparkles className="w-8 h-8 text-purple-400/50" />
        </div>
        <div className="absolute -bottom-4 -left-4 animate-spin" style={{ animationDuration: '8s' }}>
          <Sparkles className="w-6 h-6 text-pink-400/50" />
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default SendWish;