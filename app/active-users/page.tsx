"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";

export default function UsersCountPage() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      const { count, error } = await supabase
        .from("waiting_list")
        .select("id", { count: "exact", head: true });
      if (error) {
        toast.error("Failed to fetch users count.");
      } else {
        setCount(count ?? 0);
      }
    };
    fetchCount();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-bold mb-4">Total Users</h1>
      <div className="text-6xl font-mono mb-2">
        {count !== null ? count : "-"}
      </div>
      <p className="text-lg text-gray-400">users in the database</p>
    </div>
  );
}
