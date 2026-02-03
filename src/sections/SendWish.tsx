import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { Send, User, Mail, MessageSquare, Heart, CheckCircle } from 'lucide-react';

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
      
      // Simple confetti celebration
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0f766e', '#14b8a6'],
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
      className="relative w-full py-24 bg-white flex items-center"
    >
      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 opacity-0">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-neutral-300" />
            <Heart className="w-5 h-5 text-neutral-600" />
            <span className="text-sm font-medium uppercase tracking-wider text-neutral-500">Send Your Love</span>
            <Heart className="w-5 h-5 text-neutral-600" />
            <div className="w-8 h-px bg-neutral-300" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-4">
            Send a <span className="text-teal-600">Wish</span>
          </h2>
          
          <p className="text-neutral-600 max-w-md mx-auto">
            Write your heartfelt birthday message and send it directly to Bubu's email.
          </p>
        </div>

        {/* Form */}
        {!isSubmitted ? (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white rounded-lg border border-neutral-200 p-8 md:p-10 opacity-0 shadow-minimal"
          >
            {/* Name Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Your Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  maxLength={MAX_NAME_LENGTH}
                  className={`w-full border rounded-lg py-3 pl-10 pr-4 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.name
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-neutral-300 focus:border-teal-500 focus:ring-teal-500/20'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Your Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  maxLength={MAX_EMAIL_LENGTH}
                  className={`w-full border rounded-lg py-3 pl-10 pr-4 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-neutral-300 focus:border-teal-500 focus:ring-teal-500/20'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Wish Field */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Your Birthday Wish
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                <textarea
                  name="wish"
                  value={formData.wish}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write your heartfelt birthday message..."
                  maxLength={MAX_WISH_LENGTH}
                  className={`w-full border rounded-lg py-3 pl-10 pr-4 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.wish
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-neutral-300 focus:border-teal-500 focus:ring-teal-500/20'
                  }`}
                />
              </div>
              {errors.wish && (
                <p className="mt-2 text-sm text-red-600">{errors.wish}</p>
              )}
              <p className="mt-2 text-xs text-neutral-500 text-right">
                {formData.wish.length}/{MAX_WISH_LENGTH} characters
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg font-medium text-white transition-all hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-teal-600"
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
            <p className="text-center text-neutral-500 text-sm mt-4">
              Your email will be sent automatically
            </p>
          </form>
        ) : (
          <div className="bg-white rounded-lg border border-neutral-200 p-10 text-center shadow-minimal">
            <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">
              Wish Sent!
            </h3>
            <p className="text-neutral-600 mb-8">
              Your warm wish has been sent to Bubu! Thank you for sharing your love.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', wish: '' });
              }}
              className="mt-6 text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors"
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