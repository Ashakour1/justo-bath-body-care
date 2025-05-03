import { Check } from "lucide-react";
import { Button } from "./ui/button";

const CtaSection = () => {
  return (
    <section className="max-w-[1300px] mx-auto px-4 md:px-4">
      <div className=" ">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Image Section */}
          <div className="relative flex items-center justify-center">
            <div className="relative z-10 h-[500px] w-full">
              <img
                src="/vc.jpg"
                alt="Woman with towel  holding hair serum"
                className="rounded-lg object-cover  h-full w-full"
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h3 className="text-sm font-medium tracking-wider text-gray-500 uppercase">
                PURE AND SIMPLE
              </h3>
              <h2 className="mt-2 text-3xl font-bold  leading-tight text-[#D4AF37]">
                Deeply Nourishing Hair Serum For Glowing & Healthy Hair
              </h2>
              <p className="mt-4 text-gray-600">
                All Natural Ingredients: A Vitamin-Rich Argan Oil, Coconut
                Complex, Biotin & Jojoba Oil. Start seeing visible difference in
                7 days! Repair dull or over-processed hair in just 15
                treatments.
              </p>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-5">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200">
                  <Check className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <span className="text-sm font-medium">Strong & Smooth</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200">
                  <Check className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <span className="text-sm font-medium">Paraben-free</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200">
                  <Check className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <span className="text-sm font-medium">Sulfate-free</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200">
                  <Check className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <span className="text-sm font-medium">100% Vegan</span>
              </div>
            </div>

            {/* CTA Button */}
            <div>
              <Button className="px-8 py-2 bg-[#D4AF37] hover:bg-[#d1b96a] text-white rounded uppercase font-medium">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
