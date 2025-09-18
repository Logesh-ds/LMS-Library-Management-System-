import { Button } from "@/components/ui/button";
import openBook from "@/assets/open-book.png";
import classicBooks from "@/assets/classic-books.png";
import digitalBook from "@/assets/digital-book.png";
import modernBooks from "@/assets/modern-books.png";
import libraryPlaceholder from "@/assets/library-placeholder.svg";

export const Welcome = ({ onContinue, onLogin, onSignup }: { onContinue?: () => void; onLogin?: () => void; onSignup?: () => void }) => (
  <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-library-gold to-library-cream">
    {/* Header */}
    <header className="w-full flex items-center justify-between px-8 py-6 bg-white/80 dark:bg-gray-900/80 shadow-sm">
      <div className="flex items-center gap-3">
        <img src={openBook} alt="Library Logo" className="h-10 w-10" />
        <span className="text-2xl font-bold text-library-burgundy tracking-tight">Smart Library</span>
      </div>
      <nav className="flex gap-4 items-center">
        <a href="#home" className="text-library-burgundy hover:underline font-medium">Home</a>
        <a href="#about" className="text-library-burgundy hover:underline font-medium">About</a>
        <a href="#contact" className="text-library-burgundy hover:underline font-medium">Contact</a>
        <Button variant="ghost" onClick={onLogin}>Login</Button>
        <Button variant="outline" onClick={onSignup}>Sign Up</Button>
      </nav>
    </header>

    {/* Hero Section */}
    <section className="flex flex-col md:flex-row items-center justify-center gap-12 px-8 py-16">
      <div className="flex-1 flex flex-col items-start justify-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-library-burgundy leading-tight">
          Welcome to Your <span className="bg-gradient-library bg-clip-text text-transparent">Digital Library</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-xl">
          Discover, manage, and enjoy your library experience with a modern, secure, and user-friendly platform for everyone.
        </p>
        <div className="flex gap-4">
          <Button className="bg-gradient-library px-8 py-3 text-lg" onClick={onLogin}>Get Started</Button>
          <Button variant="outline" className="px-8 py-3 text-lg" onClick={onSignup}>Sign Up</Button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <img
          src={classicBooks}
          alt="Library Hero"
          className="w-full max-w-md rounded-xl shadow-lg"
          onError={e => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = libraryPlaceholder;
          }}
        />
      </div>
    </section>

    {/* Features Section */}
    <section className="bg-white/90 dark:bg-gray-900/90 py-12 px-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-library-burgundy mb-8">Why Choose Smart Library?</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-5xl">
        <div className="flex flex-col items-center text-center p-6 rounded-lg shadow bg-library-cream">
          <img src={digitalBook} alt="Digital Access" className="h-12 mb-4" />
          <span className="font-semibold text-lg mb-2">Digital Access</span>
          <span className="text-muted-foreground">Access your library anywhere, anytime, on any device.</span>
        </div>
        <div className="flex flex-col items-center text-center p-6 rounded-lg shadow bg-library-cream">
          <img src={modernBooks} alt="Modern UI" className="h-12 mb-4" />
          <span className="font-semibold text-lg mb-2">Modern UI</span>
          <span className="text-muted-foreground">Enjoy a clean, intuitive, and responsive interface.</span>
        </div>
        <div className="flex flex-col items-center text-center p-6 rounded-lg shadow bg-library-cream">
          <img src={openBook} alt="Role-Based Access" className="h-12 mb-4" />
          <span className="font-semibold text-lg mb-2">Role-Based Access</span>
          <span className="text-muted-foreground">Admins, librarians, students, and faculty get tailored features.</span>
        </div>
        <div className="flex flex-col items-center text-center p-6 rounded-lg shadow bg-library-cream">
          <img src={libraryPlaceholder} alt="Secure & Reliable" className="h-12 mb-4" />
          <span className="font-semibold text-lg mb-2">Secure & Reliable</span>
          <span className="text-muted-foreground">Your data is protected with best-in-class security.</span>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="w-full text-center py-6 bg-library-cream text-library-burgundy font-medium text-sm flex flex-col md:flex-row items-center justify-center gap-4">
      <span>&copy; {new Date().getFullYear()} Smart Library. All rights reserved.</span>
      <a href="#terms" className="hover:underline">Terms</a>
      <a href="#privacy" className="hover:underline">Privacy</a>
      <span className="hidden md:inline">|</span>
      <span>Contact: <a href="mailto:info@smartlibrary.com" className="hover:underline">info@smartlibrary.com</a></span>
    </footer>
  </div>
);
