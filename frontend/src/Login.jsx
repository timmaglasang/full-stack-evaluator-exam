import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        console.log("Sending to Backend:", formData);

        setTimeout(() => {
            setLoading(false);
            navigate("/tasks"); // redirect to Tasks.jsx
        }, 1500);
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.card}>
                <h2 style={styles.title}>Welcome Back</h2>
                <p style={styles.subtitle}>Please enter your details</p>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Password</label>
                    <div style={styles.passwordWrapper}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            required
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            style={styles.input}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={styles.toggleBtn}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? "Signing in..." : "Sign In"}
                </button>

                <p style={styles.footer}>
                    Don't have an account? <a href="/signup" style={styles.link}>Sign Up</a>
                </p>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f4f7fe',
        fontFamily: 'Arial, sans-serif'
    },
    card: { backgroundColor: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
    title: { margin: '0 0 8px 0', fontSize: '24px', fontWeight: 'bold', color: '#1b2559', textAlign: 'center' },
    subtitle: { margin: '0 0 24px 0', fontSize: '14px', color: '#a3aed0', textAlign: 'center' },
    inputGroup: { marginBottom: '20px' },
    label: { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#1b2559' },
    input: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e0e5f2', fontSize: '14px', boxSizing: 'border-box' },
    passwordWrapper: { position: 'relative' },
    toggleBtn: { position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#4318ff', cursor: 'pointer', fontSize: '12px' },
    button: { width: '100%', padding: '12px', backgroundColor: '#4318ff', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', marginTop: '10px' },
    footer: { marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#a3aed0' },
    link: { color: '#4318ff', textDecoration: 'none', fontWeight: 'bold' }
};

export default Login;
