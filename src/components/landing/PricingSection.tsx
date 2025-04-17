
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for small shops with limited inventory",
    features: [
      "Up to 500 products",
      "Expiry date tracking",
      "Basic discount rules",
      "Email notifications",
      "Basic analytics"
    ],
    popular: false,
    buttonText: "Start Free Trial"
  },
  {
    name: "Business",
    price: "$79",
    description: "Ideal for medium-sized businesses with multiple product categories",
    features: [
      "Up to 2,000 products",
      "Advanced discount rules",
      "Customer radius targeting",
      "Email & SMS notifications",
      "Detailed analytics dashboard",
      "API access",
      "Priority support"
    ],
    popular: true,
    buttonText: "Start Free Trial"
  },
  {
    name: "Enterprise",
    price: "$179",
    description: "For large retailers with complex inventory needs",
    features: [
      "Unlimited products",
      "Custom discount algorithms",
      "Multiple store locations",
      "All notification channels",
      "Advanced analytics & reporting",
      "Dedicated account manager",
      "Custom integrations",
      "24/7 support"
    ],
    popular: false,
    buttonText: "Contact Sales"
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your business needs. All plans include a 14-day free trial.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-xl p-8 border ${
                plan.popular 
                  ? "border-green-500 shadow-lg relative" 
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${
                  plan.popular 
                    ? "bg-green-600 hover:bg-green-700" 
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 text-sm text-muted-foreground">
          All plans include a 14-day free trial. No credit card required.
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
