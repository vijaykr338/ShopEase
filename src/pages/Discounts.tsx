
import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { DiscountRule } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical, Pencil, Trash2, Calendar, Percent, AlertTriangle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Product } from "@/types";

const EmptyDiscountRuleForm = {
  daysBeforeExpiry: 30,
  discountPercentage: 15
};

const Discounts = () => {
  const { discountRules, products, addDiscountRule, updateDiscountRule, deleteDiscountRule, applyDiscountRules } = useStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [discountForm, setDiscountForm] = useState(EmptyDiscountRuleForm);
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);

  // Handle form field changes
  const handleFormChange = (field: string, value: any) => {
    setDiscountForm({
      ...discountForm,
      [field]: value
    });
  };

  // Handle add rule submission
  const handleAddRule = () => {
    addDiscountRule(discountForm);
    setDiscountForm(EmptyDiscountRuleForm);
    setIsAddModalOpen(false);
  };

  // Start editing a rule
  const startEditRule = (rule: DiscountRule) => {
    setDiscountForm({
      daysBeforeExpiry: rule.daysBeforeExpiry,
      discountPercentage: rule.discountPercentage
    });
    setEditingRuleId(rule.id);
    setIsEditModalOpen(true);
  };

  // Handle edit rule submission
  const handleUpdateRule = () => {
    if (editingRuleId) {
      updateDiscountRule({
        id: editingRuleId,
        ...discountForm
      });
      setEditingRuleId(null);
      setIsEditModalOpen(false);
    }
  };

  // Calculate discount impact stats
  const calculateDiscountedProducts = () => {
    const discountedProducts = products.filter(product => product.discountPercentage > 0);
    const totalDiscountValue = discountedProducts.reduce((acc, product) => 
      acc + ((product.sellingPrice - product.discountedPrice) * product.quantityInStock), 0);
      
    return {
      count: discountedProducts.length,
      percentage: products.length > 0 ? (discountedProducts.length / products.length) * 100 : 0,
      value: totalDiscountValue
    };
  };
  
  const discountStats = calculateDiscountedProducts();
  
  // Create examples of how the rules apply
  const getExampleProducts = (): Array<{ product: Product; rule: DiscountRule | null }> => {
    // Theoretical product expiry cases
    const today = new Date();
    
    // Create sample products for demonstration
    const sampleProducts: Array<{ product: Product; rule: DiscountRule | null }> = [];
    
    // Add examples for each rule + one with no discount
    const examples = [
      { name: "Product expiring in 100+ days", days: 120 },
      ...discountRules.map(rule => ({ 
        name: `Product expiring in ${rule.daysBeforeExpiry} days`, 
        days: rule.daysBeforeExpiry 
      }))
    ];
    
    examples.forEach(example => {
      const expiryDate = new Date();
      expiryDate.setDate(today.getDate() + example.days);
      
      // Find applicable rule
      const applicableRules = discountRules
        .filter(rule => example.days <= rule.daysBeforeExpiry)
        .sort((a, b) => b.discountPercentage - a.discountPercentage);
      
      const rule = applicableRules.length > 0 ? applicableRules[0] : null;
      const basePrice = 10.00;
      const discountPercentage = rule?.discountPercentage || 0;
      const discountedPrice = basePrice * (1 - discountPercentage / 100);
      
      sampleProducts.push({
        product: {
          id: `example-${example.days}`,
          name: example.name,
          category: "Example",
          quantityInStock: 10,
          manufacturingDate: today,
          expiryDate: expiryDate,
          costPrice: 5.00,
          sellingPrice: basePrice,
          discountPercentage: discountPercentage,
          discountedPrice: Number(discountedPrice.toFixed(2))
        },
        rule
      });
    });
    
    return sampleProducts;
  };
  
  const exampleProducts = getExampleProducts();

  // Discount rule form component for both add and edit
  const DiscountRuleForm = ({ isEdit = false }) => (
    <>
      <div className="grid gap-6 py-4">
        <div className="space-y-2">
          <Label>
            Days Before Expiry: {discountForm.daysBeforeExpiry}
          </Label>
          <Slider
            defaultValue={[discountForm.daysBeforeExpiry]}
            min={1}
            max={180}
            step={1}
            onValueChange={(value) => handleFormChange("daysBeforeExpiry", value[0])}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1 day</span>
            <span>90 days</span>
            <span>180 days</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>
            Discount Percentage: {discountForm.discountPercentage}%
          </Label>
          <Slider
            defaultValue={[discountForm.discountPercentage]}
            min={5}
            max={90}
            step={5}
            onValueChange={(value) => handleFormChange("discountPercentage", value[0])}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>5%</span>
            <span>50%</span>
            <span>90%</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="text-sm font-medium">Rule Summary</p>
          <p className="text-sm text-gray-500">
            When a product is <strong>{discountForm.daysBeforeExpiry} days or less</strong> from 
            expiry, it will receive a <strong>{discountForm.discountPercentage}% discount</strong>.
          </p>
        </div>
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => isEdit ? setIsEditModalOpen(false) : setIsAddModalOpen(false)}
        >
          Cancel
        </Button>
        <Button onClick={isEdit ? handleUpdateRule : handleAddRule}>
          {isEdit ? "Update Rule" : "Add Rule"}
        </Button>
      </DialogFooter>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Discount Rules</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Rule
        </Button>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Discounted Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{discountStats.count}</div>
            <p className="text-xs text-gray-500">
              {discountStats.percentage.toFixed(1)}% of inventory
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Potential Loss Prevented
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${discountStats.value.toFixed(2)}</div>
            <p className="text-xs text-gray-500">
              Total discount value
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Rules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{discountRules.length}</div>
            <p className="text-xs text-gray-500">
              Auto-applied to inventory
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Rules Table */}
      <Card>
        <CardHeader>
          <CardTitle>Discount Rules</CardTitle>
          <CardDescription>
            Rules are applied in order of highest discount first when multiple rules apply
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Days Before Expiry</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Products Affected</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {discountRules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                      No discount rules defined
                    </TableCell>
                  </TableRow>
                ) : (
                  discountRules
                    .sort((a, b) => b.discountPercentage - a.discountPercentage) // Show highest discount first
                    .map((rule) => {
                      // Count products affected by this specific rule
                      const affectedProducts = products.filter(product => {
                        const daysToExpiry = Math.floor(
                          (product.expiryDate.getTime() - new Date().getTime()) / 
                          (1000 * 60 * 60 * 24)
                        );
                        
                        // This product is affected by this rule if:
                        // 1. It's within the day threshold
                        // 2. This rule provides the highest applicable discount
                        if (daysToExpiry > rule.daysBeforeExpiry) return false;
                        
                        // Find all applicable rules for this product
                        const applicableRules = discountRules
                          .filter(r => daysToExpiry <= r.daysBeforeExpiry)
                          .sort((a, b) => b.discountPercentage - a.discountPercentage);
                        
                        // This rule affects the product if it's the highest discount rule
                        return applicableRules[0]?.id === rule.id;
                      });
                      
                      return (
                        <TableRow key={rule.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                              <span>{rule.daysBeforeExpiry} days or less</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              <Percent className="mr-1 h-3 w-3" />
                              {rule.discountPercentage}% off
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span>
                              {affectedProducts.length} product{affectedProducts.length !== 1 ? 's' : ''}
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
                                <DropdownMenuItem onClick={() => startEditRule(rule)}>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => deleteDiscountRule(rule.id)}
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
        </CardContent>
      </Card>
      
      {/* Examples */}
      <Card>
        <CardHeader>
          <CardTitle>How Rules Apply</CardTitle>
          <CardDescription>
            See example products and how discount rules apply to them
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Example Product</TableHead>
                  <TableHead>Days to Expiry</TableHead>
                  <TableHead>Applied Rule</TableHead>
                  <TableHead>Original Price</TableHead>
                  <TableHead>Discounted Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exampleProducts.map((example) => {
                  const daysToExpiry = Math.floor(
                    (example.product.expiryDate.getTime() - new Date().getTime()) / 
                    (1000 * 60 * 60 * 24)
                  );
                  
                  return (
                    <TableRow key={example.product.id}>
                      <TableCell>
                        <span className="font-medium">
                          {example.product.name}
                        </span>
                      </TableCell>
                      <TableCell>
                        {daysToExpiry} days
                      </TableCell>
                      <TableCell>
                        {example.rule ? (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            {example.rule.discountPercentage}% off
                          </Badge>
                        ) : (
                          <span className="text-gray-500 text-sm">No discount</span>
                        )}
                      </TableCell>
                      <TableCell>
                        ${example.product.sellingPrice.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <span className={example.rule ? "text-green-600 font-medium" : ""}>
                          ${example.product.discountedPrice.toFixed(2)}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Add Rule Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Discount Rule</DialogTitle>
          </DialogHeader>
          <DiscountRuleForm />
        </DialogContent>
      </Dialog>
      
      {/* Edit Rule Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Discount Rule</DialogTitle>
          </DialogHeader>
          <DiscountRuleForm isEdit />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Discounts;
