
import axios from 'axios';


const API_URL = 'http://localhost:5000/api/auth/';


const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  if (response.data) {
    // 1. Save the whole object for quick access
    localStorage.setItem('user', JSON.stringify(response.data));
    // 2. ✅ SAVE THE TOKEN INDIVIDUALLY (Usually inside response.data.token)
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
    // ✅ SAVE THE TOKEN INDIVIDUALLY
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token'); // ✅ Clear token too!
};




const forgotPassword = async (email) => {

  const response = await axios.post(API_URL + 'forgot-password', { email });
  return response.data;
};

const resetPassword = async (token, password) => {
 
  const response = await axios.put(API_URL + 'reset-password/' + token, { password });
  return response.data;
};

const getMe = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) return null;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // 👈 Send token to backend
    },
  };

  const response = await axios.get(API_URL + 'me', config);
  return response.data.data;
};

const authService = {
  register,
  getMe,
  login,
  logout,
  forgotPassword,
  resetPassword
};

export default authService;