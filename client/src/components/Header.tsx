"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Instagram, Twitter, Facebook, ChevronDown } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FiShoppingCart } from "react-icons/fi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full">
      <div className="max-w-[1200px] mx-auto flex h-16 items-center justify-between px-4 md:px-6 font-sans">
        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link
                to="/shop"
                className="text-lg font-medium transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
              <div className="flex flex-col gap-2">
                <div className="text-lg font-medium">Collections</div>
                <Link
                  to="/collections/new-arrivals"
                  className="pl-4 text-sm transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  New Arrivals
                </Link>
                <Link
                  to="/collections/bestsellers"
                  className="pl-4 text-sm transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Bestsellers
                </Link>
                <Link
                  to="/collections/seasonal"
                  className="pl-4 text-sm transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Seasonal
                </Link>
              </div>
              <div className="flex gap-4 mt-4">
                <Link
                  to="https://instagram.com"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  to="https://twitter.com"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  to="https://facebook.com"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-full w-20" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/shop"
            className="text-sm text-muted-foreground font-medium transition-colors hover:text-primary"
          >
            Shop
          </Link>
          <Link
            to="/perfums"
            className="text-sm text-muted-foreground font-medium transition-colors hover:text-primary"
          >
            Perfums
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Collections <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to="/products/isNew">New Arrivals</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            to="/perfums"
            className="text-sm text-muted-foreground font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link
            to="/perfums"
            className="text-sm text-muted-foreground font-medium transition-colors hover:text-primary"
          >
            Perfums
          </Link>
        </nav>

        {/* Social Media and Cart */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="https://instagram.com"
              className="text-muted-foreground hover:text-primary"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              to="https://twitter.com"
              className="text-muted-foreground hover:text-primary"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              to="https://facebook.com"
              className="text-muted-foreground hover:text-primary"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
          <Link to="/cart" className="relative">
            <FiShoppingCart className="h-6 w-6" />
            <span className="sr-only">Cart</span>
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
