import { Mail, MapPin, Phone } from "lucide-react";


const Footer = () => {
  return (
    <footer className="w-full border-t bg-background py-8">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>079073690</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
              <span>Nairobi, Kilimani, Ring Rd road</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a
                href="mailto:Justokilimani@gmail.com"
                className="hover:underline"
              >
                Justokilimani@gmail.com
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <a href="/" className="hover:underline">
                Home
              </a>
              <a href="/about" className="hover:underline">
                About
              </a>
              <a href="/services" className="hover:underline">
                Services
              </a>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Business Hours</h3>
            <p className="text-sm text-muted-foreground">
              Monday - Friday: 9am - 5pm
            </p>
            <p className="text-sm text-muted-foreground">
              Saturday: 10am - 2pm
            </p>
            <p className="text-sm text-muted-foreground">Sunday: Closed</p>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Justo Kilimani. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
