import { Button } from "@/components/ui/button";

export const Landing = ({ onLogin, onSignup }: { onLogin: () => void; onSignup: () => void }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-library-gold to-library-cream">
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-library-burgundy">Welcome to Smart Library</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center">
        Manage your books, members, and library activities with ease. Please log in or sign up to continue.
      </p>
      <div className="flex gap-4 w-full">
        <Button className="bg-gradient-library w-1/2" onClick={onLogin}>Log In</Button>
        <Button variant="outline" className="w-1/2" onClick={onSignup}>Sign Up</Button>
      </div>
    </div>
  </div>
);
