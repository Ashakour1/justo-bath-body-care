import { Heart, Leaf, Users } from "lucide-react";

import CTA from "@/components/CTA";

const AboutPage = () => {
  return (
    <div>
      {" "}
      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] md:h-[60vh] bg-neutral-100">
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4 md:p-8 bg-black/20">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Our Story
            </h1>
            <p className="text-lg md:text-xl text-white max-w-2xl">
              Discover natural beauty with JUSTO Cosmetics
            </p>
          </div>
          <img
            src="/image.jpg"
            alt="JUSTO Cosmetics natural ingredients"
            className="object-cover h-full w-full"
          />
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
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
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="/product1.jpg"
                alt="Natural ingredients from the Horn of Africa"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-neutral-50 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Natural Beauty</h3>
                <p className="text-muted-foreground">
                  We're dedicated to harnessing the power of natural ingredients
                  to create products that enhance your natural beauty. Our range
                  includes body oils, creams, and hair mists designed to nourish
                  and revitalize.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
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
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Empowering Our Community
            </h2>
            <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
              We are dedicated to uplifting our community and making a positive
              impact in the Horn of Africa and beyond.
            </p>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <img
                  src="/image.jpg"
                  alt="Community engagement initiatives"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">
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
                  <h3 className="text-xl font-semibold mb-4">
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
