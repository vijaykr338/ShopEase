
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Package, 
  Users, 
  Gauge, 
  Percent, 
  Settings,
  BarChart
} from "lucide-react";

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const SidebarItem = ({ to, icon, label }: SidebarItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center py-3 px-4 text-sm font-medium rounded-md mb-1 transition-colors",
        isActive 
          ? "bg-primary/10 text-primary hover:bg-primary/15" 
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      )}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </Link>
  );
};

const Sidebar = () => {
  return (
    <div className="w-64 border-r bg-white">
      <div className="flex flex-col h-full">
        <div className="px-5 py-4 border-b">
          <Link to={"/"}><h2 className="text-2xl font-bold text-primary">ShopEase</h2></Link>
          <p className="text-sm text-gray-500">Local Deals Management</p>
        </div>
        
        <div className="px-3 py-5 flex-1">
          <nav className="space-y-1">
            <SidebarItem to="/dashboard" icon={<Gauge size={18} />} label="Dashboard" />
            <SidebarItem to="/inventory" icon={<Package size={18} />} label="Inventory" />
            <SidebarItem to="/customers" icon={<Users size={18} />} label="Customers" />
            <SidebarItem to="/discounts" icon={<Percent size={18} />} label="Discount Rules" />
            <SidebarItem to="/analytics" icon={<BarChart size={18} />} label="Analytics" />
          </nav>
        </div>
        
        <div className="p-3 border-t">
          <SidebarItem to="/settings" icon={<Settings size={18} />} label="Settings" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
