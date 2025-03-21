import AboutSection from "@/components/about-section";
import CategoriesSection from "@/components/Categories/CategoriesSection";
import CTA from "@/components/CTA";
import HeroSection from "@/components/HeroSection";
import Products from "@/components/Products/products-section";

const HomePage = () => {
  return (
    <div className="w-full h-full">
      <HeroSection />
      <AboutSection />
      <CategoriesSection />
      <Products />
      <CTA />
      {/* <CategorySection />
      <Products /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;
