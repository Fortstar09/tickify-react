import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Keep user in localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // --- Sign Up ---
  const signup = (newUser) => {
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Check if email already exists
    const exists = users.find((u) => u.email === newUser.email);
    if (exists) {
      return { success: false, message: "User already exists" };
    }

    // Assign ID
    const id = users.length + 1;
    const userToSave = { id, ...newUser };

    users.push(userToSave);
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    return { success: true };
  };

  // --- Login ---
  const login = (credentials) => {
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const foundUser = users.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (foundUser) {
      const token = "token-" + new Date().getTime();
      localStorage.setItem("token", token);
      setUser(foundUser);
      return { success: true, user: foundUser };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  };

  // --- Logout ---
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const value = { user, signup, login, logout };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
