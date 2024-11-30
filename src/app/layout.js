import React from "react";
import Navbar from "./components/Navbar";
import "./globals.css";

export default function layout({ children }) {
  return (
    <html>
      <body>
        <div>
          <Navbar />
        </div>
        <div className="max-w-sm rounde overflow-hidden shadow-lg">
          <div>Welcome</div>
        </div>
      </body>
    </html>
  );
}
