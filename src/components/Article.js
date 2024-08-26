import React from "react";
import Tag from "./Tag";
import Rating from "./Rating";
import { Row, Col, Card, Image } from 'react-bootstrap';

export default function Article({title, body, image, tags, rate}) {
    return(
        <Card className="mb-3">
            <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{body}</Card.Text>
            <Image src={image} alt={title} fluid />
            <Row className="mt-3">
                <Col xs={8}>
                    <div>
                        <span>Tags: </span>
                        {tags.map((tag) => (
                            <Tag key={tag} name={tag} />
                        ))}
                    </div>
                </Col>
                <Col xs={4}>
                    <Rating rate={rate} />
                </Col>
            </Row>
            </Card.Body>
        </Card>
    );
}