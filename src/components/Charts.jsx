import {
    LineChart, Line, XAxis, YAxis, Tooltip,
    PieChart, Pie, Cell, ResponsiveContainer, Legend, CartesianGrid,
} from "recharts";

const COLORS = ["#3b82f6", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"];

export default function Charts({ transactions, categoryData }) {
    return (
        <div className="grid md:grid-cols-2 gap-6 mt-6">

            {/* LINE CHART */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
                <h2 className="mb-3 font-semibold text-gray-800 dark:text-gray-100">
                    Balance Trend
                </h2>
                
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={transactions}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1f2937",
                                border: "none",
                                borderRadius: "8px",
                                color: "#f9fafb",
                            }}
                        />
                        <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2}
                            dot={{ fill: "#3b82f6", r: 3 }}
                            activeDot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* PIE CHART */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
                <h2 className="mb-3 font-semibold text-gray-800 dark:text-gray-100">
                    Spending Breakdown
                </h2>
                {categoryData.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center mt-10">No expense data</p>
                ) : (
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                dataKey="value"
                                nameKey="name"                            outerRadius={80}
                                innerRadius={30}
                                paddingAngle={3}
                            >
                                {categoryData.map((_, i) => (
                                    <Cell
                                        key={i}
                                        fill={COLORS[i % COLORS.length]}
                                        className="transition-all duration-200 hover:opacity-80"
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1f2937",
                                    border: "none",
                                    borderRadius: "8px",
                                    color: "#f9fafb",
                                }}
                                formatter={(value) => [`₹ ${value.toLocaleString()}`, "Amount"]}
                            />
                            <Legend
                                formatter={(value) => (
                                    <span className="text-xs text-gray-600 dark:text-gray-300">{value}</span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </div>

        </div>
    );
}