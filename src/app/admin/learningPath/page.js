"use client";
import React, { useState, useEffect } from "react";

export default function page() {
    const [learningPaths, setlearningPaths] = useState([]);
    const [isModalOpen, setisModalOpen] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [formData, setformData] = useState({
        code: "",
        name: "",
        description: "",
        level: "Beginner",
    });
    useEffect(() => {
        fetchLearningPaths();
    }, []);

    const fetchLearningPaths = async () => {
        try {
            setisLoading(true);
            const res = await fetch("../api/learningPath");
            const data = await res.json();
            setlearningPaths(data);
        } catch (error) {
            console.error("Error fetching learning path:", error);
        } finally {
            setisLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("../api/learningPath", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!res.ok) {
                setisModalOpen(false);
                setformData({
                    code: "",
                    name: "",
                    description: "",
                    level: "Beginner",
                });
                fetchLearningPaths();
            }
        } catch (error) {
            console.error("Error creating learning path", error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-black">Loading...</p>
            </div>
        );
    }

    return (
        <>
            <div className="container mx-auto text-black">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Learning Paths</h1>
                    <button
                        onClick={() => setisModalOpen(true)}
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
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Level
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {learningPaths.map((path) => (
                                <tr key={path.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {path.code}
                                    </td>
                                    <td className="px-6 py-4">{path.name}</td>
                                    <td className="px-6 py-4">{path.level}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleEdit(path)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(path.id)
                                            }
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-96">
                            <h2 className="text-xl font-semibold mb-4">
                                Add Learning Path
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                        Code
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.code}
                                        onChange={(e) =>
                                            setformData({
                                                ...formData,
                                                code: e.target.value,
                                            })
                                        }
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setformData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) =>
                                            setformData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        className="w-full border rounded px-3 py-2"
                                        rows="3"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                        Level
                                    </label>
                                    <select
                                        value={formData.level}
                                        onChange={(e) =>
                                            setformData({
                                                ...formData,
                                                level: e.target.value,
                                            })
                                        }
                                        className="w-full border rounded px-3 py-2"
                                    >
                                        <option value="BEGINNER">
                                            Beginner
                                        </option>
                                        <option value="INTERMEDIATE">
                                            Intermediate
                                        </option>
                                        <option value="ADVANCED">
                                            Advanced
                                        </option>
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setisModalOpen(false)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
