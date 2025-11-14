
import React from 'react';
import {
    AnimatedSection,
    HeroMediaFull,
    ContentSection,
    Button,
    SectionHeader,
} from '../components';
import { useTranslation } from '../i18n';

// --- 9. SKINCARE PAGE ---
export const SkincarePage: React.FC = () => {
    const { t } = useTranslation();
    return (
    <>
        <HeroMediaFull
            headline={t('skincare.hero.headline')}
            subhead={t('skincare.hero.subhead') as string}
            body={t('skincare.hero.body') as string}
            imageSrc="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            altText="A collection of clean, minimalist skincare bottles and droppers."
        />
        <ContentSection>
            <SectionHeader title={t('skincare.confidence.title')} />
            <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">
                {t('skincare.confidence.body')}
            </p>
        </ContentSection>
        
        <ContentSection bgColor="divider">
            <SectionHeader title={t('skincare.approach.title')} />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <AnimatedSection>
                    <div className="bg-base p-8 rounded-2.5xl h-full text-center shadow-sm">
                        <h3 className="font-heading text-2xl font-bold">{t('skincare.approach.item1Title')}</h3>
                        <p className="mt-3 text-gray-600 leading-relaxed">{t('skincare.approach.item1Body')}</p>
                    </div>
                </AnimatedSection>
                <AnimatedSection delay="delay-150">
                    <div className="bg-base p-8 rounded-2.5xl h-full text-center shadow-sm">
                        <h3 className="font-heading text-2xl font-bold">{t('skincare.approach.item2Title')}</h3>
                        <p className="mt-3 text-gray-600 leading-relaxed">{t('skincare.approach.item2Body')}</p>
                    </div>
                </AnimatedSection>
                <AnimatedSection delay="delay-300">
                    <div className="bg-base p-8 rounded-2.5xl h-full text-center shadow-sm">
                        <h3 className="font-heading text-2xl font-bold">{t('skincare.approach.item3Title')}</h3>
                        <p className="mt-3 text-gray-600 leading-relaxed">{t('skincare.approach.item3Body')}</p>
                    </div>
                </AnimatedSection>
            </div>
        </ContentSection>

        <ContentSection>
            <SectionHeader title={t('skincare.promise.title')} />
            <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">{t('skincare.promise.body')}</p>
            <div className="mt-8 text-center"><Button to="/suppliers">{t('skincare.promise.cta')}</Button></div>
        </ContentSection>
    </>
)};
