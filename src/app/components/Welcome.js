import React from "react";
import book from "../../../public/homework.png";
import Image from "next/image";
import Link from "next/link";

export default function Welcome() {
    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 mt-32 bg-white/10 backdrop-blur-md rounded-2xl flex flex-col justify-center space-y-3 p-6">
            <Image
                src={book}
                width={100}
                height={100}
                alt="book"
                className="mx-auto mb-8"
            />
            <h1 className="text-5xl font-extrabold text-center">
                Belajar <span className="text-violet-700">Rek!</span>
            </h1>
            <p className="text-center">
                Cari rekomendasi cara belajar Bahasa Inggris dari permasalahan
                dalam belajarmu
            </p>
            <Link href={"/sesi"} className="mx-auto">
                <button className="bg-violet-600 hover:bg-violet-700 py-3 px-6 text-white rounded-full">
                    Cari tahu sekarang!
                </button>
            </Link>
        </div>
    );
}
