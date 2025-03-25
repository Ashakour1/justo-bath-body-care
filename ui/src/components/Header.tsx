"use client";

import { ChevronDown, Menu, ShoppingBag } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ href, children }) => (
  <Link
    to={href}
    className="text-sm font-medium text-gray-700 transition-colors hover:text-primary relative group"
  >
    {children}
    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
  </Link>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // const { cart } = useCart();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
        isScrolled ? "shadow-md" : "border-b"
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="relative flex items-center justify-between py-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>

          <Link to="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground text-[#D4AF37]">
              <img src="/logo.png" className="w-32" alt="" />
            </span>
          </Link>

          <nav
            className={`absolute md:relative top-full left-0 right-0 bg-background md:bg-transparent  ${
              isMobileMenuOpen ? "block" : "hidden"
            } md:block`}
          >
            <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0  md:space-x-8 p-4 md:p-0">
              <li className="text-gray-800">
                <NavItem href="/Shop/justo">Justo Cosmetics</NavItem>
              </li>
              <li className="text-black">
                <NavItem href="/Shop">Shop</NavItem>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-700 transition-colors hover:text-primary">
                    Collections <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link to="/Shop/collection/rituals">Rituals</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/Shop/collection/bath&bodyworks">
                        Bath & Body Works
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/Shop/collection/justocosmetics">
                        Justo Cosmetics
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/Shop/collection/perfumes">Perfumes</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <NavItem href="/about">About</NavItem>
              </li>
              <li>
                <NavItem href="/contact">Contact</NavItem>
              </li>
            </ul>
          </nav>

          <div className="flex items-center space-x-4">
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Français</DropdownMenuItem>
                <DropdownMenuItem>Español</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button> */}

            {/* Updated Cart Link */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  3
                </span>
                <span className="sr-only">Shopping cart</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
