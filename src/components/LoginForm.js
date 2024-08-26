import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert, Card, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { login, loadTokenFromLocalStorage } from '../redux/authSlice';
import axiosService from "../axios/axiosService";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTokenFromLocalStorage());
    }, []);

    const isAuthenticated = useSelector((state) => !!state.auth.token);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axiosService.post('/auth/login', {
                email,
                password,
            });

            localStorage.setItem('token', response.data.access_token); 
            localStorage.setItem('email', email);
            dispatch(login({ token: response.data.access_token, email: email }));
            
            navigate('/');
        } catch (error) {
            setError(error.response.data.message || 'Ошибка аутентификации');
            setShowModal(true);
        }
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Вход</Card.Title>                            
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"                                        
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />                                    
                                </Form.Group>
                                <Button type="submit" variant="primary">Войти</Button>                                
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Ошибка аутентификации</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal> 
        </Container>
    );
}