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
function App() {
  return (
    <>
      <Router>
        <Toaster />
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
