"use client";
import React, { useEffect, useState } from "react";

export default function page() {
    const [questions, setQuestions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        question_code: "",
        question: "",
        order_number: "",
        isActive: true,
    });

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            setLoading(true);
            const res = await fetch("../api/questions");
            const data = await res.json();
            setQuestions(data);
        } catch (error) {
            console.error("Error fetching questions", error);
        } finally {
            setLoading(false);
        }
    };

    //buat fungsi handle submit, edit dan delete

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-black">Loading...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto text-black">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Questions list</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add New
                </button>
            </div>

            <div className="shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead className="bg-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Code
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Question
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Order Number
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {questions.map((question) => (
                            <tr key={question.id}>
                                <td className="px-6 py-4">
                                    {question.question_code}
                                </td>
                                <td className="px-6 py-4">
                                    {question.question}
                                </td>
                                <td className="px-6 py-4">
                                    {question.orderNumber}
                                </td>
                                <td className="px-6 py-4">
                                    {question.isActive ? "Active" : "Inactive"}
                                </td>
                                <td>
                                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                                        Edit
                                    </button>
                                    <button className="text-red-600 hover:text-red-900">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">
                            Add Question
                        </h2>
                        {/* form onsubmit=... */}
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Question Code
                                </label>
                                <input
                                    type="text"
                                    value={formData.question_code}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            question_code: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Question
                                </label>
                                <textarea
                                    value={formData.question}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            question: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Order Number
                                </label>
                                <input
                                    type="number"
                                    value={formData.order_number}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            order_number: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="text-blue-600 hover:text-blue-900"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
