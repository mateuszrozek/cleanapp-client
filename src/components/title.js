import React from 'react'
import './title.css';

const TITLE = 'CleanApp'


export default class Title extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            week: null
        };
    }

    componentDidMount() {
        fetch('http://192.168.100.16:8888/week')
            .then(response => response.json())
            .then(data => this.setState({ week: data }));
    }

    render() {
        if (this.state.week !== null) {
            return (
                <div className="container">
                    <h1 className="title">
                        {TITLE + " - CW" + this.state.week}
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