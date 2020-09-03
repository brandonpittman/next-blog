import Link from "next/link";
import React, { useState } from "react";
import HeaderLinks from "@lib/header_links.json";
import { X, Menu } from "@images/heroicons/solid";
import { trackGoal } from "fathom-client";
import Img from "react-optimized-image";
import ProfileImg from "../../public/favicon-60x60.png";

const links = HeaderLinks;
const trackMobileMenuGoal = () => trackGoal("RYQBIEQE", 0);

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) trackMobileMenuGoal();
  };

  return (
    <header className="w-full">
      <nav className="w-full px-4 py-4 pb-4 bg-white border-b sm:px-8">
        <div className="flex items-center justify-between w-full">
          <h1>
            <Link href="/">
              <a className="py-2">
                <Img
                  src={ProfileImg}
                  alt="Brandon in a black kimono"
                  className="w-12 h-12 rounded-full shadow shadow-outline-gray"
                />
              </a>
            </Link>
          </h1>

          <div className="block md:hidden">
            <button
              className="flex items-center focus:outline-none"
              onClick={handleMenuClick}
            >
              <span className="sr-only">Toggle menu</span>
              {!isOpen ? (
                <Menu className="w-8 h-8" />
              ) : (
                <X className="w-8 h-8" />
              )}
            </button>
          </div>

          <ul className="hidden md:flex">
            {links.map(link => (
              <li key={link.title}>
                <Link href={link.to}>
                  <a className="block ml-8 text-sm font-semibold tracking-wide text-gray-700 md:inline-block md:mt-0 transform transition-all ease-in-out duration-75 hover:text-gray-900">
                    {link.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile nav Links */}
        <div className={`w-full my-16 md:hidden ${!isOpen ? "hidden" : ""}`}>
          <ul>
            {links.map(link => (
              <li key={link.title}>
                <Link href={link.to}>
                  <a className="block py-3 font-semibold text-gray-700 hover:text-gray-900">
                    {link.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
