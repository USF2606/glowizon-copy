
import React from 'react';
import {
    AnimatedSection,
    HeroMediaFull,
    ContentSection,
    Button,
    SectionHeader,
} from '../components';
import { useTranslation } from '../i18n';

// --- 12. PROFESSIONAL CARE PAGE ---
export const ProfessionalCarePage: React.FC = () => {
    const { t } = useTranslation();
    return (
    <>
        <HeroMediaFull
            headline={t('professionalCare.hero.headline')}
            subhead={t('professionalCare.hero.subhead') as string}
            body={t('professionalCare.hero.body') as string}
            imageSrc="https://images.unsplash.com/photo-1512290923902-8a9f31c83659?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            altText="A client receiving a professional facial treatment in a spa."
        />
        <ContentSection>
             <SectionHeader title={t('professionalCare.knowledge.title')} />
             <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">{t('professionalCare.knowledge.body')}</p>
        </ContentSection>

         <ContentSection bgColor="divider">
            <SectionHeader title={t('professionalCare.approach.title')} />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <AnimatedSection>
                    <div className="bg-base p-8 rounded-2.5xl h-full text-center shadow-sm">
                        <h3 className="font-heading text-2xl font-bold">{t('professionalCare.approach.item1Title')}</h3>
                        <p className="mt-3 text-gray-600 leading-relaxed">{t('professionalCare.approach.item1Body')}</p>
                    </div>
                </AnimatedSection>
                <AnimatedSection delay="delay-150">
                    <div className="bg-base p-8 rounded-2.5xl h-full text-center shadow-sm">
                        <h3 className="font-heading text-2xl font-bold">{t('professionalCare.approach.item2Title')}</h3>
                        <p className="mt-3 text-gray-600 leading-relaxed">{t('professionalCare.approach.item2Body')}</p>
                    </div>
                </AnimatedSection>
                <AnimatedSection delay="delay-300">
                    <div className="bg-base p-8 rounded-2.5xl h-full text-center shadow-sm">
                        <h3 className="font-heading text-2xl font-bold">{t('professionalCare.approach.item3Title')}</h3>
                        <p className="mt-3 text-gray-600 leading-relaxed">{t('professionalCare.approach.item3Body')}</p>
                    </div>
                </AnimatedSection>
            </div>
        </ContentSection>

        <ContentSection>
            <SectionHeader title={t('professionalCare.precision.title')} />
            <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">{t('professionalCare.precision.body')}</p>
            <div className="mt-8 text-center"><Button to="/suppliers">{t('professionalCare.precision.cta')}</Button></div>
        </ContentSection>
    </>
)};
