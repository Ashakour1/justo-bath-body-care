import "./App.css";
// import Header from "./components/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
// import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductDetail from "./components/Products/ProductDetail";
import WhatsAppButton from "./components/WhatsappButton";
import CartPage from "./components/cart-items";
import CheckoutPage from "./components/checkout-page";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/Contact";
import HomePage from "./pages/HomePage";
import Products from "./pages/ProductsPage";
import ProductsWithFiltering from "./pages/ProductsWithFilter";
import TermsAndConditionsPage from "./pages/Terms&Conditions";
import { Helmet } from "react-helmet";
function App() {
  return (
    <>
      <Router>
        <Toaster />
        <Helmet>
          <title>Justo Cosmetics</title>
          <meta
            name="description"
            content="Welcome to Justo Cosmetics your go-to skincare brand for natural, effective, and affordable skin care products. Specializing in acne treatment, anti-aging creams, moisturizers, and face cleansers, Justo Cosmetics offers premium skincare solutions for all skin types."
          />

          {/* Open Graph  */}
          <meta property="og:title" content="Justo Cosmetics" />
          <meta
            property="og:description"
            content="Welcome to Justo Cosmetics your go-to skincare brand for natural, effective, and affordable skin care products. Specializing in acne treatment, anti-aging creams, moisturizers, and face cleansers, Justo Cosmetics offers premium skincare solutions for all skin types."
          />
          <meta property="og:image" content="/image.jpg" />
          <meta property="og:url" content="https://justocosmetics.com" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Justo Cosmetics" />

          {/* Twitter Card */}
        </Helmet>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/shop/collection/:category"
            element={<ProductsWithFiltering />}
          />
          <Route path="/shop/:category" element={<ProductsWithFiltering />} />
          <Route path="/shop/" element={<Products />} />
          <Route path="/shop/*" element={<NotFound />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="/product/:id" element={<ProductDetail />} />

          <Route path="/checkout" element={<CheckoutPage />} />
          {/* <Route path="/invoice/:id" element={<InvoicePage />} /> */}
          {/* <Route path="/products/:category" element={<ProductsCat />} />
          <Route path="/products/" element={<ProductsPage />} />
          <Route path="/products/isNew" element={<ProductsNew />} /> */}

          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditionsPage />}
          />

          <Route path="/about/" element={<AboutPage />} />
          <Route path="/contact/" element={<ContactPage />} />
        </Routes>
        {/* <Footer /> */}
        <Footer />
        <WhatsAppButton />
        {/* <WhatsappButton /> */}
      </Router>
    </>
  );
}

export default App;
