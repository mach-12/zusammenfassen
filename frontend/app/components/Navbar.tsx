"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl bg-gradient-to-r from-blue-300 to-yellow-300 bg-clip-text text-transparent">de-Zusammenfassen</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
        <li>
            <Link href="/">Zusammenfassen</Link>
          </li>
          <li>
            <Link href="/how-it-works">How it works</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
