"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="flex justify-center">
      <nav className="mt-12 p-6 rounded-full absolute shadow-md bg-black/5 backdrop-blur-sm flex flex-row justify-between items-center w-4/5">
        <div className="flex space-x-1 text-white">
          <svg
            className="w-6 h-6 text-violet-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
              clipRule="evenodd"
            />
          </svg>

          <h1 className="mr-6 font-bold">Belajar Rek</h1>
        </div>
        <div className="flex flex-row space-x-5 text-white">
          <Link href={"/"} className={pathname === "/" ? "font-bold" : ""}>
            Beranda
          </Link>
          <Link
            href={"/sesi"}
            className={pathname === "/sesi" ? "font-bold" : ""}
          >
            Mulai
          </Link>
          <Link
            href={"/history"}
            className={pathname === "/history" ? "font-bold" : ""}
          >
            Riwayat
          </Link>
        </div>
      </nav>
    </div>
  );
}
