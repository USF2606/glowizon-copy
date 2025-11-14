
import React from 'react';
import {
    HeroMediaFull,
    ContentSection,
    Button,
    SectionHeader,
    ImageWithText,
} from '../components';
import { useTranslation } from '../i18n';

// --- 10. WELLNESS PAGE ---
export const WellnessPage: React.FC = () => {
    const { t } = useTranslation();
    return (
    <>
        <HeroMediaFull
            headline={t('wellness.hero.headline')}
            subhead={t('wellness.hero.subhead') as string}
            body={t('wellness.hero.body') as string}
            imageSrc="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            altText="A collection of vitamin and supplement bottles on a clean surface."
        />
        <ContentSection>
             <SectionHeader title={t('wellness.access.title')} />
             <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">{t('wellness.access.body')}</p>
        </ContentSection>
        
        <ContentSection bgColor="divider">
            <ImageWithText
                imageUrl="https://images.unsplash.com/photo-1544893343-41a45b6f4c80?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                imageAlt="Natural wellness products like oils and supplements on a clean background."
                imageSide="left"
            >
                <SectionHeader title={t('wellness.functional.title')} centered={false}/>
                <p className="mt-6 text-lg text-gray-700 leading-relaxed">{t('wellness.functional.body')}</p>
            </ImageWithText>
        </ContentSection>

        <ContentSection>
            <SectionHeader title={t('wellness.approach.title')} />
             <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center mb-4 text-xl">1</div>
                    <h3 className="font-heading text-2xl font-bold">{t('wellness.approach.item1Title')}</h3>
                    <p className="mt-2 text-gray-600">{t('wellness.approach.item1Body')}</p>
                </div>
                 <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center mb-4 text-xl">2</div>
                    <h3 className="font-heading text-2xl font-bold">{t('wellness.approach.item2Title')}</h3>
                    <p className="mt-2 text-gray-600">{t('wellness.approach.item2Body')}</p>
                </div>
                 <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center mb-4 text-xl">3</div>
                    <h3 className="font-heading text-2xl font-bold">{t('wellness.approach.item3Title')}</h3>
                    <p className="mt-2 text-gray-600">{t('wellness.approach.item3Body')}</p>
                </div>
            </div>
        </ContentSection>

        <ContentSection bgColor="divider">
            <SectionHeader title={t('wellness.confidence.title')} />
            <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">{t('wellness.confidence.body')}</p>
            <div className="mt-8 text-center"><Button to="/suppliers">{t('wellness.confidence.cta')}</Button></div>
        </ContentSection>
    </>
)};
