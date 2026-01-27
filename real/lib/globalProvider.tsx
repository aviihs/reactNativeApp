// import { createContext } from "react";
// import { useAppwrite } from "./useAppwrite";
// import { getCurrentUser } from "./appwrite"

// interface User{
//     $id: string;
//     name: string;
//     email: string;
//     avatar: string;
// }

// interface GlobalContextType {
//   user: User | null;
//   isLoggedIn: boolean;
//   loading: boolean;
//   refetch: (newParams?: Record<string, string | number> ) => Promise<void>
  
// }


// const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// export const GlobalProvider = ({ children }: {children: ReactNode}) => {

//     const {
//         <data:user>loading, refetch</data:user>
//     } = useAppwrite({fn, params, skip}: {
//         fn: getCurrentUser,
//     })
 
//     return(
//         <GlobalContext.Provider value={{}}>
//             {children}
//         </GlobalContext.Provider>
//     )
// }
 import React, { createContext, ReactNode } from "react";
import { useAppwrite } from "./useAppwrite";
import { getCurrentUser } from "./appwrite";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

interface GlobalContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  const isLoggedIn = !!user;

  return (
    <GlobalContext.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};