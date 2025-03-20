import Categories from "@/components/Categories";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import React from "react";

const Home = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <HeroSection />
      <Categories />
    </div>
  );
};

export default Home;
