

import React from 'react';
import {
    AnimatedSection,
    HeroMediaFull,
    ContentSection,
    FeatureCard,
} from '../components';
import { useTranslation } from '../i18n';

// --- 16. BLOG PAGE ---
export const BlogPage: React.FC = () => {
    const { t } = useTranslation();
    const blogPosts = [
        {
            date: t('blog.posts.post1.date'),
            title: t('blog.posts.post1.title'),
            excerpt: t('blog.posts.post1.excerpt'),
            imageUrl: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2940&auto=format&fit=crop",
            link: "#"
        },
        {
            date: t('blog.posts.post2.date'),
            title: t('blog.posts.post2.title'),
            excerpt: t('blog.posts.post2.excerpt'),
            imageUrl: "https://images.unsplash.com/photo-1586528116311-06924151d15a?q=80&w=2940&auto=format&fit=crop",
            link: "#"
        },
        {
            date: t('blog.posts.post3.date'),
            title: t('blog.posts.post3.title'),
            excerpt: t('blog.posts.post3.excerpt'),
            imageUrl: "https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=2940&auto=format&fit=crop",
            link: "#"
        },
        {
            date: t('blog.posts.post4.date'),
            title: t('blog.posts.post4.title'),
            excerpt: t('blog.posts.post4.excerpt'),
            imageUrl: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=2787&auto=format&fit=crop",
            link: "#"
        },
        {
            date: t('blog.posts.post5.date'),
            title: t('blog.posts.post5.title'),
            excerpt: t('blog.posts.post5.excerpt'),
            imageUrl: "https://images.unsplash.com/photo-1587095951333-7251357697b0?q=80&w=2940&auto=format&fit=crop",
            link: "#"
        },
        {
            date: t('blog.posts.post6.date'),
            title: t('blog.posts.post6.title'),
            excerpt: t('blog.posts.post6.excerpt'),
            imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2940&auto=format&fit=crop",
            link: "#"
        },
    ];

    return (
        <>
            <HeroMediaFull
                headline={t('blog.hero.headline')}
                subhead={t('blog.hero.subhead') as string}
                body={t('blog.hero.body') as string}
                imageSrc="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                altText="A person reading a book in a library, representing knowledge and insights."
            />

            <ContentSection>
                {/* Fix: Updated the blog page to use the new 'FeatureCard' component for displaying blog posts. */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <AnimatedSection key={index} delay={`delay-${(index % 3) * 100}`}>
                             <FeatureCard
                                title={
                                    <>
                                        <span className="block text-sm text-white/70 mb-2 font-normal">{post.date}</span>
                                        {post.title}
                                    </>
                                }
                                body={post.excerpt as string}
                                cta={{ text: t('blog.readMore') as string, to: post.link }}
                                imageUrl={post.imageUrl}
                                imageAlt={post.title as string}
                            />
                        </AnimatedSection>
                    ))}
                </div>
            </ContentSection>
        </>
    );
};