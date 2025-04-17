
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Grocery Store Owner",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120",
    quote: "ExpiryAlert has saved my small grocery store over $10,000 in the first year. The automatic discount system has turned what used to be waste into profit!",
    stars: 5
  },
  {
    name: "Michael Rodriguez",
    role: "Pharmacy Manager",
    image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&q=80&w=120&h=120",
    quote: "The expiry date tracking is perfect for our pharmacy. We've reduced waste by 78% and our local customers love getting notifications about discounted items.",
    stars: 5
  },
  {
    name: "Priya Patel",
    role: "Convenience Store Owner",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=120&h=120",
    quote: "I used to lose at least $500 a month to expired products. Now that's down to almost zero, and I've built a loyal customer base who check our deals first.",
    stars: 5
  }
];

const TestimonialSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-gradient-green">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by shop owners everywhere</h2>
          <p className="text-lg text-muted-foreground">
            Hear from shopkeepers who have transformed their businesses with ExpiryAlert.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-md"
            >
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover" 
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
