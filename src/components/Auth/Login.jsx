import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!email || !email.trim()) {
            toast.error('Email is required');
            return;
        }
        // simple email regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Enter a valid email address');
            return;
        }
        if (!password || password.length < 6) {
            toast.error('Password is required and should be at least 6 characters');
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                'http://localhost:5000/api/auth/login',
                { email, password },
                config
            );

            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/dashboard');
        } catch (error) {
            const msg = error.response && error.response.data && (error.response.data.message || error.response.data.error)
                ? (error.response.data.message || error.response.data.error)
                : error.message || 'Login failed';
            toast.error(msg);
            setError(msg);
        }
    };

    const googleSuccess = async (credentialResponse) => {
        try {
            const { credential } = credentialResponse;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post(
                'http://localhost:5000/api/auth/google',
                { tokenId: credential },
                config
            );
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/dashboard');
        } catch (error) {
            setError('Google Login Failed');
        }
    };

    const googleError = () => {
        setError('Google Login Failed');
    };

    return (
        <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
            <Card style={{ width: '400px' }} className='p-4 shadow'>
                <Card.Body>
                    <h2 className='text-center mb-4'>Log In</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group className='mb-3' controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <div className='d-flex'>
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <Button
                                    variant='outline-secondary'
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ marginLeft: '-40px', zIndex: 10, border: 'none' }}
                                >
                                    {showPassword ? '👁️' : '👁️'}
                                </Button>
                            </div>
                        </Form.Group>

                        <Button variant='primary' type='submit' className='w-100'>
                            Log In
                        </Button>
                    </Form>
                    <div className="mt-3 d-flex justify-content-center">
                        <GoogleLogin
                            onSuccess={googleSuccess}
                            onError={googleError}
                        />
                    </div>
                    <div className='mt-3 text-center'>
                        New Customer? <Link to='/register'>Register</Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Login;