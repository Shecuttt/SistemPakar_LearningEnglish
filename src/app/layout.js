import React from "react";
<<<<<<< HEAD
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
=======
import Navbar from "./component/Navbar";
import "./globals.css";

export default function layout({ children }) {
    return (
        <html>
            <body>
                <Navbar />
                <div>{children}</div>
            </body>
        </html>
    );
>>>>>>> eda6c6e7c127b39f9d13c919f110bf8bb109b841
}
