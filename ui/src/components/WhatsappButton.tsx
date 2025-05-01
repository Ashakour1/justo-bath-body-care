import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const phoneNumber = "+254790736909"; // Replace with your WhatsApp number
    const message = `Hello! I would like to know more about your products.\n\nfrom the website *${window.location.href}*`; // Default message
    const formattedNumber = phoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={handleClick}
          className={`fixed bottom-6 right-6 z-50 bg-green-500 text-white rounded-full shadow-lg p-4 flex items-center hover:bg-green-600 transition-all duration-300 transform ${
            isAnimating ? "animate-bounce" : "hover:scale-110"
          }`}
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="mr-2 h-6 w-6" />
          <span className="font-medium">Chat with us</span>
        </button>
      )}
    </>
  );
};

export default WhatsAppButton;
