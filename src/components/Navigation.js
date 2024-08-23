import React from "react";
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login'); // Перенаправляем на страницу входа после выхода
    };

    return (
        <Navbar bg="ligth" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="me-auto">
                        <Nav.Link href="#">Home</Nav.Link>
                        <Nav.Link href="#">About</Nav.Link>
                        <Nav.Link href="#">Blog's Main Topic 1</Nav.Link>
                        <Nav.Link href="#">Blog's Main Topic 2</Nav.Link>
                        <Nav.Link href="#">Blog's Main Topic 3</Nav.Link>
                        <Nav.Link href="#">Associated blogs</Nav.Link>

                        {user && (
                            <Nav className="ms-auto">
                                <Nav.Link href="#">
                                    {user.email}
                                </Nav.Link>
                                <Button variant="outline-danger" onClick={handleLogout}>
                                    Выйти
                                </Button>
                            </Nav>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}