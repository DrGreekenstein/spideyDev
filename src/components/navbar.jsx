import React from 'react'
import Image from "next/image";
import Link from "next/link";
import './styles/navbar.css';
import { IoLogoIonic } from "react-icons/io5";

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
          <Link href="#" className="text-white text-lg">Home</Link>
          <Link href="#about" className="text-white text-lg">About</Link>
          <Link href="#pricing" className="text-white text-lg">Pricing</Link>
          <Link href="#contact" className="text-white text-lg">Contact</Link>
          <IoLogoIonic className="text-white" size={30}/>

        </div>
      </div>
  )
}

export default NavBar