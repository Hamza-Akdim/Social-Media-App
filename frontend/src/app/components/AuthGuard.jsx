"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/authContext";

const AuthGuard = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { userId } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!userId) {
        router.push("/signin");
      }
    }, [userId, router]);

    return userId ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default AuthGuard;
