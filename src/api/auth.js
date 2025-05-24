const API_BASE = "https://test-backend-z0wk.onrender.com/api/auth";

// Get user data using token

export const getCurrentUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const res = await fetch(`${API_BASE}/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error("Failed to fetch user");
    return await res.json();
};

// Signup

export const signupUser = async (userData) => {
    const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    if (!res.ok) throw new Error("Signup failed");
    return await res.json();
};

// Signin

export const signinUser = async (credentials) => {
    const res = await fetch(`${API_BASE}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });

    if (!res.ok) throw new Error("Login failed");
    return await res.json();
};
