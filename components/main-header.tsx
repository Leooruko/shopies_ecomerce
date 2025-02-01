"use client";
import classes from "./main-header.module.css";
import Logo from "@/public/images/logo.webp";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import SideNavigation from "./side-menu";
import { useState } from "react";
import { queryData } from "@/lib/actions";
import { logout } from "@/actions/auth_action";
import { getUserById } from "@/lib/store_actions";
export default function MainHeader({ user }) {
  const [hints, setHints] = useState<string[]>([]);
  async function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    if (query.trim() === "") {
      setHints([]);
      return;
    }
    const results = await queryData(query);
    setHints(results);
  }
  return (
    <>
      <header className="fixed  sm:pb-5 bg-green-300 w-full">
        <div className={` text-white bg-slate-900 opacity-85 text-xs`}>
          <div className={classes.marquee}>
            Buy now get more free. Shop more on us during the weekends.
            Don&apos;t forget to take advantage of the black Fridays . Flash
            sales this Office January
          </div>
        </div>
        <div
          className={`${classes.navbar}  pt-3 flex flex-col justify-evenly px-5 gap-2 sm:gap-10 sm:items-center sm:flex-row`}
        >
          <Link
            href={"/"}
            className={`${classes.logo} flex items-center gap-5`}
          >
            <img src={Logo.src} alt="logo" />
            <h1 className="font-bold text-3xl font-mono">Shopies</h1>
          </Link>

          <section className="search-section w-full flex flex-col relative sm:px-10 sm:ml-5">
            <form className="w-full  flex h-10 rounded-md overflow-hidden">
              <input
                type="search"
                name="search"
                id="search-field"
                placeholder="Search"
                className="w-full px-2 outline-none font-sans text-blue-400"
                onChange={handleSearchInput}
              />
              <button className="bg-black text-white px-5">
                <FaSearch />
              </button>
            </form>
            <div
              className={`${
                classes.hints
              } absolute top-12 left-10 bg-white p-3 w-3/4 rounded-md ${
                hints.length === 0 && "hidden"
              }`}
            >
              <ul>
                {hints.map((hint) => {
                  return (
                    <li key={hint}>
                      <Link
                        href={`/${hint.slug}`}
                        onClick={() => {
                          setHints([]);
                        }}
                      >
                        {hint.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
          <nav className="flex gap-5  w-full sm:w-fit h-fit text-blue-500 py-5 font-mono justify-between sm:justify-end text-2xl sm:text-4xl">
            <div className="flex bg-blue sm:hidden">
              <SideNavigation />
            </div>
            {user && (
              <div className="flex gap-5 ">
                <div className="group flex w-full h-full justify-end gap-5 relative cursor-pointer">
                  <CgProfile />
                  <div className="hover_content absolute hidden group-hover:block bg-white text-black p-5 top-0  min-w-fit min-h-fit sm:top-7 -right-6 shadow-md rounded-md text-base">
                    <Link
                      href={"/profile"}
                      className="flex flex-row-reverse items-center mb-5"
                    >
                      <div>
                        <h1 className="text-xl text-teal-800 text-nowrap">
                          {user}
                        </h1>
                      </div>
                      <span className="w-10 ">
                        <CgProfile className="" size={24} />
                      </span>
                    </Link>
                    <hr color="purple" />
                    <ul className="flex flex-col gap-2 mt-2">
                      <li className="hover:bg-blue-400 p-2 rounded-md hover:text-white">
                        <Link href={"/notifications"} className="">
                          <h1>Notifications</h1>
                        </Link>
                      </li>
                      <li className="hover:bg-blue-400 p-2 rounded-md hover:text-white">
                        <Link href={"/cart"} className="">
                          <h1>Cart</h1>
                        </Link>
                      </li>
                      <li className="hover:bg-blue-400 p-2 rounded-md hover:text-white">
                        <Link href={"/profile"} className="">
                          <h1>Profile</h1>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <form className="w-full h-full" action={logout}>
                  <button
                    type="submit"
                    className="w-full h-full px-2 hover:bg-black rounded-sm"
                  >
                    <MdLogout className="h-full w-full" size={50} />
                  </button>
                </form>
              </div>
            )}
            {!user && (
              <div className="flex w-full h-full justify-end gap-5">
                <div className="group flex w-full h-full justify-end gap-5 relative cursor-pointer">
                  <CgProfile />
                  <div className="hover_content absolute hidden group-hover:block bg-white text-black p-5 top-0  min-w-fit min-h-fit sm:top-7 right-0 shadow-md rounded-md text-base">
                    <hr color="purple" />
                    <ul className="flex flex-col gap-2 mt-2">
                      <li className="hover:bg-blue-400 p-2 rounded-md hover:text-white">
                        <Link
                          href={"/auth/?mode=login"}
                          className="hover:bg-blue-300 rounded-md bg-black"
                        >
                          <h1>Login</h1>
                        </Link>
                      </li>
                      <li className="hover:bg-blue-400 p-2 rounded-md hover:text-white">
                        <Link
                          href={"/auth/?mode=signup"}
                          className="hover:bg-blue-300"
                        >
                          <h1>SignUp</h1>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
