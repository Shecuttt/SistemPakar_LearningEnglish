import React from "react";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
    title: "Belajar Rek!",
    description: "Sistem Pakar Rekomendasi Belajar Bahasa Inggris",
};

export default function layout({ children }) {
    return (
        <html>
            <body className={`${montserrat.className} antialiased`}>
                <Navbar />

                <main>{children}</main>
            </body>
        </html>
    );
}
