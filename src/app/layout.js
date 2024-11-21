import React from "react";
import Navbar from "./component/Navbar";

export default function layout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        <div>{children}</div>
      </body>
    </html>
  );
}
