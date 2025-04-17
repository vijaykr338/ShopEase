
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const Navbar = () => {
  return (
    <header className="py-4 border-b border-green-100">
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6 text-green-600" />
          <span className="font-bold text-xl text-gradient">ShopEase</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium hover:text-green-600 transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-green-600 transition-colors">How It Works</a>
          <a href="#pricing" className="text-sm font-medium hover:text-green-600 transition-colors">Pricing</a>
          <a href="#testimonials" className="text-sm font-medium hover:text-green-600 transition-colors">Testimonials</a>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:inline-flex">Log in</Button>
          <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
