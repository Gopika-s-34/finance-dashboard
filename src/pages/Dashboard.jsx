import Card from "../components/Card";
import Charts from "../components/Charts";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { calculateSummary, categoryData } from "../utils/helpers";

export default function Dashboard() {
    const { transactions } = useContext(AppContext);
    const summary = calculateSummary(transactions);
    const categories = categoryData(transactions);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-5">Your financial overview at a glance</p>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card title="Balance" value={summary.balance} />
                <Card title="Income" value={summary.income} />
                <Card title="Expenses" value={summary.expenses} />
            </div>

            {/* Charts */}
            <Charts transactions={transactions} categoryData={categories} />
        </div>
    );
}