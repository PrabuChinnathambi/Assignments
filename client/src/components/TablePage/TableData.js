import React, { useState, useEffect } from 'react'
import Tables from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

import datas from '../../data/zips.json';
import Navbar from '../Navbar/Navbar';
import './TableData.css';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "yellow"
        },
        "& .MuiOutlinedInput-input": {
            color: "green"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
            color: "white"
        },
        "& .MuiInputLabel-outlined": {
            color: "white"
        },
      
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "white"
        }
    }
});

function TableData() {

    const Data = datas;
    const rows = Data;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [order, setOrder] = useState();
    const [orderby, setOrderby] = useState();
    const [fileterFn, setFilterFn] = useState({ fn: items => { return items } });

    const [maxPop, setMaxPop] = useState([]);
    const [toggleMax, setToggleMax] = useState(false);




    const classes = useStyles();

    const headCells = [
        { id: 'city', label: 'City' },
        { id: 'location', label: 'Location' },
        { id: 'pop', label: 'Population' },
        { id: 'state', label: 'State' }
    ]

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };




    const handleSortRequest = (headId) => {
        const isAsc = orderby === headId && order === "asc";
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderby(headId);
    }

    const stableSort = (array, comparator) => {

        const stabilishedThis = array.map((data, index) => [data, index]);

        stabilishedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        })
        return stabilishedThis.map((data) => data[0]);
    }

    const getComparator = (order, orderby) => {
        return order === 'desc'
            ? (a, b) => desendingComparator(a, b, orderby)
            : (a, b) => -desendingComparator(a, b, orderby)
    }

    const desendingComparator = (a, b, orderby) => {
        if (b[orderby] < a[orderby]) {
            return -1;
        }
        if (b[orderby] > a[orderby]) {
            return 1;
        }
        return 0;
    }

    const handleSearch = (e) => {
        let target = e.target.value;
        let targetVal = target.toString().toLowerCase();
        setFilterFn({
            fn: items => {
                if (target.value == "") {
                    return items;
                }
                else {
                    return items.filter(x => {
                        return Object.keys(x).some(key => {
                            return x[key].toString().toLowerCase().includes(targetVal);
                        })
                    });
                }

            }
        })
    }

    const handleMaxPopulation = () => {

        const maxVal = Math.max.apply(Math, rows.map(function (o) { return o.pop; }));

        const maxData = rows.filter(x => x.pop === maxVal)

        setMaxPop(maxData);
        setToggleMax(!toggleMax);


    }


    console.log(maxPop);
    return (
        <div className="table_page">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="table">
                <TextField
                    className={classes.root}
                    label="Search"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    onChange={handleSearch}
                />
                <Button className="maxPopButton" style={{ margin: " 10px 50px 10px 50px" }} variant="contained" onClick={handleMaxPopulation}>{toggleMax ? "GoBack" : "MaxPopulation"} </Button>

                <TableContainer>
                    <Tables>
                        <TableHead align="center" >
                            <TableRow >
                                {


                                    headCells.map(item => {
                                        return (
                                            <TableCell key={item.id}
                                                sortDirection={orderby === item.id ? order : false} >
                                                <TableSortLabel
                                                    active={orderby === item.id}
                                                    direction={orderby === item.id ? order : 'asc'}
                                                    onClick={() => { handleSortRequest(item.id) }} style={{ color: "white" }}>
                                                    {item.label}
                                                </TableSortLabel>
                                            </TableCell>
                                        )
                                    })
                                }


                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {
                                toggleMax ?
                                    (
                                        maxPop.map(item => {
                                            return (
                                                <TableRow key={item._id}  >
                                                    <TableCell style={{ color: "white" }} >
                                                        {item.city}
                                                    </TableCell>
                                                    <TableCell style={{ color: "white" }}>
                                                        {item.loc}
                                                    </TableCell>
                                                    <TableCell style={{ color: "white" }}>
                                                        {item.pop}
                                                    </TableCell>
                                                    <TableCell style={{ color: "white" }}>
                                                        {item.state}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    ) :
                                    (
                                        stableSort(fileterFn.fn(rows), getComparator(order, orderby)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                                            return (
                                                <TableRow key={item._id}>
                                                    <TableCell style={{ color: "white" }}>
                                                        {item.city}
                                                    </TableCell>
                                                    <TableCell style={{ color: "white" }}>
                                                        {item.loc}
                                                    </TableCell>
                                                    <TableCell style={{ color: "white" }}>
                                                        {item.pop}
                                                    </TableCell>
                                                    <TableCell style={{ color: "white" }}>
                                                        {item.state}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    )
                            }
                        </TableBody>
                    </Tables>

                </TableContainer>
                <TablePagination
                    style={{ color: "white" }}
                    component="div"
                    rowsPerPageOptions={[5, 10, 25]}
                    count={rows.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </div>
    )
}

export default TableData
