"use client";
import React, { useState, useEffect } from "react";

export default function page() {
    const [rules, setRules] = useState([]);
    const [learningPaths, setLearningPaths] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        learningPathId: "",
        conditions: [], // Array of {question_code, expected_answer}
        priority: 0,
    });
    const [currentCondition, setCurrentCondition] = useState({
        question_code: "",
        expected_answer: "",
    });

    useEffect(() => {
        fetchRules();
        fetchLearningPaths();
        fetchQuestions();
    }, []);

    const fetchRules = async () => {
        try {
            setIsLoading(true);
            const res = await fetch("../api/rules");
            if (!res.ok) throw new Error(`Couldn't fetch rules`);
            const data = await res.json();
            setRules(data);
        } catch (error) {
            console.error("Error fetching rules", error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchLearningPaths = async () => {
        try {
            const res = await fetch("../api/learningPath");
            if (!res.ok) throw new Error(`Couldn't fetch learning paths`);
            const data = await res.json();
            setLearningPaths(data);
        } catch (error) {
            console.error("Error fetching learning paths", error);
        }
    };

    const fetchQuestions = async () => {
        try {
            const res = await fetch("../api/questions");
            if (!res.ok) throw new Error(`Couldn't fetch questions`);
            const data = await res.json();
            setQuestions(data);
        } catch (error) {
            console.error("Error fetching question", error);
        }
    };

    const handleAddCondition = () => {
        if (
            currentCondition.question_code &&
            currentCondition.expected_answer
        ) {
            setFormData({
                ...formData,
                conditions: [...formData.conditions, currentCondition],
            });
            setCurrentCondition({ question_code: "", expected_answer: "" });
        }
    };

    const handleRemoveCondition = (index) => {
        const newConditions = formData.conditions.filter((_, i) => i !== index);
        setFormData({ ...formData, conditions: newConditions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("../api/rules", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to create rule");

            await fetchRules();
            setIsModalOpen(false);
            setFormData({
                learningPathId: "",
                conditions: [],
                priority: 0,
            });
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to create rule");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this rule?")) return;

        try {
            const res = await fetch(`../api/rules/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete rule");

            await fetchRules();
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to delete rule");
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
        <div className="container mx-auto p-4 text-black">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Rules</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add New Rule
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Learning Path
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Conditions
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Priority
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {rules.map((rule) => (
                            <tr key={rule.id}>
                                <td className="px-6 py-4">{rule.id}</td>
                                <td className="px-6 py-4">
                                    {rule.learningPath?.name}
                                </td>
                                <td className="px-6 py-4">
                                    <pre className="text-sm">
                                        {JSON.stringify(
                                            rule.conditions,
                                            null,
                                            2
                                        )}
                                    </pre>
                                </td>
                                <td className="px-6 py-4">{rule.priority}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleEdit(rule)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(rule.id)}
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

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">Add Rule</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Learning Path
                                </label>
                                <select
                                    value={formData.learningPathId}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            learningPathId: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded px-3 py-2"
                                    required
                                >
                                    <option value="">
                                        Select Learning Path / Recommendation
                                    </option>
                                    {learningPaths.map((path) => (
                                        <option key={path.id} value={path.id}>
                                            {path.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Priority
                                </label>
                                <input
                                    type="number"
                                    value={formData.priority}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            priority: parseInt(e.target.value),
                                        })
                                    }
                                    className="w-full border rounded px-3 py-2"
                                    min="0"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Conditions
                                </label>
                                <div className="space-y-2">
                                    {formData.conditions.map(
                                        (condition, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center space-x-2 p-2 bg-gray-50 rounded"
                                            >
                                                <span>
                                                    Question:{" "}
                                                    {condition.question_code}
                                                </span>
                                                <span>
                                                    Answer:{" "}
                                                    {condition.expected_answer}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemoveCondition(
                                                            index
                                                        )
                                                    }
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>

                                <div className="mt-2 space-y-2">
                                    <input
                                        type="text"
                                        placeholder="Question Code"
                                        value={currentCondition.question_code}
                                        onChange={(e) =>
                                            setCurrentCondition({
                                                ...currentCondition,
                                                question_code: e.target.value,
                                            })
                                        }
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Expected Answer"
                                        value={currentCondition.expected_answer}
                                        onChange={(e) =>
                                            setCurrentCondition({
                                                ...currentCondition,
                                                expected_answer: e.target.value,
                                            })
                                        }
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddCondition}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Add Condition
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
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
    );
}
