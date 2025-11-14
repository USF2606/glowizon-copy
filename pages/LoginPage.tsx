
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AnimatedSection,
    HeroMediaFull,
    ContentSection,
    InputField,
    SectionHeader,
    PasswordField,
} from '../components';
import { ArrowRightIcon } from '../icons';
import { useTranslation } from '../i18n';

// --- 17. LOGIN PAGE ---
export const LoginPage: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Partial<Record<keyof typeof formData, string>> = {};

        if (!formData.email) {
            newErrors.email = t('login.errors.emailRequired') as string;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('login.errors.emailInvalid') as string;
        }

        if (!formData.password) {
            newErrors.password = t('login.errors.passwordRequired') as string;
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // UI only, no real auth
            console.log('Login attempt with:', formData);
            alert('Login successful! (UI Only)');
        }
    };

    return (
        <>
            <HeroMediaFull
                headline={t('login.hero.headline')}
                body={t('login.hero.body') as string}
                imageSrc="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2787&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                altText="Business professionals collaborating in a modern office."
            />
            <ContentSection>
                <div className="max-w-md mx-auto">
                    <AnimatedSection>
                        <div className="bg-divider p-8 md:p-10 rounded-2.5xl shadow-lg">
                            <SectionHeader title={t('login.form.title')} centered={true} className="mb-8" />
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="space-y-6">
                                    <InputField
                                        label={t('login.form.emailLabel') as string}
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                    />
                                    <PasswordField
                                        label={t('login.form.passwordLabel') as string}
                                        id="password"
                                        name="password"
                                        autoComplete="current-password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={errors.password}
                                    />
                                </div>
                                <div className="flex items-center justify-end mt-4">
                                    <Link to="#" className="text-sm font-medium text-brand-green hover:text-green-700">
                                        {t('login.form.forgotPassword')}
                                    </Link>
                                </div>
                                <div className="mt-8">
                                    <button type="submit" className="group w-full inline-flex items-center justify-center rounded-lg bg-text-primary px-6 py-4 text-sm font-bold text-base transition-all duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 uppercase tracking-wider">
                                        {t('login.form.signInButton')}
                                        <ArrowRightIcon className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </form>
                            <div className="mt-8 text-center text-sm text-gray-600">
                                {t('login.form.noAccount')}{' '}
                                <Link to="/retail-application" className="font-bold text-brand-green hover:text-green-700">
                                    {t('login.form.partnerWithUs')}
                                </Link>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </ContentSection>
        </>
    );
};
