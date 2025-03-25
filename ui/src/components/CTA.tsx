import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-16 md:py-24 bg-[#fffef9] text-[#D4AF37] px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us</h2>
        <p className="text-xl mb-8 text-black">
          JUSTO Cosmetics is more than a beauty brand; we're a movement towards
          natural beauty, community support, and overall well-being. Join us as
          we strive to make a positive impact in the Horn of Africa and beyond.
        </p>
        <Button variant="secondary" size="lg" asChild>
          <Link to="/contact">
            Get In Touch <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default CTA;
