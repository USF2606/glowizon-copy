
import React, { useState } from 'react';
import {
    AnimatedSection,
    HeroMediaFull,
    ContentSection,
    Button,
    InputField,
    TextareaField,
    CheckboxField,
    SectionHeader,
} from '../components';
import { ExclamationCircleIcon } from '../icons';
import { useTranslation } from '../i18n';

// --- 5. SUPPLIER APPLICATION PAGE ---
export const SupplierApplicationPage: React.FC = () => {
    const { t } = useTranslation();
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        website: '',
        businessType: '',
        productCategory: '',
        brandDescription: '',
        marketPresence: '',
        partnershipModel: '',
        fdaCompliant: '',
        tempControl: '',
        shelfLife: '',
        goals: '',
        howHeard: '',
        confirmAuth: false,
        confirmContact: false,
    });
    const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Partial<Record<keyof typeof formData, string>> = {};

        if (!formData.companyName) newErrors.companyName = t('supplierApplication.errors.companyName') as string;
        if (!formData.contactName) newErrors.contactName = t('supplierApplication.errors.contactName') as string;
        if (!formData.email) {
            newErrors.email = t('supplierApplication.errors.email') as string;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('supplierApplication.errors.emailInvalid') as string;
        }
        if (!formData.phone) newErrors.phone = t('supplierApplication.errors.phone') as string;
        if (!formData.website) newErrors.website = t('supplierApplication.errors.website') as string;
        if (!formData.businessType) newErrors.businessType = t('supplierApplication.errors.businessType') as string;
        if (!formData.productCategory) newErrors.productCategory = t('supplierApplication.errors.productCategory') as string;
        if (!formData.marketPresence) newErrors.marketPresence = t('supplierApplication.errors.marketPresence') as string;
        if (!formData.partnershipModel) newErrors.partnershipModel = t('supplierApplication.errors.partnershipModel') as string;
        if (!formData.fdaCompliant) newErrors.fdaCompliant = t('supplierApplication.errors.fdaCompliant') as string;
        if (!formData.tempControl) newErrors.tempControl = t('supplierApplication.errors.tempControl') as string;
        if (!formData.confirmAuth) newErrors.confirmAuth = t('supplierApplication.errors.confirmAuth') as string;
        if (!formData.confirmContact) newErrors.confirmContact = t('supplierApplication.errors.confirmContact') as string;

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setSubmitted(true);
        }
    };

    if (submitted) {
        return (
            <ContentSection>
                <div className="text-center max-w-2xl mx-auto">
                    <SectionHeader title={t('supplierApplication.success.title')} />
                    <p className="mt-6 text-lg text-gray-700 leading-relaxed">{t('supplierApplication.success.body')}</p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                        <Button to="/">{t('supplierApplication.success.ctaHome')}</Button>
                        <Button to="/retailers" variant="secondary">{t('supplierApplication.success.ctaRetail')}</Button>
                    </div>
                </div>
            </ContentSection>
        );
    }
    
    return (
        <>
            <HeroMediaFull 
                headline={t('supplierApplication.hero.headline')} 
                subhead={t('supplierApplication.hero.subhead') as string}
                body={t('supplierApplication.hero.body') as string}
                imageSrc="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                altText="A person working on a laptop, signifying a professional application process."
                secondaryCta={{ text: t('supplierApplication.hero.cta') as string, to: "/suppliers" }}
            />
            <ContentSection>
                <SectionHeader title={t('supplierApplication.form.title')}/>
                <p className="mt-4 text-gray-700 text-center max-w-2xl mx-auto leading-relaxed">{t('supplierApplication.form.intro')}</p>
                
                <form onSubmit={handleSubmit} className="mt-12 max-w-3xl mx-auto" noValidate>
                    <fieldset className="space-y-6">
                        <legend className="text-2xl font-bold font-heading mb-4 border-b pb-2">{t('supplierApplication.form.legend1')}</legend>
                        <InputField label={t('supplierApplication.form.companyName') as string} id="companyName" name="companyName" type="text" required value={formData.companyName} onChange={handleChange} error={errors.companyName} />
                        <InputField label={t('supplierApplication.form.contactName') as string} id="contactName" name="contactName" type="text" required value={formData.contactName} onChange={handleChange} error={errors.contactName} />
                        <InputField label={t('supplierApplication.form.email') as string} id="email" name="email" type="email" required value={formData.email} onChange={handleChange} error={errors.email} />
                        <InputField label={t('supplierApplication.form.phone') as string} id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} error={errors.phone} />
                        <InputField label={t('supplierApplication.form.website') as string} id="website" name="website" type="url" required value={formData.website} onChange={handleChange} error={errors.website} />
                        <RadioGroup label={t('supplierApplication.form.businessTypeLabel') as string} name="businessType" options={t('supplierApplication.form.businessTypeOptions') as string[]} required error={errors.businessType} />
                    </fieldset>

                    <fieldset className="mt-10 space-y-6">
                        <legend className="text-2xl font-bold font-heading mb-4 border-b pb-2">{t('supplierApplication.form.legend2')}</legend>
                        <RadioGroup label={t('supplierApplication.form.productCategoryLabel') as string} name="productCategory" options={t('supplierApplication.form.productCategoryOptions') as string[]} required error={errors.productCategory}/>
                        <TextareaField label={t('supplierApplication.form.brandDescriptionLabel') as string} id="brandDescription" name="brandDescription" value={formData.brandDescription} onChange={handleChange} hint={t('supplierApplication.form.brandDescriptionHint') as string}/>
                        <RadioGroup label={t('supplierApplication.form.marketPresenceLabel') as string} name="marketPresence" options={t('supplierApplication.form.marketPresenceOptions') as string[]} required error={errors.marketPresence} />
                        <RadioGroup label={t('supplierApplication.form.partnershipModelLabel') as string} name="partnershipModel" options={t('supplierApplication.form.partnershipModelOptions') as string[]} required error={errors.partnershipModel} />
                    </fieldset>
                    
                    <fieldset className="mt-10 space-y-6">
                         <legend className="text-2xl font-bold font-heading mb-4 border-b pb-2">{t('supplierApplication.form.legend3')}</legend>
                         <RadioGroup label={t('supplierApplication.form.fdaCompliantLabel') as string} name="fdaCompliant" options={t('supplierApplication.form.fdaCompliantOptions') as string[]} required error={errors.fdaCompliant} />
                         <RadioGroup label={t('supplierApplication.form.tempControlLabel') as string} name="tempControl" options={t('supplierApplication.form.tempControlOptions') as string[]} required error={errors.tempControl} />
                         <RadioGroup label={t('supplierApplication.form.shelfLifeLabel') as string} name="shelfLife" options={t('supplierApplication.form.shelfLifeOptions') as string[]} />
                         <InputField label={t('supplierApplication.form.catalogueLabel') as string} id="deck" type="file" hint={t('supplierApplication.form.catalogueHint') as string} />
                    </fieldset>

                     <fieldset className="mt-10 space-y-6">
                        <legend className="text-2xl font-bold font-heading mb-4 border-b pb-2">{t('supplierApplication.form.legend4')}</legend>
                        <TextareaField label={t('supplierApplication.form.goalsLabel') as string} id="goals" name="goals" value={formData.goals} onChange={handleChange} hint={t('supplierApplication.form.goalsHint') as string}/>
                        <RadioGroup label={t('supplierApplication.form.howHeardLabel') as string} name="howHeard" options={t('supplierApplication.form.howHeardOptions') as string[]} />
                    </fieldset>

                    <fieldset className="mt-10 space-y-5">
                        <legend className="text-2xl font-bold font-heading mb-4 border-b pb-2">{t('supplierApplication.form.legend5')}</legend>
                        <CheckboxField
                            id="confirmAuth"
                            name="confirmAuth"
                            required
                            checked={formData.confirmAuth}
                            onChange={handleChange}
                            label={<>{t('supplierApplication.form.confirmAuthLabel')}</>}
                            error={errors.confirmAuth}
                        />
                         <CheckboxField
                            id="confirmContact"
                            name="confirmContact"
                            required
                            checked={formData.confirmContact}
                            onChange={handleChange}
                            label={<>{t('supplierApplication.form.confirmContactLabel')}</>}
                            error={errors.confirmContact}
                        />
                    </fieldset>
                    <div className="pt-8">
                        <button type="submit" className="group w-full inline-flex items-center justify-center rounded-lg bg-text-primary px-6 py-4 text-sm font-bold text-base transition-all duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 uppercase tracking-wider">
                            {t('supplierApplication.form.submitButton')}
                        </button>
                    </div>
                </form>
            </ContentSection>
        </>
    );
};
