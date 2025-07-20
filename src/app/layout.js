import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SpideyDev",
  description: "A website making website",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen `}
      >
        {children}

        {/* <footer className="bg-gray-900 flex justify-center items-center py-10 mt-auto">
            <p className="text-sm text-white">
              &copy; 2025 SpideyDev. All rights reserved.
            </p>
        </footer> */}
      </body>
    </html>
    </ClerkProvider>
  );
}
