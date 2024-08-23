import React from "react";
import ArticleList from "./ArticleList";
import Sidebar from "./Sidebar";
import { Container, Row, Col } from 'react-bootstrap';

export default function Main() {
    return (
        <main className="py-4">
            <Container>
                <Row>
                    <Col md={8}>
                        <ArticleList />
                    </Col>
                    <Col md={4}>
                        <Sidebar />
                    </Col>
                </Row>
            </Container>
        </main>
    );
}