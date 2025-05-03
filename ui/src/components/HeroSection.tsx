"use client";

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const HeroSection = () => {
  return (
    <>
      <Helmet>
        <title>Justo Cosmetics</title>
        <meta
          name="description"
          content="Welcome to Justo Cosmetics your go-to skincare brand for natural, effective, and affordable skin care products. Specializing in acne treatment, anti-aging creams, moisturizers, and face cleansers, Justo Cosmetics offers premium skincare solutions for all skin types."
        />

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

      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-[#fffefa]">
        <div className="max-w-[1300px] mx-auto px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl/none font-serif font-medium tracking-tighter max-w-[500px] text-[#D4AF37]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  Reveal Your Natural Radiance
                </motion.h1>
                <motion.p
                  className="text-sm sm:text-base md:text-lg lg:text-xl  max-w-[600px] text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  Scientifically formulated skincare that nourishes, protects,
                  and enhances your skin&apos;s natural beauty.
                </motion.p>
              </motion.div>
              <motion.div
                className="flex flex-col sm:flex-row gap-3 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    to="/shop"
                    className="inline-flex h-10 items-center justify-center rounded-lg border border-[#D4AF37] bg-transparent px-4 sm:px-6 md:px-8 text-sm font-medium text-black transition-colors hover:bg-[#FFF8DC] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFF8DC]"
                  >
                    Shop Now
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-4 "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                <motion.div
                  className="flex -space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 1 }}
                >
                  {[1, 2, 3].map((_, index) => (
                    <motion.img
                      key={index}
                      src="/product3.jpg"
                      width={40}
                      height={40}
                      alt="Customer"
                      className="rounded-full h-8 w-8 sm:h-10 sm:w-10 border-2 border-white object-cover"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.2 }}
                    />
                  ))}
                </motion.div>
                <motion.div
                  className="text-xs sm:text-sm text-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 1.6 }}
                >
                  <span className="font-medium text-black">4.9★</span> from over
                  2,000+ reviews
                </motion.div>
              </motion.div>
            </div>
            <motion.div
              className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] mt-6 lg:mt-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                className="relative w-full h-full rounded-md overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop"
                  alt="Skincare products"
                  className="object-cover rounded-md w-full h-full"
                  // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
