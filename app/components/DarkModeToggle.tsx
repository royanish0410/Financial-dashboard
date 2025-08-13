"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded border px-3 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
