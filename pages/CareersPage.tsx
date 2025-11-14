
import React from 'react';
import {
    HeroMediaFull,
    ContentSection,
    CheckListItem,
    SectionHeader,
    ImageWithText,
} from '../components';
import { ArrowRightIcon } from '../icons';
import { useTranslation } from '../i18n';

// --- 13. CAREERS PAGE ---
export const CareersPage: React.FC = () => {
    const { t } = useTranslation();
    return (
    <>
        <HeroMediaFull
            headline={t('careers.hero.headline')}
            subhead={t('careers.hero.subhead') as string}
            body={t('careers.hero.body') as string}
            imageSrc="https://images.unsplash.com/photo-1521737852577-6848222851c5?q=80&w=2940&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            altText="A happy and diverse team of colleagues collaborating in a modern office."
        />
        <ContentSection>
            <ImageWithText
                imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                imageAlt="Team members collaborating around a table."
                imageSide="right"
            >
                <SectionHeader title={t('careers.culture.title')} subtitle={t('careers.culture.subtitle') as string} centered={false}/>
                <p className="mt-6 text-lg text-gray-700 leading-relaxed">{t('careers.culture.body')}</p>
                <div className="mt-6 space-y-4">
                    <CheckListItem>{t('careers.culture.check1')}</CheckListItem>
                    <CheckListItem>{t('careers.culture.check2')}</CheckListItem>
                    <CheckListItem>{t('careers.culture.check3')}</CheckListItem>
                    <CheckListItem>{t('careers.culture.check4')}</CheckListItem>
                </div>
            </ImageWithText>
        </ContentSection>
        <ContentSection bgColor="divider">
            <SectionHeader title={t('careers.join.title')} subtitle={t('careers.join.subtitle') as string}/>
            <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">{t('careers.join.body')}</p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center flex-wrap gap-4">
                <a href="mailto:careers@glowizon.com" className="group w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-text-primary px-8 py-3.5 text-sm font-bold text-base transition-all duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">
                    {t('careers.join.cta1')}
                    <ArrowRightIcon className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a href="mailto:hr@glowizon.com" className="group w-full sm:w-auto inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-bold text-text-primary transition-all duration-300 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-text-primary focus:ring-offset-2">
                    {t('careers.join.cta2')}
                    <ArrowRightIcon className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                </a>
            </div>
        </ContentSection>
    </>
)};
