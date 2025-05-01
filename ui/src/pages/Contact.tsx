"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string({
    required_error: "Please select a subject.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(values);
    toast.success("Message sent!");

    form.reset();
    setIsSubmitting(false);
  }

  return (
    <div className="bg-gradient-to-b from-background to-muted/20 min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-[#D4AF37] tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-black text-lg md:text-xl max-w-2xl mx-auto">
            We'd love to hear from you. Our team is always here to help and
            answer any questions you may have.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/10 rounded-full z-0"></div>
              <h2 className="text-2xl text-[#D4AF37] md:text-3xl font-bold relative z-10">
                Contact Information
              </h2>
            </div>

            <div className="grid gap-6">
              <ContactInfoCard
                icon={<MapPin className="h-5 w-5 text-[#D4AF37]" />}
                title="Our Location"
                description="Nairobi, Kilimani, Ring Rd road"
              />

              <ContactInfoCard
                icon={<Phone className="h-5 w-5 text-[#D4AF37]" />}
                title="Phone Number"
                description="+2540790736909"
              />

              <ContactInfoCard
                icon={<Mail className="h-5 w-5 text-[#D4AF37]" />}
                title="Email Address"
                description="Justokilimani@gmail.com"
              />

              <ContactInfoCard
                icon={<Clock className="text-[#D4AF37] h-5 w-5" />}
                title="Business Hours"
                description="Monday - Friday: 9AM - 5PM PST"
              />
            </div>

            <div className="pt-6">
              <h3 className="text-lg font-medium mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <SocialButton
                  icon={<Facebook className=" text-[#D4AF37] h-5 w-5" />}
                  href="#"
                  label="Facebook"
                />
                <SocialButton
                  icon={<Twitter className=" text-[#D4AF37] h-5 w-5" />}
                  href="#"
                  label="Twitter"
                />
                <SocialButton
                  icon={<Instagram className="text-[#D4AF37] h-5 w-5" />}
                  href="#"
                  label="Instagram"
                />
                <SocialButton
                  icon={<Linkedin className="text-[#D4AF37] h-5 w-5" />}
                  href="#"
                  label="LinkedIn"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="overflow-hidden border-none shadow-lg">
              <div className="h-2 bg-[#D4AF37]"></div>
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6 text-[#D4AF37]">
                  Send Us a Message
                </h2>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                {...field}
                                className="bg-muted/50"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="your.email@example.com"
                                {...field}
                                className="bg-muted/50"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-muted/50">
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">
                                General Inquiry
                              </SelectItem>
                              <SelectItem value="support">
                                Technical Support
                              </SelectItem>
                              <SelectItem value="billing">
                                Billing Question
                              </SelectItem>
                              <SelectItem value="partnership">
                                Partnership Opportunity
                              </SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="How can we help you?"
                              className="min-h-[150px] bg-muted/50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-[#D4AF37] mt-2 group"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 md:mt-24 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-[#D4AF37] font-bold mb-6">
            Find Us
          </h2>
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg bg-muted/50 relative">
            {/* This would be replaced with an actual map component */}
            <div className="absolute inset-0 flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.799092671194!2d36.7880667!3d-1.2951078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f112a7ff328f7%3A0x33f5f28881a84cbd!2sKilimani%20Shujah%20Mall!5e0!3m2!1sen!2sso!4v1744043718065!5m2!1sen!2sso"
                className="w-full h-full"
                height="450"
                style={{ border: 0 }} // ✅ fixed this line
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start space-x-4 p-4 rounded-lg transition-colors hover:bg-muted/50">
      <div className="mt-1">{icon}</div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
}

function SocialButton({
  icon,
  href,
  label,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-muted/50 hover:bg-primary/10 transition-colors"
    >
      {icon}
    </a>
  );
}
