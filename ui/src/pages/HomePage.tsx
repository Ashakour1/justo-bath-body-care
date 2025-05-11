import AboutSection from "@/components/about-section";
import CategoriesSection from "@/components/Categories/CategoriesSection";
import CTA from "@/components/CTA";
import CtaSection from "@/components/cta-2";
import HeroSection from "@/components/HeroSection";
import ProductCategories from "@/components/Products/ProductByCategory";
import Products from "@/components/Products/products-section";
import TestimonialsSection from "@/components/Testimonials";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);

  return (
    <main>
      <Helmet>
        <title>Justo Cosmetics</title>
        <meta
          name="description"
          content="Welcome to Justo Cosmetics your go-to skincare brand for natural, effective, and affordable skin care products."
        />

        <meta
          name="keywords"
          content="Justo, skincare, natural beauty, cosmetics, lotion, body cream, face cream, acne treatment, anti-aging, moisturizer, face cleanser, skin care products, beauty products, skincare routine, natural ingredients, cruelty-free, vegan skincare, affordable skincare products, premium skincare, skin types, skincare solutions, Justo Cosmetics, Justo Bath and Body Works, Justo Perfumes, Justo Rituals JUUSTO ABDI"
        />
        <link rel="canonical" href="https://www.justocosmetic.com/" />

        {/* Open Graph  */}
        <meta property="og:title" content="Justo Cosmetics" />
        <meta
          property="og:description"
          content="Welcome to Justo Cosmetics your go-to skincare brand for natural, effective, and affordable skin care products. Specializing in acne treatment, anti-aging creams, moisturizers, and face cleansers, Justo Cosmetics offers premium skincare solutions for all skin types."
        />
        <meta property="og:image" content="/image.jpg" />
        <meta property="og:url" content="https://justocosmetics.com" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Justo Cosmetics" />

        {/* Twitter Card */}
      </Helmet>
      <HeroSection />
      <AboutSection />
      <CategoriesSection />
      <Products />
      <TestimonialsSection />
      <CtaSection />
      <CTA />
      <ProductCategories />

      {/* <CategorySection />
      <Products /> */}
      {/* <Footer /> */}
    </main>
  );
};

export default HomePage;
