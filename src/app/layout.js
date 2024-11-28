import React from "react";
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
}
