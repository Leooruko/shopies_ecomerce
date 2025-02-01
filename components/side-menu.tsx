"use client";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
export default function SideNavigation() {
  const [isMenuVisible, toggleIsMenuVisible] = useState(false);
  function toggleMenu() {
    toggleIsMenuVisible(!isMenuVisible);
  }
  return (
    <div className="side-navigation relative">
      <MdMenu
        className="mr-4 text-black fixed sm:top-40  cursor-pointer"
        onClick={toggleMenu}
      />
      <div
        className={`side-menu transition-all duration-300  relative  ${
          !isMenuVisible ? "w-0 hidden" : " w-0"
        }`}
      >
        <ul className="space-y-2 fixed bg-black p-4 text-sm rounded-md text-white">
          <li>Electronics</li>
          <li>Tools</li>
          <li>KitchenWare</li>
        </ul>
      </div>
    </div>
  );
}
