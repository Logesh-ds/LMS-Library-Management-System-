import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Mail, Phone, User, Lock, Send, ArrowLeft } from "lucide-react";
import { FloatingBooks } from "./FloatingBooks";

interface LibraryAuthProps {
  onLogin: (role: string, user: any) => void;
  mode?: "login" | "signup";
  onBack?: () => void;
  onSignupNavigate?: () => void;
}

export const LibraryAuth = ({ onLogin, mode = "login", onBack }: LibraryAuthProps) => {
  const [authMethod, setAuthMethod] = useState<"email" | "username">("email");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [generatedOtp, setGeneratedOtp] = useState<string>("");
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    role: "student",
    academicYear: ""
  });


  const handleLogin = () => {
    // In a real app, this would validate against a database
    if ((authMethod === "email" && formData.email && formData.password) ||
        (authMethod === "username" && formData.username && formData.password)) {
      // Create a user object
      const user = {
        name: `${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} User`,
        email: formData.email || `${formData.username}@library.com`,
        username: formData.username || formData.email.split('@')[0]
      };
      onLogin(formData.role, user);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleSignup = () => {
    alert("Account created successfully! You can now login with your credentials.");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      <FloatingBooks />
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-library-cream text-library-burgundy shadow-book hover:bg-library-gold transition-all duration-200 z-10"
          aria-label="Go back to previous page"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-semibold">Back</span>
        </button>
      )}
      <Card className="w-full max-w-md shadow-book bg-card/95 backdrop-blur-sm border-library-cream">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-12 w-12 text-library-burgundy" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-library bg-clip-text text-transparent">
            Smart Library System
          </CardTitle>
          <CardDescription>Access your digital library account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue={mode} value={mode} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-library-cream">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="space-y-4 mt-6">
              {/* Auth Method Selection */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-library-cream rounded-lg">
                <Button
                  variant={authMethod === "email" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => { setAuthMethod("email"); }}
                  className="h-8 text-xs"
                >
                  <Mail className="h-3 w-3 mr-1" />
                  Email
                </Button>
                <Button
                  variant={authMethod === "username" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => { setAuthMethod("username"); }}
                  className="h-8 text-xs"
                >
                  <User className="h-3 w-3 mr-1" />
                  Username
                </Button>
              </div>
              <div className="text-center mt-2">
                <span className="text-sm">Don't have an account?</span>
                <Button variant="link" className="text-library-burgundy font-semibold px-2" onClick={() => { if (typeof onSignupNavigate === 'function') onSignupNavigate(); }}>
                  Sign Up
                </Button>
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">Login as</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value, academicYear: value === 'student' ? formData.academicYear : ''})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                    <SelectItem value="librarian">Librarian</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Academic Year Selection for Students */}
              {formData.role === "student" && (
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Academic Year</Label>
                  <Select value={formData.academicYear || ""} onValueChange={value => setFormData({...formData, academicYear: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st">1st Year</SelectItem>
                      <SelectItem value="2nd">2nd Year</SelectItem>
                      <SelectItem value="3rd">3rd Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Login Fields */}

              {authMethod !== "phone" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>{authMethod === "email" ? "Email" : "Username"}</Label>
                    <div className="relative">
                      {authMethod === "email" ? (
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      ) : (
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      )}
                      <Input
                        type={authMethod === "email" ? "email" : "text"}
                        placeholder={authMethod === "email" ? "Enter your email" : "Enter your username"}
                        value={authMethod === "email" ? formData.email : formData.username}
                        onChange={(e) => setFormData({
                          ...formData, 
                          [authMethod]: e.target.value
                        })}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleLogin} 
                    className="w-full bg-gradient-library"
                    disabled={!((authMethod === "email" && formData.email && formData.password) ||
                               (authMethod === "username" && formData.username && formData.password))}
                  >
                    Sign In
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4 mt-6">
              <div className="space-y-4">
                <Input placeholder="Full Name" />
                <Input type="email" placeholder="Email Address" />
                <Input placeholder="Username" />
                {/* Removed phone number field */}
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="password" placeholder="Create Password" />
                <Input type="password" placeholder="Confirm Password" />
                <Button onClick={handleSignup} className="w-full bg-gradient-library">
                  Create Account
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};