
const testimonials = [
  {
    name: "Sarah Martinez",
    role: "Senior Aircraft Technician",
    company: "Boeing",
    image: "https://images.unsplash.com/photo-1494790108755-2616b9b35156?w=150&h=150&fit=crop&crop=face",
    content: "This platform has been invaluable for staying current with aircraft systems. The ATA organization makes finding specific information incredibly efficient."
  },
  {
    name: "Michael Chen",
    role: "Maintenance Engineer",
    company: "Airbus",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "The depth and quality of content is outstanding. It's like having a comprehensive technical library at your fingertips, available 24/7."
  },
  {
    name: "Emily Johnson",
    role: "Aviation Student",
    company: "Embry-Riddle",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "As a student, this has accelerated my learning tremendously. The structured approach following ATA chapters makes complex systems understandable."
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mb-4 headline-large">
            Trusted by Aviation Professionals
          </h2>
          <p className="text-xl text-on-surface-variant max-w-3xl mx-auto body-large">
            See what engineers and students are saying about their learning experience.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-surface-container rounded-3xl p-8 hover:shadow-elevation-2 transition-shadow border border-outline-variant">
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-on-surface title-medium">{testimonial.name}</div>
                  <div className="text-sm text-on-surface-variant body-small">{testimonial.role}</div>
                  <div className="text-sm text-primary font-medium label-medium">{testimonial.company}</div>
                </div>
              </div>
              
              <p className="text-on-surface-variant leading-relaxed italic body-medium">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
