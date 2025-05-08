import React, { FormEvent, useState } from 'react'
import './component_styles/login_form.css'
import { login } from '../services/authentication_service'

interface LoginFormProps {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormState {
    username: string;
    password: string;
    isSigningIn: boolean;
    error: string
}

const InitialFormState: FormState = {
    username: '',
    password: '',
    isSigningIn: false,
    error: ''
}

const LoginForm = ({isLoggedIn, setIsLoggedIn, isOpen, setIsOpen}: LoginFormProps) => {
    const [ formState, setFormState ] = useState<FormState>(InitialFormState);

    const onClose = () => {
        setIsOpen(false);
        setFormState(InitialFormState);
    }

    const handleSignIn = () => {
        setFormState((prev) => ({
            ...prev,
            isSigningIn: !prev.isSigningIn
        }));
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormState(prev => ({
            ...prev,
            [name]: value
        }))
    }   

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { username, password } = formState;
        
        if (!username || !password) {
            setFormState((prev) => ({
                ...prev,
                error: "Please enter both username and password"
            }))
            return;
        }

        try {
            console.log('Submitting with:', { username, password });
            // Use the function in authentication_service.js
            const res = await login({ 
                username: username, 
                password: password, 
                isSigningIn: formState.isSigningIn
            });
            const data = await res.json();
            
            if (res.ok) {
                console.log('Login successful:', data);
                setIsLoggedIn(true);
                setIsOpen(false);
                setFormState(InitialFormState);
            } else {
                console.error('Login failed:', data);
                setFormState((prev) => ({
                    ...prev,
                    error: "Invalid Credentials"
                }))
            }
        } catch (err) {
            console.error('Login error:', err);
            setFormState((prev) => ({
                ...prev,
                error: "Network error. Please try again"
            }))
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
                            <h2 className='form_title'>{!formState.isSigningIn ? 'Login' : 'Sign Up'}</h2>
                        </div>
                        
                        <div className="form_fields">
                            <p className='text'>Email Address</p>
                            <input 
                                type="text" 
                                placeholder="Username" 
                                className="form_input"
                                name='username'
                                value={formState.username}
                                onChange={handleInputChange}
                            />
                            <p className='text'>Password</p>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                className="form_input"
                                name='password'
                                value={formState.password}
                                onChange={handleInputChange}
                            />
                            {formState.error && <div className="error_message">{formState.error}</div>}
                        </div>
                        <div className="form_actions">
                            {!formState.isSigningIn ? 
                                <button onClick={handleSignIn} className='toggle_form_button'>Don't Have an Account?</button> :
                                <button onClick={handleSignIn} className='toggle_form_button'>Back to Login</button>
                            }
                            <button type="submit" className="submit_button">
                                {!formState.isSigningIn ? 'Login' : 'Sign Up'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginForm
