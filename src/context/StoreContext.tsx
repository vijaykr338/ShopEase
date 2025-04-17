
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, Customer, DiscountRule, DashboardStats } from "@/types";
import { v4 as uuidv4 } from "uuid";
const sampleProducts: Product[] = [
  // Dairy products with various expiry timelines
  {
    id: uuidv4(),
    name: "Organic Whole Milk",
    category: "Dairy",
    quantityInStock: 25,
    manufacturingDate: new Date(2025, 3, 1),
    expiryDate: new Date(2025, 3, 15), // Expiring soon
    costPrice: 1.5,
    sellingPrice: 2.99,
    discountPercentage: 20,
    discountedPrice: 2.39
  },
  {
    id: uuidv4(),
    name: "Greek Yogurt (500g)",
    category: "Dairy",
    quantityInStock: 12,
    manufacturingDate: new Date(2025, 3, 5),
    expiryDate: new Date(2025, 3, 19), // Expiring soon
    costPrice: 1.8,
    sellingPrice: 3.49,
    discountPercentage: 15,
    discountedPrice: 2.97
  },
  {
    id: uuidv4(),
    name: "Cheddar Cheese Block",
    category: "Dairy",
    quantityInStock: 8,
    manufacturingDate: new Date(2025, 2, 15),
    expiryDate: new Date(2025, 5, 15), // Not expiring soon
    costPrice: 3.5,
    sellingPrice: 5.99,
    discountPercentage: 0,
    discountedPrice: 5.99
  },
  
  // Low stock items
  {
    id: uuidv4(),
    name: "Farm Fresh Eggs",
    category: "Dairy",
    quantityInStock: 3, // Very low stock
    manufacturingDate: new Date(2025, 3, 10),
    expiryDate: new Date(2025, 4, 20),
    costPrice: 2.0,
    sellingPrice: 3.99,
    discountPercentage: 0,
    discountedPrice: 3.99
  },
  
  // Bakery items with mixed expiry and stock
  {
    id: uuidv4(),
    name: "Artisan Sourdough Bread",
    category: "Bakery",
    quantityInStock: 6, // Low stock
    manufacturingDate: new Date(2025, 3, 17),
    expiryDate: new Date(2025, 3, 20), // Expiring very soon
    costPrice: 2.0,
    sellingPrice: 4.50,
    discountPercentage: 30,
    discountedPrice: 3.15
  },
  {
    id: uuidv4(),
    name: "Chocolate Chip Cookies (6pk)",
    category: "Bakery",
    quantityInStock: 15,
    manufacturingDate: new Date(2025, 3, 15),
    expiryDate: new Date(2025, 3, 22), // Expiring soon
    costPrice: 1.8,
    sellingPrice: 3.99,
    discountPercentage: 15,
    discountedPrice: 3.39
  },
  
  // Already expired items
  {
    id: uuidv4(),
    name: "Seasonal Fruit Yogurt",
    category: "Dairy",
    quantityInStock: 4,
    manufacturingDate: new Date(2025, 2, 1),
    expiryDate: new Date(2025, 3, 12), // Already expired
    costPrice: 0.75,
    sellingPrice: 1.49,
    discountPercentage: 50,
    discountedPrice: 0.75
  },
  
  // Items with plenty of stock
  {
    id: uuidv4(),
    name: "Organic Pasta Sauce",
    category: "Canned Goods",
    quantityInStock: 42, // High stock
    manufacturingDate: new Date(2024, 9, 10),
    expiryDate: new Date(2025, 9, 10), // Long shelf life
    costPrice: 1.8,
    sellingPrice: 3.29,
    discountPercentage: 0,
    discountedPrice: 3.29
  },
  
  // More product categories
  {
    id: uuidv4(),
    name: "Fresh Atlantic Salmon (per lb)",
    category: "Seafood",
    quantityInStock: 7, // Low stock
    manufacturingDate: new Date(2025, 3, 17),
    expiryDate: new Date(2025, 3, 19), // Very short shelf life
    costPrice: 8.50,
    sellingPrice: 12.99,
    discountPercentage: 25,
    discountedPrice: 9.74
  },
  {
    id: uuidv4(),
    name: "Frozen Mixed Berries",
    category: "Frozen",
    quantityInStock: 18,
    manufacturingDate: new Date(2024, 9, 15),
    expiryDate: new Date(2025, 9, 15), // Long shelf life
    costPrice: 2.50,
    sellingPrice: 4.99,
    discountPercentage: 0,
    discountedPrice: 4.99
  }
];
const sampleCustomers: Customer[] = [
  {
    id: uuidv4(),
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "555-123-4567",
    address: "123 Main St, Anytown",
    distance: 0.8, // Very close
    notificationPreference: "email"
  },
  {
    id: uuidv4(),
    name: "Maria Rodriguez",
    email: "maria@example.com",
    phone: "555-987-6543",
    address: "456 Oak Ave, Anytown",
    distance: 1.7,
    notificationPreference: "sms"
  },
  {
    id: uuidv4(),
    name: "David Lee",
    email: "david.lee@example.com",
    phone: "555-234-5678",
    address: "789 Pine St, Anytown",
    distance: 3.2,
    notificationPreference: "push"
  },
  {
    id: uuidv4(),
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "555-345-6789",
    address: "101 Maple Dr, Anytown",
    distance: 0.6, // Very close
    notificationPreference: "email"
  },
  {
    id: uuidv4(),
    name: "Michael Brown",
    email: "mbrown@example.com",
    phone: "555-456-7890",
    address: "202 Cedar Ln, Anytown",
    distance: 4.5, // Further away
    notificationPreference: "sms"
  },
  {
    id: uuidv4(),
    name: "Emma Wilson",
    email: "emma.w@example.com",
    phone: "555-567-8901",
    address: "303 Birch Rd, Anytown",
    distance: 2.3,
    notificationPreference: "email"
  },
  {
    id: uuidv4(),
    name: "James Garcia",
    email: "jgarcia@example.com",
    phone: "555-678-9012",
    address: "404 Walnut Ct, Anytown",
    distance: 6.8, // Far away
    notificationPreference: "push"
  }
];
const sampleDiscountRules: DiscountRule[] = [
  {
    id: uuidv4(),
    daysBeforeExpiry: 90, // 3 months before
    discountPercentage: 10
  },
  {
    id: uuidv4(),
    daysBeforeExpiry: 60, // 2 months before
    discountPercentage: 15
  },
  {
    id: uuidv4(),
    daysBeforeExpiry: 30, // 1 month before
    discountPercentage: 25
  },
  {
    id: uuidv4(),
    daysBeforeExpiry: 14, // 2 weeks before
    discountPercentage: 35
  },
  {
    id: uuidv4(),
    daysBeforeExpiry: 7, // 1 week before
    discountPercentage: 50
  },
  {
    id: uuidv4(),
    daysBeforeExpiry: 3, // 3 days before
    discountPercentage: 70
  },
  {
    id: uuidv4(),
    daysBeforeExpiry: 1, // 1 day before
    discountPercentage: 90
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
