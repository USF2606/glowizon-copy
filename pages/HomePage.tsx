

import React from 'react';
import { Link } from 'react-router-dom';
import {
    AnimatedSection,
    StatCounter,
    HeroMediaFull,
    ContentSection,
    Button,
    CheckListItem,
    SectionHeader,
    ImageWithText,
    FeatureCard,
} from '../components';
import { ArrowRightIcon, QuoteIcon } from '../icons';
import { useTranslation } from '../i18n';

// --- 1. HOME PAGE ---
export const HomePage: React.FC = () => {
    const { t } = useTranslation();
    const partners = [
        { quote: t('home.voices.quote1'), author: t('home.voices.author1') },
        { quote: t('home.voices.quote2'), author: t('home.voices.author2') },
    ];
    
    const featureTiles = [
        {
            title: t('home.deliver.tile1Title'),
            body: t('home.deliver.tile1Body'),
            // Fix: Cast the translation function result to a string to satisfy the FeatureCard's 'cta.text' prop type.
            cta: { text: t('home.deliver.tile1Cta') as string, to: '/distribution' },
            img: 'https://images.unsplash.com/photo-1590922634321-551eb24aaa74?q=80&w=2811&auto-format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            title: t('home.deliver.tile2Title'),
            body: t('home.deliver.tile2Body'),
            // Fix: Cast the translation function result to a string to satisfy the FeatureCard's 'cta.text' prop type.
            cta: { text: t('home.deliver.tile2Cta') as string, to: '/products' },
            img: 'https://images.unsplash.com/photo-1620916566398-39f168a27e48?q=80&w=2787&auto-format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            title: t('home.deliver.tile3Title'),
            body: t('home.deliver.tile3Body'),
            // Fix: Cast the translation function result to a string to satisfy the FeatureCard's 'cta.text' prop type.
            cta: { text: t('home.deliver.tile3Cta') as string, to: '/suppliers' },
            img: 'https://images.unsplash.com/photo-1571173729953-2a033f183e13?q=80&w=2940&auto-format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
    ];

    const trustSectionStats = [
        { value: 1000, label: t('home.stats.locations'), suffix: '+' },
        { value: 50, label: t('home.stats.partners'), suffix: '+' },
        { value: t('home.stats.coverage'), label: t('home.stats.coverage') }
    ];
    
    return (
        <>
             {/* SECTION 1: HERO */}
            <HeroMediaFull
                headline={<span dangerouslySetInnerHTML={{ __html: t('home.hero.headline') as string }} />}
                subhead={t('home.hero.subhead') as string}
                body={t('home.hero.body') as string}
                primaryCta={{ text: t('home.hero.primaryCta') as string, to: "/distribution" }}
                secondaryCta={{ text: t('home.hero.secondaryCta') as string, to: "/suppliers" }}
                videoSrc="https://videos.pexels.com/video-files/5993353/5993353-hd.mp4"
                imageSrc="https://images.unsplash.com/photo-1617104679092-b2c453347989?q=80&w=2835&auto-format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                altText="Abstract flowing golden fabric background."
            />
            
            {/* SECTION 2: Shared Growth */}
            <ContentSection bgColor="white">
                <div className="grid grid-cols-1 md:grid-cols-2 md:items-center md:gap-10 lg:gap-16">
                    <AnimatedSection animation="slideInLeft">
                        <SectionHeader 
                            title={t('home.sharedGrowth.title')} 
                            centered={false}
                            className="text-center md:text-left"
                        />
                    </AnimatedSection>

                    <AnimatedSection animation="slideInRight">
                        <div className="max-w-[620px]">
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                {t('home.sharedGrowth.p1')}
                            </p>
                            <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed">
                                {t('home.sharedGrowth.p2')}
                            </p>
                            <div className="mt-8 text-center md:text-left">
                                <Button to="/distribution" variant="secondary">
                                    {t('home.sharedGrowth.cta')}
                                </Button>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </ContentSection>

            {/* SECTION 3: Trust Built in Every Connection */}
            <div className="bg-base">
                <section className="relative h-[60vh] flex items-center text-white overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2787&auto-format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Business partners collaborating in a modern office." className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-text-primary/45" />
                    <div className="relative z-10 container mx-auto px-6 w-full h-full flex items-center justify-center">
                        <AnimatedSection animation="fadeInUp" className="max-w-4xl text-center">
                            <h2 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tighter">
                                {t('home.thrive.title')}
                            </h2>
                            <p className="mt-5 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                                {t('home.thrive.body')}
                            </p>
                        </AnimatedSection>
                    </div>
                </section>
                <ContentSection bgColor="text-primary" className="-mt-8 relative z-20 rounded-t-3xl text-white">
                    <AnimatedSection animation="fadeInUp" delay="delay-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
                            {trustSectionStats.map((stat, index) => (
                                <div key={index} className={`relative ${index > 0 ? 'sm:border-l border-white/20' : ''} px-4 flex flex-col items-center justify-center`}>
                                     {typeof stat.value === 'number' ? (
                                        <h3 className="font-heading font-bold text-4xl md:text-[44px] tracking-tighter">
                                             <StatCounter value={stat.value} duration={3000} />
                                             {stat.suffix}
                                        </h3>
                                     ) : (
                                         <h3 className="font-heading font-bold text-4xl md:text-[44px] tracking-tighter flex items-center gap-2">
                                             {stat.value}
                                         </h3>
                                     )}
                                    <p className="mt-2 text-base md:text-lg text-white/80">{stat.label as string}</p>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </ContentSection>
            </div>
            
            {/* SECTION 4: FEATURE TILES GRID – What We Deliver */}
            <ContentSection>
              <SectionHeader title={t('home.deliver.title')} />
              
                {/* Fix: Updated the 'What We Deliver' section to use the new 'FeatureCard' component. */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featureTiles.map((feature, i) => (
                        <AnimatedSection key={i} delay={`delay-${i * 100}`}>
                            <FeatureCard
                                title={feature.title}
                                body={feature.body as string}
                                cta={feature.cta}
                                imageUrl={feature.img}
                                imageAlt={feature.title as string}
                            />
                        </AnimatedSection>
                    ))}
                </div>
            </ContentSection>
            
            {/* SECTION 5: Expertise That Builds Growth */}
            <ContentSection bgColor="divider">
                <ImageWithText
                    imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto-format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    imageAlt="A professional in a modern office environment"
                    imageSide="left"
                >
                    <SectionHeader title={t('home.expertise.title')} subtitle={t('home.expertise.subtitle') as string} centered={false} />
                    <p className="mt-6 text-lg text-gray-700 leading-relaxed">{t('home.expertise.body')}</p>
                    <div className="mt-6 space-y-4">
                        <CheckListItem>{t('home.expertise.check1')}</CheckListItem>
                        <CheckListItem>{t('home.expertise.check2')}</CheckListItem>
                        <CheckListItem>{t('home.expertise.check3')}</CheckListItem>
                    </div>
                </ImageWithText>
            </ContentSection>
            
            {/* SECTION 6: Partner Voices */}
            <ContentSection>
                <SectionHeader title={t('home.voices.title')} subtitle={t('home.voices.subtitle') as string} />
                <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {partners.map((p, i) => (
                        <AnimatedSection key={i} delay={`delay-${i*150}`}>
                            <blockquote className="bg-divider p-8 rounded-2xl h-full flex flex-col shadow-sm">
                                <QuoteIcon className="w-8 h-8 text-accent/50 mb-4 flex-shrink-0"/>
                                <p className="text-lg italic text-gray-700 flex-grow">"{p.quote}"</p>
                                <footer className="mt-6 font-bold text-text-primary">— {p.author}</footer>
                            </blockquote>
                        </AnimatedSection>
                    ))}
                </div>
            </ContentSection>

            {/* SECTION 7 & 8: Careers & About */}
            <ContentSection bgColor="divider">
                <div className="grid lg:grid-cols-2 gap-8">
                    <AnimatedSection>
                        <div className="bg-base p-10 rounded-2.5xl h-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left group hover:bg-white transition-colors duration-300 shadow-sm hover:shadow-lg">
                            <h3 className="font-heading text-3xl font-bold tracking-tight">{t('home.careers.title')}</h3>
                            <p className="mt-4 text-gray-600 max-w-md">{t('home.careers.body')}</p>
                            <Button to="/careers" className="mt-6">{t('home.careers.cta')}</Button>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection delay="delay-150">
                         <div className="bg-base p-10 rounded-2.5xl h-full flex flex-col justify-center items-center lg:items-start text-center lg:text-left group hover:bg-white transition-colors duration-300 shadow-sm hover:shadow-lg">
                            <h3 className="font-heading text-3xl font-bold tracking-tight">{t('home.about.title')}</h3>
                            <p className="mt-4 text-gray-600 max-w-md">{t('home.about.body')}</p>
                            <Button to="/about" className="mt-6">{t('home.about.cta')}</Button>
                        </div>
                    </AnimatedSection>
                </div>
            </ContentSection>
        </>
    );
};