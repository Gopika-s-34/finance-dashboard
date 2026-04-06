import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Header() {
    const { role, setRole, logout, isAdminAuthenticated, darkMode, setDarkMode } =
        useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div className="mb-4">
            {/* Welcome text */}
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
                Welcome back,{" "}
                <span className="font-semibold text-gray-600 dark:text-gray-300">
                    {isAdminAuthenticated ? "Admin" : "User"}
                </span>
            </p>

            {/* Header bar */}
            <div className="flex flex-wrap justify-between items-center gap-3 px-5 py-3 bg-gray-900 dark:bg-gray-800 text-white rounded-xl shadow-md">
                <h1 className="text-base font-bold tracking-tight">Finance Dashboard</h1>

                {/* Role switcher */}
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">Role:</span>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="bg-gray-700 dark:bg-gray-600 text-white text-sm px-2 py-1 rounded-lg 
                        border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 cursor-pointer"
                    >
                        <option value="viewer">Viewer</option>
                        <option value="admin" disabled={!isAdminAuthenticated}>
                            Admin
                        </option>
                    </select>
                </div>

                {/* Right side buttons */}
                <div className="flex items-center gap-2">
                    {/* Dark mode toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-200 hover:scale-110 active:scale-95"
                        title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {darkMode ? (
                            <LightModeIcon fontSize="small" />
                        ) : (
                            <DarkModeIcon fontSize="small" />
                        )}
                    </button>

                    {/* Auth button */}
                    {isAdminAuthenticated ? (
                        <button
                            onClick={() => { logout(); navigate("/"); }}
                            className="bg-red-500 hover:bg-red-600 active:scale-95 hover:scale-105 text-white text-sm px-4 py-1.5 rounded-lg transition-all duration-200 font-medium"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-blue-500 hover:bg-blue-600 active:scale-95 hover:scale-105 text-white text-sm px-4 py-1.5 rounded-lg transition-all duration-200 font-medium"
                        >
                            Admin Login
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}