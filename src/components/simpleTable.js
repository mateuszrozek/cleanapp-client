import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useFetch } from "../shared/hooks";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    cell: {
        fontWeight: 550,
    }
});

const weeks = ['CW12', 'CW15', 'CW18', 'CW21', 'CW24', 'CW27', 'CW30', 'CW33', 'CW36', 'CW39', 'CW42', 'CW45', 'CW48'];

export default function SimpleTable({ onChildClick  }) {
    const classes = useStyles();

    const [janAreas, janLoading] = useFetch('http://192.168.100.16:8888/areas/1');
    const [robAreas, robLoading] = useFetch('http://192.168.100.16:8888/areas/2');
    const [matAreas, matLoading] = useFetch('http://192.168.100.16:8888/areas/3');

    function printCells(areas) {
        return areas
            .map(area => (<TableCell align="center" key={area.id} style={{ background: setColorByStatus(area.areaStatus) }} onClick={() => handleClick(area.id)}>{area.name}</TableCell>));
    }

    function handleClick(id) {
        onChildClick(id);        
    }

    function setColorByStatus(status) {
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



    if (janAreas.length > 0) {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                {weeks.map((week, index) => (
                                    <TableCell className={classes.cell} align="center" key={index}>{week}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell className={classes.cell}>Jan</TableCell>
                                {printCells(janAreas)}
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.cell}>Robert</TableCell>
                                {printCells(robAreas)}
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.cell}>Mateusz</TableCell>
                                {printCells(matAreas)}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        );
    }
    else {
        return (
            <div>
                <span>Jan errors: {JSON.stringify(janLoading)}</span>
                <br />
                <span>Mat errors: {JSON.stringify(matLoading)}</span>
                <br />
                <span>Rob errors: {JSON.stringify(robLoading)}</span>
            </div>
        );
    }

}
