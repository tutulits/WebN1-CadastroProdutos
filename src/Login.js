import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

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
        
            <div className="produto-containerrrrr" style={{ marginTop: '220px' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <label style={{ flex: 1 }}>
                                <div style={{ color: 'black' }}>Email:</div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Email'
                                    className="form-input"
                                    required
                                />
                            </label>

                            <label style={{ flex: 1 }}>
                                <div style={{ color: 'black' }}>Senha:</div>
                                <input
                                    type="password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    placeholder='Password'
                                    className="form-input"
                                    required
                                />
                            </label>
                        </div>

                        <Button type="submit" variant="primary" style={{ flex: 1 }}>Login</Button>
                    </div>
                </form>
                {erro && <p style={{ color: 'red' }}>{erro}</p>}
            </div>
   

    );
}

export default Login;
