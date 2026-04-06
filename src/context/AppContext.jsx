import { createContext, useState, useEffect, useRef } from "react";
import { transactions as initialData } from "../data/mockData";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [role, setRole] = useState("viewer");
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const loaded = useRef(false); // ← guards save effects from firing before load

    // LOAD from localStorage once
    useEffect(() => {
        const savedTransactions = localStorage.getItem("transactions");
        const savedRole = localStorage.getItem("role");
        const savedTheme = localStorage.getItem("theme");

        if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
        else setTransactions(initialData);

        if (savedRole && savedRole === "viewer") setRole(savedRole); // never restore admin role
        if (savedTheme === "dark") setDarkMode(true);

        loaded.current = true; // mark load complete
    }, []);

    // SAVE — only after initial load
    useEffect(() => {
        if (!loaded.current) return;
        if (transactions.length > 0)
            localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        if (!loaded.current) return;
        localStorage.setItem("role", role);
    }, [role]);

    useEffect(() => {
        if (!loaded.current) return;
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const loginAdmin = (password) => {
        if (password === "admin") {
            setIsAdminAuthenticated(true);
            setRole("admin");
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAdminAuthenticated(false);
        setRole("viewer");
    };

    //CRUD Operation
    const addTransaction = (newTx) => {
        setTransactions([...transactions, { ...newTx, id: Date.now() }]);
    };

    const deleteTransaction = (id) => {
        setTransactions(transactions.filter((t) => t.id !== id));
    };

    const updateTransaction = (updatedTx) => {
        setTransactions(
            transactions.map((t) => (t.id === updatedTx.id ? updatedTx : t))
        );
    };

    return (
        <AppContext.Provider value={{
            transactions, setTransactions,
            role, setRole,
            isAdminAuthenticated, setIsAdminAuthenticated,
            loginAdmin, logout,
            addTransaction, deleteTransaction, updateTransaction,
            darkMode, setDarkMode,
        }}>
            {children}
        </AppContext.Provider>
    );
};