"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function Header() {
    const [darkMode, setDarkMode] = useState(false);

    // Sync theme on mount
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);

        if (newMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <header className="w-full border-b">
            <div className="container mx-auto  py-4 flex items-center justify-between">
                {/* Product Logo */}
                <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold ">
                        Mock Server
                    </span>
                </div>

                {/* Toggle Mode */}
                <button
                    onClick={toggleDarkMode}
                    className="flex items-center justify-center p-2 rounded-md transition"
                >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>
        </header>
    );
}
