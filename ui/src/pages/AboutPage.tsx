import { Heart, Leaf, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

import CTA from "@/components/CTA";
import { useEffect, useRef } from "react";

const AboutPage = () => {
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);

  return (
    <div>
      {" "}
      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] md:h-[60vh] bg-gray-900">
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4 md:p-8 bg-black/20">
            <h1 className="text-4xl md:text-6xl font-bold text-[#D4AF37] mb-4">
              Our Story
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl">
              Discover natural beauty with JUSTO Cosmetics
            </p>
          </div>
          <img
            src="/image.jpg"
            alt="JUSTO Cosmetics natural ingredients"
            className="object-cover h-full w-full opacity-70" // Added opacity-70 class
          />
        </section>

        {/* Mission Section */}
        <section
          className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto"
          ref={sectionRef}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[#D4AF37] text-3xl md:text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                At JUSTO Cosmetics, we're on a mission to redefine beauty
                standards in the Horn of Africa and beyond. We believe in the
                power of natural ingredients and sustainable practices to create
                products that enhance your natural beauty while respecting our
                planet.
              </p>
              <p className="text-lg text-muted-foreground">
                Founded with a vision to celebrate the rich natural resources of
                the Horn of Africa, we're committed to creating high-quality,
                effective products that honor traditional beauty practices while
                embracing modern innovation.
              </p>
            </div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className="absolute -top-4 -right-4 w-full h-full border-2 border-[#d4b499] rounded-md"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              />
              <div className="relative h-[450px] overflow-hidden rounded-md shadow-lg">
                <motion.img
                  src="image.jpg"
                  alt="Our story"
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  initial={{ scale: 1.2 }}
                  animate={isInView ? { scale: 1 } : { scale: 1.2 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute inset-0 bg-[#2d4a3e] mix-blend-multiply opacity-20"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 0.2 } : { opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                />
              </div>
              <motion.div
                className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#FFF8DC] rounded-full flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
                }
                transition={{
                  delay: 0.6,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <span className="text-[#2d4a3e] font-serif text-sm">
                  Since 2024
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-neutral-50 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-[#D4AF37] text-3xl md:text-4xl font-bold mb-12 text-center">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Leaf className="text-[#D4AF37] w-6 h-6 " />
                </div>
                <h3 className="text-xl text-[#D4AF37] font-semibold mb-4">
                  Natural Beauty
                </h3>
                <p className="text-muted-foreground">
                  We're dedicated to harnessing the power of natural ingredients
                  to create products that enhance your natural beauty. Our range
                  includes body oils, creams, and hair mists designed to nourish
                  and revitalize.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl text-[#D4AF37] font-semibold mb-4">
                  Quality Partnerships
                </h3>
                <p className="text-muted-foreground">
                  We provide a selection of premium products from renowned
                  brands like Rituals and Bath & Body Works, ensuring our
                  customers have access to the best in personal care.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl text-[#D4AF37] font-semibold mb-4">
                  Community Empowerment
                </h3>
                <p className="text-muted-foreground">
                  We're dedicated to uplifting our community by creating
                  employment opportunities for local youth and participating in
                  initiatives that bring positive change to the Horn of Africa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-16 md:py-24 bg-neutral-50 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl text-[#D4AF37] md:text-4xl font-bold mb-6 text-center">
              Empowering Our Community
            </h2>
            <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
              We are dedicated to uplifting our community and making a positive
              impact in the Horn of Africa and beyond.
            </p>
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute -top-4 -left-4 w-full h-full border-2 border-[#d4b499] rounded-md"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                />
                <div className="relative h-[450px] overflow-hidden rounded-md shadow-lg">
                  <motion.img
                    src="image.jpg"
                    alt="Our story"
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    initial={{ scale: 1.2 }}
                    animate={isInView ? { scale: 1 } : { scale: 1.2 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-[#2d4a3e] mix-blend-multiply opacity-20"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.2 } : { opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  />
                </div>
              </motion.div>

              <div>
                <div className="mb-8">
                  <h3 className="text-xl text-[#D4AF37] font-semibold mb-4">
                    Creating Opportunities
                  </h3>
                  <p className="text-muted-foreground">
                    We offer employment and training programs to local youth,
                    harnessing their talents and dedication. By investing in our
                    community's future, we're helping to build a stronger, more
                    resilient society.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl text-[#D4AF37] font-semibold mb-4">
                    Community Engagement
                  </h3>
                  <p className="text-muted-foreground">
                    We actively participate in initiatives that bring positive
                    change to the Horn of Africa. From supporting local artisans
                    to sponsoring educational programs, we're committed to
                    making a difference.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <CTA />
      </main>
    </div>
  );
};

export default AboutPage;
