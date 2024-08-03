import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// Define the User interface
interface User {
  userId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  addresses: any[];
  isEmailVerified: boolean;
  email: string;
  token: string;
}

export interface UserContextType {
  user: User | null;
  setLogin: (userData: User) => void;
  setLogout: () => void;
  setVerify: () => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('f3_user_data');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('f3_user_data', JSON.stringify(user));
    } else {
      localStorage.removeItem('f3_user_data');
    }
  }, [user]);

  const setLogin = (userData: User) => {
    setUser(userData);
  };

  const setLogout = () => {
    setUser(null);
  };

  const setVerify = () => {
    return !!user;
  };

  return (
    <UserContext.Provider value={{ user, setLogin, setLogout, setVerify }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
