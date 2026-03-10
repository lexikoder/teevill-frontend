"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { APP_CONSTANTS } from "@/constant/app";
import { getLocalStorageItem, getLocalStorageString, removeLocalStorageItem } from "@/utils/localStorage";

export function useAuthGuard(isPublic = false) {
  const router = useRouter();

  useEffect(() => {
    const token = getLocalStorageString(APP_CONSTANTS.token);
    const user = getLocalStorageItem(APP_CONSTANTS.user);

    // Remove invalid/expired token
    if (token && !user) {
      removeLocalStorageItem(APP_CONSTANTS.token);
      removeLocalStorageItem(APP_CONSTANTS.user);
      console.log("Removed invalid token from localStorage");
    }

    const redirectMap = {
      freelancer: "/freelancer/dashboard",
      client: "/client/dashboard",
      admin: "/admin/dashboard",
    };

    // If user is logged in and on a public page, redirect
    if (token && user && isPublic) {
      router.replace(redirectMap[user?.user?.accountType] || "/");
    }

    // If user is not logged in and on a private page, redirect
    if (!token && !isPublic) {
      router.replace("/login");
    }
  }, [router, isPublic]);
}
