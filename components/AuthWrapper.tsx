import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";
const authRoutes = ["/products", "/product-categories"];
const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const {status } = useSession();
  const router = useRouter();
  if (status === "loading") return null;

  // if(data?.user?.email==="aungkyawhtwe.mdy49@gmail.com"){
    
  // }
    return (
      <>
        {authRoutes.includes(router.pathname) ? (
          <ProtectedRoute>{children}</ProtectedRoute>
        ) : (
          children
        )}
      </>
    );
  
};

export default AuthWrapper;