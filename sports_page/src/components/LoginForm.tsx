
import React, { FormEvent, useState } from 'react'
import './component_styles/login_form.css'

interface LoginFormProps {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({isLoggedIn, setIsLoggedIn, isOpen, setIsOpen}: LoginFormProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onClose = () => {
        setIsOpen(false);
        setUsername('');
        setPassword('');
        setError('');
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        try {
            console.log('Submitting with:', { username, password });
            
            const res = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                credentials: 'include', // Include cookies if any
            });

            const data = await res.json();
            
            if (res.ok) {
                console.log('Login successful:', data);
                setIsLoggedIn(true);
                setIsOpen(false);
                setUsername('');
                setPassword('');
                setError('');
            } else {
                console.error('Login failed:', data);
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Network error. Please try again.');
        }
    }

    if (!isOpen) return null;

    return (
        <>
            <div className="modal_overlay">
                <div className="modal_content">
                    <form onSubmit={handleSubmit}>
                        <div className="form_header">
                            <h2>User Login</h2>
                            <button type="button" className="close_button" onClick={onClose}>
                                ×
                            </button>
                        </div>

                        <div className="form_fields">
                            <input 
                                type="text" 
                                placeholder="Username" 
                                className="form_input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                className="form_input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error && <div className="error_message">{error}</div>}
                        </div>
                        <div className="form_actions">
                            <button type="submit" className="submit_button">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginForm
