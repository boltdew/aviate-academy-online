
const ataChapters = [
  { code: "05", title: "Time Limits/Maintenance Checks", popular: true },
  { code: "21", title: "Air Conditioning", popular: false },
  { code: "24", title: "Electrical Power", popular: true },
  { code: "27", title: "Flight Controls", popular: true },
  { code: "28", title: "Fuel", popular: false },
  { code: "29", title: "Hydraulic Power", popular: true },
  { code: "32", title: "Landing Gear", popular: true },
  { code: "34", title: "Navigation", popular: false },
  { code: "36", title: "Pneumatic", popular: false },
  { code: "49", title: "Airborne Auxiliary Power", popular: false },
  { code: "70", title: "Standard Practices - Engines", popular: true },
  { code: "71", title: "Power Plant", popular: true },
];

const ATAChapters = () => {
  return (
    <section className="py-24 bg-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-on-surface mb-4 headline-large">
            Organized by ATA Chapters
          </h2>
          <p className="text-xl text-on-surface-variant max-w-3xl mx-auto body-large">
            Content systematically organized following the Air Transport Association specification for aircraft maintenance documentation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {ataChapters.map((chapter, index) => (
            <div 
              key={index} 
              className="relative bg-gradient-to-r from-primary-container to-secondary-container text-on-primary-container p-6 rounded-3xl hover:shadow-elevation-3 transition-all duration-300 group hover:scale-105 cursor-pointer border border-outline-variant"
            >
              {chapter.popular && (
                <div className="absolute -top-2 -right-2 bg-error text-on-error text-xs px-2 py-1 rounded-full font-semibold shadow-elevation-2">
                  Popular
                </div>
              )}
              
              <div className="text-2xl font-bold text-primary mb-2 title-large">
                ATA {chapter.code}
              </div>
              
              <div className="text-sm font-medium body-medium">
                {chapter.title}
              </div>
              
              <div className="mt-4 text-xs text-on-surface-variant body-small">
                Click to explore →
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-on-surface-variant mb-6 body-large">
            And many more chapters covering the complete aircraft systems spectrum
          </p>
          <button className="text-primary hover:text-primary/80 font-semibold text-lg hover:underline title-medium">
            View All ATA Chapters →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ATAChapters;
