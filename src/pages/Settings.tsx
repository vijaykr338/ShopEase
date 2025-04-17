
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-4 w-[400px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="discount">Discount</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>
                Update your store details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input id="storeName" defaultValue="Local Grocery" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Email</Label>
                  <Input id="storeEmail" type="email" defaultValue="contact@localgrocery.com" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Phone</Label>
                  <Input id="storePhone" defaultValue="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeHours">Business Hours</Label>
                  <Input id="storeHours" defaultValue="9:00 AM - 9:00 PM" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="storeAddress">Address</Label>
                <Input id="storeAddress" defaultValue="123 Market St, City, State 12345" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>
                Customize how information is displayed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Show expiry warnings</h3>
                  <p className="text-sm text-gray-500">
                    Highlight products that are about to expire
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Show low stock warnings</h3>
                  <p className="text-sm text-gray-500">
                    Highlight products with low inventory
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currencyFormat">Currency Format</Label>
                <Select defaultValue="usd">
                  <SelectTrigger id="currencyFormat">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="jpy">JPY (¥)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure when and how to notify customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Enable customer notifications</h3>
                  <p className="text-sm text-gray-500">
                    Send notifications about discounts to customers
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notificationRadius">Notification Radius (km)</Label>
                <div className="flex items-center gap-2">
                  <Input id="notificationRadius" type="number" defaultValue="5" />
                  <span className="text-sm">km</span>
                </div>
                <p className="text-xs text-gray-500">
                  Only notify customers within this radius of your store
                </p>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="email">
                  <AccordionTrigger>Email Notifications</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enableEmailNotifications">Enable email notifications</Label>
                      <Switch id="enableEmailNotifications" defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="emailTemplate">Email Template</Label>
                      <Select defaultValue="template1">
                        <SelectTrigger id="emailTemplate">
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="template1">Simple Discount</SelectItem>
                          <SelectItem value="template2">Detailed Product List</SelectItem>
                          <SelectItem value="template3">Weekly Deals</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="sms">
                  <AccordionTrigger>SMS Notifications</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enableSmsNotifications">Enable SMS notifications</Label>
                      <Switch id="enableSmsNotifications" defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="smsTemplate">SMS Template</Label>
                      <Select defaultValue="template1">
                        <SelectTrigger id="smsTemplate">
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="template1">Brief Message</SelectItem>
                          <SelectItem value="template2">With Store Link</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="push">
                  <AccordionTrigger>Push Notifications</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="enablePushNotifications">Enable push notifications</Label>
                      <Switch id="enablePushNotifications" defaultChecked />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Discount Settings */}
        <TabsContent value="discount" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Discount System Settings</CardTitle>
              <CardDescription>
                Configure how discounts are applied and displayed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Auto-apply discounts</h3>
                  <p className="text-sm text-gray-500">
                    Automatically apply discounts based on expiry date
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Round discounted prices</h3>
                  <p className="text-sm text-gray-500">
                    Round final prices to nearest $0.05
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="discountDisplay">Display discounts as</Label>
                <Select defaultValue="percentage">
                  <SelectTrigger id="discountDisplay">
                    <SelectValue placeholder="Select display format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (e.g., 15% off)</SelectItem>
                    <SelectItem value="amount">Amount (e.g., $1.50 off)</SelectItem>
                    <SelectItem value="both">Both (e.g., 15% off - Save $1.50)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="minDiscount">Minimum discount to apply (%)</Label>
                <Input id="minDiscount" type="number" defaultValue="5" />
                <p className="text-xs text-gray-500">
                  Only apply discounts equal or greater than this percentage
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Account Settings */}
        <TabsContent value="account" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="userName">Full Name</Label>
                  <Input id="userName" defaultValue="Store Manager" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userEmail">Email</Label>
                  <Input id="userEmail" type="email" defaultValue="manager@localgrocery.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Account</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Manage your store data and exports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2">
                <Button variant="outline">Export Inventory Data</Button>
                <Button variant="outline">Export Customer Data</Button>
                <Button variant="outline">Export Analytics Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
