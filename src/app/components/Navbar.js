import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full bg-white bg-opacity-20 backdrop-blur p-4 flex justify-between items-center rounded-full">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <i className="fas fa-book text-purple-600"></i>
          <span className="text-white font-semibold">Belajar Rek</span>
        </div>
        <a className="text-white" href="#">
          Beranda
        </a>
        <a className="text-white" href="#">
          Mulai
        </a>
        <a className="text-white" href="#">
          Riwayat
        </a>
      </div>
      <div className="flex space-x-2">
        <button className="bg-transparent text-white px-4 py-2 rounded-full">
          Login
        </button>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-full">
          Register
        </button>
      </div>
    </nav>
  );
}
