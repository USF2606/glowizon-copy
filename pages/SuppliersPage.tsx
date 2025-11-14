
import React from 'react';
import { Link } from 'react-router-dom';
import {
    AnimatedSection,
    HeroMediaFull,
    ContentSection,
    Button,
    SectionHeader,
    ImageWithText,
} from '../components';
import { ArrowRightIcon, QuoteIcon } from '../icons';
import { useTranslation } from '../i18n';

// --- 4. SUPPLIERS PAGE ---
export const SuppliersPage: React.FC = () => {
    const { t } = useTranslation();
    const whatWeDeliverItems = [
        {
            title: t('suppliers.believe.item1Title'),
            text: t('suppliers.believe.item1Text'),
        },
        {
            title: t('suppliers.believe.item2Title'),
            text: t('suppliers.believe.item2Text'),
        },
        {
            title: t('suppliers.believe.item3Title'),
            text: t('suppliers.believe.item3Text'),
        },
        {
            title: t('suppliers.believe.item4Title'),
            text: t('suppliers.believe.item4Text'),
        },
        {
            title: t('suppliers.believe.item5Title'),
            text: t('suppliers.believe.item5Text'),
        }
    ];

    const executionSubsections = [
        {
            title: t('suppliers.strategy.item1Title'),
            text: t('suppliers.strategy.item1Text'),
        },
        {
            title: t('suppliers.strategy.item2Title'),
            text: t('suppliers.strategy.item2Text'),
        },
        {
            title: t('suppliers.strategy.item3Title'),
            text: t('suppliers.strategy.item3Text'),
        }
    ];

    const testimonials = [
        { quote: t('suppliers.partnersSay.quote1'), author: t('suppliers.partnersSay.author1') },
        { quote: t('suppliers.partnersSay.quote2'), author: t('suppliers.partnersSay.author2') },
        { quote: t('suppliers.partnersSay.quote3'), author: t('suppliers.partnersSay.author3') }
    ];

    return (
        <>
            {/* SECTION 1: Hero */}
            <HeroMediaFull
                headline={t('suppliers.hero.headline')}
                subhead={t('suppliers.hero.subhead') as string}
                body={t('suppliers.hero.body') as string}
                primaryCta={{ text: t('suppliers.hero.primaryCta') as string, to: "/supplier-application" }}
                imageSrc="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                altText="Two business professionals shaking hands over a table."
            />
            
            {/* SECTION 2: Building Enduring Strength for Every Brand */}
            <ContentSection>
                <ImageWithText
                    imageUrl="https://images.unsplash.com/photo-1571173729953-2a033f183e13?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    imageAlt="Collaborative meeting in a modern office."
                    imageSide="left"
                >
                    <SectionHeader title={t('suppliers.believe.title')} centered={false} />
                    <p className="mt-6 text-lg text-gray-700 leading-relaxed">{t('suppliers.believe.body')}</p>
                    <h3 className="font-heading text-xl font-bold mt-8 mb-4">{t('suppliers.believe.whatWeDeliver')}</h3>
                    <div className="space-y-5">
                        {whatWeDeliverItems.map((item, index) => (
                             <div key={index} className="flex items-start">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center mr-4 mt-1">
                                    {index + 1}
                                </div>
                                <div>
                                    <h4 className="font-bold text-text-primary">{item.title}</h4>
                                    <p className="text-gray-600">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ImageWithText>
            </ContentSection>

            {/* SECTION 3: Where Insight Meets Execution */}
            <ContentSection bgColor="divider">
                <SectionHeader title={t('suppliers.strategy.title')} />
                <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">
                    {t('suppliers.strategy.body')}
                </p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {executionSubsections.map((item, index) => (
                        <AnimatedSection key={index} delay={`delay-${index*100}`}>
                            <div className="bg-base p-8 rounded-2xl h-full text-center shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <h3 className="font-heading text-2xl font-bold">{item.title}</h3>
                                <p className="mt-3 text-gray-600 leading-relaxed">{item.text}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </ContentSection>

            {/* SECTION 4: Shared Success */}
            <ContentSection bgColor="text-primary" className="text-white text-center">
                 <AnimatedSection>
                    <SectionHeader title={t('suppliers.responsibility.title')} />
                    <p className="mt-6 text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
                        {t('suppliers.responsibility.body')}
                    </p>
                    <div className="mt-8">
                        <Button to="/supplier-application" variant="accent">{t('suppliers.responsibility.cta')}</Button>
                    </div>
                 </AnimatedSection>
            </ContentSection>
            
            {/* SECTION 5: A Network That Builds Confidence */}
            <ContentSection bgColor="divider">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <AnimatedSection>
                        <SectionHeader title={t('suppliers.systems.title')} centered={false} className="text-center lg:text-left"/>
                        <p className="mt-6 text-lg text-gray-700 leading-relaxed text-center lg:text-left">{t('suppliers.systems.body')}</p>
                        <div className="mt-8 text-center lg:text-left">
                           <Button to="/distribution" variant="secondary">{t('suppliers.systems.cta')}</Button>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection delay="delay-150">
                        <div className="bg-base rounded-2.5xl p-8 shadow-lg text-center">
                             <h3 className="font-heading text-3xl font-bold tracking-tight">{t('suppliers.systems.boxTitle')}</h3>
                            <p className="mt-4 text-gray-600 max-w-md mx-auto">{t('suppliers.systems.boxBody')}</p>
                        </div>
                    </AnimatedSection>
                </div>
            </ContentSection>

            {/* SECTION 6: What Our Partners Say */}
             <ContentSection>
                <SectionHeader title={t('suppliers.partnersSay.title')} />
                <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {testimonials.map((p, i) => (
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

            {/* SECTION 7: Partner Hub */}
            <ContentSection bgColor="divider">
                <SectionHeader title={t('suppliers.resources.title')} />
                <div className="mt-12 grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <AnimatedSection>
                        <div className="bg-base p-8 rounded-2.5xl h-full flex flex-col justify-center items-start text-left group transition-colors duration-300 shadow-sm hover:shadow-lg">
                            <h3 className="font-heading text-2xl font-bold tracking-tight">{t('suppliers.resources.res1Title')}</h3>
                            <p className="mt-3 text-gray-600 flex-grow">{t('suppliers.resources.res1Body')}</p>
                            <Link to="/suppliers" className="mt-6 font-bold text-brand-green inline-flex items-center group">
                               {t('suppliers.resources.res1Cta')}
                                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection delay="delay-150">
                         <div className="bg-base p-8 rounded-2.5xl h-full flex flex-col justify-center items-start text-left group transition-colors duration-300 shadow-sm hover:shadow-lg">
                            <h3 className="font-heading text-2xl font-bold tracking-tight">{t('suppliers.resources.res2Title')}</h3>
                            <p className="mt-3 text-gray-600 flex-grow">{t('suppliers.resources.res2Body')}</p>
                             <Link to="/suppliers" className="mt-6 font-bold text-brand-green inline-flex items-center group">
                                {t('suppliers.resources.res2Cta')}
                                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>
            </ContentSection>

            {/* SECTION 8: Final Call to Action */}
            <ContentSection>
                 <div className="text-center">
                     <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">{t('suppliers.finalCta.title')}</h2>
                     <div className="mt-8 flex flex-col sm:flex-row justify-center items-center flex-wrap gap-x-8 gap-y-4">
                        <Link to="/contact" className="font-bold text-brand-green inline-flex items-center group text-lg">{t('suppliers.finalCta.link1')} <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link>
                        <Link to="/supplier-application" className="font-bold text-brand-green inline-flex items-center group text-lg">{t('suppliers.finalCta.link2')} <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link>
                        <Link to="/suppliers" className="font-bold text-brand-green inline-flex items-center group text-lg">{t('suppliers.finalCta.link3')} <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link>
                     </div>
                 </div>
            </ContentSection>
        </>
    );
};
