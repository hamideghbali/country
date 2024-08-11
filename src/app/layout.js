"use client"; // Ensure this file is a client component

import { useState, useEffect } from 'react';
import { IoMoon } from 'react-icons/io5'; // Import moon icon
import { AiOutlineSun } from 'react-icons/ai'; // Import sun icon
import { Inter } from 'next/font/google';
import './globals.css'; // Ensure your global styles include theme-specific styles
import Head from 'next/head'; // Import Head from next/head

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light");

  // Initialize theme based on localStorage or prefers-color-scheme
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  // Apply theme to document and save to localStorage
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <html lang="en">
      <Head>
        <title>Country</title> {/* Set the title here */}
        <meta name="description" content="List of countries and their details" />
      </Head>
      <body className={`${inter.className} ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} md:px-40`}>
        <div className="fixed top-4 right-4 z-50 md:pr-28">
          <button 
            onClick={toggleTheme}
            className="text-3xl p-2 bg-gray-200 rounded dark:bg-gray-700"
          >
            {theme === "light" ? <IoMoon /> : <AiOutlineSun />}
          </button>
        </div>
        {children}
      </body>
    </html>
  );
}
