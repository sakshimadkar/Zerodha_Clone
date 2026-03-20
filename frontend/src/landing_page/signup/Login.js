import React, { useState } from "react";
import axios from "axios";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3002/login", {
                username,
                password,
            });
            if (response.status === 200) {
                alert("Login successful!");
                // In a real app, we would store the token/session and redirect to dashboard
                // For now, let's just redirect to the dashboard URL if we know it
                window.location.href = "http://localhost:3001";
            }
        } catch (error) {
            console.error("Login error", error);
            alert("Login failed. Check credentials.");
        }
    };

    return (
        <div className="container mt-5 p-5 border rounded" style={{ maxWidth: "400px" }}>
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
