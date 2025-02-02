// context/AppContext.tsx
"use client";
import { createContext, useContext, useState } from "react";

interface UserType {
  user: any;
  id?: string;
}

interface AppContextType {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: UserType;
}) {
  const [user, setUser] = useState<UserType>(initialUser);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
