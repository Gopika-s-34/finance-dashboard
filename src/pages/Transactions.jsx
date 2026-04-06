import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function Transactions() {

    const exportCSV = () => {
        const headers = ["Date", "Category", "Type", "Amount"];

        const rows = transactions.map(t => [
            t.date,
            t.category,
            t.type,
            t.amount
        ]);

        let csvContent =
            "data:text/csv;charset=utf-8," +
            [headers, ...rows].map(e => e.join(",")).join("\n");

        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
    };

    const { transactions, role, deleteTransaction, addTransaction, updateTransaction, isAdminAuthenticated } = useContext(AppContext);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("date");
    const [showForm, setShowForm] = useState(false);
    const [newTx, setNewTx] = useState({
        date: "",
        category: "",
        type: "expense",
        amount: "",
    });
    const [editId, setEditId] = useState(null);

    //filtering + sorting
    const filtered = transactions
        .filter((t) => {
            if (filter !== "all" && t.type !== filter) return false;
            return t.category.toLowerCase().includes(search.toLowerCase());
        })
        .sort((a, b) => {
            if (sort === "amount") return b.amount - a.amount;
            return new Date(b.date) - new Date(a.date);
        });

    return (
        <div>
            <h1 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">Transactions</h1>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-5">Manage and explore your transactions</p>

            {/* Controls */}
            <div className="flex flex-wrap gap-3 mb-4">
                <input
                    value={search}
                    placeholder="Search by category..."
                    className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                >
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <select
                    className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="date">Sort by Date</option>
                    <option value="amount">Sort by Amount</option>
                </select>

                {role === "admin" && isAdminAuthenticated && (
                    <button
                        onClick={() => { setShowForm(!showForm); setEditId(null); }}
                        className="bg-blue-500 hover:bg-blue-600 active:scale-95 hover:scale-105 text-white text-sm px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                    >
                        {showForm ? "Cancel" : "+ Add"}
                    </button>
                )}

                <button
                    onClick={exportCSV}
                    className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 hover:scale-105 text-white text-sm px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                >
                    ↓ Export CSV
                </button>
            </div>

            {/* ADD/EDIT FORM */}
            {showForm && (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow mb-4 flex flex-wrap gap-3">
                    <input type="date" value={newTx.date}
                        className="border border-gray-200 dark:border-gray-600 p-2 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setNewTx({ ...newTx, date: e.target.value })} />
                    <input placeholder="Category" value={newTx.category}
                        className="border border-gray-200 dark:border-gray-600 p-2 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setNewTx({ ...newTx, category: e.target.value })} />
                    <select value={newTx.type}
                        className="border border-gray-200 dark:border-gray-600 p-2 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        onChange={(e) => setNewTx({ ...newTx, type: e.target.value })}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                    <input type="number" value={newTx.amount} placeholder="Amount"
                        className="border border-gray-200 dark:border-gray-600 p-2 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setNewTx({ ...newTx, amount: Number(e.target.value) })} />
                    <button
                        onClick={() => {
                            if (!newTx.date || !newTx.category || !newTx.amount) return;
                            editId ? updateTransaction({ ...newTx, id: editId }) : addTransaction(newTx);
                            setShowForm(false); setEditId(null);
                            setNewTx({ date: "", category: "", type: "expense", amount: "" });
                        }}
                        className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-sm px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                    >
                        {editId ? "Update" : "Save"}
                    </button>
                </div>
            )}

            {/* TABLE */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 uppercase text-xs">
                        <tr>
                            <th className="p-4 text-left font-medium">Date</th>
                            <th className="p-4 text-left font-medium">Category</th>
                            <th className="p-4 text-left font-medium">Type</th>
                            <th className="p-4 text-left font-medium">Amount</th>
                            {role === "admin" && isAdminAuthenticated && (
                                <th className="p-4 text-left font-medium">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-12 text-gray-400 dark:text-gray-500">
                                    No transactions found
                                </td>
                            </tr>
                        ) : (
                            filtered.map((t) => (
                                <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                                    <td className="p-4 text-gray-600 dark:text-gray-300">{t.date}</td>
                                    <td className="p-4 text-gray-800 dark:text-gray-100 font-medium">{t.category}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${t.type === "income"
                                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                                : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                                            }`}>
                                            {t.type}
                                        </span>
                                    </td>
                                    <td className={`p-4 font-semibold ${t.type === "income" ? "text-green-500" : "text-red-500"}`}>
                                        {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString()}
                                    </td>
                                    {role === "admin" && isAdminAuthenticated && (
                                        <td className="p-4 flex gap-3">
                                            <button
                                                onClick={() => { setShowForm(true); setEditId(t.id); setNewTx(t); }}
                                                className="text-blue-500 hover:text-blue-600 hover:underline text-sm transition-colors"
                                            >Edit</button>
                                            <button
                                                onClick={() => deleteTransaction(t.id)}
                                                className="text-red-500 hover:text-red-600 hover:underline text-sm transition-colors"
                                            >Delete</button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}