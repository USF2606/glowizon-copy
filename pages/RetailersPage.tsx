
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AnimatedSection,
    HeroMediaFull,
    ContentSection,
    Button,
    CheckListItem,
    SectionHeader,
    ImageWithText,
} from '../components';
import { ArrowRightIcon, QuoteIcon, ChevronDownIcon } from '../icons';
import { useTranslation } from '../i18n';

// --- 6. RETAILERS PAGE ---
export const RetailersPage: React.FC = () => {
    const { t } = useTranslation();
    const valueProps = [
        { 
            title: t('retailers.value.item1Title'), 
            text: t('retailers.value.item1Text'), 
            link: '/distribution', 
            cta: t('retailers.value.item1Cta'),
            imageUrl: 'https://images.unsplash.com/photo-1576793369168-baa05a2b3baa?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        { 
            title: t('retailers.value.item2Title'), 
            text: t('retailers.value.item2Text'), 
            link: '/products', 
            cta: t('retailers.value.item2Cta'),
            imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f168a27e48?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        { 
            title: t('retailers.value.item3Title'), 
            text: t('retailers.value.item3Text'), 
            link: '/distribution', 
            cta: t('retailers.value.item3Cta'),
            imageUrl: 'https://images.unsplash.com/photo-1586528116311-06924151d15a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        { 
            title: t('retailers.value.item4Title'), 
            text: t('retailers.value.item4Text'), 
            link: '/retailers', 
            cta: t('retailers.value.item4Cta'),
            imageUrl: 'https://images.unsplash.com/photo-1547916937-248c8541a0ab?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        { 
            title: t('retailers.value.item5Title'), 
            text: t('retailers.value.item5Text'), 
            link: '/distribution', 
            cta: t('retailers.value.item5Cta'),
            imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
    ];

    const partnerVoices = [
        { quote: t('retailers.voices.quote1'), author: t('retailers.voices.author1') },
        { quote: t('retailers.voices.quote2'), author: t('retailers.voices.author2') },
        { quote: t('retailers.voices.quote3'), author: t('retailers.voices.author3') },
    ];

    const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(0);
    const activeImageUrl = openAccordionIndex !== null ? valueProps[openAccordionIndex].imageUrl : valueProps[0].imageUrl;

    return (
        <>
            {/* SECTION 1: Hero */}
            <HeroMediaFull
                headline={t('retailers.hero.headline')}
                subhead={t('retailers.hero.subhead') as string}
                primaryCta={{ text: t('retailers.hero.primaryCta') as string, to: "/retail-application" }}
                imageSrc="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                altText="The bright and clean interior of a modern pharmacy."
            />

            {/* SECTION 2: Partnership That Powers Performance */}
            <ContentSection>
                <ImageWithText
                    imageUrl="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    imageAlt="Two professionals collaborating in a modern office."
                    imageSide="left"
                >
                    <SectionHeader title={t('retailers.performance.title')} subtitle={t('retailers.performance.subtitle') as string} centered={false} />
                    <p className="mt-6 text-lg text-gray-700 leading-relaxed">{t('retailers.performance.p1')}</p>
                    <p className="mt-4 text-lg text-gray-700 leading-relaxed">{t('retailers.performance.p2')}</p>
                    <h3 className="mt-8 font-heading text-2xl font-bold">{t('retailers.performance.subheading')}</h3>
                    <p className="mt-4 text-lg text-gray-700 leading-relaxed">{t('retailers.performance.p3')}</p>
                </ImageWithText>
            </ContentSection>

            {/* SECTION 3: Lasting Value for Your Business */}
            <ContentSection bgColor="divider">
                <SectionHeader title={t('retailers.value.title')}/>
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <AnimatedSection animation="slideInLeft">
                        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2.5xl shadow-lg">
                           {valueProps.map((prop, index) => (
                                <img
                                    key={prop.imageUrl}
                                    src={prop.imageUrl}
                                    alt={prop.title as string}
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out ${activeImageUrl === prop.imageUrl ? 'opacity-100' : 'opacity-0'}`}
                                />
                           ))}
                        </div>
                    </AnimatedSection>
                    <AnimatedSection animation="slideInRight">
                        <div className="space-y-2">
                            {valueProps.map((prop, index) => (
                                <div key={index} className="border-b border-gray-300 last:border-b-0">
                                    <button 
                                        onClick={() => setOpenAccordionIndex(openAccordionIndex === index ? null : index)}
                                        className="w-full flex justify-between items-center py-5 text-left group"
                                        aria-expanded={openAccordionIndex === index}
                                        aria-controls={`accordion-content-${index}`}
                                    >
                                        <div className="flex items-start md:items-center">
                                            <span className="text-gray-500 font-medium mr-4 pt-1 md:pt-0">0{index + 1}.</span>
                                            <h3 className={`font-heading text-lg md:text-xl font-bold ${openAccordionIndex === index ? 'text-brand-green' : 'text-text-primary'} transition-colors`}>
                                                {prop.title}
                                            </h3>
                                        </div>
                                        <ChevronDownIcon 
                                            className={`h-6 w-6 text-gray-500 transition-transform duration-300 flex-shrink-0 ml-4 ${openAccordionIndex === index ? 'rotate-180 text-brand-green' : ''}`} 
                                        />
                                    </button>
                                    <div
                                        id={`accordion-content-${index}`}
                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordionIndex === index ? 'max-h-96' : 'max-h-0'}`}
                                    >
                                        <div className="pb-6 pl-10">
                                            <p className="text-gray-700 leading-relaxed">{prop.text}</p>
                                            <Link 
                                                to={prop.link} 
                                                className="mt-4 group inline-flex items-center justify-center rounded-md bg-brand-green px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                            >
                                                {prop.cta}
                                                <ArrowRightIcon className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>
                </div>
            </ContentSection>
            
            {/* SECTION 4: Value for You, Value for Your Shoppers */}
            <ContentSection>
                <div className="text-center max-w-3xl mx-auto">
                    <SectionHeader title={t('retailers.elevate.title')} subtitle={t('retailers.elevate.subtitle') as string} />
                    <div className="mt-8 inline-block text-left mx-auto">
                        <ul className="space-y-4">
                            <CheckListItem>{t('retailers.elevate.check1')}</CheckListItem>
                            <CheckListItem>{t('retailers.elevate.check2')}</CheckListItem>
                            <CheckListItem>{t('retailers.elevate.check3')}</CheckListItem>
                        </ul>
                    </div>
                </div>
            </ContentSection>

            {/* SECTION 5: Shared Growth */}
            <ContentSection bgColor="text-primary" className="text-center text-white">
                <AnimatedSection>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tighter">{t('retailers.success.title')}</h2>
                    <div className="mt-8">
                        <Button to="/retail-application" variant="accent">{t('retailers.success.cta')}</Button>
                    </div>
                </AnimatedSection>
            </ContentSection>

            {/* SECTION 6: Operational Excellence and Partnership */}
            <ContentSection bgColor="divider">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <AnimatedSection>
                        <div className="text-center lg:text-left p-6">
                            <h3 className="font-heading text-3xl font-bold tracking-tight">{t('retailers.excellence.title1')}</h3>
                            <p className="mt-4 text-gray-600 max-w-md mx-auto lg:mx-0">{t('retailers.excellence.body1')}</p>
                            <Link to="/distribution" className="mt-6 font-bold text-brand-green inline-flex items-center group">
                                {t('retailers.excellence.cta1')}
                                <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </AnimatedSection>
                    <AnimatedSection delay="delay-150">
                        <div className="text-center lg:text-left p-6">
                            <h3 className="font-heading text-3xl font-bold tracking-tight">{t('retailers.excellence.title2')}</h3>
                            <p className="mt-4 text-gray-600 max-w-md mx-auto lg:mx-0">{t('retailers.excellence.body2')}</p>
                        </div>
                    </AnimatedSection>
                </div>
            </ContentSection>
            
            {/* SECTION 7: Looking Ahead */}
            <ContentSection>
                <div className="max-w-4xl mx-auto text-center">
                    <AnimatedSection>
                        <SectionHeader title={t('retailers.next.title')} />
                        <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                            {t('retailers.next.body')}
                        </p>
                        <div className="mt-8">
                            <Button to="/retail-application">{t('retailers.next.cta')}</Button>
                        </div>
                    </AnimatedSection>
                </div>
            </ContentSection>

            {/* SECTION 8: Partner Voices */}
            <ContentSection bgColor="divider">
                <SectionHeader title={t('retailers.voices.title')} />
                <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {partnerVoices.map((p, i) => (
                        <AnimatedSection key={i} delay={`delay-${i*150}`}>
                            <blockquote className="bg-base p-8 rounded-2xl h-full flex flex-col shadow-sm">
                                <QuoteIcon className="w-8 h-8 text-accent/50 mb-4 flex-shrink-0"/>
                                <p className="text-lg italic text-gray-700 flex-grow">"{p.quote}"</p>
                                <footer className="mt-6 font-bold text-text-primary">— {p.author}</footer>
                            </blockquote>
                        </AnimatedSection>
                    ))}
                </div>
            </ContentSection>

            {/* SECTION 9: Footer CTA */}
            <ContentSection>
                 <div className="text-center">
                     <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">{t('retailers.question.title')}</h2>
                     <div className="mt-8 flex flex-col sm:flex-row justify-center items-center flex-wrap gap-x-8 gap-y-4">
                        <Link to="/contact" className="font-bold text-brand-green inline-flex items-center group text-lg">{t('retailers.question.link1')} <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link>
                        <Link to="/retail-application" className="font-bold text-brand-green inline-flex items-center group text-lg">{t('retailers.question.link2')} <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link>
                        <Link to="/suppliers" className="font-bold text-brand-green inline-flex items-center group text-lg">{t('retailers.question.link3')} <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></Link>
                     </div>
                 </div>
            </ContentSection>
        </>
    );
};
