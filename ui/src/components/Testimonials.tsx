"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "../lib/utils";

interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  text: string;
  product: string;
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "I've struggled with sensitive skin for years, but Justo's Hydrating Serum has completely transformed my complexion. My skin feels nourished and balanced for the first time in forever!",
      product: "Hydrating Serum",
    },
    {
      id: 2,
      name: "Michael Chen",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "The Overnight Recovery Cream is a game-changer. I wake up with visibly refreshed skin every morning. It's lightweight yet deeply moisturizing - exactly what my combination skin needed.",
      product: "Overnight Recovery Cream",
    },
    {
      id: 3,
      name: "Aisha Patel",
      image: "/placeholder.svg?height=80&width=80",
      rating: 4,
      text: "After just two weeks of using the Vitamin C Brightening Essence, my dark spots have noticeably faded. My skin tone is more even and I've been getting compliments on my glow!",
      product: "Vitamin C Brightening Essence",
    },
    {
      id: 4,
      name: "David Rodriguez",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "As someone who never had a skincare routine before, Justo's Daily Defense SPF has made it easy to protect my skin. It's non-greasy and doesn't leave a white cast. I'm hooked!",
      product: "Daily Defense SPF 50",
    },
    {
      id: 5,
      name: "Emma Wilson",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "The Gentle Exfoliating Mask has completely eliminated my texture issues. My skin feels baby soft after each use, and I've noticed my products absorb much better now.",
      product: "Gentle Exfoliating Mask",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#D4AF37]">
            Real Results, Real People
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover how Justo has transformed skincare routines and boosted
            confidence for people just like you.
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-sm"
              onClick={prevTestimonial}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-left"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="sr-only">Previous</span>
            </Button>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-sm"
              onClick={nextTestimonial}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
              <span className="sr-only">Next</span>
            </Button>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === activeIndex ? "bg-slate-800" : "bg-slate-300"
                )}
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center mb-4">
          <Avatar className="h-12 w-12 mr-4 border-2 border-slate-100">
            <AvatarImage src={testimonial.image} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-slate-900">{testimonial.name}</h3>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < testimonial.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-200"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <blockquote className="text-slate-700 italic mb-4 flex-grow">
          "{testimonial.text}"
        </blockquote>

        <div className="mt-auto">
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full">
            {testimonial.product}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
