import React from "react";
import Navigation from "./Navigation";
import { Container, Row, Col } from 'react-bootstrap';

import logo from '../images/blog-logo.svg';

export default function Header() {
    return (
        <header className="bg-light py-3">
            <Container>
                <Row>
                    <Col md={12} className="d-flex align-items-center">
                        <img src={logo} alt="Logo" className="mr-5" height="40" />
                        <h1 className="display-4">Blog Name</h1>
                        
                    </Col>
                </Row>
                <Row>
                    <Col md={12} className="text-center"> {/* Выравнивание по центру */}
                        <Navigation />
                    </Col>
                </Row>
            </Container>
        </header>
    );
}