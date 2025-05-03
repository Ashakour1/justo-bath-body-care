import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="about" className="w-full py-20 bg-[#ffffff]" ref={sectionRef}>
      <div className="max-w-[1300px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
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
            <motion.div
              className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#FFF8DC] rounded-full flex items-center justify-center"
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

          <div className="space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-serif font-medium text-[#D4AF37]"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.7 }}
              >
                Our Story
              </motion.h2>
              <motion.div
                className="w-20 h-[2px] bg-[#d4b499] mt-4"
                initial={{ width: 0 }}
                animate={isInView ? { width: 80 } : { width: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              />
            </motion.div>

            <motion.p
              className="text-gray-600 text-base md:text-lg"
              custom={0}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={paragraphVariants}
            >
              Founded in 2024, our brand was born from a passion for natural
              skincare and a belief that beauty products should be effective,
              sustainable, and kind to your skin.
            </motion.p>

            <motion.p
              className="text-gray-600 text-base md:text-lg"
              custom={1}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={paragraphVariants}
            >
              We carefully source the finest natural ingredients from around the
              world, working directly with sustainable farmers and ethical
              suppliers to ensure quality and purity in every product.
            </motion.p>

            <motion.p
              className="text-gray-600 text-base md:text-lg"
              custom={2}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={paragraphVariants}
            >
              Our formulations are developed by expert dermatologists and
              cosmetic scientists, combining ancient botanical wisdom with
              modern skincare technology to create products that truly work.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  to="/about"
                  className="inline-flex items-center text-sm font-medium text-[#D4AF37] hover:text-[#d4b499] transition-colors duration-300"
                >
                  Learn more about our journey
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
