"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";

//nothing

export default function FreelancerDashboard() {
  const { user, accountType, loading } = useGlobalState();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || accountType !== "freelancer") {
        router.push("/");
      }
    }
  }, [user, accountType, loading, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Freelancer Dashboard</h1>
      <p>Welcome {user?.firstName}</p>
    </div>
  );
}
