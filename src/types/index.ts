
// Product Types
export interface Product {
  id: string;
  name: string;
  category: string;
  quantityInStock: number;
  manufacturingDate: Date;
  expiryDate: Date;
  costPrice: number;
  sellingPrice: number;
  discountPercentage: number;
  discountedPrice: number;
}

// Customer Types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  distance: number; // in km
  notificationPreference: 'email' | 'sms' | 'push';
}

// Discount Rule Types
export interface DiscountRule {
  id: string;
  daysBeforeExpiry: number;
  discountPercentage: number;
}

// Dashboard Stats
export interface DashboardStats {
  lowStockItems: number;
  expiringItems: number;
  totalProducts: number;
  totalCustomers: number;
  lossPrevented: number;
}
