import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  Globe,
  DollarSign,
  Mail,
  Settings,
  User,
  CreditCard,
  HelpCircle,
  LogOut,
  Plus,
  Trophy,
  BookOpen 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

// Student navigation items
const studentNavItems = [
  { title: "Quizzes", href: "/quizzes", icon: BookOpen },
  { title: "Achievements", href: "/achievements", icon: Trophy },
];

// Admin/Teacher navigation items
const adminNavItems = [
  { title: "Students", href: "/students", icon: Users },
  { title: "Your Site", href: "/your-site", icon: Globe },
  { title: "Sales", href: "/sales", icon: DollarSign },
  { title: "Emails", href: "/emails", icon: Mail },
  { title: "Settings", href: "/settings", icon: Settings },
];

const footerNavItems = [
  { title: "Profile", href: "/profile", icon: User },
  // { title: "Your Plan", href: "/your-plan", icon: CreditCard },
  { title: "Support", href: "/support", icon: HelpCircle },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { user, logout } = useAuth();

  const isActive = (path) =>
    currentPath === path || currentPath.startsWith(path + "/");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Determine which navigation items to show based on user role
  const mainNavItems =
    user?.role === "KID" ? studentNavItems : adminNavItems;

  return (
    <aside className="w-56 min-h-screen bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-900 to-indigo-600 flex items-center justify-center mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-300 to-pink-400" />
        </div>
        <span className="text-sm font-semibold text-foreground">My School</span>
        {user && (
          <span className="text-xs text-muted-foreground mt-1 capitalize">
            {user.role}
          </span>
        )}
      </div>

      {/* Classroom Link - Only show for admin */}
      {user?.role === "admin" && (
        <>
          <div className="px-4 mb-2">
            <Link
              to="/"
              className={cn(
                "flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors",
                isActive("/") || currentPath === "/"
                  ? "text-sidebar-accent-foreground font-semibold"
                  : "text-sidebar-foreground hover:text-sidebar-accent-foreground"
              )}
            >
              <span className="text-sm font-medium">Your Classroom</span>
              <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Plus className="w-3 h-3 text-primary-foreground" />
              </span>
            </Link>
          </div>

          <div className="px-6 mb-4">
            <div className="border-b border-border" />
          </div>
        </>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {mainNavItems.map((item) => (
            <li key={item.title}>
              <Link
                to={item.href}
                className={cn(
                  "sidebar-nav-item flex items-center gap-3",
                  isActive(item.href) && "sidebar-nav-item-active"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-6 mb-4">
        <div className="border-b border-border" />
      </div>

      {/* Footer Navigation */}
      <nav className="px-4 mb-4">
        <ul className="space-y-1">
          {footerNavItems.map((item) => (
            <li key={item.title}>
              <Link
                to={item.href}
                className={cn(
                  "sidebar-nav-item flex items-center gap-3",
                  isActive(item.href) && "sidebar-nav-item-active"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
