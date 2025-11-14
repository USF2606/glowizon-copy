
import React from 'react';
import { HeroMediaFull, ContentSection } from '../components';
import { useTranslation } from '../i18n';

// --- 15. PRIVACY & TERMS PAGE ---
export const PrivacyTermsPage: React.FC = () => {
    const { t } = useTranslation();
    return (
        <>
            <HeroMediaFull
                headline={t('privacy.hero.headline')}
                imageSrc="https://images.unsplash.com/photo-1589216532372-1c2a36790039?q=80&w=2832&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                altText="A close-up of a person signing a legal document."
            />
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <div className="prose lg:prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-green hover:prose-a:text-green-700 prose-h2:border-t prose-h2:pt-8 prose-h2:mt-12 first-of-type:prose-h2:border-t-0 first-of-type:prose-h2:pt-0 first-of-type:prose-h2:mt-0">
                        <h2>{t('privacy.overview.title')}</h2>
                        <p>{t('privacy.overview.body')}</p>

                        <h2>{t('privacy.policy.title')}</h2>
                        <h3>{t('privacy.policy.h1')}</h3>
                        <p>{t('privacy.policy.p1')}</p>
                        <h3>{t('privacy.policy.h2')}</h3>
                        <p>{t('privacy.policy.p2')}</p>
                        <ul>
                            <li>{t('privacy.policy.li1')}</li>
                            <li>{t('privacy.policy.li2')}</li>
                            <li>{t('privacy.policy.li3')}</li>
                        </ul>
                        <h3>{t('privacy.policy.h3')}</h3>
                        <p>{t('privacy.policy.p3')}</p>
                        <h3>{t('privacy.policy.h4')}</h3>
                        <p>{t('privacy.policy.p4')} <a href="mailto:privacy@glowizon.com">privacy@glowizon.com</a>.</p>

                        <h2>{t('privacy.terms.title')}</h2>
                        <h3>{t('privacy.terms.h1')}</h3>
                        <p>{t('privacy.terms.p1')}</p>
                        <h3>{t('privacy.terms.h2')}</h3>
                        <p>{t('privacy.terms.p2')}</p>
                        <h3>{t('privacy.terms.h3')}</h3>
                        <p>{t('privacy.terms.p3')}</p>
                        <h3>{t('privacy.terms.h4')}</h3>
                        <p>{t('privacy.terms.p4')}</p>
                        <h3>{t('privacy.terms.h5')}</h3>
                        <p>{t('privacy.terms.p5')}</p>
                        <h3>{t('privacy.terms.h6')}</h3>
                        <p>{t('privacy.terms.p6')}</p>
                        <h3>{t('privacy.terms.h7')}</h3>
                        <p>{t('privacy.terms.p7')}</p>

                        <h2>{t('privacy.contact.title')}</h2>
                        <p>{t('privacy.contact.body')}</p>
                        <ul>
                            <li>{t('privacy.contact.email')} <a href="mailto:legal@glowizon.com">legal@glowizon.com</a></li>
                            <li>{t('privacy.contact.phone')} +1 (980) 425-1097</li>
                        </ul>
                    </div>
                </div>
            </ContentSection>
        </>
    );
};
