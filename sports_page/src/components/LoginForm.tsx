
import React, { FormEvent, useState } from 'react'
import './component_styles/login_form.css'

interface LoginFormProps {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm = ({isLoggedIn, setIsLoggedIn, isOpen, setIsOpen}: LoginFormProps) => {
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState('');

    const onClose = () => {
        setIsOpen(false);
        setUsername('');
        setPassword('');
        setError('');
    }

    const handleSignIn = () => {
        setIsSigningIn(prev => !prev);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        try {
            console.log('Submitting with:', { username, password });
            
            const res = await fetch(`http://localhost:3001/${!isSigningIn ? 'login' : 'signup'}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                credentials: 'include', 
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
                        <div className='form_exit_container'>
                            <button type="button" className="close_button" onClick={onClose}>×</button>
                        </div>
                    
                        <div className="form_header">
                            <h2 className='form_title'>{!isSigningIn ? 'Login' : 'Sign Up'}</h2>
                        </div>
                        
                        <div className="form_fields">
                            <p className='text'>Email Address</p>
                            <input 
                                type="text" 
                                placeholder="Username" 
                                className="form_input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <p className='text'>Password</p>
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
                            {!isSigningIn ? 
                                <button onClick={handleSignIn} className='toggle_form_button'>Don't Have an Account?</button> :
                                <button onClick={handleSignIn} className='toggle_form_button'>Back to Login</button>
                            }
                            <button type="submit" className="submit_button">
                                {!isSigningIn ? 'Login' : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginForm
