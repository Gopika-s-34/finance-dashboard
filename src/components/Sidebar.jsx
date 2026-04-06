import { useState } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PaidIcon from "@mui/icons-material/Paid";
import InsightsIcon from "@mui/icons-material/Insights";
import MenuIcon from "@mui/icons-material/Menu";

export default function Sidebar() {
    const [open, setOpen] = useState(true);

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
        ${isActive
            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
        }`;

    return (
        <div
            className={`
        bg-white dark:bg-gray-800 
        shadow-md border-r border-gray-200 dark:border-gray-700
        flex flex-col p-4 
        transition-all duration-300 ease-in-out
        ${open ? "w-56" : "w-16"}
        `}
        >
            {/* Toggle button */}
            <button
                onClick={() => setOpen(!open)}
                className="mb-6 p-2 rounded-lg self-start text-gray-600 dark:text-gray-300
                hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110 transition-all duration-200"
            >
                <MenuIcon fontSize="small" />
            </button>

            {/* Title */}
            <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-12 mb-6 opacity-100" : "max-h-0 mb-0 opacity-0"}`}>
                <h1 className="text-base font-bold text-gray-900 dark:text-white whitespace-nowrap">
                    Finance Dashboard
                </h1>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-1">
                <NavLink to="/" end className={linkClass}>
                    <HomeIcon fontSize="small" className="shrink-0" />
                    <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${open ? "opacity-100 w-auto" : "opacity-0 w-0"}`}>
                        Dashboard
                    </span>
                </NavLink>

                <NavLink to="/transactions" className={linkClass}>
                    <PaidIcon fontSize="small" className="shrink-0" />
                    <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${open ? "opacity-100 w-auto" : "opacity-0 w-0"}`}>
                        Transactions
                    </span>
                </NavLink>

                <NavLink to="/insights" className={linkClass}>
                    <InsightsIcon fontSize="small" className="shrink-0" />
                    <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${open ? "opacity-100 w-auto" : "opacity-0 w-0"}`}>
                        Insights
                    </span>
                </NavLink>
            </nav>
        </div>
    );
}