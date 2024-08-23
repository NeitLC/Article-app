import React from "react";

export default function Tag({name}) {
    return (
        <span className="badge bg-secondary me-2">{name}</span>
    );
}