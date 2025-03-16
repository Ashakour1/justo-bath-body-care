import {
  Bell,
  CreditCard,
  Home,
  LineChart,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 flex justify-between h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 sm:max-w-none">
          <nav className="grid gap-2 text-lg font-medium">
            <Button variant="ghost" className="justify-start gap-2">
              <Home className="h-5 w-5" />
              Dashboard
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Users className="h-5 w-5" />
              Users
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <CreditCard className="h-5 w-5" />
              Billing
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-2">
        <LineChart className="h-6 w-6" />
        <span className="text-lg font-semibold">Dashboard</span>
      </div>

      <div>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <img
            src="/placeholder.svg?height=32&width=32"
            width="32"
            height="32"
            alt="Avatar"
            className="rounded-full"
          />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
