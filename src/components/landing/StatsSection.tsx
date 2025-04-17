
import { 
  TrendingUp, 
  Users, 
  Bell,
  ShieldCheck
} from "lucide-react";

const stats = [
  {
    icon: <TrendingUp className="h-8 w-8 text-green-600" />,
    value: "$1,524",
    label: "Average Monthly Savings",
    description: "per shop using our platform"
  },
  {
    icon: <Users className="h-8 w-8 text-green-600" />,
    value: "70%",
    label: "Increase in Customer Return Rate",
    description: "through targeted notifications"
  },
  {
    icon: <Bell className="h-8 w-8 text-green-600" />,
    value: "93%",
    label: "Notification Open Rate",
    description: "from local customers"
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-green-600" />,
    value: "15x",
    label: "Return on Investment",
    description: "average for our business users"
  }
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Real results for real businesses</h2>
          <p className="text-lg text-muted-foreground">
            Our platform is helping thousands of shopkeepers save money 
            and build stronger customer relationships.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</h3>
              <p className="font-medium mb-1">{stat.label}</p>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
