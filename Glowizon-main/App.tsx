

import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components';
// Fix: The import was resolving to the deprecated 'pages.tsx' file instead of the 'pages' directory. Changed path to './pages/index' to fix this.
import {
    HomePage,
    AboutPage,
    DistributionPage,
    SuppliersPage,
    SupplierApplicationPage,
    RetailersPage,
    RetailApplicationPage,
    ProductsPage,
    SkincarePage,
    WellnessPage,
    BeautyPage,
    ProfessionalCarePage,
    CareersPage,
    ContactPage,
    PrivacyTermsPage,
    BlogPage,
    LoginPage
} from './pages/index';
import { LanguageProvider } from './i18n';


// --- SCROLL TO TOP COMPONENT ---
// This component ensures smooth scrolling behavior for the entire app.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}


// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
    return (
        <LanguageProvider>
            <HashRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="distribution" element={<DistributionPage />} />
                        <Route path="suppliers" element={<SuppliersPage />} />
                        <Route path="supplier-application" element={<SupplierApplicationPage />} />
                        <Route path="retailers" element={<RetailersPage />} />
                        <Route path="retail-application" element={<RetailApplicationPage />} />
                        <Route path="products" element={<ProductsPage />} />
                        <Route path="products/dermo-cosmetics" element={<SkincarePage />} />
                        <Route path="products/wellness-nutrition" element={<WellnessPage />} />
                        <Route path="products/beauty-care" element={<BeautyPage />} />
                        <Route path="products/professional-salon" element={<ProfessionalCarePage />} />
                        <Route path="careers" element={<CareersPage />} />
                        <Route path="contact" element={<ContactPage />} />
                        <Route path="privacy-terms" element={<PrivacyTermsPage />} />
                        <Route path="blog" element={<BlogPage />} />
                        <Route path="brand-partners" element={<SuppliersPage />} />
                        <Route path="login" element={<LoginPage />} />
                    </Route>
                </Routes>
            </HashRouter>
        </LanguageProvider>
    );
};

export default App;
