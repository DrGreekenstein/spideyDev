"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function SyncUser() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/create-user", {
        method: "POST",
        body: JSON.stringify({ clerkId: user.id }),
        headers: { "Content-Type": "application/json" },
      });
    }
  }, [isSignedIn]);

  return null;
}
