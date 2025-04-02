import { Box, LayoutDashboard, ListOrdered, LogOut, Users } from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/store";

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuthStore();
  const navItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      to: "/dashboard/products",
      label: "Products",
      icon: <Box className="h-5 w-5" />,
    },
    {
      to: "/dashboard/orders",
      label: "Orders",
      icon: <ListOrdered className="h-5 w-5" />,
    },
    {
      to: "/dashboard/customers",
      label: "Customers",
      icon: <Users className="h-5 w-5" />,
    },
  ];
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="hidden w-[200px] flex-col border-r md:flex">
        <div className="p-4 flex items-center justify-center">
          <img src="/logo.png" alt="logo.png" className="w-20 pt-10 " />
        </div>
        <nav className="flex-1 flex flex-col gap-1 p-4">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              to={to}
              key={to}
              className={` flex items-center gap-2 p-2 rounded-lg ${
                to === "/dashboard"
                  ? location.pathname === "/dashboard"
                    ? "bg-primary text-white"
                    : "text-muted-foreground"
                  : location.pathname.startsWith(to)
                  ? "bg-primary text-white"
                  : "text-muted-foreground"
              }`}
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4">
          <Link
            to="#"
            onClick={logout}
            // to="/"
            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-100  rounded-lg"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
