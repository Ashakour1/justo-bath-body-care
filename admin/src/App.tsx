import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { DashboardPage } from "./pages/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import ProductForm from "./pages/Dashboard/products/add-product";
import { ProductTable } from "./pages/Dashboard/ProductsPage";
import { OrderTable } from "./pages/Dashboard/orders/ordersTable";
import { CustomerTable } from "./pages/Dashboard/customers/customerTable";
import OrderForm from "./pages/Dashboard/orders/EditOrder";
import ProtectedRoutes from "./auth/protectedRoutes";

function App() {
  const auth = localStorage.getItem("auth");
  const isAuthenticated = auth ? JSON.parse(auth).isAuthenticated : null;

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}
          >
            <Route
              path="/dashboard"
              element={
                <>
                  <Sidebar />
                </>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="products" element={<ProductTable />} />
              <Route path="products/add-product" element={<ProductForm />} />
              <Route path="products/update/:id" element={<ProductForm />} />
              <Route path="orders" element={<OrderTable />} />
              <Route path="customers" element={<CustomerTable />} />
              <Route path="orders/update/:id" element={<OrderForm />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
