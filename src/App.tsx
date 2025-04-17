
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import Discounts from "./pages/Discounts";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Index from "./pages/Index";
import PageLayout from "./components/layout/PageLayout";
import { StoreProvider } from "./context/StoreContext";

import "./pages/index.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <StoreProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          {/* <Route 
              path="/" 
              element={
                <PageLayout>
                  <Dashboard />
                </PageLayout>
              } 
            /> */}
            <Route 
              path="/dashboard" 
              element={
                <PageLayout>
                  <Dashboard />
                </PageLayout>
              } 
            />
            <Route 
              path="/inventory" 
              element={
                <PageLayout>
                  <Inventory />
                </PageLayout>
              } 
            />
            <Route 
              path="/customers" 
              element={
                <PageLayout>
                  <Customers />
                </PageLayout>
              } 
            />
            <Route 
              path="/discounts" 
              element={
                <PageLayout>
                  <Discounts />
                </PageLayout>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <PageLayout>
                  <Analytics />
                </PageLayout>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <PageLayout>
                  <Settings />
                </PageLayout>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </StoreProvider>
  </QueryClientProvider>
);

export default App;
