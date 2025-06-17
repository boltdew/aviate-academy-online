
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Plane, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <Plane className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">AeroLearn</span>
        </div>
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">Sign In</Button>
            </SignInButton>
            <Button asChild>
              <a href="/auth">Get Started</a>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button asChild>
              <a href="/dashboard">Dashboard</a>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Master Aircraft Engineering with{" "}
            <span className="text-blue-600">AeroLearn</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Comprehensive learning platform for aircraft engineering professionals. 
            Access structured content, interactive modules, and real-world scenarios 
            to advance your aviation expertise.
          </p>
          <div className="flex justify-center gap-4">
            <SignedOut>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <a href="/auth">
                  Start Learning Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <a href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </SignedIn>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
