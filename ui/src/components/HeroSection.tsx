import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 bg-[#fffefa]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl/none font-serif font-medium tracking-tighter max-w-[500px]">
                Reveal Your Natural Radiance
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-[600px]">
                Scientifically formulated skincare that nourishes, protects, and
                enhances your skin&apos;s natural beauty.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/contact"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-[#D4AF37] bg-transparent px-4 sm:px-6 md:px-8 text-sm font-medium text-[#d4b499] transition-colors hover:bg-[#FFF8DC] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFF8DC]"
              >
                Book An Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-4">
              <div className="flex -space-x-2">
                <img
                  src="/product3.jpg"
                  width={40}
                  height={40}
                  alt="Customer"
                  className="rounded-full h-8 w-8 sm:h-10 sm:w-10 border-2 border-white object-cover"
                />
                <img
                  src="/product3.jpg"
                  width={40}
                  height={40}
                  alt="Customer"
                  className="rounded-full h-8 w-8 sm:h-10 sm:w-10 border-2 border-white object-cover"
                />
                <img
                  src="/product3.jpg"
                  width={40}
                  height={40}
                  alt="Customer"
                  className="rounded-full h-8 w-8 sm:h-10 sm:w-10 border-2 border-white object-cover"
                />
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                <span className="font-medium">4.9★</span> from over 2,000+
                reviews
              </div>
            </div>
          </div>
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] mt-6 lg:mt-0">
            <div className="relative w-full h-full rounded-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop"
                alt="Skincare products"
                className="object-cover rounded-md"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
