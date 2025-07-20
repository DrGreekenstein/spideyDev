import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./styles/navbar.css";
import { IoLogoIonic } from "react-icons/io5";
import {
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-4 bg-transparent">
      <div className="flex items-center">
        <Image
          className="rounded-full"
          src="/assets/logo.jpg"
          alt="logo"
          width={70}
          height={70}
        />
      </div>

      <div className="flex space-x-10 justify-center items-center">
        <Link href="#" className="text-white text-lg">
          Home
        </Link>
        <Link href="#about" className="text-white text-lg">
          About
        </Link>
        <SignedOut>
          <Link href="#pricing" className="text-white text-lg">
            Pricing
          </Link>
        </SignedOut>
        <Link href="#contact" className="text-white text-lg">
          Contact
        </Link>
      </div>

      <SignedIn>
        <div className="flex space-x-10 justify-center items-center">
          <Link href="/dashboard" className="text-white text-lg">
            Dashboard
          </Link>
            <UserButton />
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex space-x-4 justify-center items-center">
          <Link href="/sign-in" className="text-white text-lg">
            Login
          </Link>
            <Link href="/sign-up" className="bg-[#7654ff60] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer text-center flex justify-center items-center ">
              Sign Up
            </Link>
        </div>
      </SignedOut>
    </div>
  );
};

export default NavBar;
