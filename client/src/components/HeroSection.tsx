import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <section className="px-10 w-full py-12 md:py-12 lg:py-20 bg-[#fffefa]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2 ">
              <h1 className="text-3xl max-w-[500px] font-serif font-medium tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Reveal Your Natural Radiance
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Scientifically formulated skincare that nourishes, protects, and
                enhances your skin's natural beauty.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                to="/contact"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-[#D4AF37] bg-transparent px-8 text-sm font-medium text-[#d4b499] transition-colors hover:bg-[#FFF8DC] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FFF8DC]"
              >
                Book A Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-2">
                <img
                  src="/product3.jpg"
                  width={40}
                  height={40}
                  alt="Customer"
                  className="rounded-full  h-10 w-10 border-2 border-white"
                />
                <img
                  src="/product3.jpg"
                  width={40}
                  height={40}
                  alt="Customer"
                  className="rounded-full h-10 w-10 border-2 border-white"
                />
                <img
                  src="/product3.jpg"
                  // width={40}
                  // height={40}
                  alt="Customer"
                  className="rounded-full h-10 w-10  border-2 border-white"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">4.9★</span> from over 2,000+
                reviews
              </div>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop"
              alt="Skincare products"
              className="object-cover max-w-[708px] h-full  rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
