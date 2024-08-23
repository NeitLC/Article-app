import React from "react";
import Tag from "./Tag";

export default function TagCloud() {
    const tags = ['tag1','tag2','tag3','tag4','tag5'];
    return (
        <div className="tag-cloud">
            {tags.map((tag) => (
                <Tag key={tag} name={tag} />
            ))}
        </div>
    );
}