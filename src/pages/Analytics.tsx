
import React from "react";
import { useStore } from "@/context/StoreContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, subDays } from "date-fns";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#F44336", "#9C27B0", "#FF9800"];

const Analytics = () => {
  const { products, customers, discountRules } = useStore();
  
  // Organize products by categories
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = {
        name: product.category,
        count: 0,
        value: 0,
        discountedValue: 0
      };
    }
    
    acc[product.category].count++;
    acc[product.category].value += product.sellingPrice * product.quantityInStock;
    acc[product.category].discountedValue += product.discountedPrice * product.quantityInStock;
    
    return acc;
  }, {} as Record<string, { name: string; count: number; value: number; discountedValue: number }>);
  
  const categoryData = Object.values(productsByCategory);
  
  // Generate discount performance data
  const discountPerformanceData = [
    {
      name: "Value Before Discounts",
      value: products.reduce((acc, p) => acc + (p.sellingPrice * p.quantityInStock), 0)
    },
    {
      name: "Value After Discounts",
      value: products.reduce((acc, p) => acc + (p.discountedPrice * p.quantityInStock), 0)
    }
  ];
  
  // Discount savings by expiry timeframe
  const discountByTimeframe = discountRules
    .sort((a, b) => a.daysBeforeExpiry - b.daysBeforeExpiry)
    .map(rule => {
      // Find products affected by this rule
      const affectedProducts = products.filter(product => {
        const daysToExpiry = Math.floor(
          (product.expiryDate.getTime() - new Date().getTime()) / 
          (1000 * 60 * 60 * 24)
        );
        
        return daysToExpiry <= rule.daysBeforeExpiry && 
               product.discountPercentage === rule.discountPercentage;
      });
      
      const savings = affectedProducts.reduce(
        (acc, p) => acc + ((p.sellingPrice - p.discountedPrice) * p.quantityInStock),
        0
      );
      
      return {
        name: `${rule.daysBeforeExpiry} days`,
        discount: rule.discountPercentage,
        products: affectedProducts.length,
        savings
      };
    });
  
  // Customer distribution by distance
  const customerDistanceRanges = [
    { range: "< 1 km", count: 0 },
    { range: "1-2 km", count: 0 },
    { range: "2-5 km", count: 0 },
    { range: "> 5 km", count: 0 }
  ];
  
  customers.forEach(customer => {
    if (customer.distance < 1) {
      customerDistanceRanges[0].count++;
    } else if (customer.distance < 2) {
      customerDistanceRanges[1].count++;
    } else if (customer.distance <= 5) {
      customerDistanceRanges[2].count++;
    } else {
      customerDistanceRanges[3].count++;
    }
  });
  
  // Mock expiry date distribution over next 6 months
  const today = new Date();
  const expiryDatesByMonth = Array.from({ length: 6 }, (_, i) => {
    const month = new Date(today);
    month.setMonth(today.getMonth() + i);
    
    const monthProducts = products.filter(product => {
      const expiry = new Date(product.expiryDate);
      return expiry.getMonth() === month.getMonth() && 
             expiry.getFullYear() === month.getFullYear();
    });
    
    return {
      name: format(month, 'MMM yyyy'),
      products: monthProducts.length,
      value: monthProducts.reduce((acc, p) => acc + (p.sellingPrice * p.quantityInStock), 0)
    };
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Value by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 30,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Value']} />
                  <Bar dataKey="value" name="Original Value" fill="#4CAF50" />
                  <Bar dataKey="discountedValue" name="After Discounts" fill="#81C784" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Products by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Products by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ name, percent }) => 
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip formatter={(value) => [`${value} products`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Customer Distance Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Distance Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={customerDistanceRanges}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} customers`, 'Count']} />
                  <Bar dataKey="count" name="Customers" fill="#2196F3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Expiry Date Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Product Expiry Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={expiryDatesByMonth}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#4CAF50" />
                  <YAxis yAxisId="right" orientation="right" stroke="#FF9800" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="products"
                    name="Products"
                    stroke="#4CAF50"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="value"
                    name="Value"
                    stroke="#FF9800"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Discount Rule Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Discount Rule Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={discountByTimeframe}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#F44336" />
                  <YAxis yAxisId="right" orientation="right" stroke="#4CAF50" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="products"
                    name="Products"
                    fill="#F44336"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="savings"
                    name="Savings"
                    fill="#4CAF50"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Total Revenue Before/After Discounts */}
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={discountPerformanceData}
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
                  <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Value']} />
                  <Bar dataKey="value" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
