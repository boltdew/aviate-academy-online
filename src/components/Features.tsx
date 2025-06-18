
import { Book, Users, Award, Clock, Search, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Book,
    title: "2000+ Learning Modules",
    description: "Comprehensive content covering all ATA chapters from 00-99, meticulously organized for systematic learning."
  },
  {
    icon: Search,
    title: "Smart Content Discovery",
    description: "Advanced search and filtering to quickly find specific topics, regulations, or maintenance procedures."
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics and completion tracking across all chapters."
  },
  {
    icon: Clock,
    title: "Self-Paced Learning",
    description: "Learn at your own speed with 24/7 access to all materials, perfect for working professionals."
  },
  {
    icon: Award,
    title: "Industry Certified",
    description: "Content reviewed by certified aircraft engineers and aligned with industry standards and regulations."
  },
  {
    icon: Users,
    title: "Expert Community",
    description: "Connect with fellow engineers, ask questions, and share knowledge in our exclusive community."
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mb-4 headline-large">
            Everything You Need to Excel
          </h2>
          <p className="text-xl text-on-surface-variant max-w-3xl mx-auto body-large">
            Our platform combines comprehensive content with modern learning tools to accelerate your aircraft engineering expertise.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-surface-container p-8 rounded-3xl shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 group hover:-translate-y-2 border border-outline-variant">
              <div className="bg-primary-container w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-container/80 transition-colors shadow-elevation-1">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold text-on-surface mb-3 title-medium">
                {feature.title}
              </h3>
              
              <p className="text-on-surface-variant leading-relaxed body-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
