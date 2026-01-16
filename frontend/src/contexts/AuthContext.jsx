import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService'; 

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  // 1. Rename 'currentUser' to 'user' to match your Routes
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    console.log("🛠️ STEP 1: useEffect has started!"); // This should appear no matter what

    const initAuth = async () => {
      const token = localStorage.getItem('token');
      console.log("🛠️ STEP 2: Token found:", token);

      if (!token) {
        console.log("🛠️ STEP 3: No token, stopping.");
        setLoading(false);
        return;
      }

      try {
        console.log("🛠️ STEP 4: Calling getMe service...");
        const userData = await authService.getMe();
        console.log("🛠️ STEP 5: Service returned:", userData);
        
        // Use userData.data if your backend wraps it, otherwise just userData
        setUser(userData?.data || userData);
      } catch (error) {
        console.error("❌ STEP 6: ERROR during initAuth:", error);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        console.log("🛠️ STEP 7: Setting loading to false.");
        setLoading(false); 
      }
    };

    initAuth();
  }, []); 

  const signup = async (name, email, password, role) => {
    const data = await authService.register({ name, email, password, role });
    setUser(data); 
    return data;
  };

  // 2. Removed 'role' from arguments (Login is just Email + Pass)
  const login = async (email, password ,role ) => {
    const data = await authService.login({ email, password,role }); 
    setUser(data);
    return data;
  };
  
  const logout = () => {
    authService.logout();
    setUser(null);
  };


  const value = {
    user,              // <--- Matches { user } in AdminRoute
    signup,
    login,
    isAuthenticated: !!user,
    loading,           // <--- Matches { loading } in ProtectedRoute
    logout
  };
  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <p>Verifying Session... Please wait.</p>
      </div>
    );
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}