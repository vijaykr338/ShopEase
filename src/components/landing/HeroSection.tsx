import { Button } from "@/components/ui/button";
import { ArrowRight, BellRing, DollarSign, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 overflow-hidden bg-gradient-green">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center gap-12">
          <div className="flex-1 space-y-6 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Stop losing money on <span className="text-gradient">expired products</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              ShopEase helps shopkeepers prevent losses by tracking expiry dates, 
              automating discounts, and notifying nearby customers about deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                
                <Link to="/dashboard">Get Started</Link>
                
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-green-600 text-green-600">
                See How It Works
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm pt-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-green-200 border-2 border-white flex items-center justify-center text-xs font-medium text-green-700">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground">
                Trusted by <span className="font-medium text-foreground">2,000+</span> shop owners
              </p>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative bg-white rounded-xl shadow-xl p-6 max-w-md mx-auto animate-fade-in">
              <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Analytics Dashboard
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b">
                  <h3 className="font-bold text-lg">Monthly Summary</h3>
                  <span className="text-sm text-green-600">April 2025</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-sm">Savings</span>
                    </div>
                    <p className="text-2xl font-bold">$1,248</p>
                    <p className="text-xs text-green-600">+18% from last month</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <BellRing className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-sm">Alerts</span>
                    </div>
                    <p className="text-2xl font-bold">36</p>
                    <p className="text-xs text-green-600">12 acted upon</p>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ShoppingBag className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-sm">Items Nearing Expiry</span>
                  </div>
                  <div className="space-y-2 mt-2">
                    {["Milk (5 days)", "Yogurt (7 days)", "Bread (3 days)"].map((item, i) => (
                      <div key={i} className="flex justify-between items-center p-2 bg-white rounded border border-green-100">
                        <span>{item}</span>
                        <Button size="sm" variant="ghost" className="text-green-600 h-7 text-xs">Set Discount</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-green-500 animate-pulse-gentle"></div>
            <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-green-200 animate-pulse-gentle"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
