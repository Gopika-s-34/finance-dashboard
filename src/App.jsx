import { AppContext } from "./context/AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import Breadcrumbs from "./components/Breadcrumbs";
import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const { darkMode } = useContext(AppContext);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
              <Sidebar />
              <div className="flex-1 p-6 overflow-y-auto transition-all duration-300 ease-in-out">
                <Header />
                <Breadcrumbs />
                <Outlet />
              </div>
            </div>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="insights" element={<Insights />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;