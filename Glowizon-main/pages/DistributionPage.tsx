
import React from 'react';
import {
    AnimatedSection,
    StatCounter,
    HeroMediaFull,
    ContentSection,
    Button,
    CheckListItem,
    SectionHeader,
    ImageWithText,
} from '../components';
import { CheckIcon } from '../icons';
import { useTranslation } from '../i18n';

// --- 3. DISTRIBUTION PAGE ---
export const DistributionPage: React.FC = () => {
    const { t } = useTranslation();
    const operationalStrengths = [
        {
            title: t('distribution.strength.s1Title'),
            text: t('distribution.strength.s1Body'),
        },
        {
            title: t('distribution.strength.s2Title'),
            text: t('distribution.strength.s2Body'),
        },
        {
            title: t('distribution.strength.s3Title'),
            text: t('distribution.strength.s3Body'),
        }
    ];

    const statsData = [
        { value: 1200, suffix: '+', label: t('distribution.glance.stat1') },
        { value: 100, suffix: '+', label: t('distribution.glance.stat2') },
        { value: 3, suffix: '', label: t('distribution.glance.stat3') },
        { value: null, label: t('distribution.glance.stat4') },
        { value: 10, suffix: '+', label: t('distribution.glance.stat5') },
    ];
    
    const complianceItems = [
        t('distribution.integrity.check1'),
        t('distribution.integrity.check2'),
        t('distribution.integrity.check3'),
        t('distribution.integrity.check4'),
    ];

    return (
        <>
            {/* SECTION 1 & 2: Hero */}
            <HeroMediaFull
                headline={t('distribution.hero.headline')}
                subhead={t('distribution.hero.subhead') as string}
                body={t('distribution.hero.body') as string}
                primaryCta={{ text: t('distribution.hero.primaryCta') as string, to: "/retail-application" }}
                secondaryCta={{ text: t('distribution.hero.secondaryCta') as string, to: "/supplier-application" }}
                imageSrc="https://images.unsplash.com/photo-1565522194378-385012354a33?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                altText="Interior of a large, modern logistics and distribution warehouse."
            />

            {/* SECTION 3: Nationwide Infrastructure */}
            <ContentSection>
                <ImageWithText
                    imageUrl="https://images.unsplash.com/photo-1586528116311-06924151d15a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    imageAlt="A modern warehouse with organized shelves and logistics operations in progress."
                    imageSide="right"
                >
                    <SectionHeader title={t('distribution.footprint.title')} centered={false} />
                    <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                        {t('distribution.footprint.body')}
                    </p>
                </ImageWithText>
            </ContentSection>

            {/* SECTION 4: Our Operational Strength */}
            <ContentSection bgColor="divider">
                <SectionHeader title={t('distribution.strength.title')} />
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {operationalStrengths.map((item, index) => (
                        <AnimatedSection key={index} delay={`delay-${index*100}`}>
                            <div className="bg-base p-8 rounded-2xl h-full text-center shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <h3 className="font-heading text-2xl font-bold">{item.title}</h3>
                                <p className="mt-3 text-gray-600 leading-relaxed">{item.text}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </ContentSection>

            {/* SECTION 5: Our Network Across U.S. */}
            <ContentSection>
                <SectionHeader title={t('distribution.map.title')}/>
                <AnimatedSection animation="zoomIn" className="mt-12">
                    <div className="bg-gray-200 aspect-video max-w-5xl mx-auto rounded-2.5xl flex items-center justify-center">
                        <p className="text-gray-500">{t('distribution.map.placeholder')}</p>
                    </div>
                </AnimatedSection>
                 <p className="text-lg text-gray-700 mt-8 max-w-3xl mx-auto text-center leading-relaxed">
                    {t('distribution.map.body')}
                 </p>
                 <div className="mt-8 text-center">
                     <Button to="/distribution">{t('distribution.map.cta')}</Button>
                 </div>
            </ContentSection>
            
            {/* SECTION 6: Glowizon at a Glance */}
            <ContentSection bgColor="divider">
                <SectionHeader title={t('distribution.glance.title')} />
                 <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">
                    {t('distribution.glance.body')}
                </p>
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {statsData.map((stat, index) => (
                        <AnimatedSection key={index} delay={`delay-${index*100}`} className="bg-base p-6 rounded-2.5xl shadow-sm text-center">
                            <CheckIcon className="h-7 w-7 text-accent mx-auto mb-3"/>
                            {stat.value !== null ? (
                                <h3 className="font-heading font-bold text-4xl md:text-5xl tracking-tighter">
                                    <StatCounter value={stat.value} />{stat.suffix}
                                </h3>
                            ) : (
                                <h3 className="font-heading font-bold text-2xl md:text-3xl tracking-tight leading-tight h-[56px] flex items-center justify-center">
                                    {stat.label}
                                </h3>
                            )}
                            <p className="mt-2 text-gray-600 text-sm">
                                {stat.value !== null ? stat.label : ''}
                            </p>
                        </AnimatedSection>
                    ))}
                </div>
            </ContentSection>

            {/* SECTION 7: Compliance and Authenticity Promise */}
            <ContentSection>
                <ImageWithText
                    imageUrl="https://images.unsplash.com/photo-1581092921462-282928a4939a?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    imageAlt="Close-up of a logistics worker carefully handling a package in a warehouse."
                    imageSide="left"
                >
                    <SectionHeader title={t('distribution.integrity.title')} centered={false} />
                    <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                       {t('distribution.integrity.body')}
                    </p>
                     <div className="mt-6 space-y-4">
                        {complianceItems.map(item => (
                            <CheckListItem key={item as string}>{item}</CheckListItem>
                        ))}
                    </div>
                </ImageWithText>
            </ContentSection>
        </>
    );
};
