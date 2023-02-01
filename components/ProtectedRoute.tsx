import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, status } = useSession();
  console.log('from auth wrapper', data?.user?.email)
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated" && data?.user?.email!=="aungkyawhtwe.mdy49@gmail.com") {
      router.push("/admin/signin");
    }
  }, [router, status]);
  // if (status === "unauthenticated") return null;
  return <>{children}</>;
};

export default ProtectedRoute;
