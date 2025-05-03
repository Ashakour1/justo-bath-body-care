import AboutSection from "@/components/about-section";
import CategoriesSection from "@/components/Categories/CategoriesSection";
import CTA from "@/components/CTA";
import CtaSection from "@/components/cta-2";
import HeroSection from "@/components/HeroSection";
import ProductCategories from "@/components/Products/ProductByCategory";
import Products from "@/components/Products/products-section";
import TestimonialsSection from "@/components/Testimonials";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);

  return (
    <div className="w-full h-full">
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
    </div>
  );
};

export default HomePage;
