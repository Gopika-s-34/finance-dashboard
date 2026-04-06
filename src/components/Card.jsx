export default function Card({ title, value, icon }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:scale-[1.03] hover:-translate-y-1
        transition-all duration-300 ease-in-out cursor-default">
            <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
                {title}
            </h2>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ₹ {typeof value === "number" ? value.toLocaleString() : value}
            </p>
        </div>
    );
}