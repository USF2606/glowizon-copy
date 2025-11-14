
import React from 'react';
import {
    AnimatedSection,
    HeroMediaFull,
    ContentSection,
    Button,
    SectionHeader,
    ImageWithText,
} from '../components';
import { useTranslation } from '../i18n';

// --- 11. BEAUTY PAGE ---
export const BeautyPage: React.FC = () => {
    const { t } = useTranslation();
    return (
    <>
        <HeroMediaFull
            headline={t('beauty.hero.headline')}
            subhead={t('beauty.hero.subhead') as string}
            body={t('beauty.hero.body') as string}
            imageSrc="https://images.unsplash.com/photo-1563903530908-afdd155d057a?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            altText="A person relaxing in a bathtub, representing self-care and beauty."
        />
        <ContentSection>
             <ImageWithText
                imageUrl="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                imageAlt="Beauty products on a bathroom counter."
                imageSide="right"
             >
                <SectionHeader title={t('beauty.confidence.title')} centered={false}/>
                <p className="mt-6 text-lg text-gray-700 leading-relaxed">{t('beauty.confidence.body')}</p>
            </ImageWithText>
        </ContentSection>

        <ContentSection bgColor="divider">
            <SectionHeader title={t('beauty.philosophy.title')} />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <AnimatedSection>
                    <div className="bg-base p-8 rounded-2.5xl h-full text-center shadow-sm">
                        <h3 className="font-heading text-2xl font-bold">{t('beauty.philosophy.item1Title')}</h3>
                        <p className="mt-3 text-gray-600 leading-relaxed">{t('beauty.philosophy.item1Body')}</p>
                    </div>
                </AnimatedSection>
                <AnimatedSection delay="delay-150">
                    <div className="bg-base p-8 rounded-2.5xl h-full text-center shadow-sm">
                        <h3 className="font-heading text-2xl font-bold">{t('beauty.philosophy.item2Title')}</h3>
                        <p className="mt-3 text-gray-600 leading-relaxed">{t('beauty.philosophy.item2Body')}</p>
                    </div>
                </AnimatedSection>
                <AnimatedSection delay="delay-300">
                    <div className="bg-base p-8 rounded-2.5xl h-full text-center shadow-sm">
                        <h3 className="font-heading text-2xl font-bold">{t('beauty.philosophy.item3Title')}</h3>
                        <p className="mt-3 text-gray-600 leading-relaxed">{t('beauty.philosophy.item3Body')}</p>
                    </div>
                </AnimatedSection>
            </div>
        </ContentSection>

        <ContentSection>
            <SectionHeader title={t('beauty.trust.title')} />
            <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">{t('beauty.trust.body')}</p>
            <div className="mt-8 text-center"><Button to="/suppliers">{t('beauty.trust.cta')}</Button></div>
        </ContentSection>
    </>
)};
