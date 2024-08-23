import React from "react";
import LatestsPosts from "./LatestPosts";
import TagCloud from "./TagCloud";
import SocialMedia from "./SocialMedia";
import { Card } from 'react-bootstrap';

export default function Sidebar() {
    return (
        <aside style={{ height: '100%' }}>
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Latest Posts</Card.Title>
                    <LatestsPosts />
                </Card.Body>
            </Card>
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Social Media</Card.Title>
                    <SocialMedia />
                </Card.Body>
            </Card>  
            <Card className="mb-3" style={{ aspectRatio: '1/1' }}>
                <Card.Body>
                    <Card.Title>Tag Cloud</Card.Title>
                    <TagCloud />
                </Card.Body>
            </Card>   
        </aside>
    );
}