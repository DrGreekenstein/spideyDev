"use client";

import ContactForm from "../components/contactForm";
import NavBar from "../components/navbar";
import { SignedOut } from "@clerk/nextjs";
import { useScroll, useTransform, motion } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  let isSignedIn=true;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div ref={containerRef}>
      <NavBar isSignedIn={isSignedIn} />
      {/* BG vid */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover -z-20"
        autoPlay
        muted
      >
        <source src="/assets/source.mp4" type="video/mp4" />
      </video>

      {/* Black fading overlay controlled by scroll */}
      <motion.div
        className="fixed top-0 left-0 w-full h-full bg-black pointer-events-none z-[-10]"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}

      <div className="relative z-10 p-10 mt-[100vh]">
        <section className="h-screen text-white">
          {/* check out our ideas */}
          <div className="flex flex-col justify-center items-center">
            <button className="rounded-[10px] btn btn-secondary">
              Check Out Our Ideas
            </button>
          </div>

          {/* about */}
          <div className="flex flex-col justify-center items-center mt-20">
            <h1 className="text-4xl font-bold" id="about">
              About
            </h1>
            <p className="text-xl mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium autem sunt harum recusandae cumque fugit odio natus
              minus sint quae sit, itaque, quam repellat sapiente, labore ipsa
              voluptate beatae nemo?
            </p>
          </div>

          {/* cards */}
          <motion.div
            className="flex justify-center items-center mt-20 gap-10"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="card bg-base-100 w-96 shadow-sm">
              <figure>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSITiUDIxOHORHKvxMsniK1j8Bwfpmd0sLROg&s"
                  alt="ecommerce"
                  className="w-[800] h-[260] object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  Ecommerce Website
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>Ecommerce Website making in seconds with SpideyDev</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Online Store</div>
                  <div className="badge badge-outline">Products</div>
                  <div className="badge badge-outline">Ecommerce</div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 w-96 shadow-sm">
              <figure>
                <img
                  src="https://bcdn.mindler.com/bloglive/wp-content/uploads/2019/02/20161531/Benefits-of-Model-United-Nations-MUN.png"
                  alt="Shoes"
                  className="w-[800] h-[260] object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  MUN Website
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>Making MUN websites has never been easier with SpideyDev</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Formal</div>
                  <div className="badge badge-outline">MUN</div>
                  <div className="badge badge-outline">Conference</div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 w-96 shadow-sm">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                  className="w-[800] h-[275] object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  Branding Website
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>Branding Website for your business with SpideyDev</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Fashion</div>
                  <div className="badge badge-outline">Products</div>
                </div>
              </div>
            </div>
          </motion.div>

          <hr className="my-10 mt-20" />

          {/* purchase cards */}
          <SignedOut>
            <motion.div
            className="flex justify-center items-center mt-20 gap-10"
            id="pricing"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* basic */}
            <div className="card w-96 bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex justify-between">
                  <h2 className="text-3xl font-bold">Basic</h2>
                  <span className="text-xl">$9.99/mo</span>
                </div>
                <ul className="mt-6 flex flex-col gap-2 text-xs">
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>High-resolution image generation</span>
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Customizable style templates</span>
                  </li>
                  <li className="opacity-50">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-base-content/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="line-through">Batch processing capabilities</span>
                  </li>
                  <li className="opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-base-content/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="line-through">AI-driven image enhancements</span>
                  </li>
                  <li className="opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-base-content/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="line-through">
                      Seamless cloud integration
                    </span>
                  </li>
                  <li className="opacity-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-base-content/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="line-through">
                      Real-time collaboration tools
                    </span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link target="_blank" href="https://buy.stripe.com/test_eVq7sK0Oo8EybTGfxBeQM00" className="btn btn-primary btn-block">
                    Subscribe
                  </Link>
                </div>
              </div>
            </div>

            {/* premium */}
            <div className="card w-96 bg-base-100 shadow-sm">
              <div className="card-body">
                <span className="badge badge-xs badge-warning">
                  Most Popular
                </span>
                <div className="flex justify-between">
                  <h2 className="text-3xl font-bold">Premium</h2>
                  <span className="text-xl">$29/mo</span>
                </div>
                <ul className="mt-6 flex flex-col gap-2 text-xs">
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>High-resolution image generation</span>
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Customizable style templates</span>
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Batch processing capabilities</span>
                  </li>
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>AI-driven image enhancements</span>
                  </li>
                  <li>
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      Seamless cloud integration
                    </span>
                  </li>
                  <li>
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 me-2 inline-block text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>
                      Real-time collaboration tools
                    </span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Link target="_blank" href="https://buy.stripe.com/test_3cIdR8aoY8Ey9Ly1GLeQM01" className="btn btn-primary btn-block">
                    Subscribe
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
          <hr className="my-10 mt-20" />
          </SignedOut>

          <ContactForm/>

          {/* footer */}
          <div className="flex justify-center items-center py-10">
            <p className="text-sm text-white">
              &copy; 2025 SpideyDev. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
