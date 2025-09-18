import { useState } from "react";
import studentBooks from "@/assets/backgrounds/student-books.jpg";
import facultyBooks from "@/assets/backgrounds/faculty-books.jpg";
import librarianBooks from "@/assets/backgrounds/librarian-books.jpg";
import adminLibrary from "@/assets/backgrounds/admin-library.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  BookOpen, 
  Users, 
  Calendar, 
  TrendingUp, 
  Search, 
  Plus, 
  User, 
  Settings, 
  LogOut,
  Library,
  Clock,
  AlertCircle,
  BookMarked,
  UserCheck
} from "lucide-react";
import { BookCatalog } from "./BookCatalog";
import { UserManagement } from "./UserManagement";
import { BookCompletionChart } from "./BookCompletionChart";
import { ProfilePicture } from "./ProfilePicture";
import { Profile } from "./Profile";
import { WebsiteSettings } from "./Settings";
import { IssueBook } from "./IssueBook";
import { ReturnBook } from "./ReturnBook";

interface User {
  name: string;
  email: string;
  username: string;
  phone: string;
}

interface DashboardProps {
  user: User;
  role: string;
  onLogout: () => void;
}



export const Dashboard = ({ user, role, onLogout }: DashboardProps) => {
  const getBgImage = () => {
    switch (role) {
      case "admin": return adminLibrary;
      case "librarian": return librarianBooks;
      case "faculty": return facultyBooks;
      case "student": return studentBooks;
      default: return studentBooks;
    }
  };
  const [activeView, setActiveView] = useState("overview");
  const [profile, setProfile] = useState<any>({ ...user });
  const [settings, setSettings] = useState({ darkMode: false, notifications: true, language: "en" });

  const handleApplySettings = (newSettings: any) => {
    setSettings(newSettings);
    // Optionally, apply global changes here (e.g., theme switch)
  };

  const getStats = () => {
    switch (role) {
      case "admin":
        return [
          { icon: Users, label: "Total Users", value: "2,543", color: "text-library-burgundy" },
          { icon: BookOpen, label: "Total Books", value: "45,281", color: "text-library-gold" },
          { icon: TrendingUp, label: "Active Loans", value: "1,847", color: "text-library-sage" },
          { icon: AlertCircle, label: "Overdue", value: "127", color: "text-destructive" }
        ];
      case "librarian":
        return [
          { icon: BookMarked, label: "Books Issued", value: "342", color: "text-library-burgundy" },
          { icon: Clock, label: "Due Today", value: "28", color: "text-library-gold" },
          { icon: UserCheck, label: "Returns", value: "67", color: "text-library-sage" },
          { icon: AlertCircle, label: "Overdue", value: "15", color: "text-destructive" }
        ];
      default:
        return [
          { icon: BookOpen, label: "Books Borrowed", value: "12", color: "text-library-burgundy" },
          { icon: Clock, label: "Due Soon", value: "3", color: "text-library-gold" },
          { icon: Calendar, label: "Reservations", value: "2", color: "text-library-sage" },
          { icon: AlertCircle, label: "Overdue", value: "1", color: "text-destructive" }
        ];
    }
  };

  const getMenuItems = () => {
    const common = [
      { id: "overview", label: "Dashboard", icon: Library },
      { id: "catalog", label: "Book Catalog", icon: BookOpen },
      { id: "settings", label: "Settings", icon: Settings }
    ];

    switch (role) {
      case "admin":
        return [
          ...common,
          { id: "users", label: "User Management", icon: Users },
          { id: "reports", label: "Reports", icon: TrendingUp }
        ];
      case "librarian":
        return [
          ...common,
          { id: "issue", label: "Issue Books", icon: Plus },
          { id: "returns", label: "Returns", icon: UserCheck },
          { id: "users", label: "Members", icon: Users }
        ];
      default:
        return [
          ...common,
          { id: "borrowed", label: "My Books", icon: BookMarked },
          { id: "profile", label: "Profile", icon: User }
        ];
    }
  };

  const stats = getStats();
  const menuItems = getMenuItems();

  return (
    <div
      className={`min-h-screen bg-background${settings.darkMode ? ' dark' : ''}`}
      style={{ backgroundImage: `url(${getBgImage()})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Header */}
      <header className="bg-card border-b border-library-cream shadow-elegant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-library-burgundy" />
              <h1 className="text-xl font-bold bg-gradient-library bg-clip-text text-transparent">
                Smart Library System
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-library-gold text-library-burgundy">
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Badge>
              
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile.profileImage || "/placeholder.svg"} />
                <AvatarFallback className="bg-library-cream text-library-burgundy">
                  {!profile.profileImage ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-library-burgundy mx-auto">
                      <circle cx="12" cy="8" r="4" fill="currentColor" />
                      <rect x="4" y="16" width="16" height="6" rx="3" fill="currentColor" />
                    </svg>
                  ) : (
                    user.name.split(' ').map(n => n[0]).join('')
                  )}
                </AvatarFallback>
              </Avatar>
              
              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-elegant border-library-cream">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {menuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeView === item.id ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      activeView === item.id 
                        ? "bg-gradient-library text-primary-foreground" 
                        : "hover:bg-library-cream"
                    }`}
                    onClick={() => setActiveView(item.id)}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeView === "overview" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h2>
                  <p className="text-muted-foreground">Here's what's happening in your library today.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <Card key={index} className="shadow-elegant border-library-cream">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <stat.icon className={`h-8 w-8 ${stat.color}`} />
                          <div>
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Charts and Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <BookCompletionChart role={role} />
                  
                  <Card className="shadow-elegant border-library-cream">
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Common tasks for {role}s</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4">
                        {role === "librarian" && (
                          <>
                            <Button className="h-auto py-4 bg-gradient-library" onClick={() => setActiveView("issue")}>
                              <div className="flex flex-col items-center space-y-2">
                                <Plus className="h-6 w-6" />
                                <span>Issue Book</span>
                              </div>
                            </Button>
                            <Button variant="outline" className="h-auto py-4" onClick={() => setActiveView("returns")}>
                              <div className="flex flex-col items-center space-y-2">
                                <UserCheck className="h-6 w-6" />
                                <span>Process Return</span>
                              </div>
                            </Button>
                            <Button variant="outline" className="h-auto py-4" onClick={() => setActiveView("catalog")}>
                              <div className="flex flex-col items-center space-y-2">
                                <Search className="h-6 w-6" />
                                <span>Search Books</span>
                              </div>
                            </Button>
                          </>
                        )}
                        {(role === "student" || role === "faculty") && (
                          <>
                            <Button className="h-auto py-4 bg-gradient-library" onClick={() => setActiveView("catalog")}>
                              <div className="flex flex-col items-center space-y-2">
                                <Search className="h-6 w-6" />
                                <span>Browse Books</span>
                              </div>
                            </Button>
                            <Button variant="outline" className="h-auto py-4" onClick={() => setActiveView("borrowed")}>
                              <div className="flex flex-col items-center space-y-2">
                                <BookMarked className="h-6 w-6" />
                                <span>My Books</span>
                              </div>
                            </Button>
                            <Button variant="outline" className="h-auto py-4" onClick={() => setActiveView("profile")}>
                              <div className="flex flex-col items-center space-y-2">
                                <User className="h-6 w-6" />
                                <span>My Profile</span>
                              </div>
                            </Button>
                          </>
                        )}
                        {role === "admin" && (
                          <>
                            <Button className="h-auto py-4 bg-gradient-library" onClick={() => setActiveView("users")}>
                              <div className="flex flex-col items-center space-y-2">
                                <Users className="h-6 w-6" />
                                <span>Manage Users</span>
                              </div>
                            </Button>
                            <Button variant="outline" className="h-auto py-4" onClick={() => setActiveView("reports")}>
                              <div className="flex flex-col items-center space-y-2">
                                <TrendingUp className="h-6 w-6" />
                                <span>View Reports</span>
                              </div>
                            </Button>
                            <Button variant="outline" className="h-auto py-4" onClick={() => setActiveView("settings")}>
                              <div className="flex flex-col items-center space-y-2">
                                <Settings className="h-6 w-6" />
                                <span>Settings</span>
                              </div>
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeView === "catalog" && <BookCatalog role={role} />}
            {activeView === "users" && <UserManagement role={role} />}
            {activeView === "settings" && <WebsiteSettings onApply={handleApplySettings} />}
            {activeView === "issue" && <IssueBook />}
            {activeView === "returns" && <ReturnBook />}
            {activeView === "profile" && (
              <Profile user={profile} onUpdate={u => setProfile(u)} />
            )}
            
            {activeView === "borrowed" && (
              <Card className="shadow-elegant border-library-cream">
                <CardContent className="p-8">
                  <BookOpen className="h-16 w-16 text-library-burgundy mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-4">My Books</h3>
                  <div className="mb-6">
                    <h4 className="text-lg font-bold mb-2">Borrowed Books</h4>
                    <ul className="space-y-2">
                      <li className="border-b pb-2">
                        <span className="font-semibold">The Great Gatsby</span> <span className="text-muted-foreground">by F. Scott Fitzgerald</span><br />
                        <span className="text-sm">Due: 2025-09-30</span>
                      </li>
                      <li className="border-b pb-2">
                        <span className="font-semibold">1984</span> <span className="text-muted-foreground">by George Orwell</span><br />
                        <span className="text-sm">Due: 2025-10-05</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Reserved Books</h4>
                    <ul className="space-y-2">
                      <li className="border-b pb-2">
                        <span className="font-semibold">To Kill a Mockingbird</span> <span className="text-muted-foreground">by Harper Lee</span><br />
                        <span className="text-sm">Pickup by: 2025-09-20</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
            {activeView !== "overview" && activeView !== "catalog" && activeView !== "users" && activeView !== "profile" && activeView !== "borrowed" && (
              <Card className="shadow-elegant border-library-cream">
                <CardContent className="p-8 text-center">
                  <BookOpen className="h-16 w-16 text-library-burgundy mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">{
                    menuItems.find(item => item.id === activeView)?.label
                  }</h3>
                  <p className="text-muted-foreground">
                    This feature is coming soon! For full functionality including user management, 
                    book transactions, and reporting, connect to Supabase for backend features.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};