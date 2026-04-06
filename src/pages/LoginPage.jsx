import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const { loginAdmin } = useContext(AppContext);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        const success = loginAdmin(password);

        if (success) {
            navigate("/");
        } else {
            setError("Wrong password");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow w-80">
                <h2 className="text-xl font-bold mb-4">Admin Login</h2>

                <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full p-2 border mb-3 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    Login
                </button>

                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </div>
    );
}