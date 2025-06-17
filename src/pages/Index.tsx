
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ATAChapters from "@/components/ATAChapters";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <ATAChapters />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
