
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import  AuthProvider , { useAuth } from "./contexts/AuthContext";
import { GamificationProvider } from "./contexts/GamificationContext";
import { RewardAnimation } from "./components/gamification/RewardAnimation";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateCourse from "./pages/CreateCourse";
import CourseView from "./pages/CourseView";
import Students from "./pages/Students";
import YourSite from "./pages/YourSite";
import Sales from "./pages/Sales";
import Emails from "./pages/Emails";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import YourPlan from "./pages/YourPlan";
import Support from "./pages/Support";
import Achievements from "./pages/Achievements";
import NotFound from "./pages/NotFound";
import { QuizProvider } from "./contexts/QuizContext";
import Quizzes from "./pages/Quizzes";
import QuizTake from "./pages/QuizTake";
import CreateLevels from "./pages/CreateLevels";
import ModuleDetails from "./pages/ModuleDetails";
import StudentDashboard from "./pages/StudentDashboard";
import StudentModuleDetails from "./pages/StudentModuleDetails";
import Explore from "./pages/Explore";
import CategoryView from "./pages/CategoryView"

const queryClient = new QueryClient();


function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

 
  if (loading) return <div>Loading...</div>; 

  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const { user, isAuthenticated, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" />;

 
  // if (user?.role !== 'ADMIN') {
  //   return <Navigate to="/achievements" />; 
  // }
  
  return children;
}

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Public Routes - redirect to appropriate page if already logged in */}
 
<Route 
  path="/login" 
  element={
    isAuthenticated 
      // CHANGE 'student' TO 'KID' HERE
      ? <Navigate to={user?.role === 'KID' ? '/achievements' : '/'} /> 
      : <Login />
  } 
/>
<Route 
  path="/signup" 
  element={
    isAuthenticated 
      // AND HERE
      ? <Navigate to={user?.role === 'KID' ? '/achievements' : '/'} /> 
      : <Signup />
  } 
/>
<Route 
    path="/forgot-password" 
    element={isAuthenticated ? <Navigate to="/achievements" /> : <ForgotPassword />} 
  />

  {/* The ":token" tells React that this part of the URL changes for every user */}
  <Route 
    path="/reset-password/:token" 
    element={isAuthenticated ? <Navigate to="/achievements" /> : <ResetPassword />} 
  />
      
      {/* Admin-only Routes */}
      <Route path="/" element={<AdminRoute><Dashboard /></AdminRoute>} />
      <Route path="/create-course" element={<AdminRoute><CreateCourse /></AdminRoute>} />
      <Route path="/course/:id" element={<AdminRoute><CourseView /></AdminRoute>} />
      <Route path="/students" element={<AdminRoute><Students /></AdminRoute>} />
      <Route path="/your-site" element={<AdminRoute><YourSite /></AdminRoute>} />
      <Route path="/sales" element={<AdminRoute><Sales /></AdminRoute>} />
      <Route path="/emails" element={<AdminRoute><Emails /></AdminRoute>} />
      <Route path="/settings" element={<AdminRoute><Settings /></AdminRoute>} />
      <Route path="/admin/modules/:moduleId/levels" element={<AdminRoute><CreateLevels /></AdminRoute>} />
      <Route path="/modules/:moduleId" element={<AdminRoute><ModuleDetails /></AdminRoute>} />

      
      {/* Routes accessible by all authenticated users */}
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/studentdashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
      <Route  path="/student/modules/:moduleId" element={<ProtectedRoute><StudentModuleDetails /></ProtectedRoute>} />
      <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
      <Route path="/explore/:categoryId" element={<ProtectedRoute><CategoryView /></ProtectedRoute>} />
      <Route path="/your-plan" element={<ProtectedRoute><YourPlan /></ProtectedRoute>} />
      <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
      <Route path="/achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
      <Route path="/quizzes" element={<ProtectedRoute><Quizzes /></ProtectedRoute>} />
      <Route path="/quiz/:id" element={<ProtectedRoute><QuizTake /></ProtectedRoute>} />
      
      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (

  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <QuizProvider>
        <GamificationProvider>
           <TooltipProvider>
          <Toaster />
          <Sonner />
          <RewardAnimation />
          <BrowserRouter future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
        </GamificationProvider>
      </QuizProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
