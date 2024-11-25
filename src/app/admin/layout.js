"use client";
import { useState } from "react";
import Link from "next/link";

export default function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
        <div className="flex h-screen bg-slate-50">
            <div
                className={`bg-slate-800 text-white w-64 space-y-4 py-4 px-2 absolute inset-y-0 left-0 transform ${
                    isSidebarOpen ? "translate-x-0" : "translate-x-full"
                } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
            >
                <div className="flex items-center justify-between px-4">
                    <h1 className="text-2xl font-bold">Sistem Pakar</h1>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 text-white md:hidden"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 6h16M4 12h16M4 18h16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
                <nav className="flex flex-col space-y-2">
                    <Link
                        href={"/admin/learningPath"}
                        className="px-4 py-2 hover:bg-slate-600 rounded"
                    >
                        Learning Path
                    </Link>
                    <Link
                        href={"/admin/questions"}
                        className="px-4 py-2 hover:bg-slate-600 rounded"
                    >
                        Questions
                    </Link>
                    <Link
                        href={"/admin/rules"}
                        className="px-4 py-2 hover:bg-slate-600 rounded"
                    >
                        Rules
                    </Link>
                    <Link
                        href={"/admin/session"}
                        className="px-4 py-2 hover:bg-slate-600 rounded"
                    >
                        Session
                    </Link>
                </nav>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm">
                    <div className="p-4 md:hidden">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="md:hidden"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4 6h16M4 12h16M4 18h16"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
