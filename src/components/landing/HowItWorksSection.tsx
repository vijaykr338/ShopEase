
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Add your inventory",
    description: "Input your products with expiry dates, prices, and quantities to start tracking your inventory.",
    checks: [
      "Bulk upload support",
      "Barcode scanning",
      "Category organization",
      "Automatic sorting by expiry date"
    ]
  },
  {
    number: "02",
    title: "Set discount rules",
    description: "Configure automated discount rules based on how close products are to expiring.",
    checks: [
      "Tiered discounting",
      "Category-specific rules",
      "Seasonal adjustments",
      "Weekend/weekday differentiation"
    ]
  },
  {
    number: "03",
    title: "Build your customer base",
    description: "Add your existing customers or attract new ones who can receive notifications about deals.",
    checks: [
      "Import contacts",
      "Customer radius settings",
      "Communication preferences",
      "Customer segmentation"
    ]
  },
  {
    number: "04",
    title: "Get alerted & send notifications",
    description: "Receive alerts about expiring products and notify nearby customers about discounts.",
    checks: [
      "Automated notifications",
      "Push, email & SMS options",
      "Scheduled announcements",
      "Performance tracking"
    ]
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-green">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How ExpiryAlert works</h2>
          <p className="text-lg text-muted-foreground">
            Our simple 4-step process helps you minimize waste, maximize profits, 
            and keep your local customers coming back for more.
          </p>
        </div>
        
        <div className="space-y-12 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="md:w-1/3">
                <div className="bg-green-600 text-white text-4xl font-bold w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              <div className="md:w-2/3 bg-white rounded-xl p-6 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {step.checks.map((check, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>{check}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
