"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { UserButton } from "@/components/auth/user-button";
const NavBar = () => {
  const currentpath = usePathname();
  const links = [
    { label: "Dashboard", href: "/pages/dashboard" },
    { label: "Issues", href: "/pages/issues" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center justify-between">
      <Link href="../pages/dashboard">
        <AiFillBug width="40px" color="gold" />
      </Link>
      <div className="flex gap-x-2">
        <ul className="flex space-x-6 ">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={classnames({
                "text-slate-400": link.href === currentpath,
                "text-slate-700": link.href !== currentpath,
                "hover:text-[whitesmoke] transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </div>
      <UserButton />
    </nav>
  );
};

export default NavBar;
