import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './weekTable.css';
import ActivityTable from './activityTable';


const weeks = ['CW12', 'CW15', 'CW18', 'CW21', 'CW24', 'CW27', 'CW30', 'CW33', 'CW36', 'CW39', 'CW42', 'CW45', 'CW48'];

export default class WeekTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            janAreas: [],
            matAreas: [],
            robAreas: [],
            clickedAreaId: null,
            clickedAreaName: null,
            clickedAreaUser: null,
            clickedAreaWeek: null
        };

        this.handleClick = this.handleClick.bind(this);
        this.setColorByStatus = this.setColorByStatus.bind(this);
        this.printCells = this.printCells.bind(this);
    }

    componentDidMount() {
        fetch('http://192.168.100.16:8888/areas/1')
            .then(response => response.json())
            .then(data => this.setState({ janAreas: data }));

        fetch('http://192.168.100.16:8888/areas/2')
            .then(response => response.json())
            .then(data => this.setState({ robAreas: data }));

        fetch('http://192.168.100.16:8888/areas/3')
            .then(response => response.json())
            .then(data => this.setState({ matAreas: data }));
    }

    printCells(areas) {
        return areas
            .map(area => (
                <TableCell
                    align="center"
                    key={area.id}
                    style={{ background: this.setColorByStatus(area.areaStatus) }}
                    onClick={() => this.handleClick(area)}
                >
                    {area.name}
                </TableCell>
            ));
    }


    handleClick(area) {
        this.setState({ clickedAreaId: area.id });
        this.setState({ clickedAreaName: area.name });
        this.setState({ clickedAreaUser: area.user });
        this.setState({ clickedAreaWeek: area.week });
    }

    setColorByStatus(status) {
        switch (status) {
            case "DELAYED":
                return 'lightcoral';
            case "DONE":
                return 'lightgreen';
            case "PENDING":
                return 'lemonchiffon';
            default:
                return;
        }
    }

    render() {

        return (
            <div>
                <TableContainer component={Paper} className="tableContainer">
                    <Table className="weekTable" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                {weeks.map((week, index) => (
                                    <TableCell className="weekCell" align="center" key={index}>{week}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell className="weekCell">Jan</TableCell>
                                {this.printCells(this.state.janAreas)}
                            </TableRow>
                            <TableRow>
                                <TableCell className="weekCell">Robert</TableCell>
                                {this.printCells(this.state.robAreas)}
                            </TableRow>
                            <TableRow>
                                <TableCell className="weekCell">Mateusz</TableCell>
                                {this.printCells(this.state.matAreas)}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <ActivityTable className="activityTable"
                    areaId={this.state.clickedAreaId}
                    areaName={this.state.clickedAreaName}
                    areaUser={this.state.clickedAreaUser}
                    areaWeek={this.state.clickedAreaWeek}
                />
            </div>
        )
    }
}