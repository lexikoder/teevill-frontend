"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";

export default function ClientDashboard() {
const { user, accountType, loading } = useGlobalState();
  const router = useRouter();

useEffect(() => {
  if (!loading) {
    if (!user) return; 
    if (accountType !== "client") {
      router.push("/");
    }
  }
}, [user, accountType, loading, router]);


  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Client Dashboard</h1>
      <p>Welcome {user?.firstName + " " + user?.lastName} </p>
    </div>
  );
}
