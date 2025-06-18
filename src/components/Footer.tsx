
import { Plane } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-surface-container-highest text-on-surface py-16 border-t border-outline-variant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 bg-gradient-to-br from-primary via-secondary to-tertiary rounded-2xl flex items-center justify-center mr-3 shadow-elevation-2">
                <Plane className="h-5 w-5 text-on-primary rotate-45" />
              </div>
              <span className="text-2xl font-bold text-on-surface title-large">AeroLearn</span>
            </div>
            <p className="text-on-surface-variant mb-6 max-w-md body-medium">
              The premier platform for aircraft engineering education, providing comprehensive learning materials organized by ATA chapters.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-on-surface-variant hover:text-primary transition-colors body-medium">Twitter</a>
              <a href="#" className="text-on-surface-variant hover:text-primary transition-colors body-medium">LinkedIn</a>
              <a href="#" className="text-on-surface-variant hover:text-primary transition-colors body-medium">GitHub</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-on-surface title-medium">Product</h4>
            <ul className="space-y-2 text-on-surface-variant">
              <li><a href="#" className="hover:text-primary transition-colors body-medium">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors body-medium">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors body-medium">ATA Chapters</a></li>
              <li><a href="#" className="hover:text-primary transition-colors body-medium">Mobile App</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-on-surface title-medium">Support</h4>
            <ul className="space-y-2 text-on-surface-variant">
              <li><a href="#" className="hover:text-primary transition-colors body-medium">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors body-medium">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors body-medium">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors body-medium">Community</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-outline-variant mt-12 pt-8 text-center">
          <p className="text-on-surface-variant body-medium">&copy; 2024 AeroLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
