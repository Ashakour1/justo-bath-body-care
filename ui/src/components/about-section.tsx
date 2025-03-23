import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section id="about" className="w-full py-16 bg-[#ffffff]">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative h-[400px]">
            <img
              src="image.jpg"
              alt="Our story"
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-medium">Our Story</h2>
            <div className="w-16 h-px bg-gray-400"></div>
            <p className="text-muted-foreground">
              Founded in 2015, our brand was born from a passion for natural
              skincare and a belief that beauty products should be effective,
              sustainable, and kind to your skin.
            </p>
            <p className="text-muted-foreground">
              We carefully source the finest natural ingredients from around the
              world, working directly with sustainable farmers and ethical
              suppliers to ensure quality and purity in every product.
            </p>
            <p className="text-muted-foreground">
              Our formulations are developed by expert dermatologists and
              cosmetic scientists, combining ancient botanical wisdom with
              modern skincare technology to create products that truly work.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center text-sm font-medium text-[#2d4a3e] hover:underline"
            >
              Learn more about our journey
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
