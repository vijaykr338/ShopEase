
import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { format } from "date-fns";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical, Pencil, Trash2, Search, AlertTriangle } from "lucide-react";
import { Label } from "@/components/ui/label";

// Available product categories
const PRODUCT_CATEGORIES = [
  "Dairy",
  "Bakery",
  "Produce",
  "Meat",
  "Seafood",
  "Frozen",
  "Canned Goods",
  "Dry Goods",
  "Beverages",
  "Snacks",
  "Health & Beauty",
  "Household"
];

const EmptyProductForm = {
  name: "",
  category: "Dairy",
  quantityInStock: 0,
  manufacturingDate: new Date(),
  expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
  costPrice: 0,
  sellingPrice: 0,
};

const Inventory = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productForm, setProductForm] = useState(EmptyProductForm);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [activeTab, setActiveTab] = useState("all");
  // Handle form field changes
  const handleFormChange = (field: string, value: any) => {
    setProductForm({
      ...productForm,
      [field]: value
    });
  };

  const getDaysUntilExpiry = (expiryDate: Date) => {
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  


  
  const getFilteredProducts = () => {
    // First apply search and category filters
    let filtered = products.filter(product => {
      const matchesSearch = searchTerm === "" || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "" || 
        product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
    
    // Then apply tab-specific filters
    switch (activeTab) {
      case "low-stock":
        return filtered.filter(product => product.quantityInStock <= 10);
      case "expiring-soon":
        return filtered.filter(product => {
          const daysUntilExpiry = getDaysUntilExpiry(product.expiryDate);
          return daysUntilExpiry > 0 && daysUntilExpiry <= 30;
        });
      case "expired":
        return filtered.filter(product => {
          const daysUntilExpiry = getDaysUntilExpiry(product.expiryDate);
          return daysUntilExpiry <= 0;
        });
      default:
        return filtered; // "all" tab shows everything
    }
  };
  // Filter products
  const filteredProducts = getFilteredProducts();

  // Handle add product submission
  const handleAddProduct = () => {
    addProduct({
      ...productForm,
      manufacturingDate: new Date(productForm.manufacturingDate),
      expiryDate: new Date(productForm.expiryDate)
    });
    setProductForm(EmptyProductForm);
    setIsAddModalOpen(false);
  };

  // Start editing a product
  const startEditProduct = (product: Product) => {
    setProductForm({
      name: product.name,
      category: product.category,
      quantityInStock: product.quantityInStock,
      manufacturingDate: product.manufacturingDate,
      expiryDate: product.expiryDate,
      costPrice: product.costPrice,
      sellingPrice: product.sellingPrice,
    });
    setEditingProductId(product.id);
    setIsEditModalOpen(true);
  };

  // Handle edit product submission
  const handleUpdateProduct = () => {
    if (editingProductId) {
      updateProduct({
        id: editingProductId,
        ...productForm,
        manufacturingDate: new Date(productForm.manufacturingDate),
        expiryDate: new Date(productForm.expiryDate),
        discountPercentage: 0, // This will be recalculated by the context
        discountedPrice: productForm.sellingPrice // This will be recalculated by the context
      });
      setEditingProductId(null);
      setIsEditModalOpen(false);
    }
  };

  // Function to calculate days until expiry
 
  // Form component for both add and edit
  const ProductForm = ({ isEdit = false }) => (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={productForm.name}
            onChange={(e) => handleFormChange("name", e.target.value)}
            className="col-span-3"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">
            Category
          </Label>
          <Select
            value={productForm.category}
            onValueChange={(value) => handleFormChange("category", value)}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="quantity" className="text-right">
            Quantity
          </Label>
          <Input
            id="quantity"
            type="number"
            value={productForm.quantityInStock}
            onChange={(e) => handleFormChange("quantityInStock", parseInt(e.target.value) || 0)}
            className="col-span-3"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="mfgDate" className="text-right">
            Manufacturing Date
          </Label>
          <Input
            id="mfgDate"
            type="date"
            value={format(new Date(productForm.manufacturingDate), "yyyy-MM-dd")}
            onChange={(e) => handleFormChange("manufacturingDate", new Date(e.target.value))}
            className="col-span-3"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="expDate" className="text-right">
            Expiry Date
          </Label>
          <Input
            id="expDate"
            type="date"
            value={format(new Date(productForm.expiryDate), "yyyy-MM-dd")}
            onChange={(e) => handleFormChange("expiryDate", new Date(e.target.value))}
            className="col-span-3"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="costPrice" className="text-right">
            Cost Price
          </Label>
          <Input
            id="costPrice"
            type="number"
            step="0.01"
            value={productForm.costPrice}
            onChange={(e) => handleFormChange("costPrice", parseFloat(e.target.value) || 0)}
            className="col-span-3"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="sellingPrice" className="text-right">
            Selling Price
          </Label>
          <Input
            id="sellingPrice"
            type="number"
            step="0.01"
            value={productForm.sellingPrice}
            onChange={(e) => handleFormChange("sellingPrice", parseFloat(e.target.value) || 0)}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => isEdit ? setIsEditModalOpen(false) : setIsAddModalOpen(false)}
        >
          Cancel
        </Button>
        <Button onClick={isEdit ? handleUpdateProduct : handleAddProduct}>
          {isEdit ? "Update Product" : "Add Product"}
        </Button>
      </DialogFooter>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full mb-4">
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          <TabsTrigger value="expiring-soon">About to Expire</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
      </Tabs>
      
      
   {/* Filters */}
   <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {PRODUCT_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* Products Table */}
      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Reg. Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Final Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => {
                  const daysUntilExpiry = getDaysUntilExpiry(product.expiryDate);
                  
                  return (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <span
                          className={
                            product.quantityInStock <= 5
                              ? "text-red-500 font-medium"
                              : product.quantityInStock <= 10
                              ? "text-amber-500 font-medium"
                              : ""
                          }
                        >
                          {product.quantityInStock}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {daysUntilExpiry <= 30 && (
                            <AlertTriangle
                              className={`h-4 w-4 ${
                                daysUntilExpiry <= 7
                                  ? "text-red-500"
                                  : daysUntilExpiry <= 30
                                  ? "text-amber-500"
                                  : ""
                              }`}
                            />
                          )}
                          <span>
                            {format(product.expiryDate, "MMM d, yyyy")}
                            {daysUntilExpiry <= 30 && (
                              <span
                                className={`text-xs ml-2 ${
                                  daysUntilExpiry <= 7
                                    ? "text-red-500"
                                    : "text-amber-500"
                                }`}
                              >
                                ({daysUntilExpiry} days)
                              </span>
                            )}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>${product.sellingPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        {product.discountPercentage > 0 ? (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            {product.discountPercentage}% off
                          </Badge>
                        ) : (
                          <span className="text-gray-500 text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            product.discountPercentage > 0
                              ? "text-green-600 font-medium"
                              : ""
                          }
                        >
                          ${product.discountedPrice.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => startEditProduct(product)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => deleteProduct(product.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      
      {/* Add Product Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <ProductForm />
        </DialogContent>
      </Dialog>
      
      {/* Edit Product Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm isEdit />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inventory;
