import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getCurrentUser, signinUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const SignIn = ({ onToggle }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { login } = useAuth();
    const navigate = useNavigate()

    const validateForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
        const { token } = await signinUser({ email, password });
        localStorage.setItem("token", token);

        const userData = await getCurrentUser();
        login(userData); // ✅ Now stores proper user
            navigate("/")
    } catch (err) {
        alert(err.message || "Login failed");
    }
};

    return (
        <div className="border-2 border-gray-300 rounded-md p-6 shadow-md bg-white max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Sign In to your account</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <div className="text-red-600 mt-1 text-sm">{errors.email}</div>}
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <div className="text-red-600 mt-1 text-sm">{errors.password}</div>}
                </div>

                <div className="text-right">
                    <a href="#" className="text-sm text-blue-600 hover:underline">
                        Forgot password?
                    </a>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Sign In
                </button>
            </form>

            <p className="mt-6 text-center text-gray-700">
                Don't have an account?{" "}
                <button onClick={onToggle} className="text-blue-600 hover:underline font-semibold">
                    Sign Up
                </button>
            </p>
        </div>
    );
};

export default SignIn;
