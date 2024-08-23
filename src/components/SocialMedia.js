import React from "react";
import { ListGroup } from 'react-bootstrap';

export default function SocialMedia() {
    return (
        <ListGroup variant="flush">
                <ListGroup.Item>
                    <div className="d-flex flex-column-reverse">
                         <div className="d-flex justify-content-end align-items-center">
                            <small className="text-muted ml-2">Yesterday</small>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    </div>
                    <div className="d-flex flex-column-reverse">
                        <div className="d-flex justify-content-end align-items-center mb-2">
                            <a href="#" className="text-muted">1 Week ago</a>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    </div>
                </ListGroup.Item>
        </ListGroup>
    );
}