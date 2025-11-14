
import React, { useState, ReactNode, useRef } from 'react';
import {
    AnimatedSection,
    ContentSection,
    Button,
    CheckListItem,
    InputField,
    TextareaField,
    CheckboxField,
    SectionHeader,
} from '../components';
import { ArrowRightIcon, ExclamationCircleIcon, CheckIcon } from '../icons';
import { useTranslation } from '../i18n';

// --- 7. RETAIL APPLICATION PAGE ---
export const RetailApplicationPage: React.FC = () => {
    const { t } = useTranslation();
    const [submitted, setSubmitted] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);
    
    const [formData, setFormData] = useState({
        accountType: '',
        legalName: '',
        storeName: '',
        ein: '',
        businessType: '',
        website: '',
        productCategories: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        deliveryContact: '',
        deliveryInstructions: '',
        ownerName: '',
        ownerMobile: '',
        ownerEmail: '',
        purchasingContact: '',
        accountsContact: '',
        confirmLicensed: false,
        confirmTrade: false,
        confirmStockist: false,
        subscribe: false,
    });
    
    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    
    const RadioGroup: React.FC<{
        label: string,
        name: keyof typeof formData,
        options: string[],
        required?: boolean,
        error?: string,
    }> = ({ label, name, options, required, error }) => (
        <div>
            <label className={`block text-sm font-bold ${error ? 'text-red-600' : 'text-gray-900'} mb-2`}>{label}</label>
            <div className="flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-2">
                {options.map(option => (
                    <div key={option} className="flex items-center">
                        <input 
                            id={`${name}-${option.replace(/\s+/g, '-')}`} 
                            name={name} 
                            type="radio" 
                            value={option}
                            checked={formData[name] === option}
                            onChange={handleChange}
                            required={required}
                            className="h-4 w-4 border-gray-300 text-accent focus:ring-accent" 
                        />
                        <label htmlFor={`${name}-${option.replace(/\s+/g, '-')}`} className="ml-3 block text-sm text-gray-700">{option}</label>
                    </div>
                ))}
            </div>
            {error && (
                <div className="mt-2 text-sm text-red-600 flex items-center bg-red-50 p-2 rounded-md">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
    
    interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
        label: string;
        error?: string;
        children: ReactNode;
    }
    const SelectField: React.FC<SelectFieldProps> = ({ label, id, required, error, children, ...props }) => {
        const hasError = !!error;
        return (
            <div>
                <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor={id} className={`block text-sm font-bold ${hasError ? 'text-red-600' : 'text-gray-900'}`}>{label}</label>
                    {required && <span className="text-xs text-gray-500">(required)</span>}
                </div>
                <select
                    id={id}
                    required={required}
                    {...props}
                    className={`block w-full rounded-lg border-0 bg-white p-3.5 ring-1 ring-inset 
                        ${hasError
                            ? 'bg-red-50 ring-red-500 text-red-900 focus:ring-2 focus:ring-inset focus:ring-red-500'
                            : 'ring-gray-300 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-text-primary'
                        } sm:text-sm sm:leading-6 transition-colors duration-200`}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${id}-error` : undefined}
                >
                    {children}
                </select>
                {hasError && (
                    <div id={`${id}-error`} className="mt-2 text-sm text-red-600 flex items-center bg-red-50 p-2 rounded-md">
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}
            </div>
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Partial<Record<keyof typeof formData, string>> = {};

        if (!formData.accountType) newErrors.accountType = t('retailApplication.errors.accountType') as string;
        if (!formData.legalName) newErrors.legalName = t('retailApplication.errors.legalName') as string;
        if (!formData.storeName) newErrors.storeName = t('retailApplication.errors.storeName') as string;
        if (!formData.ein) newErrors.ein = t('retailApplication.errors.ein') as string;
        if (!formData.businessType) newErrors.businessType = t('retailApplication.errors.businessType') as string;
        if (!formData.website) newErrors.website = t('retailApplication.errors.website') as string;
        if (!formData.productCategories) newErrors.productCategories = t('retailApplication.errors.productCategories') as string;
        if (!formData.address) newErrors.address = t('retailApplication.errors.address') as string;
        if (!formData.city) newErrors.city = t('retailApplication.errors.city') as string;
        if (!formData.state) newErrors.state = t('retailApplication.errors.state') as string;
        if (!formData.zip) newErrors.zip = t('retailApplication.errors.zip') as string;
        if (!formData.deliveryContact) newErrors.deliveryContact = t('retailApplication.errors.deliveryContact') as string;
        if (!formData.ownerName) newErrors.ownerName = t('retailApplication.errors.ownerName') as string;
        if (!formData.ownerMobile) newErrors.ownerMobile = t('retailApplication.errors.ownerMobile') as string;
        if (!formData.ownerEmail) {
            newErrors.ownerEmail = t('retailApplication.errors.ownerEmail') as string;
        } else if (!/\S+@\S+\.\S+/.test(formData.ownerEmail)) {
            newErrors.ownerEmail = t('retailApplication.errors.ownerEmailInvalid') as string;
        }
        if (!formData.purchasingContact) newErrors.purchasingContact = t('retailApplication.errors.purchasingContact') as string;
        if (!formData.accountsContact) newErrors.accountsContact = t('retailApplication.errors.accountsContact') as string;
        
        if (!formData.confirmLicensed) newErrors.confirmLicensed = t('retailApplication.errors.confirmLicensed') as string;
        if (!formData.confirmTrade) newErrors.confirmTrade = t('retailApplication.errors.confirmTrade') as string;
        if (!formData.confirmStockist) newErrors.confirmStockist = t('retailApplication.errors.confirmStockist') as string;

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setSubmitted(true);
            window.scrollTo(0, 0);
        }
    };

    if (submitted) {
        return (
            <ContentSection>
                <div className="text-center max-w-2xl mx-auto">
                    <SectionHeader title={t('retailApplication.success.title')}/>
                    <p className="mt-6 text-lg text-gray-700 leading-relaxed">{t('retailApplication.success.body')}</p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <Button to="/products">{t('retailApplication.success.ctaBrands')}</Button>
                        <Button to="/" variant="secondary">{t('retailApplication.success.ctaHome')}</Button>
                    </div>
                </div>
            </ContentSection>
        );
    }

    return (
        <>
            <section className="relative flex items-center justify-center w-full min-h-[80vh] py-20 text-white bg-text-primary">
                {/* Media Background */}
                <div className="absolute top-0 left-0 w-full h-full z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        alt="A group of diverse professionals collaborating around a laptop." 
                        className="w-full h-full object-cover" 
                    />
                </div>
                {/* Overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 via-black/40 to-black/30 z-10" />

                {/* Content */}
                <div className="relative z-20 container mx-auto px-6">
                    <AnimatedSection className="text-center max-w-4xl mx-auto">
                        <p className="font-bold text-accent uppercase tracking-wider">{t('retailApplication.hero.subtitle')}</p>
                        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mt-2 leading-tight">{t('retailApplication.hero.title')}</h1>
                        <p className="mt-4 text-lg text-gray-200 leading-relaxed">{t('retailApplication.hero.body')}</p>
                        
                        <div className="mt-8 border-t border-white/20 pt-8">
                            <h3 className="font-bold text-lg text-white">{t('retailApplication.hero.benefitsTitle')}</h3>
                            <div className="mt-4 inline-grid sm:grid-cols-2 gap-x-8 gap-y-2 text-left mx-auto text-white/90">
                                <CheckListItem textColorClass="text-current">{t('retailApplication.hero.benefit1')}</CheckListItem>
                                <CheckListItem textColorClass="text-current">{t('retailApplication.hero.benefit2')}</CheckListItem>
                                <CheckListItem textColorClass="text-current">{t('retailApplication.hero.benefit3')}</CheckListItem>
                                <CheckListItem textColorClass="text-current">{t('retailApplication.hero.benefit4')}</CheckListItem>
                            </div>
                        </div>

                        <div className="mt-8">
                            <button 
                                onClick={scrollToForm} 
                                className="group inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-bold text-text-primary transition-all duration-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 shadow-lg hover:shadow-xl"
                            >
                                {t('retailApplication.hero.cta')}
                                <ArrowRightIcon className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
            
            <div ref={formRef} className="scroll-mt-24">
                <ContentSection>
                    <SectionHeader title={t('retailApplication.form.title')}/>
                    <p className="mt-4 text-gray-700 text-center max-w-2xl mx-auto leading-relaxed">{t('retailApplication.form.intro')}</p>
                    
                    <form onSubmit={handleSubmit} className="mt-12 max-w-3xl mx-auto" noValidate>
                        <fieldset className="space-y-6">
                            <legend className="text-2xl font-bold font-heading mb-4 border-b pb-2">{t('retailApplication.form.legend1')}</legend>
                             <RadioGroup label={t('retailApplication.form.accountTypeLabel') as string} name="accountType" options={t('retailApplication.form.accountTypeOptions') as string[]} required error={errors.accountType} />
                        </fieldset>

                        <fieldset className="mt-10 space-y-6">
                            <legend className="text-2xl font-bold font-heading mb-4 border-b pb-2">{t('retailApplication.form.legend2')}</legend>
                            <InputField label={t('retailApplication.form.legalName') as string} id="legalName" name="legalName" type="text" required value={formData.legalName} onChange={handleChange} error={errors.legalName} />
                            <InputField label={t('retailApplication.form.storeName') as string} id="storeName" name="storeName" type="text" required value={formData.storeName} onChange={handleChange} error={errors.storeName} />
                            <InputField label={t('retailApplication.form.ein') as string} id="ein" name="ein" type="text" required value={formData.ein} onChange={handleChange} error={errors.ein} />
                            <SelectField label={t('retailApplication.form.businessTypeLabel') as string} id="businessType" name="businessType" required value={formData.businessType} onChange={handleChange} error={errors.businessType}>
                                <option value="">{t('retailApplication.form.businessTypePlaceholder')}</option>
                                {(t('retailApplication.form.businessTypeOptions') as string[]).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </SelectField>
                        </fieldset>

                        <fieldset className="mt-10 space-y-6">
                            <legend className="text-2xl font-bold font-heading mb-4 border-b pb-2">{t('retailApplication.form.legend3')}</legend>
                            <InputField label={t('retailApplication.form.website') as string} id="website" name="website" type="url" required value={formData.website} onChange={handleChange} error={errors.website} />
                            <InputField label={t('retailApplication.form.productCategories') as string} id="productCategories" name="productCategories" type="text" required value={formData.productCategories} onChange={handleChange} error={errors.productCategories} />
                            <InputField label={t('retailApplication.form.photos') as string} id="photos" name="photos" type="file" multiple accept="image/*" hint={t('retailApplication.form.photosHint') as string} />
                        </fieldset>
                        
                        <fieldset className="mt-10 space-y-6">
                            <legend className="text-2xl font-bold font-heading mb-4 border-b pb-2">{t('retailApplication.form.legend4')}</legend>
                            <InputField label={t('retailApplication.form.address') as string} id="address" name="address" type="text" required autoComplete="street-address" value={formData.address} onChange={handleChange} error={errors.address} />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <InputField label={t('retailApplication.form.city') as string} id="city" name="city" type="text" required autoComplete="address-level2" value={formData.city} onChange={handleChange} error={errors.city} />
                                <InputField label={t('retailApplication.form.state') as string} id="state" name="state" type="text" required autoComplete="address-level1" value={formData.state} onChange={handleChange} error={errors.state} />
                                <InputField label={t('retailApplication.form.zip') as string} id="zip" name="zip" type="text" required autoComplete="postal-code" value={formData.zip} onChange={handleChange} error={errors.zip} />
                            </div>
                            <InputField label={t('retailApplication.form.deliveryContact') as string} id="deliveryContact" name="deliveryContact" type="text" required value={formData.deliveryContact} onChange={handleChange} error={errors.deliveryContact} />
                            <TextareaField label={t('retailApplication.form.deliveryInstructions') as string} id="deliveryInstructions" name="deliveryInstructions" value={formData.deliveryInstructions} onChange={handleChange} hint={t('retailApplication.form.deliveryInstructionsHint') as string} />
                        </fieldset>

                        <fieldset className="mt-10 space-y-6">
                            <legend className="text-2xl font-bold font-heading mb-4 border-b pb-2">{t('retailApplication.form.legend5')}</legend>
                            <InputField label={t('retailApplication.form.ownerName') as string} id="ownerName" name="ownerName" type="text" required autoComplete="name" value={formData.ownerName} onChange={handleChange} error={errors.ownerName} />
                            <InputField label={t('retailApplication.form.ownerMobile') as string} id="ownerMobile" name="ownerMobile" type="tel" required autoComplete="tel" value={formData.ownerMobile} onChange={handleChange} error={errors.ownerMobile} />
                            <InputField label={t('retailApplication.form.ownerEmail') as string} id="ownerEmail" name="ownerEmail" type="email" required autoComplete="email" value={formData.ownerEmail} onChange={handleChange} error={errors.ownerEmail} />
                            <InputField label={t('retailApplication.form.purchasingContact') as string} id="purchasingContact" name="purchasingContact" type="text" required value={formData.purchasingContact} onChange={handleChange} error={errors.purchasingContact} />
                            <InputField label={t('retailApplication.form.accountsContact') as string} id="accountsContact" name="accountsContact" type="text" required value={formData.accountsContact} onChange={handleChange} error={errors.accountsContact} />
                        </fieldset>
                        
                        <fieldset className="mt-10 space-y-5">
                            <legend className="text-2xl font-bold font-heading mb-4 border-b pb-2">{t('retailApplication.form.legend6')}</legend>
                            <CheckboxField id="confirmLicensed" name="confirmLicensed" required checked={formData.confirmLicensed} onChange={handleChange} error={errors.confirmLicensed} label={<>{t('retailApplication.form.confirmLicensed')}</>} />
                            <CheckboxField id="confirmTrade" name="confirmTrade" required checked={formData.confirmTrade} onChange={handleChange} error={errors.confirmTrade} label={<>{t('retailApplication.form.confirmTrade')}</>} />
                            <CheckboxField id="confirmStockist" name="confirmStockist" required checked={formData.confirmStockist} onChange={handleChange} error={errors.confirmStockist} label={<>{t('retailApplication.form.confirmStockist')}</>} />
                            <CheckboxField id="subscribe" name="subscribe" checked={formData.subscribe} onChange={handleChange} label={<>{t('retailApplication.form.subscribe')}</>} />
                        </fieldset>

                        <div className="pt-8">
                            <button type="submit" className="group w-full inline-flex items-center justify-center rounded-lg bg-text-primary px-6 py-4 text-sm font-bold text-base transition-all duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 uppercase tracking-wider">
                               {t('retailApplication.form.submitButton')}
                                <ArrowRightIcon className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </form>
                </ContentSection>
            </div>
        </>
    );
};
