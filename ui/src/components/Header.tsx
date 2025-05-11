"use client";

import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/features/useCart";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ href, children, onClick }) => (
  <Link
    to={href}
    className="text-sm font-medium text-gray-700 hover:text-primary"
    onClick={onClick}
  >
    {children}
  </Link>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { products } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full bg-white ${
        isScrolled ? "border-b" : ""
      }`}
      animate={{
        boxShadow: isScrolled
          ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          : "none",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-[1300px] px-4 mx-auto w-full flex flex-col">
        {/* Top Row */}
        <div className="flex items-center justify-between py-4 w-full">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
            <img src="/logo.png" className="w-32 h-auto" alt="Logo" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6">
              <li>
                <NavItem href="/Shop/Justo cosmetics" onClick={closeMobileMenu}>
                  Justo products
                </NavItem>
              </li>
              <li>
                <NavItem href="/Shop" onClick={closeMobileMenu}>
                  Shop All
                </NavItem>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-700 hover:text-primary">
                    Collections <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/Shop/collection/Justo cosmetics"
                        onClick={closeMobileMenu}
                      >
                        Justo Products
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/Shop/collection/Rituals"
                        onClick={closeMobileMenu}
                      >
                        Rituals
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/Shop/collection/Bath and body Works"
                        onClick={closeMobileMenu}
                      >
                        Bath & Body Works
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/Shop/collection/Perfumes"
                        onClick={closeMobileMenu}
                      >
                        Perfumes
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <NavItem href="/about" onClick={closeMobileMenu}>
                  About
                </NavItem>
              </li>
              <li>
                <NavItem href="/contact" onClick={closeMobileMenu}>
                  Contact
                </NavItem>
              </li>
            </ul>
          </nav>

          {/* Shopping Cart */}
          <Link
            to="/cart"
            className="flex items-center"
            onClick={closeMobileMenu}
          >
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {products.length > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  {products.length}
                </motion.span>
              )}
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden border-t overflow-hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <ul className="py-2 space-y-1">
                <li className="py-2 px-4">
                  <NavItem
                    href="/Shop/Justo cosmetics"
                    onClick={closeMobileMenu}
                  >
                    Justo products
                  </NavItem>
                </li>
                <li className="py-2 px-4">
                  <NavItem href="/Shop" onClick={closeMobileMenu}>
                    Shop All
                  </NavItem>
                </li>
                <li className="py-2 px-4">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-700">
                      Collections
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <ul className="pl-4 mt-2 space-y-2">
                      <li>
                        <Link
                          to="/Shop/collection/Justo cosmetics"
                          className="text-sm text-gray-600"
                          onClick={closeMobileMenu}
                        >
                          Justo Products
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Shop/collection/Rituals"
                          className="text-sm text-gray-600"
                          onClick={closeMobileMenu}
                        >
                          Rituals
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Shop/collection/Bath and body Works"
                          className="text-sm text-gray-600"
                          onClick={closeMobileMenu}
                        >
                          Bath & Body Works
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/Shop/collection/Perfumes"
                          className="text-sm text-gray-600"
                          onClick={closeMobileMenu}
                        >
                          Perfumes
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
                <li className="py-2 px-4">
                  <NavItem href="/about" onClick={closeMobileMenu}>
                    About
                  </NavItem>
                </li>
                <li className="py-2 px-4">
                  <NavItem href="/contact" onClick={closeMobileMenu}>
                    Contact
                  </NavItem>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
