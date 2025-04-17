
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, Customer, DiscountRule, DashboardStats } from "@/types";
import { v4 as uuidv4 } from "uuid";

// Sample data
const sampleProducts: Product[] = [
  {
    id: uuidv4(),
    name: "Organic Milk",
    category: "Dairy",
    quantityInStock: 25,
    manufacturingDate: new Date(2024, 3, 1),
    expiryDate: new Date(2024, 4, 30),
    costPrice: 1.5,
    sellingPrice: 2.5,
    discountPercentage: 0,
    discountedPrice: 2.5
  },
  {
    id: uuidv4(),
    name: "Whole Wheat Bread",
    category: "Bakery",
    quantityInStock: 15,
    manufacturingDate: new Date(2025, 3, 15),
    expiryDate: new Date(2025, 3, 25),
    costPrice: 1.2,
    sellingPrice: 2.0,
    discountPercentage: 15,
    discountedPrice: 1.7
  },
  {
    id: uuidv4(),
    name: "Fresh Eggs (dozen)",
    category: "Dairy",
    quantityInStock: 30,
    manufacturingDate: new Date(2024, 3, 10),
    expiryDate: new Date(2024, 5, 10),
    costPrice: 2.0,
    sellingPrice: 3.5,
    discountPercentage: 0,
    discountedPrice: 3.5
  }
];

const sampleCustomers: Customer[] = [
  {
    id: uuidv4(),
    name: "John Smith",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City",
    distance: 1.2,
    notificationPreference: "email"
  },
  {
    id: uuidv4(),
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "234-567-8901",
    address: "456 Oak Ave, City",
    distance: 3.5,
    notificationPreference: "sms"
  }
];

const sampleDiscountRules: DiscountRule[] = [
  {
    id: uuidv4(),
    daysBeforeExpiry: 90, // 3 months
    discountPercentage: 15
  },
  {
    id: uuidv4(),
    daysBeforeExpiry: 30, // 1 month
    discountPercentage: 30
  },
  {
    id: uuidv4(),
    daysBeforeExpiry: 7, // 1 week
    discountPercentage: 50
  }
];

type StoreContextType = {
  products: Product[];
  customers: Customer[];
  discountRules: DiscountRule[];
  dashboardStats: DashboardStats;
  addProduct: (product: Omit<Product, "id" | "discountPercentage" | "discountedPrice">) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addCustomer: (customer: Omit<Customer, "id">) => void;
  updateCustomer: (customer: Customer) => void;
  deleteCustomer: (id: string) => void;
  addDiscountRule: (rule: Omit<DiscountRule, "id">) => void;
  updateDiscountRule: (rule: DiscountRule) => void;
  deleteDiscountRule: (id: string) => void;
  applyDiscountRules: () => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [discountRules, setDiscountRules] = useState<DiscountRule[]>(sampleDiscountRules);
  
  // Calculate dashboard stats
  const dashboardStats: DashboardStats = {
    lowStockItems: products.filter(p => p.quantityInStock < 10).length,
    expiringItems: products.filter(p => {
      const daysToExpiry = Math.floor((p.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return daysToExpiry < 90;
    }).length,
    totalProducts: products.length,
    totalCustomers: customers.length,
    lossPrevented: products.reduce((acc, p) => 
      acc + (p.discountPercentage > 0 ? (p.sellingPrice - p.discountedPrice) * p.quantityInStock : 0), 0)
  };

  // Apply discount rules to all products
  const applyDiscountRules = () => {
    const updatedProducts = products.map(product => {
      const daysToExpiry = Math.floor((product.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      
      // Find applicable rule with highest discount
      const applicableRules = discountRules
        .filter(rule => daysToExpiry <= rule.daysBeforeExpiry)
        .sort((a, b) => b.discountPercentage - a.discountPercentage);
      
      if (applicableRules.length > 0) {
        const discountPercentage = applicableRules[0].discountPercentage;
        const discountedPrice = product.sellingPrice * (1 - discountPercentage / 100);
        
        return {
          ...product,
          discountPercentage,
          discountedPrice: Number(discountedPrice.toFixed(2))
        };
      }
      
      return {
        ...product,
        discountPercentage: 0,
        discountedPrice: product.sellingPrice
      };
    });
    
    setProducts(updatedProducts);
  };

  // Product management
  const addProduct = (product: Omit<Product, "id" | "discountPercentage" | "discountedPrice">) => {
    const newProduct: Product = {
      ...product,
      id: uuidv4(),
      discountPercentage: 0,
      discountedPrice: product.sellingPrice
    };
    
    setProducts([...products, newProduct]);
    // Apply discount rules after adding product
    setTimeout(() => applyDiscountRules(), 0);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
    // Apply discount rules after updating product
    setTimeout(() => applyDiscountRules(), 0);
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Customer management
  const addCustomer = (customer: Omit<Customer, "id">) => {
    const newCustomer: Customer = {
      ...customer,
      id: uuidv4()
    };
    setCustomers([...customers, newCustomer]);
  };

  const updateCustomer = (updatedCustomer: Customer) => {
    setCustomers(customers.map(c => 
      c.id === updatedCustomer.id ? updatedCustomer : c
    ));
  };

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  // Discount rule management
  const addDiscountRule = (rule: Omit<DiscountRule, "id">) => {
    const newRule: DiscountRule = {
      ...rule,
      id: uuidv4()
    };
    setDiscountRules([...discountRules, newRule]);
    // Apply new discount rules to all products
    setTimeout(() => applyDiscountRules(), 0);
  };

  const updateDiscountRule = (updatedRule: DiscountRule) => {
    setDiscountRules(discountRules.map(r => 
      r.id === updatedRule.id ? updatedRule : r
    ));
    // Apply updated discount rules to all products
    setTimeout(() => applyDiscountRules(), 0);
  };

  const deleteDiscountRule = (id: string) => {
    setDiscountRules(discountRules.filter(r => r.id !== id));
    // Apply remaining discount rules to all products
    setTimeout(() => applyDiscountRules(), 0);
  };

  // Apply discount rules on initial load
  React.useEffect(() => {
    applyDiscountRules();
  }, []);

  return (
    <StoreContext.Provider value={{
      products,
      customers,
      discountRules,
      dashboardStats,
      addProduct,
      updateProduct,
      deleteProduct,
      addCustomer,
      updateCustomer,
      deleteCustomer,
      addDiscountRule,
      updateDiscountRule,
      deleteDiscountRule,
      applyDiscountRules
    }}>
      {children}
    </StoreContext.Provider>
  );
};
