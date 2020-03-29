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
});

function createWeek(name, jan, mat, rob) {
    return [name, jan, mat, rob];
}
const weeks = [
    createWeek('CW12', 'KUC', 'ŁAZ', 'KOR'),
    createWeek('CW15', 'KOR', 'KUC', 'ŁAZ'),
    createWeek('CW18', 'ŁAZ', 'KOR', 'KUC'),
    createWeek('CW21', 'KUC', 'ŁAZ', 'KOR'),
];

function createHeaders(weeks) {
    var result = [];
    for (var i = 0; i < weeks.length; i++) {
        result.push(weeks[i][0]);
    }
    return result;
}
const headers = createHeaders(weeks)

export default function SimpleTable() {
    const classes = useStyles();

    const [janAreas, janLoading] = useFetch('http://192.168.100.5:8888/areas/1');
    const [matAreas, matLoading] = useFetch('http://192.168.100.5:8888/areas/2');
    const [robAreas, robLoading] = useFetch('http://192.168.100.5:8888/areas/3');

    function printCells(areas) {
        areas
            .map(area => <TableCell align="right" key={area.id}>{area.name}</TableCell>);
    }

    
    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {headers.map((header, index) => (
                                <TableCell align="right" key={index}>{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {printCells(janAreas)}
                        </TableRow>
                        <TableRow>
                            {printCells(matAreas)}
                        </TableRow>
                        <TableRow>
                            {printCells(robAreas)}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <span>Jan error: {JSON.stringify(janLoading)}</span>
            <span>Mat error: {JSON.stringify(matLoading)}</span>
            <span>Rob error: {JSON.stringify(robLoading)}</span>
        </div>

    );
}
