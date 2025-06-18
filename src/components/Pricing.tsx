
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "$29",
    period: "/month",
    description: "Perfect for students and entry-level engineers",
    features: [
      "Access to 500+ basic modules",
      "ATA chapters 20-49",
      "Basic search functionality",
      "Mobile app access",
      "Email support"
    ],
    popular: false
  },
  {
    name: "Professional",
    price: "$79",
    period: "/month",
    description: "Ideal for working aircraft engineers",
    features: [
      "Access to all 2000+ modules",
      "Complete ATA chapters 00-99",
      "Advanced search & filters",
      "Progress tracking & analytics",
      "Download for offline reading",
      "Priority support",
      "Community access"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    description: "For teams and organizations",
    features: [
      "Everything in Professional",
      "Team management dashboard",
      "Custom learning paths",
      "Advanced reporting",
      "API access",
      "Dedicated account manager",
      "Custom integrations"
    ],
    popular: false
  }
];

const Pricing = () => {
  return (
    <section className="py-24 bg-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mb-4 headline-large">
            Choose Your Learning Plan
          </h2>
          <p className="text-xl text-on-surface-variant max-w-3xl mx-auto body-large">
            Start your aircraft engineering journey with flexible pricing that scales with your needs.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative bg-surface-container-high rounded-3xl shadow-elevation-2 p-8 border ${
                plan.popular ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-outline-variant'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-on-primary px-4 py-2 rounded-full text-sm font-semibold shadow-elevation-3">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-on-surface mb-2 title-large">{plan.name}</h3>
                <p className="text-on-surface-variant mb-4 body-medium">{plan.description}</p>
                
                <div className="flex items-end justify-center">
                  <span className="text-4xl font-bold text-on-surface headline-medium">{plan.price}</span>
                  <span className="text-on-surface-variant ml-1 body-medium">{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-on-surface-variant body-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full py-3 rounded-2xl shadow-elevation-2 ${
                  plan.popular 
                    ? 'bg-primary hover:bg-primary/90 text-on-primary' 
                    : 'bg-surface-container-highest hover:bg-primary hover:text-on-primary text-on-surface border border-outline'
                }`}
                size="lg"
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-on-surface-variant body-medium">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
