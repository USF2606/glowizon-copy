
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
import { ArrowRightIcon } from '../icons';
import { useTranslation } from '../i18n';

// --- 8. PRODUCTS PAGE ---
export const ProductsPage: React.FC = () => {
    const { t } = useTranslation();
    const categories = [
        {
            title: t('products.categories.cat1Title'),
            body: t('products.categories.cat1Body'),
            cta: { text: t('products.categories.cat1Cta'), to: "/products/dermo-cosmetics" }
        },
        {
            title: t('products.categories.cat2Title'),
            body: t('products.categories.cat2Body'),
            cta: { text: t('products.categories.cat2Cta'), to: "/products/wellness-nutrition" }
        },
        {
            title: t('products.categories.cat3Title'),
            body: t('products.categories.cat3Body'),
            cta: { text: t('products.categories.cat3Cta'), to: "/products/beauty-care" }
        },
        {
            title: t('products.categories.cat4Title'),
            body: t('products.categories.cat4Body'),
            cta: { text: t('products.categories.cat4Cta'), to: "/products/professional-salon" }
        },
    ];

    return (
        <>
            {/* SECTION 1: Hero */}
            <HeroMediaFull
                headline={t('products.hero.headline')}
                subhead={t('products.hero.subhead') as string}
                body={t('products.hero.body') as string}
                primaryCta={{ text: t('products.hero.primaryCta') as string, to: "/products/dermo-cosmetics" }}
                imageSrc="https://images.unsplash.com/photo-1556228724-4ce3a5948348?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                altText="An assortment of premium beauty and wellness products."
            />

            {/* SECTION 2: Expertise You Can Count On */}
            <ContentSection>
                <ImageWithText
                    imageUrl="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    imageAlt="Two business partners having a discussion in an office."
                    imageSide="right"
                >
                    <SectionHeader title={t('products.support.title')} centered={false} />
                    <p className="mt-6 text-lg text-gray-700 leading-relaxed">{t('products.support.body1')}</p>
                    <h3 className="mt-8 font-heading text-2xl font-bold">{t('products.support.subheading')}</h3>
                    <p className="mt-4 text-lg text-gray-700 leading-relaxed">{t('products.support.body2')}</p>
                </ImageWithText>
            </ContentSection>

            {/* SECTION 3: The Portfolio Promise */}
            <ContentSection bgColor="divider">
                <SectionHeader title={t('products.promise.title')} subtitle={t('products.promise.subtitle') as string} />
                <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">
                    {t('products.promise.body')}
                </p>
            </ContentSection>

            {/* SECTION 4: Product Categories */}
            <ContentSection>
                <SectionHeader title={t('products.categories.title')} />
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {categories.map((cat, i) => (
                        <AnimatedSection key={i} delay={`delay-${i*100}`}>
                            <div className="bg-divider p-8 rounded-2.5xl h-full flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300">
                                <h3 className="font-heading text-2xl font-bold">{cat.title}</h3>
                                <p className="mt-4 text-gray-700 flex-grow leading-relaxed">{cat.body}</p>
                                <Link to={cat.cta.to} className="mt-6 font-bold text-brand-green inline-flex items-center group self-start">
                                    {cat.cta.text}
                                    <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </ContentSection>

            {/* SECTION 5: Operational Excellence */}
            <ContentSection bgColor="divider">
                <SectionHeader title={t('products.excellence.title')} subtitle={t('products.excellence.subtitle') as string} />
                <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">
                    {t('products.excellence.body')}
                </p>
                <div className="mt-8 text-center">
                    <Button to="/distribution">{t('products.excellence.cta')}</Button>
                </div>
            </ContentSection>

            {/* SECTION 6: What’s Next */}
            <ContentSection>
                <SectionHeader title={t('products.next.title')} subtitle={t('products.next.subtitle') as string} />
                <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">
                    {t('products.next.body')}
                </p>
                <div className="mt-8 text-center">
                    <Button to="/products" variant="secondary">{t('products.next.cta')}</Button>
                </div>
            </ContentSection>
            
            <ContentSection bgColor="text-primary" className="text-center text-white">
                <AnimatedSection>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tighter">{t('products.success')}</h2>
                </AnimatedSection>
            </ContentSection>
        </>
    );
};
