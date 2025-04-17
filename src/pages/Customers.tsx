
import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { Customer } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
import { Plus, MoreVertical, Pencil, Trash2, Search, Mail, MessageSquare, Bell } from "lucide-react";
import { Label } from "@/components/ui/label";

const EmptyCustomerForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  distance: 0,
  notificationPreference: "email" as "email" | "sms" | "push"
};

const Customers = () => {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [customerForm, setCustomerForm] = useState(EmptyCustomerForm);
  const [editingCustomerId, setEditingCustomerId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationFilter, setNotificationFilter] = useState<string>("all");

  // Handle form field changes
  const handleFormChange = (field: string, value: any) => {
    setCustomerForm({
      ...customerForm,
      [field]: value
    });
  };

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = searchTerm === "" || 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    const matchesNotification = notificationFilter === "" || 
      customer.notificationPreference === notificationFilter;
    return matchesSearch && matchesNotification;
  });

  // Handle add customer submission
  const handleAddCustomer = () => {
    addCustomer(customerForm);
    setCustomerForm(EmptyCustomerForm);
    setIsAddModalOpen(false);
  };

  // Start editing a customer
  const startEditCustomer = (customer: Customer) => {
    setCustomerForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      distance: customer.distance,
      notificationPreference: customer.notificationPreference
    });
    setEditingCustomerId(customer.id);
    setIsEditModalOpen(true);
  };

  // Handle edit customer submission
  const handleUpdateCustomer = () => {
    if (editingCustomerId) {
      updateCustomer({
        id: editingCustomerId,
        ...customerForm
      });
      setEditingCustomerId(null);
      setIsEditModalOpen(false);
    }
  };
  
  // Get notification icon based on preference
  const getNotificationIcon = (preference: Customer["notificationPreference"]) => {
    switch (preference) {
      case "email":
        return <Mail className="h-4 w-4 text-blue-500" />;
      case "sms":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      case "push":
        return <Bell className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  // Customer form component for both add and edit
  const CustomerForm = ({ isEdit = false }) => (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={customerForm.name}
            onChange={(e) => handleFormChange("name", e.target.value)}
            className="col-span-3"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={customerForm.email}
            onChange={(e) => handleFormChange("email", e.target.value)}
            className="col-span-3"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Phone
          </Label>
          <Input
            id="phone"
            value={customerForm.phone}
            onChange={(e) => handleFormChange("phone", e.target.value)}
            className="col-span-3"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="address" className="text-right">
            Address
          </Label>
          <Input
            id="address"
            value={customerForm.address}
            onChange={(e) => handleFormChange("address", e.target.value)}
            className="col-span-3"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="distance" className="text-right">
            Distance (km)
          </Label>
          <Input
            id="distance"
            type="number"
            step="0.1"
            value={customerForm.distance}
            onChange={(e) => handleFormChange("distance", parseFloat(e.target.value) || 0)}
            className="col-span-3"
          />
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="notificationPreference" className="text-right">
            Notification
          </Label>
          <Select
            value={customerForm.notificationPreference}
            onValueChange={(value: "email" | "sms" | "push") => 
              handleFormChange("notificationPreference", value)
            }
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Notification preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
              <SelectItem value="push">Push</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => isEdit ? setIsEditModalOpen(false) : setIsAddModalOpen(false)}
        >
          Cancel
        </Button>
        <Button onClick={isEdit ? handleUpdateCustomer : handleAddCustomer}>
          {isEdit ? "Update Customer" : "Add Customer"}
        </Button>
      </DialogFooter>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Customer
        </Button>
      </div>
      
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={notificationFilter} onValueChange={setNotificationFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Notifications" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Preferences</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="push">Push</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* Customers Table */}
      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Notification</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                    No customers found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="font-medium">{customer.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{customer.email}</div>
                        <div className="text-gray-500">{customer.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {customer.address}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={customer.distance <= 5 ? "bg-green-50 text-green-700 border-green-200" : ""}
                      >
                        {customer.distance} km
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getNotificationIcon(customer.notificationPreference)}
                        <span className="capitalize">{customer.notificationPreference}</span>
                      </div>
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
                          <DropdownMenuItem onClick={() => startEditCustomer(customer)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => deleteCustomer(customer.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
      
      {/* Add Customer Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
          </DialogHeader>
          <CustomerForm />
        </DialogContent>
      </Dialog>
      
      {/* Edit Customer Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>
          <CustomerForm isEdit />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;
