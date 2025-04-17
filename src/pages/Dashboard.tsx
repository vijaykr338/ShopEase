
import React from "react";
import { useStore } from "@/context/StoreContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import {
  Package,
  Users,
  AlertTriangle,
  Calendar,
  DollarSign,
  ShoppingBag,
  TrendingDown
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardCard = ({ 
  title, 
  value, 
  icon, 
  description 
}: { 
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { products, customers, dashboardStats } = useStore();
  
  // Find expiring products (next 30 days)
  const expiringProducts = products
    .filter(product => {
      const daysToExpiry = Math.floor(
        (product.expiryDate.getTime() - new Date().getTime()) / 
        (1000 * 60 * 60 * 24)
      );
      return daysToExpiry <= 30 && daysToExpiry > 0;
    })
    .sort((a, b) => a.expiryDate.getTime() - b.expiryDate.getTime())
    .slice(0, 5);
  
  // Low stock products
  const lowStockProducts = products
    .filter(product => product.quantityInStock < 10)
    .sort((a, b) => a.quantityInStock - b.quantityInStock)
    .slice(0, 5);

  // Category data for chart
  const categoryData = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = {
        name: category,
        count: 0,
        value: 0
      };
    }
    acc[category].count++;
    acc[category].value += product.quantityInStock * product.sellingPrice;
    return acc;
  }, {} as Record<string, { name: string; count: number; value: number }>);
  
  const chartData = Object.values(categoryData);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Store Dashboard</h1>
      
      {/* Top stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Products"
          value={dashboardStats.totalProducts}
          icon={<Package className="h-4 w-4 text-gray-500" />}
        />
        
        <DashboardCard
          title="Total Customers"
          value={dashboardStats.totalCustomers}
          icon={<Users className="h-4 w-4 text-gray-500" />}
        />
        
        <DashboardCard
          title="Expiring Items"
          value={dashboardStats.expiringItems}
          icon={<AlertTriangle className="h-4 w-4 text-amber-500" />}
          description="Items expiring within 90 days"
        />
        
        <DashboardCard
          title="Loss Prevention"
          value={`$${dashboardStats.lossPrevented.toFixed(2)}`}
          icon={<TrendingDown className="h-4 w-4 text-green-500" />}
          description="Value saved through discounts"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Value by Category</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Value']}
                  />
                  <Bar dataKey="value" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Expiring Products */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Expiring Soon</CardTitle>
            </CardHeader>
            <CardContent>
              {expiringProducts.length === 0 ? (
                <p className="text-sm text-gray-500">No products expiring soon.</p>
              ) : (
                <div className="space-y-4">
                  {expiringProducts.map(product => {
                    const daysLeft = Math.floor(
                      (product.expiryDate.getTime() - new Date().getTime()) / 
                      (1000 * 60 * 60 * 24)
                    );
                    const percentage = Math.min(100, Math.max(0, (daysLeft / 30) * 100));
                    
                    return (
                      <div key={product.id} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-gray-500">
                            {format(product.expiryDate, 'MMM d, yyyy')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Progress value={percentage} className="flex-1" />
                          <span className="text-xs font-medium text-red-500">
                            {daysLeft} days left
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Low Stock Alert */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Low Stock Alert</CardTitle>
            </CardHeader>
            <CardContent>
              {lowStockProducts.length === 0 ? (
                <p className="text-sm text-gray-500">No products with low stock.</p>
              ) : (
                <div className="space-y-4">
                  {lowStockProducts.map(product => (
                    <div key={product.id} className="flex justify-between items-center">
                      <span className="font-medium">{product.name}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        product.quantityInStock <= 5 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {product.quantityInStock} left in stock
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
