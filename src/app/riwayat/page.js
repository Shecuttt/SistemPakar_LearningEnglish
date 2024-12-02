import React from "react";
import Navbar from "../components/Navbar";
import Riwayat from "../components/Riwayat";

export default function page() {
  return (
    <div className="min-h-screen bg-sesi">
      <Navbar />
      <div className="container mx-auto p-4 pt-6 mt-20">
        <Riwayat />
      </div>
    </div>
  );
}
