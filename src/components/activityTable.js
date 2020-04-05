import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './activityTable.css'


export default class ActivityTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activities: [],
            activityUpdated: false
        };

        console.log('props.areaId in constructor: ' + this.props.areaId);
    }

    printRows() {
        return this.state.activities
            .map(activity => {
                return (
                    <TableRow key={activity.id} >
                        <TableCell align="left" component="th" scope="row">{activity.name}</TableCell>
                        <TableCell align="center">{this.translateFrequency(activity.frequency)}</TableCell>
                        <TableCell
                            align="center"
                            style={{ background: this.setColorByStatus(activity.activityStatus) }}
                            onClick={() => this.handleClick(activity.id)}
                        >
                            {this.translateActivityStatus(activity.activityStatus)}
                        </TableCell>
                    </TableRow>
                );
            });
    }

    handleClick(id) {
        let url = `http://192.168.100.16:8888/activitiesIncr/${id}`;
        console.log(url);
        fetch(url)
            .then(res => {
                console.log('success: ' + res);
                this.setState({ activityUpdated: true });
                return res;})
            .catch(err => console.log(err));
    }

    setColorByStatus(status) {
        switch (status) {
            case "CHECKED":
                return 'lightgreen';
            case "READY_TO_CHECK":
                return 'lemonchiffon';
            default:
                return;
        }
    }

    translateFrequency(frequency) {
        switch (frequency) {
            case "ODD":
                return 'tydz. nieparzysty';
            case "EVEN":
                return 'tydz. parzysty';
            default:
                return 'zawsze';
        }
    }

    translateActivityStatus(activityStatus) {
        switch (activityStatus) {
            case "READY_TO_CHECK":
                return 'ZROBIONE';
            case "CHECKED":
                return 'DO SPRAW.';
            default:
                return;
        }
    }

    translateArea(name){
        switch (name) {
            case "KCH":
                return 'KUCHNIA';
            case "ŁAZ":
                return 'ŁAZIENKA';
            default:
                return 'KORYTARZ';
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.areaId !== this.props.areaId) {
            this.fetchData();
            console.log('data fetched props')
        }
        if (prevState.activityUpdated !== this.state.activityUpdated) {
            this.fetchData();
            console.log('data fetched state')
        }
    }

    fetchData() {
        if (this.props.areaId !== null) {
            let url = `http://192.168.100.16:8888/activities/${this.props.areaId}`
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.setState({ activities: data });
                    this.setState({ activityUpdated: false });
                });
            console.log(`fetched Url: ${url}`);
        }
    }

    render() {

        if (this.state.activities.length > 0) {
            return (
                <div>
                    <h1>{this.translateArea(this.props.areaName)}</h1>
                    <h2>{this.props.areaUser + " - " + this.props.areaWeek}</h2>
                    <TableContainer component={Paper}>
                        <Table className="table" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="cell" align="left">Zadanie</TableCell>
                                    <TableCell className="cell" align="center">Częstotliwość</TableCell>
                                    <TableCell className="cell" align="center">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.printRows()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )
        }
        else return <span>Click area for list of activities</span>

    }
}