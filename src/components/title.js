import React from 'react'
import './title.css';

export default function Title() {
    const TITLE = 'CleanApp'

    return (
        <div className="container">
            <h1 className="title">
                {TITLE}
            </h1>
        </div>
    )
}