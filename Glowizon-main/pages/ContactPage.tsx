
import React, { useState } from 'react';
import {
    AnimatedSection,
    HeroMediaFull,
    ContentSection,
    Button,
    InputField,
    TextareaField,
    SectionHeader,
} from '../components';
import { ArrowRightIcon } from '../icons';
import { useTranslation } from '../i18n';

// --- 14. CONTACT PAGE ---
export const ContactPage: React.FC = () => {
    const { t } = useTranslation();
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let isFormValid = true;

        if (!email) {
            setEmailError(t('contact.errors.emailRequired') as string);
            isFormValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError(t('contact.errors.emailInvalid') as string);
            isFormValid = false;
        } else {
            setEmailError('');
        }

        const form = e.target as HTMLFormElement;
        if (isFormValid && form.checkValidity()) {
            setSubmitted(true);
        } else if (!form.checkValidity()){
            form.reportValidity();
        }
    };

    return (
        <>
            <HeroMediaFull 
                headline={t('contact.hero.headline')}
                body={t('contact.hero.body') as string}
                imageSrc="https://images.unsplash.com/photo-1556740738-b6a63e2775df?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                altText="A customer service representative smiling while on a call at their desk."
            />
            
            <ContentSection>
                <SectionHeader title={t('contact.path.title')}/>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <AnimatedSection>
                        <div className="bg-divider p-8 rounded-2.5xl h-full flex flex-col justify-between text-center shadow-sm">
                            <h3 className="font-heading text-xl font-bold">{t('contact.path.brandsTitle')}</h3>
                            <p className="text-gray-700 my-4 flex-grow leading-relaxed">{t('contact.path.brandsBody')}</p>
                            <Button to="/supplier-application" variant="secondary">{t('contact.path.brandsCta')}</Button>
                        </div>
                    </AnimatedSection>
                     <AnimatedSection delay="delay-150">
                        <div className="bg-divider p-8 rounded-2.5xl h-full flex flex-col justify-between text-center shadow-sm">
                            <h3 className="font-heading text-xl font-bold">{t('contact.path.retailersTitle')}</h3>
                            <p className="text-gray-700 my-4 flex-grow leading-relaxed">{t('contact.path.retailersBody')}</p>
                            <Button to="/retail-application" variant="secondary">{t('contact.path.retailersCta')}</Button>
                        </div>
                    </AnimatedSection>
                     <AnimatedSection delay="delay-300">
                        <div className="bg-divider p-8 rounded-2.5xl h-full flex flex-col justify-between text-center shadow-sm">
                            <h3 className="font-heading text-xl font-bold">{t('contact.path.careersTitle')}</h3>
                            <p className="text-gray-700 my-4 flex-grow leading-relaxed">{t('contact.path.careersBody')}</p>
                            <Button to="/careers" variant="secondary">{t('contact.path.careersCta')}</Button>
                        </div>
                    </AnimatedSection>
                </div>
            </ContentSection>

            <ContentSection bgColor="divider">
                <div className="grid md:grid-cols-5 gap-12 items-start">
                    <div className="md:col-span-2">
                        <SectionHeader title={t('contact.inquiries.title')} centered={false}/>
                        <p className="mt-4 text-gray-700 leading-relaxed">{t('contact.inquiries.body')}</p>
                        <div className="mt-8 space-y-3 text-gray-700 text-sm">
                            <p><strong className="text-text-primary">{t('contact.inquiries.hq')}</strong> {t('contact.inquiries.hqValue')}</p>
                            <p><strong className="text-text-primary">{t('contact.inquiries.phone')}</strong> +1 (980) 425-1097</p>
                            <p><strong className="text-text-primary">{t('contact.inquiries.email')}</strong> info@glowizon.com</p>
                            <p><strong className="text-text-primary">{t('contact.inquiries.hours')}</strong> {t('contact.inquiries.hoursValue')}</p>
                        </div>
                    </div>
                    <div className="md:col-span-3">
                        {submitted ? (
                            <div className="bg-base p-8 rounded-2.5xl h-full flex flex-col justify-center text-center">
                                <h3 className="font-bold text-2xl font-heading">{t('contact.inquiries.successTitle')}</h3>
                                <p className="mt-4 text-lg text-gray-700">{t('contact.inquiries.successBody')}</p>
                            </div>
                        ) : (
                             <form onSubmit={handleSubmit} className="space-y-6 bg-base p-8 rounded-2.5xl shadow-sm" noValidate>
                                <h3 className="font-bold text-2xl font-heading">{t('contact.inquiries.formTitle')}</h3>
                                <InputField label={t('contact.inquiries.name') as string} id="name" type="text" required autoComplete="name"/>
                                <InputField 
                                    label={t('contact.inquiries.emailAddress') as string}
                                    id="email" 
                                    type="email" 
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={emailError}
                                />
                                <InputField label={t('contact.inquiries.subject') as string} id="subject" type="text" required/>
                                <TextareaField label={t('contact.inquiries.message') as string} id="message" required/>
                                <button type="submit" className="group w-full inline-flex items-center justify-center rounded-lg bg-text-primary px-6 py-4 text-sm font-bold text-base transition-all duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 uppercase tracking-wider">
                                   {t('contact.inquiries.submit')}
                                    <ArrowRightIcon className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </ContentSection>
        </>
    );
};
