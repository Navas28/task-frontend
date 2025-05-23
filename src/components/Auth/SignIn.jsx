import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getCurrentUser, signinUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

const SignIn = ({ onToggle }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { login } = useAuth();
    const navigate = useNavigate();

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
            login(userData);
            navigate("/");
        } catch (err) {
            alert(err.message || "Login failed");
        }
    };

    return (
        <div className="rounded-3xl p-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">Sign In to Your Account</h2>
            </div>

            <div className="space-y-6">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
                        <Mail size={20} />
                    </span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-gray-200  focus:outline-none"
                        placeholder="Email"
                    />
                    {errors.email && <div className="text-red-500 mt-2 text-sm font-medium">{errors.email}</div>}
                </div>

                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
                        <Lock size={20} />
                    </span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-gray-200 focus:outline-none"
                        placeholder="Password"
                    />
                    {errors.password && <div className="text-red-500 mt-2 text-sm font-medium">{errors.password}</div>}
                </div>

                <div className="text-center">
                    <a href="#" className="text-sm font-semibold transition-colors underline">
                        Forgot password?
                    </a>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="w-1/2 text-white py-4 rounded-4xl font-semibold text-lg bg-yellow"
                    >
                        SIGN IN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
