import React from "react";
import { ListGroup } from 'react-bootstrap';

export default function LatestsPosts() {
    const posts = [
        {
            title: "Post 1",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            date: "Yesterday"
        },
        {
            title: "Post 2",
            text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            date: "1 Week ago"
        }
    ];

    return (
        <ListGroup variant="flush">
            {posts.map((post, index) => (
                <ListGroup.Item key={index}>
                    <div className="d-flex flex-column-reverse">
                         <div className="d-flex justify-content-end align-items-center">
                            <small className="text-muted ml-2">{post.date}</small>
                        </div>
                        <div className="d-flex justify-content-end align-items-center mb-2">
                            <a href="#" className="text-muted">More</a>
                        </div>
                        <p>{post.text.substring(0, 100)}...</p>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}