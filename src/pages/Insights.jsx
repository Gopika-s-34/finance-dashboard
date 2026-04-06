import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    CartesianGrid, ResponsiveContainer, Cell,
} from "recharts";

const BAR_COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

export default function Insights() {
    const { transactions } = useContext(AppContext);

    const expenses = transactions.filter((t) => t.type === "expense");

    if (expenses.length === 0) {
        return (
            <p className="p-4 text-gray-500 dark:text-gray-400">
                No expense data available
            </p>
        );
    }

    
    const monthlyMap = {};
    expenses.forEach((t) => {
        const month = new Date(t.date).toLocaleString("default", {
            month: "short", year: "numeric",
        });
        monthlyMap[month] = (monthlyMap[month] || 0) + t.amount;
    });

    const chartData = Object.keys(monthlyMap)
        .map((month) => ({ month, amount: monthlyMap[month], _date: new Date(month) }))
        .sort((a, b) => a._date - b._date);

    
    const categoryMap = {};
    expenses.forEach((t) => {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });
    const highestCategory = Object.keys(categoryMap).reduce((a, b) =>
        categoryMap[a] > categoryMap[b] ? a : b
    );

    
    const now = new Date();
    const thisMonth = now.toLocaleString("default", { month: "short", year: "numeric" });
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonth = lastMonthDate.toLocaleString("default", { month: "short", year: "numeric" });

    const thisMonthTotal = monthlyMap[thisMonth] || 0;
    const lastMonthTotal = monthlyMap[lastMonth] || 0;
    const diff = thisMonthTotal - lastMonthTotal;

    // Observations 
    const totalSpent = expenses.reduce((s, t) => s + t.amount, 0);
    const avgExpense = Math.round(totalSpent / expenses.length);
    const largest = expenses.reduce((a, b) => (a.amount > b.amount ? a : b));

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Insights</h1>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-2">
                Patterns and observations from your spending
            </p>

            {/* Monthly Spending Bar Chart */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow border border-gray-100 dark:border-gray-700">
                <h2 className="text-base font-semibold mb-4 text-gray-800 dark:text-gray-100">
                    Monthly Spending Trend
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12, fill: "#9ca3af" }}
                        />
                        <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1f2937",
                                border: "none",
                                borderRadius: "8px",
                                color: "#f9fafb",
                            }}
                            formatter={(v) => [`₹ ${v.toLocaleString()}`, "Spent"]}
                        />
                        <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                            {chartData.map((_, i) => (
                                <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* 3 insight cards in a row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Highest category */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow border border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-400 dark:text-gray-500 uppercase font-medium mb-1">
                        Top Spending Category
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {highestCategory}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        ₹ {categoryMap[highestCategory].toLocaleString()} total
                    </p>
                </div>

                {/* Monthly comparison */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow border border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-400 dark:text-gray-500 uppercase font-medium mb-1">
                        Monthly Comparison
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        This month ({thisMonth})
                    </p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                        ₹ {thisMonthTotal.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last month: ₹ {lastMonthTotal.toLocaleString()}
                    </p>
                    {diff !== 0 && (
                        <p className={`text-sm font-semibold mt-2 ${diff > 0 ? "text-red-500" : "text-green-500"}`}>
                            {diff > 0 ? "↑" : "↓"} ₹ {Math.abs(diff).toLocaleString()} vs last month
                        </p>
                    )}
                </div>

                {/* Observations */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow border border-gray-100 dark:border-gray-700">
                    <p className="text-xs text-gray-400 dark:text-gray-500 uppercase font-medium mb-1">
                        Observations
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        Avg transaction
                    </p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                        ₹ {avgExpense.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        Largest: <span className="font-medium text-gray-700 dark:text-gray-200">{largest.category}</span>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        ₹ {largest.amount.toLocaleString()} on {largest.date}
                    </p>
                </div>

            </div>
        </div>
    );
}