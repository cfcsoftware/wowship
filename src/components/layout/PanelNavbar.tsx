"use client";

import { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import Link from "next/link";

const NAVBAR_HEIGHT = 50; // Number instead of string for cleaner use
const AVATAR_SIZE = 30;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <nav
      className="bg-white shadow-none px-6 flex justify-end items-center relative"
      style={{
        height: `${NAVBAR_HEIGHT}px`,
      }}
    >
      <div className="flex items-center h-full ml-auto">
        <div className="relative flex items-center h-full">
          {/* Avatar button */}
          <button
            ref={buttonRef}
            className="focus:outline-none flex items-center justify-center"
            onClick={() => setOpen((v) => !v)}
            aria-label="User menu"
            style={{
              height: `${NAVBAR_HEIGHT}px`,
              width: `${NAVBAR_HEIGHT}px`,
            }}
          >
            <User
              size={AVATAR_SIZE}
              className="rounded-full border-2 border-gray-200 cursor-pointer transition-shadow hover:shadow-lg bg-gray-100 text-gray-500"
            />
          </button>

          {/* Dropdown menu */}
          <div
            ref={dropdownRef}
            className={`absolute right-0 top-full mt-2 w-44 z-50 transition-all duration-200 ${
              open
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="bg-white rounded-lg shadow-2xl ring-1 ring-black/5 animate-dropdown-fade">
              <ul className="py-2">
                <li>
                  <Link
                    href="/saas/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      console.log("Logout clicked");
                      // Add logout logic here
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Animation styles */}
          <style jsx>{`
            @keyframes dropdown-fade {
              0% {
                opacity: 0;
                transform: translateY(-10px) scale(0.98);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            .animate-dropdown-fade {
              animation: dropdown-fade 0.18s cubic-bezier(0.4, 0, 0.2, 1);
            }
          `}</style>
        </div>
      </div>
    </nav>
  );
}
