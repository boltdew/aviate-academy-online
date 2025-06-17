
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
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Choose Your Learning Plan
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Start your aircraft engineering journey with flexible pricing that scales with your needs.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                plan.popular ? 'ring-2 ring-blue-600 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-600 mb-4">{plan.description}</p>
                
                <div className="flex items-end justify-center">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-600 ml-1">{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full py-3 ${
                  plan.popular 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                }`}
                size="lg"
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-slate-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
