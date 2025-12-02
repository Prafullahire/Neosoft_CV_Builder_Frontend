import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
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
            setError(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
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
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
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