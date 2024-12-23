// utils/auth.js

export const isAuthenticated = () => {
  return !!localStorage.getItem("user_id");
};

export const getUserId = () => {
  return localStorage.getItem("user_id");
};

export const setAuthData = (userData) => {
  // Store auth data
  localStorage.setItem("user_id", userData.user_info.user_id);
  localStorage.setItem("access_token", userData.access_token);
  
  // Cache the user info for immediate access
  const userInfo = {
    fullName: userData.user_info.fullname || '',
    email: userData.user_info.email || '',
    phone: userData.user_info.mobile || userData.user_info.phone_number || '',
    preferredName: userData.user_info.preferred_name || ''
  };
  localStorage.setItem("cached_user_info", JSON.stringify(userInfo));
};

export const getCachedUserInfo = () => {
  const cached = localStorage.getItem("cached_user_info");
  return cached ? JSON.parse(cached) : null;
};
