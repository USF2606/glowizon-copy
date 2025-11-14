
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

// --- 2. ABOUT PAGE ---
export const AboutPage: React.FC = () => {
    const { t } = useTranslation();
    const principles = [
        {
            title: t('about.principles.p1Title'),
            text: t('about.principles.p1Body'),
        },
        {
            title: t('about.principles.p2Title'),
            text: t('about.principles.p2Body'),
        },
        {
            title: t('about.principles.p3Title'),
            text: t('about.principles.p3Body'),
        }
    ];

    return (
        <>
            {/* SECTION 1: Who We Are */}
            <HeroMediaFull
                headline={t('about.hero.headline')}
                body={t('about.hero.body') as string}
                imageSrc="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                altText="A professional team collaborating in a modern conference room."
            />

            {/* SECTION 2 & 3: Our Story & Philosophy */}
            <ContentSection>
                <AnimatedSection className="max-w-4xl mx-auto text-center">
                    <SectionHeader title={t('about.story.title')} />
                    <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                        {t('about.story.body')}
                    </p>
                </AnimatedSection>
                <AnimatedSection className="mt-16 max-w-4xl mx-auto text-center">
                    <SectionHeader title={t('about.philosophy.title')} />
                     <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                        {t('about.philosophy.body')}
                     </p>
                </AnimatedSection>
            </ContentSection>
            
            {/* SECTION 4: Our Principles */}
            <ContentSection bgColor="divider">
                <SectionHeader title={t('about.principles.title')} />
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {principles.map((principle, i) => (
                        <AnimatedSection key={i} delay={`delay-${i*150}`}>
                            <div className="bg-base p-8 rounded-2.5xl h-full shadow-sm text-center">
                                <h3 className="font-heading text-2xl font-bold">{principle.title}</h3>
                                <p className="mt-3 text-gray-600 leading-relaxed">{principle.text}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </ContentSection>

            {/* SECTION 5: What Makes Us Different */}
            <ContentSection>
                <ImageWithText
                    imageUrl="https://images.unsplash.com/photo-1581092921462-282928a4939a?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    imageAlt="Close-up of a logistics worker carefully handling a package in a warehouse."
                    imageSide="left"
                >
                    <SectionHeader title={t('about.different.title')} centered={false} />
                    <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                        {t('about.different.body')}
                    </p>
                </ImageWithText>
            </ContentSection>
            
            {/* SECTION 6: What We Offer */}
             <ContentSection bgColor="divider">
                <ImageWithText
                    imageUrl="https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    imageAlt="A curated display of high-end skincare and wellness products."
                    imageSide="right"
                >
                    <SectionHeader title={t('about.offer.title')} centered={false} />
                    <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                        {t('about.offer.body')}
                    </p>
                </ImageWithText>
            </ContentSection>

            {/* SECTION 7: Our Promise & CTA */}
            <ContentSection>
                <div className="max-w-4xl mx-auto text-center">
                    <AnimatedSection>
                        <SectionHeader title={t('about.promise.title')} />
                        <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                            {t('about.promise.body')}
                        </p>
                        <div className="mt-8">
                            <Button to="/suppliers" variant="primary">{t('about.promise.cta')}</Button>
                        </div>
                    </AnimatedSection>
                </div>
            </ContentSection>
        </>
    );
};
