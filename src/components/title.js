import React from 'react'
import './title.css';
import {BASE_URL} from '../shared/baseUrl';

const TITLE = 'CleanApp'


export default class Title extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            week: null
        };
    }

    componentDidMount() {
        fetch(`${BASE_URL}/week`)
            .then(response => response.json())
            .then(data => this.setState({ week: data }));
    }

    render() {
        if (this.state.week !== null) {
            return (
                <div className="container">
                    <h1 className="title">
                        {`${TITLE} - CW${this.state.week}`}
                    </h1>
                </div>
            )
        }
        else
            return (
                <div className="container">
                    <h1 className="title">
                        {TITLE}
                    </h1>
                </div>
            )

    }

}