
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { CheckIcon, ArrowRightIcon, ExclamationCircleIcon, MenuIcon, XIcon, ChevronDownIcon, EnvelopeIcon, XSocialIcon, InstagramIcon, LinkedInIcon, CheckCircleSolidIcon, ClipboardIcon } from './icons';
import { useTranslation } from './i18n';

// --- HOOKS ---
const usePrefersReducedMotion = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const listener = () => {
            setPrefersReducedMotion(mediaQuery.matches);
        };
        mediaQuery.addEventListener('change', listener);
        return () => {
            mediaQuery.removeEventListener('change', listener);
        };
    }, []);
    return prefersReducedMotion;
};


// --- Hero Media Full Component ---
interface HeroMediaFullProps {
    headline: React.ReactNode;
    subhead?: string;
    body?: string;
    primaryCta?: { text: string; to: string };
    secondaryCta?: { text: string; to: string };
    videoSrc?: string;
    imageSrc: string; // Required as fallback
    altText?: string;
}

export const HeroMediaFull: React.FC<HeroMediaFullProps> = ({
    headline,
    subhead,
    body,
    primaryCta,
    secondaryCta,
    videoSrc,
    imageSrc,
    altText = ""
}) => {
    const prefersReducedMotion = usePrefersReducedMotion();
    const showVideo = !!videoSrc && !prefersReducedMotion;

    return (
        <section className="relative flex items-center justify-center w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden text-white bg-text-primary">
            {/* Media Background */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
                {showVideo ? (
                    <video
                        key={videoSrc}
                        className="w-full h-full object-cover"
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={imageSrc}
                        aria-hidden="true"
                    />
                ) : (
                    <img src={imageSrc} alt={altText} className="w-full h-full object-cover" aria-hidden={altText ? false : true} />
                )}
            </div>
            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 via-black/30 to-black/20 z-10" />

            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 w-full h-full flex flex-col justify-center items-center text-center md:items-start md:text-left">
                <div className="max-w-3xl">
                    {subhead && <p className="text-lg text-gray-200 mb-3 md:mb-4">{subhead}</p>}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tighter leading-tight">
                        {headline}
                    </h1>
                    {body && <p className="mt-4 text-base md:text-lg text-gray-200 max-w-2xl">{body}</p>}
                    {(primaryCta || secondaryCta) && (
                         <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
                            {primaryCta && (
                                <Link 
                                    to={primaryCta.to}
                                    className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-accent text-text-primary text-sm font-bold transition-colors hover:bg-yellow-400 w-full sm:w-auto"
                                >
                                    {primaryCta.text}
                                </Link>
                            )}
                            {secondaryCta && (
                                <Link 
                                    to={secondaryCta.to}
                                    className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-transparent border border-white/50 text-white text-sm font-bold transition-colors hover:bg-white/10 w-full sm:w-auto"
                                >
                                    {secondaryCta.text}
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};


// --- Animation Wrapper Component ---
interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    animation?: 'fadeInUp' | 'slideInLeft' | 'slideInRight' | 'zoomIn';
    delay?: string;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = '', animation = 'fadeInUp', delay = 'delay-0' }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const animationClasses = {
        fadeInUp: 'translate-y-10 opacity-0',
        slideInLeft: '-translate-x-10 opacity-0',
        slideInRight: 'translate-x-10 opacity-0',
        zoomIn: 'scale-95 opacity-0'
    };

    const inViewClasses = {
        fadeInUp: 'translate-y-0 opacity-100',
        slideInLeft: 'translate-x-0 opacity-100',
        slideInRight: 'translate-x-0 opacity-100',
        zoomIn: 'scale-100 opacity-100'
    };

    return (
        <div
            ref={ref}
            className={`${className} transition-all duration-700 ease-out ${delay} ${inView ? inViewClasses[animation] : animationClasses[animation]}`}
        >
            {children}
        </div>
    );
};

// --- Stat Counter Component ---
interface StatCounterProps {
    value: number;
    suffix?: string;
    duration?: number;
}
export const StatCounter: React.FC<StatCounterProps> = ({ value, suffix = '', duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
    const countRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (inView) {
            let start = 0;
            const end = value;
            if (start === end) return;

            const totalFrames = duration / (1000 / 60);
            const increment = end / totalFrames;

            const counter = () => {
                start += increment;
                if (start < end) {
                    setCount(Math.ceil(start));
                    requestAnimationFrame(counter);
                } else {
                    setCount(end);
                }
            };
            requestAnimationFrame(counter);
        }
    }, [inView, value, duration]);

    return (
        <span ref={ref} className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tighter">
            {count}{suffix}
        </span>
    );
};

// --- Section Header ---
export const SectionHeader: React.FC<{ title: ReactNode, subtitle?: string, centered?: boolean, className?: string }> = ({ title, subtitle, centered = true, className = '' }) => (
    <div className={`${centered ? 'text-center max-w-3xl mx-auto' : ''} ${className}`}>
        {subtitle && <p className="text-accent font-bold mb-3 uppercase tracking-wider">{subtitle}</p>}
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight">{title}</h2>
    </div>
);


// --- Content Section Component ---
interface ContentSectionProps {
    children: ReactNode;
    className?: string;
    bgColor?: 'base' | 'divider' | 'white' | 'text-primary'
}

export const ContentSection: React.FC<ContentSectionProps> = ({ children, className = '', bgColor = 'base' }) => {
    const bgClass = {
        'base': 'bg-base',
        'divider': 'bg-divider',
        'white': 'bg-white',
        'text-primary': 'bg-text-primary text-base',
    }[bgColor];
    return (
        <section className={`${bgClass} ${className}`}>
            <div className="container mx-auto px-6 py-16 md:py-20 lg:py-24">
                {children}
            </div>
        </section>
    );
};

// --- Image With Text Component ---
interface ImageWithTextProps {
  imageUrl: string;
  imageAlt: string;
  imageSide?: 'left' | 'right';
  children: ReactNode;
}
export const ImageWithText: React.FC<ImageWithTextProps> = ({ imageUrl, imageAlt, imageSide = 'left', children }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={imageSide === 'right' ? 'lg:order-last' : ''}>
                <AnimatedSection animation={imageSide === 'left' ? 'slideInLeft' : 'slideInRight'}>
                    <img src={imageUrl} alt={imageAlt} className="rounded-2.5xl object-cover w-full h-full shadow-lg" />
                </AnimatedSection>
            </div>
            <div>
                 <AnimatedSection animation={imageSide === 'left' ? 'slideInRight' : 'slideInLeft'}>
                     {children}
                 </AnimatedSection>
            </div>
        </div>
    );
};

// Fix: Added a new 'FeatureCard' component to create a consistent, modern look for displaying featured content.
// --- Feature Card Component ---
interface FeatureCardProps {
    title: ReactNode;
    body: string;
    cta: { text: string; to: string };
    imageUrl: string;
    imageAlt: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, body, cta, imageUrl, imageAlt }) => (
    <Link to={cta.to} className="group block h-full">
        <div className="rounded-3xl overflow-hidden shadow-lg bg-text-primary transition-transform duration-300 hover:-translate-y-1.5 h-full flex flex-col">
            <div className="relative h-56 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="p-6 flex flex-col flex-grow text-white">
                <h3 className="font-heading text-2xl font-bold mb-3">{title}</h3>
                <p className="text-base text-white/80 mb-4 flex-grow">
                    {body}
                </p>
                <span className="inline-flex items-center font-bold text-accent group-hover:text-yellow-400 transition-colors duration-200 mt-auto self-start">
                    {cta.text}
                    <ArrowRightIcon className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                </span>
            </div>
        </div>
    </Link>
);

// --- Button Component ---
interface ButtonProps {
    to: string;
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'accent';
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({ to, children, variant = 'primary', className = '' }) => {
    const baseClasses = "group inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variantClasses = {
        primary: "bg-text-primary text-base hover:bg-gray-800 focus:ring-accent hover:shadow-accent-glow",
        secondary: "bg-transparent text-text-primary ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:ring-text-primary",
        accent: "bg-accent text-text-primary hover:bg-yellow-400 focus:ring-accent"
    }[variant];

    return (
        <Link to={to} className={`${baseClasses} ${variantClasses} ${className}`}>
            {children}
            <ArrowRightIcon className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
    );
};

// --- Check List Item Component ---
interface CheckListItemProps {
    children: ReactNode;
    textColorClass?: string;
}
export const CheckListItem: React.FC<CheckListItemProps> = ({ children, textColorClass = 'text-gray-600' }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 pt-1">
            <CheckIcon className="h-5 w-5 text-accent" />
        </div>
        <div className={`ml-3 text-base ${textColorClass}`}>{children}</div>
    </div>
);

// --- Form Input ---
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    hint?: React.ReactNode;
}
export const InputField: React.FC<InputFieldProps> = ({ label, id, required, error, hint, ...props }) => {
    const hasError = !!error;
    const describedByIds = [];
    if (hasError) describedByIds.push(`${id}-error`);
    if (hint) describedByIds.push(`${id}-hint`);

    return (
        <div>
            <div className="flex justify-between items-center mb-1.5">
                <label htmlFor={id} className={`block text-sm font-bold ${hasError ? 'text-red-600' : 'text-gray-900'}`}>{label}</label>
                {required && <span className="text-xs text-gray-500">(required)</span>}
            </div>
            <input 
                id={id} 
                required={required}
                {...props} 
                className={`block w-full rounded-lg border-0 bg-white p-3.5 ring-1 ring-inset 
                    ${hasError 
                        ? 'bg-red-50 ring-red-500 text-red-900 focus:ring-2 focus:ring-inset focus:ring-red-500' 
                        : 'ring-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-text-primary'
                    } sm:text-sm sm:leading-6 transition-colors duration-200`}
                aria-invalid={hasError}
                aria-describedby={describedByIds.length ? describedByIds.join(' ') : undefined}
            />
            {hint && !hasError && <p id={`${id}-hint`} className="mt-2 text-sm text-gray-500">{hint}</p>}
            {hasError && (
                <div id={`${id}-error`} className="mt-2 text-sm text-red-600 flex items-center bg-red-50 p-2 rounded-md">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

// --- Form Password Input ---
interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    hint?: React.ReactNode;
}
export const PasswordField: React.FC<PasswordFieldProps> = ({ label, id, required, error, hint, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    const hasError = !!error;
    const describedByIds = [];
    if (hasError) describedByIds.push(`${id}-error`);
    if (hint) describedByIds.push(`${id}-hint`);
    
    return (
        <div>
            <div className="flex justify-between items-center mb-1.5">
                <label htmlFor={id} className={`block text-sm font-bold ${hasError ? 'text-red-600' : 'text-gray-900'}`}>{label}</label>
                 <div className="flex items-baseline space-x-4">
                    {required && <span className="text-xs text-gray-500">(required)</span>}
                    <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-xs font-semibold text-gray-500 hover:text-gray-700 tracking-wider"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? 'HIDE' : 'SHOW'}
                    </button>
                </div>
            </div>
            <input 
                id={id} 
                required={required}
                type={showPassword ? 'text' : 'password'}
                {...props} 
                className={`block w-full rounded-lg border-0 bg-white p-3.5 ring-1 ring-inset 
                    ${hasError 
                        ? 'bg-red-50 ring-red-500 text-red-900 focus:ring-2 focus:ring-inset focus:ring-red-500' 
                        : 'ring-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-text-primary'
                    } sm:text-sm sm:leading-6 transition-colors duration-200`}
                aria-invalid={hasError}
                aria-describedby={describedByIds.length ? describedByIds.join(' ') : undefined}
            />
            {hint && !hasError && <p id={`${id}-hint`} className="mt-2 text-sm text-gray-500">{hint}</p>}
            {hasError && (
                <div id={`${id}-error`} className="mt-2 text-sm text-red-600 flex items-center bg-red-50 p-2 rounded-md">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    )
}


// --- Form Textarea ---
interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
    hint?: React.ReactNode;
}
export const TextareaField: React.FC<TextareaFieldProps> = ({ label, id, required, error, hint, ...props }) => {
    const hasError = !!error;
    const describedByIds = [];
    if (hasError) describedByIds.push(`${id}-error`);
    if (hint) describedByIds.push(`${id}-hint`);

    return (
        <div>
            <div className="flex justify-between items-center mb-1.5">
                <label htmlFor={id} className={`block text-sm font-bold ${hasError ? 'text-red-600' : 'text-gray-900'}`}>{label}</label>
                {required && <span className="text-xs text-gray-500">(required)</span>}
            </div>
            <textarea 
                id={id} 
                required={required}
                {...props} 
                rows={4} 
                className={`block w-full rounded-lg border-0 bg-white p-3.5 ring-1 ring-inset 
                    ${hasError 
                        ? 'bg-red-50 ring-red-500 text-red-900 focus:ring-2 focus:ring-inset focus:ring-red-500' 
                        : 'ring-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-text-primary'
                    } sm:text-sm sm:leading-6 transition-colors duration-200`}
                aria-invalid={hasError}
                aria-describedby={describedByIds.length ? describedByIds.join(' ') : undefined}
            />
            {hint && !hasError && <p id={`${id}-hint`} className="mt-2 text-sm text-gray-500">{hint}</p>}
            {hasError && (
                <div id={`${id}-error`} className="mt-2 text-sm text-red-600 flex items-center bg-red-50 p-2 rounded-md">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

// --- Form Checkbox ---
interface CheckboxFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: React.ReactNode;
    error?: string;
}
export const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, id, error, ...props }) => {
    const hasError = !!error;
    return (
        <div>
            <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                    <input id={id} {...props} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent" />
                </div>
                <div className="ml-3 text-sm leading-6">
                    <label htmlFor={id} className="text-gray-700">{label}</label>
                </div>
            </div>
            {hasError && (
                <div id={`${id}-error`} className="mt-2 text-sm text-red-600 flex items-center">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};


// === MOVED FROM App.tsx ===

// --- HOOKS ---
const useScrollPosition = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const updatePosition = () => {
            setScrollPosition(window.pageYOffset);
        };
        window.addEventListener('scroll', updatePosition);
        updatePosition();
        return () => window.removeEventListener('scroll', updatePosition);
    }, []);

    return scrollPosition;
};

// --- NAVIGATION DATA ---
const topBarLinks = [
    { name: 'About', tKey: 'nav.about', path: '/about' },
    { name: 'Careers', tKey: 'nav.careers', path: '/careers' },
    { name: 'Contact', tKey: 'nav.contact', path: '/contact' },
    { name: 'Login', tKey: 'nav.login', path: '/login' },
];

const mainNavLinks = [
    {
        name: 'Retailers',
        tKey: 'nav.retailers',
        path: '/retailers',
        dropdown: [
            { name: 'Retailer Program', tKey: 'nav.retailerProgram', path: '/retailers' },
            { name: 'Partner Application', tKey: 'nav.partnerApplication', path: '/retail-application' },
        ]
    },
    {
        name: 'Suppliers',
        tKey: 'nav.suppliers',
        path: '/suppliers',
        dropdown: [
            { name: 'Supplier Program', tKey: 'nav.supplierProgram', path: '/suppliers' },
            { name: 'Brand Enquiry', tKey: 'nav.brandEnquiry', path: '/supplier-application' },
            { name: 'Our Brand Partners', tKey: 'nav.brandPartners', path: '/brand-partners' },
        ]
    },
    {
        name: 'Products',
        tKey: 'nav.products',
        path: '/products',
        dropdown: [
            { name: 'All Products', tKey: 'nav.allProducts', path: '/products' },
            { name: 'Skincare', tKey: 'nav.skincare', path: '/products/dermo-cosmetics' },
            { name: 'Wellness', tKey: 'nav.wellness', path: '/products/wellness-nutrition' },
            { name: 'Beauty', tKey: 'nav.beauty', path: '/products/beauty-care' },
            { name: 'Professional Care', tKey: 'nav.professionalCare', path: '/products/professional-salon' },
        ]
    },
    {
        name: 'Services',
        tKey: 'nav.services',
        path: '/distribution'
    },
    {
        name: 'News & Resources',
        tKey: 'nav.newsResources',
        path: '/blog',
        dropdown: [
            { name: 'Blog', tKey: 'nav.blog', path: '/blog' },
            { name: 'Events', tKey: 'nav.events', path: '#' },
        ]
    }
];

const ctaLinks = [
    { name: 'Become a Retailer', tKey: 'nav.becomeRetailer', path: '/retail-application' },
    { name: 'Become a Supplier', tKey: 'nav.becomeSupplier', path: '/supplier-application' },
];

const footerLinks = {
    'CUSTOMER SERVICE': {
      tKey: 'footer.customerService',
      links: [
        { name: 'Contact Us', tKey: 'footer.contactUs', path: '/contact' },
        { name: 'Distribution', tKey: 'footer.distribution', path: '/distribution' },
        { name: 'Help Centre / FAQs', tKey: 'footer.helpCenter', path: '#' },
        { name: 'Returns', tKey: 'footer.returns', path: '#' },
      ]
    },
    'ABOUT GLOWIZON': {
      tKey: 'footer.aboutGlowizon',
      links: [
        { name: 'About Us', tKey: 'footer.aboutUs', path: '/about' },
        { name: 'Careers', tKey: 'nav.careers', path: '/careers' },
      ]
    },
    'LEGAL': {
      tKey: 'footer.legal',
      links: [
        { name: 'Privacy & Terms', tKey: 'footer.privacyTerms', path: '/privacy-terms' },
        { name: 'Cookie Policy', tKey: 'footer.cookiePolicy', path: '#' },
        { name: 'Accessibility', tKey: 'footer.accessibility', path: '#' },
      ]
    },
    'FIND OUT MORE': {
      tKey: 'footer.findOutMore',
      links: [
        { name: 'For Retailers', tKey: 'footer.forRetailers', path: '/retailers' },
        { name: 'For Suppliers', tKey: 'footer.forSuppliers', path: '/suppliers' },
        { name: 'Our Products', tKey: 'footer.ourProducts', path: '/products' },
        { name: 'Blog', tKey: 'nav.blog', path: '/blog' },
      ]
    },
};

// --- LANGUAGE SWITCHER ---
const LanguageSwitcher = () => {
    const { language, setLanguage } = useTranslation();
    return (
        <div className="flex items-center space-x-1 border-r border-gray-300 pr-4 mr-4">
            <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs rounded-sm transition-colors ${language === 'en' ? 'font-bold text-white bg-brand-green' : 'text-gray-600 hover:text-brand-green'}`}
                disabled={language === 'en'}
                aria-pressed={language === 'en'}
            >
                EN
            </button>
            <button
                onClick={() => setLanguage('fr')}
                className={`px-2 py-1 text-xs rounded-sm transition-colors ${language === 'fr' ? 'font-bold text-white bg-brand-green' : 'text-gray-600 hover:text-brand-green'}`}
                disabled={language === 'fr'}
                aria-pressed={language === 'fr'}
            >
                FR
            </button>
        </div>
    );
};


// --- HEADER COMPONENT ---
export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const scrollPosition = useScrollPosition();
    const isScrolled = scrollPosition > 10;
    const { t } = useTranslation();

    const location = useLocation();
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);
    
    const NavItem: React.FC<{link: typeof mainNavLinks[0]}> = ({ link }) => {
        const isParentActive = link.dropdown ? location.pathname.startsWith(link.path) : false;
    
        const getNavLinkClasses = (isActive: boolean) => {
            const active = isParentActive || isActive;
            if (link.path === '#') return `h-full flex items-center text-sm font-medium py-5 border-b-2 transition-colors duration-300 text-text-primary border-transparent group-hover:text-brand-green group-hover:border-brand-green`;
            return `h-full flex items-center text-sm font-medium py-5 border-b-2 transition-colors duration-300 ${
                active 
                ? 'text-brand-green border-brand-green' 
                : 'text-text-primary border-transparent group-hover:text-brand-green group-hover:border-brand-green'
            }`;
        };
    
        if (link.dropdown) {
            return (
                 <div className="relative group h-full flex items-center">
                    <NavLink to={link.path} className={({ isActive }) => getNavLinkClasses(isActive)}>
                        {t(link.tKey)}
                        <ChevronDownIcon className="ml-1 h-4 w-4"/>
                    </NavLink>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-56 origin-top rounded-b-md bg-base shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10" role="menu" aria-orientation="vertical">
                        <div className="py-1">
                            {link.dropdown.map(subLink => (
                                <NavLink 
                                    key={subLink.name} 
                                    to={subLink.path} 
                                    className={({ isActive }) => `block px-4 py-2 text-sm transition-colors ${isActive ? 'text-brand-green bg-divider font-medium' : 'text-text-primary hover:bg-divider hover:text-brand-green'}`}
                                >
                                    {t(subLink.tKey)}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
        return (
             <NavLink to={link.path} className={({ isActive }) => getNavLinkClasses(isActive)}>
                 {t(link.tKey)}
             </NavLink>
        );
    };

    return (
        <>
            <header className={`sticky top-0 z-50 bg-base transition-shadow duration-300 ${isScrolled ? 'shadow' : ''}`}>
                 {/* Top Bar */}
                <div className="bg-divider hidden lg:block">
                    <div className="container mx-auto px-6 py-1.5 flex justify-end items-center">
                        <div className="flex items-center space-x-6 text-xs text-gray-600">
                            <LanguageSwitcher />
                            {topBarLinks.map((link) => (
                                 <NavLink key={link.name} to={link.path} className={({ isActive }) => `transition-colors hover:text-brand-green ${isActive ? 'text-brand-green' : ''}`}>{t(link.tKey)}</NavLink>
                            ))}
                        </div>
                    </div>
                </div>
                
                 {/* Main Navigation */}
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/" className="font-heading text-2xl font-bold tracking-tight text-text-primary">
                            Glowizon
                        </Link>
                        
                        <div className="hidden lg:flex items-center">
                            <nav className="flex items-stretch space-x-4 lg:space-x-6 xl:space-x-8">
                                {mainNavLinks.map((link) => (
                                    <NavItem key={link.name} link={link} />
                                ))}
                            </nav>
                            <div className="ml-8">
                                <div className="relative group">
                                    <button className="group inline-flex items-center justify-center rounded-md bg-brand-green px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                       {t('nav.startPartnership')}
                                       <ChevronDownIcon className="ml-1.5 h-4 w-4" />
                                    </button>
                                     <div className="absolute top-full right-0 mt-2 w-56 origin-top-right rounded-md bg-base shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2 z-10" role="menu" aria-orientation="vertical">
                                        <div className="py-2">
                                            {ctaLinks.map(link => (
                                                <Link key={link.name} to={link.path} className="block px-4 py-2 text-sm text-text-primary hover:bg-divider hover:text-brand-green">{t(link.tKey)}</Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="lg:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-text-primary" aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
                                {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden bg-base absolute top-full left-0 w-full shadow-lg border-t border-divider">
                        <nav className="flex flex-col p-6 space-y-2">
                            {mainNavLinks.map((link) => (
                                <div key={link.name}>
                                     <NavLink to={link.path} end={!link.dropdown} className={({ isActive }) => `block py-2 text-base font-medium ${isActive ? 'text-brand-green' : 'text-text-primary'}`}>{t(link.tKey)}</NavLink>
                                    {link.dropdown && (
                                        <div className="pl-4 mt-1 flex flex-col space-y-1">
                                        {link.dropdown.map(subLink => (
                                            <NavLink key={subLink.name} to={subLink.path} className={({ isActive }) => `block py-1.5 text-sm ${isActive ? 'text-brand-green font-semibold' : 'text-gray-600'}`}>{t(subLink.tKey)}</NavLink>
                                        ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                             <div className="border-t border-divider mt-4 pt-4 flex flex-col space-y-2">
                                 {topBarLinks.map(link => (
                                    <NavLink key={link.name} to={link.path} className={({ isActive }) => `block py-2 text-base font-medium ${isActive ? 'text-brand-green' : 'text-text-primary'}`}>{t(link.tKey)}</NavLink>
                                ))}
                            </div>
                             <div className="border-t border-divider mt-4 pt-4 flex flex-col space-y-2">
                                <div className="px-0 py-2 text-xs font-bold uppercase text-gray-500">{t('nav.startPartnership')}</div>
                                {ctaLinks.map(link => (
                                   <NavLink key={link.name} to={link.path} className={({ isActive }) => `block py-2 text-base font-medium ${isActive ? 'text-brand-green' : 'text-text-primary'}`}>{t(link.tKey)}</NavLink>
                               ))}
                            </div>
                        </nav>
                    </div>
                )}
            </header>
            {/* Mobile Menu Backdrop */}
            {isMenuOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMenuOpen(false)}
                    aria-hidden="true"
                />
            )}
        </>
    );
};


// --- SLOGAN SECTION COMPONENT ---
export const SloganSection: React.FC = () => {
    const backgroundImageUrl = "https://images.unsplash.com/photo-1536679219481-0c5f214f1b1a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const { t } = useTranslation();
    
    return (
        <section 
            className="relative bg-cover bg-center text-white"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
            <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
            <div className="relative z-10 container mx-auto px-6 py-6 sm:h-16 sm:py-0 flex items-center justify-center">
                <AnimatedSection animation="fadeInUp">
                    <h2 className="font-slogan font-semibold text-xl md:text-[1.6rem] leading-tight tracking-wide text-center">
                        {t('slogan')}
                    </h2>
                </AnimatedSection>
            </div>
        </section>
    );
};


// --- FOOTER COMPONENT ---
export const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const { t } = useTranslation();
    const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setFormState('error');
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        setFormState('submitting');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // On success:
        setFormState('submitted');
        setEmail('');

        // Reset form after a few seconds
        setTimeout(() => setFormState('idle'), 5000);
    };
    
    const handleCopyCode = async () => {
        const fileContents: Record<string, string> = {
          'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="G_logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Glowizon</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Inter+Tight:wght@700&family=Poppins:wght@600&display=swap" rel="stylesheet">
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              'base': '#FAFAFA',
              'text-primary': '#101010',
              'accent': '#F6A800',
              'divider': '#F1F1F1',
              'brand-green': '#4A934A',
            },
            fontFamily: {
              sans: ['Inter', 'sans-serif'],
              heading: ['Inter Tight', 'sans-serif'],
              slogan: ['Poppins', 'sans-serif'],
            },
            borderRadius: {
              '2.5xl': '1.25rem', // 20px
              '3xl': '1.5rem',   // 24px
            },
            boxShadow: {
              'accent-glow': '0 0 15px 3px rgba(255, 123, 84, 0.4)',
            }
          }
        }
      }
    </script>
<script type="importmap">
{
  "imports": {
    "react-dom/": "https://aistudiocdn.com/react-dom@^19.2.0/",
    "react/": "https://aistudiocdn.com/react@^19.2.0/",
    "react": "https://aistudiocdn.com/react@^19.2.0",
    "react-intersection-observer": "https://aistudiocdn.com/react-intersection-observer@^10.0.0",
    "react-router-dom": "https://aistudiocdn.com/react-router-dom@^7.9.5",
    "intersection-observer": "https://aistudiocdn.com/intersection-observer@^0.12.2"
  }
}
</script>
</head>
<body class="bg-base text-text-primary">
    <div id="root"></div>
    <script type="module" src="/index.tsx"></script>
</body>
</html>`,
          'index.tsx': `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'intersection-observer';
import './i18n';


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
          'metadata.json': `{
  "name": "Glowizon Original",
  "description": "A U.S. distributor for wellness, skincare, and personal-care brands, setting the gold standard in logistics with precision, reliability, and care.",
  "requestFramePermissions": []
}`,
          'App.tsx': `
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components';
// Fix: The import was resolving to the deprecated 'pages.tsx' file instead of the 'pages' directory. Changed path to './pages/index' to fix this.
import {
    HomePage,
    AboutPage,
    DistributionPage,
    SuppliersPage,
    SupplierApplicationPage,
    RetailersPage,
    RetailApplicationPage,
    ProductsPage,
    SkincarePage,
    WellnessPage,
    BeautyPage,
    ProfessionalCarePage,
    CareersPage,
    ContactPage,
    PrivacyTermsPage,
    BlogPage,
    LoginPage
} from './pages/index';
import { LanguageProvider } from './i18n';


// --- SCROLL TO TOP COMPONENT ---
// This component ensures smooth scrolling behavior for the entire app.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}


// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
    return (
        <LanguageProvider>
            <HashRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="distribution" element={<DistributionPage />} />
                        <Route path="suppliers" element={<SuppliersPage />} />
                        <Route path="supplier-application" element={<SupplierApplicationPage />} />
                        <Route path="retailers" element={<RetailersPage />} />
                        <Route path="retail-application" element={<RetailApplicationPage />} />
                        <Route path="products" element={<ProductsPage />} />
                        <Route path="products/dermo-cosmetics" element={<SkincarePage />} />
                        <Route path="products/wellness-nutrition" element={<WellnessPage />} />
                        <Route path="products/beauty-care" element={<BeautyPage />} />
                        <Route path="products/professional-salon" element={<ProfessionalCarePage />} />
                        <Route path="careers" element={<CareersPage />} />
                        <Route path="contact" element={<ContactPage />} />
                        <Route path="privacy-terms" element={<PrivacyTermsPage />} />
                        <Route path="blog" element={<BlogPage />} />
                        <Route path="login" element={<LoginPage />} />
                    </Route>
                </Routes>
            </HashRouter>
        </LanguageProvider>
    );
};

export default App;`,
          'components.tsx': await (await fetch('/components.tsx')).text(),
          'icons.tsx': `
import React from 'react';

export const ArrowRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
);

export const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

export const CheckCircleSolidIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

export const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

export const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

export const QuoteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M14.017 18L14.017 10.609C14.017 8.281 15.655 6.435 17.911 6.001L17.911 3.239C14.383 3.693 11.517 6.442 11.517 10.609L11.517 18L14.017 18ZM5 18L5 10.609C5 8.281 6.638 6.435 8.894 6.001L8.894 3.239C5.366 3.693 2.5 6.442 2.5 10.609L2.5 18L5 18Z"/>
    </svg>
);

export const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);

export const ExclamationCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
  </svg>
);

export const EnvelopeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
);

export const XSocialIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.415 2.175 8.796 2.163 12 2.163zm0 1.441c-3.171 0-3.53.012-4.76.069-2.734.124-3.951 1.348-4.075 4.075-.057 1.23-.069 1.589-.069 4.76s.012 3.53.069 4.76c.124 2.727 1.341 3.951 4.075 4.075 1.23.057 1.589.069 4.76.069s3.53-.012 4.76-.069c2.734-.124 3.951-1.348 4.075-4.075.057-1.23.069-1.589.069-4.76s-.012-3.53-.069-4.76c-.124-2.727-1.341-3.951-4.075-4.075-1.23-.057-1.589-.069-4.76-.069zM12 6.875A5.125 5.125 0 1012 17.125 5.125 5.125 0 0012 6.875zm0 8.813a3.688 3.688 0 110-7.375 3.688 3.688 0 010 7.375zm6.406-9.696a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" />
    </svg>
);

export const LinkedInIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
);

export const ClipboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v3.043m-7.416 0v3.043c0 .212.03.418.084.612m7.332 0-1.06.607a2.25 2.25 0 0 1-2.22 0l-1.06-.607m7.332 0v3.043c0 .493-.195.96-.543 1.309l-3.376 3.376a2.25 2.25 0 0 1-1.59.654H9.75a2.25 2.25 0 0 1-2.25-2.25V5.25c0-.493.195-.96.543-1.309l3.376-3.376a2.25 2.25 0 0 1 1.59-.654h1.5c.212 0 .418.03.612.084" />
    </svg>
);`,
          'i18n.tsx': await (await fetch('/i18n.tsx')).text(),
          'pages/index.tsx': `
export * from './HomePage';
export * from './AboutPage';
export * from './DistributionPage';
export * from './SuppliersPage';
export * from './SupplierApplicationPage';
export * from './RetailersPage';
export * from './RetailApplicationPage';
export * from './ProductsPage';
export * from './SkincarePage';
export * from './WellnessPage';
export * from './BeautyPage';
export * from './ProfessionalCarePage';
export * from './CareersPage';
export * from './ContactPage';
export * from './PrivacyTermsPage';
export * from './BlogPage';
export * from './LoginPage';`,
          'pages/AboutPage.tsx': await (await fetch('/pages/AboutPage.tsx')).text(),
          'pages/BeautyPage.tsx': await (await fetch('/pages/BeautyPage.tsx')).text(),
          'pages/BlogPage.tsx': await (await fetch('/pages/BlogPage.tsx')).text(),
          'pages/CareersPage.tsx': await (await fetch('/pages/CareersPage.tsx')).text(),
          'pages/ContactPage.tsx': await (await fetch('/pages/ContactPage.tsx')).text(),
          'pages/DistributionPage.tsx': await (await fetch('/pages/DistributionPage.tsx')).text(),
          'pages/HomePage.tsx': await (await fetch('/pages/HomePage.tsx')).text(),
          'pages/LoginPage.tsx': await (await fetch('/pages/LoginPage.tsx')).text(),
          'pages/PrivacyTermsPage.tsx': await (await fetch('/pages/PrivacyTermsPage.tsx')).text(),
          'pages/ProductsPage.tsx': await (await fetch('/pages/ProductsPage.tsx')).text(),
          'pages/ProfessionalCarePage.tsx': await (await fetch('/pages/ProfessionalCarePage.tsx')).text(),
          'pages/RetailApplicationPage.tsx': await (await fetch('/pages/RetailApplicationPage.tsx')).text(),
          'pages/RetailersPage.tsx': await (await fetch('/pages/RetailersPage.tsx')).text(),
          'pages/SkincarePage.tsx': await (await fetch('/pages/SkincarePage.tsx')).text(),
          'pages/SupplierApplicationPage.tsx': await (await fetch('/pages/SupplierApplicationPage.tsx')).text(),
          'pages/SuppliersPage.tsx': await (await fetch('/pages/SuppliersPage.tsx')).text(),
          'pages/WellnessPage.tsx': await (await fetch('/pages/WellnessPage.tsx')).text(),
        };

        let allFilesString = '';
        const fileOrder = [
            'index.html', 'metadata.json', 'index.tsx', 'App.tsx', 
            'components.tsx', 'icons.tsx', 'i18n.tsx', 
            'pages/index.tsx', 'pages/HomePage.tsx', 'pages/AboutPage.tsx', 
            'pages/DistributionPage.tsx', 'pages/SuppliersPage.tsx', 'pages/SupplierApplicationPage.tsx',
            'pages/RetailersPage.tsx', 'pages/RetailApplicationPage.tsx', 'pages/ProductsPage.tsx',
            'pages/SkincarePage.tsx', 'pages/WellnessPage.tsx', 'pages/BeautyPage.tsx',
            'pages/ProfessionalCarePage.tsx', 'pages/CareersPage.tsx', 'pages/ContactPage.tsx',
            'pages/PrivacyTermsPage.tsx', 'pages/BlogPage.tsx', 'pages/LoginPage.tsx'
        ];

        for (const path of fileOrder) {
            if (fileContents[path]) {
                allFilesString += `--- START OF FILE ${path} ---\n\n`;
                allFilesString += fileContents[path].trim();
                allFilesString += `\n\n--- END OF FILE ${path} ---\n\n\n`;
            }
        }
        
        try {
            await navigator.clipboard.writeText(allFilesString.trim());
            setCopyStatus('copied');
            setTimeout(() => setCopyStatus('idle'), 2500);
        } catch (err) {
            console.error('Failed to copy code: ', err);
            alert('Failed to copy code. Please try again.');
        }
    };

    return (
        <footer className="bg-text-primary text-base">
            <div className="container mx-auto px-6">
                {/* Top Bar */}
                <div className="border-b border-gray-700 py-6 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <EnvelopeIcon className="h-6 w-6"/>
                            <span className="font-medium uppercase tracking-wider text-sm">{t('footer.newsletter')}</span>
                        </div>
                         {formState === 'submitted' ? (
                            <div className="flex items-center text-green-400 p-2 rounded-md bg-gray-800 w-full sm:w-auto sm:max-w-xs h-[42px]">
                                <CheckCircleSolidIcon className="h-6 w-6 mr-2"/>
                                <p className="text-sm font-medium">{t('footer.subscribeSuccess')}</p>
                            </div>
                         ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col w-full sm:w-auto sm:max-w-xs">
                                <div className="flex items-center">
                                    <label htmlFor="footer-email" className="sr-only">{t('footer.enterEmail')}</label>
                                    <input 
                                        id="footer-email" 
                                        type="email" 
                                        placeholder={t('footer.enterEmail') as string} 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={formState === 'submitting'}
                                        aria-invalid={formState === 'error'}
                                        aria-describedby={formState === 'error' ? 'email-error' : undefined}
                                        className="bg-gray-800 text-base border border-gray-600 rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-accent w-full disabled:opacity-50"
                                    />
                                    <button 
                                        type="submit" 
                                        disabled={formState === 'submitting'}
                                        className="bg-base text-text-primary font-bold py-2 px-4 rounded-r-md hover:bg-gray-200 transition-colors text-sm uppercase flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[110px] h-[42px]"
                                    >
                                        {formState === 'submitting' ? t('footer.subscribing') : t('footer.subscribe')}
                                    </button>
                                </div>
                                {formState === 'error' && errorMessage && (
                                    <p id="email-error" className="mt-2 text-sm text-red-400">{errorMessage}</p>
                                )}
                            </form>
                         )}
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <span className="font-medium uppercase tracking-wider text-sm flex-shrink-0">{t('footer.connectWithUs')}</span>
                        <div className="flex items-center gap-4">
                            <a href="#" aria-label="X" className="hover:text-accent transition-colors"><XSocialIcon className="h-5 w-5"/></a>
                            <a href="#" aria-label="Instagram" className="hover:text-accent transition-colors"><InstagramIcon className="h-5 w-5"/></a>
                            <a href="#" aria-label="LinkedIn" className="hover:text-accent transition-colors"><LinkedInIcon className="h-5 w-5"/></a>
                        </div>
                         <button 
                            onClick={handleCopyCode}
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200 disabled:opacity-60 disabled:cursor-wait sm:border-l sm:border-gray-700 sm:pl-6"
                            disabled={copyStatus === 'copied'}
                            aria-live="polite"
                        >
                            {copyStatus === 'copied' ? (
                                <>
                                    <CheckCircleSolidIcon className="h-5 w-5 text-green-400" />
                                    <span className="text-white">Copied!</span>
                                </>
                            ) : (
                                <>
                                    <ClipboardIcon className="h-5 w-5" />
                                    <span>Copy Website Code</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className="md:col-span-2 lg:col-span-1">
                        <Link to="/" className="font-heading text-2xl font-bold tracking-tight text-base">
                           Glowizon
                        </Link>
                        <p className="mt-4 text-gray-400 text-sm max-w-sm">{t('footer.companyDescription')}</p>
                    </div>
                    <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {Object.values(footerLinks).map((section) => (
                            <div key={section.tKey}>
                                <h3 className="font-bold text-base uppercase tracking-wider text-sm">{t(section.tKey)}</h3>
                                <ul className="mt-4 space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link.name}>
                                            <Link to={link.path} className="text-gray-400 hover:text-base transition-colors text-sm">{t(link.tKey)}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Bottom Bar */}
            <div className="bg-black/20">
                <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Glowizon LLC. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

// --- LAYOUT COMPONENT ---
export const Layout: React.FC = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // This ensures the page scrolls to the top on route changes.
        // For hash links, specific handling might be needed if this interferes.
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }
    }, [pathname]);
    
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <SloganSection />
            <Footer />
        </div>
    );
};