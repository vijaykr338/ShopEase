
import { 
  Bell, 
  Calendar, 
  DollarSign, 
  Map, 
  PackageOpen, 
  Percent, 
  BarChart, 
  Users 
} from "lucide-react";

const features = [
  {
    icon: <PackageOpen className="h-6 w-6 text-green-600" />,
    title: "Smart Inventory Management",
    description: "Track your products with manufacturing dates, expiry dates, and stock levels in one place."
  },
  {
    icon: <Calendar className="h-6 w-6 text-green-600" />,
    title: "Expiry Date Tracking",
    description: "Automated monitoring of your inventory to identify products approaching expiration."
  },
  {
    icon: <Percent className="h-6 w-6 text-green-600" />,
    title: "Automatic Discount Rules",
    description: "Set tiered discount rules based on expiry timeline to optimize sales of aging inventory."
  },
  {
    icon: <Map className="h-6 w-6 text-green-600" />,
    title: "Local Customer Targeting",
    description: "Connect with customers within a specified radius of your shop for targeted promotions."
  },
  {
    icon: <Bell className="h-6 w-6 text-green-600" />,
    title: "Multi-Channel Notifications",
    description: "Alert customers via their preferred channels about special discounts on expiring items."
  },
  {
    icon: <BarChart className="h-6 w-6 text-green-600" />,
    title: "Analytics Dashboard",
    description: "Visualize your savings, inventory health, and discount performance in real-time."
  },
  {
    icon: <DollarSign className="h-6 w-6 text-green-600" />,
    title: "Loss Prevention",
    description: "Track the financial impact of your expiry management and quantify your savings."
  },
  {
    icon: <Users className="h-6 w-6 text-green-600" />,
    title: "Customer Base Management",
    description: "Build a loyal local customer base with targeted notifications and special offers."
  }
];

const FeatureSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">All the tools you need to maximize profits</h2>
          <p className="text-lg text-muted-foreground">
            ExpiryAlert provides everything shopkeepers need to manage inventory, 
            track expiry dates, and connect with local customers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-green-50 rounded-xl p-6 transition-all hover:shadow-md hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
