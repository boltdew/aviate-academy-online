
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Plane, ArrowRight, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const Hero = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-container/20 to-secondary-container/20 dark:from-primary-container/10 dark:to-secondary-container/10">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 bg-surface-container/80 backdrop-blur-sm border-b border-outline-variant">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 bg-gradient-to-br from-primary via-secondary to-tertiary rounded-2xl flex items-center justify-center shadow-elevation-2">
            <Plane className="h-5 w-5 text-on-primary rotate-45" />
          </div>
          <span className="text-xl font-bold text-on-surface headline-small">AeroLearn</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-2xl border-outline bg-surface-container-high hover:bg-surface-container-highest"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" className="rounded-2xl border-outline bg-surface-container hover:bg-surface-container-high">
                Sign In
              </Button>
            </SignInButton>
            <Button asChild className="bg-primary text-on-primary hover:bg-primary/90 rounded-2xl shadow-elevation-2">
              <a href="/auth">Get Started</a>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button asChild className="bg-primary text-on-primary hover:bg-primary/90 rounded-2xl shadow-elevation-2">
              <a href="/dashboard">Dashboard</a>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-on-surface mb-6 headline-large">
            Master Aircraft Engineering with{" "}
            <span className="text-primary">AeroLearn</span>
          </h1>
          <p className="text-xl text-on-surface-variant mb-8 max-w-3xl mx-auto body-large">
            Comprehensive learning platform for aircraft engineering professionals. 
            Access structured content, interactive modules, and real-world scenarios 
            to advance your aviation expertise.
          </p>
          <div className="flex justify-center gap-4">
            <SignedOut>
              <Button size="lg" className="bg-primary text-on-primary hover:bg-primary/90 rounded-2xl shadow-elevation-3" asChild>
                <a href="/auth">
                  Start Learning Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button size="lg" className="bg-primary text-on-primary hover:bg-primary/90 rounded-2xl shadow-elevation-3" asChild>
                <a href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </SignedIn>
            <Button size="lg" variant="outline" className="rounded-2xl border-outline bg-surface-container hover:bg-surface-container-high">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
