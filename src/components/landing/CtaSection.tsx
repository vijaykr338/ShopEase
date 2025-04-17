
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, ShoppingBag, Users } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-20 bg-green-600 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to stop losing money on expired products?
            </h2>
            <p className="text-lg mb-8 text-green-100">
              Join thousands of shopkeepers who have transformed their businesses, 
              reduced waste, and built stronger customer relationships with ShopEase.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-green-800 hover:bg-green-50">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
             
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-green-500 rounded-xl p-6">
              <DollarSign className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Stop the Waste</h3>
              <p className="text-green-100">
                The average shop loses $18,000 annually due to expired products.
              </p>
            </div>
            <div className="bg-green-500 rounded-xl p-6">
              <ShoppingBag className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Smart Inventory</h3>
              <p className="text-green-100">
                Track expiry dates and automate discounts to maximize profits.
              </p>
            </div>
            <div className="bg-green-500 rounded-xl p-6">
              <Users className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Local Customers</h3>
              <p className="text-green-100">
                Build a loyal customer base with targeted notifications about deals.
              </p>
            </div>
            <div className="bg-green-500 rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">14</div>
              <p className="text-green-100">
                Day free trial with no credit card required to get started.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
