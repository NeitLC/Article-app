import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
    return (
        <footer className="bg-light py-3 mt-4">
            <Container>
                <Row>
                    <Col md={12} className="text-center">
                        <p>&copy; 2024 Blog Name</p>
                    </Col> 
                </Row>
            </Container>
        </footer>
    );
}