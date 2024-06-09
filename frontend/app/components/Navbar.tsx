"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link
          href="/"
          className="btn btn-ghost normal-case text-xl bg-gradient-to-r from-blue-300 to-yellow-300 bg-clip-text text-transparent"
        >
          de-Zusammenfassen
        </Link>

        <div className="dropdown navbar-end">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">Zusammenfassen</Link>
            </li>

            <li>
              <Link href="/wie-es-funktioniert">Wie es funktioniert</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Zusammenfassen</Link>
          </li>
          <li>
            <Link href="/wie-es-funktioniert">Wie es funktioniert</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
