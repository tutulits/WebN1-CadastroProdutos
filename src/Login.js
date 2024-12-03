import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { email, senha });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');  // Redirecionar após login
        } catch (error) {
            setErro('Login ou senha incorretos');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                />
                <input 
                    type="password" 
                    value={senha} 
                    onChange={(e) => setSenha(e.target.value)} 
                    placeholder="Senha" 
                    required 
                />
                <button type="submit">Login</button>
            </form>
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
        </div>
    );
}

export default Login;
