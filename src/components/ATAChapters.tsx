
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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Organized by ATA Chapters
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Content systematically organized following the Air Transport Association specification for aircraft maintenance documentation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {ataChapters.map((chapter, index) => (
            <div 
              key={index} 
              className="relative bg-gradient-to-r from-slate-900 to-blue-900 text-white p-6 rounded-xl hover:shadow-xl transition-all duration-300 group hover:scale-105 cursor-pointer"
            >
              {chapter.popular && (
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  Popular
                </div>
              )}
              
              <div className="text-2xl font-bold text-blue-400 mb-2">
                ATA {chapter.code}
              </div>
              
              <div className="text-sm font-medium">
                {chapter.title}
              </div>
              
              <div className="mt-4 text-xs text-slate-300">
                Click to explore →
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-slate-600 mb-6">
            And many more chapters covering the complete aircraft systems spectrum
          </p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold text-lg hover:underline">
            View All ATA Chapters →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ATAChapters;
