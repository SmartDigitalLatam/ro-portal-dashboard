import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
//#009078
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: '#009078',
    fontSize: 18,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// Place to put the results from calculus
const rows = [
  createData('Alarme 1', '11/12/19', '13:45:01'),
  createData('Alarme 2', '12/12/19', '14:45:02'),
  createData('Alarme 3', '13/12/19', '15:45:03'),
  createData('Alarme 4', '14/12/19', '16:45:04'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
  createData('Alarme 5', '15/12/19', '17:45:05'),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Alarme</StyledTableCell>
            <StyledTableCell align="right">Data</StyledTableCell>
            <StyledTableCell align="right">Horário</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}