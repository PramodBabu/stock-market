import React, {Component} from 'react';
import SearchBar from '../../components/ui/searchBar/searchBar';
import classes from './companyDescription.css';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';  
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Chart from "react-google-charts";
import DatePicker from '../../components/ui/datePicker/datePicker';


const classes1 = {
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    }
}

const columnHeader = [['date', 'low', 'open', 'close', 'high']];

class companyDescription extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companyInfo: [],
            companiesList: [],
            companiesFlag: true,
            showLoader: false,
            page: 0,
            rowsPerPage: 10,
            companyName: '',
            companyDetails: [],
            dataPoints: [],
            date: '2018-01-02'
        }
        this.switchMode = this.switchMode.bind(this);
        this.getDate = this.getDate.bind(this);
    }

    toggleLoader() {
        this.setState({showLoader: !this.state.showLoader});
    }

    componentWillMount() {
        const data = {
            companyName: 'TSLA'
        };
        axios.post('http://localhost:5000/getData', data).then(res => {
                //console.log(res);
                this.setState({companyInfo: res.data.data, companyName: res.data.data[0].symbol}, () => {
                    this.setState({dataPoints: this.state.companyInfo.map(item => {
                        return [item.date.substring(0,10), +item.low, +item.open, +item.close, +item.high]
                    })})
                });
                
               // console.log(this.state.dataPoints);
            }
        )
        .then(axios.post('http://localhost:5000/companyDetails', data)
        .then(resTwo => {
            this.setState({companyDetails: resTwo.data.data, showLoader: false});
           // console.log(this.state.companyDetails);
        }))
        .catch( err => {
                //console.log(err);
        });
        this.loadCompanies('desc');
    }

    switchMode() {
        this.setState({companiesFlag: !this.state.companiesFlag},() => {
            this.loadCompanies(this.state.companiesFlag ? 'desc' : 'asc')
        });
    }

    getDate = (str)  => {
        console.log(str);
        this.setState({date: str}, ()=>{
            this.loadCompanies()
        })
    }

    loadCompanies(order='desc') {
        this.setState({showLoader: true});
        const date = this.state.date;
        axios.post( 'http://localhost:5000/getCompaniesCloseByDate', {order, date})
            .then(res => {
                //console.log(res);
                this.setState({companiesList: res.data.rows, showLoader: false});
            })
            .catch(err => {
                console.log(err);
                this.setState({showLoader: false});
            });
    }

    searchParam = (str) => {
        this.setState({showLoader: true});
        const data = {
            companyName: str.toUpperCase()
        };
        axios.post('http://localhost:5000/getData', data)
        .then(resOne => {
            this.setState({companyInfo: resOne.data.data, showLoader: false, companyName: resOne.data.data[0].symbol}, () => {
                this.setState({dataPoints: this.state.companyInfo.map(item => {
                    return [item.date.substring(0,10), +item.low, +item.open, +item.close, +item.high]
                })})
            });
            // console.log(this.state.dataPoints);
        })
        .then(axios.post('http://localhost:5000/companyDetails', data)
        .then(resTwo => {
            this.setState({companyDetails: resTwo.data.data, showLoader: false});
            console.log(this.state.companyDetails);
        }))
        .catch( err => {
            console.log(err);
            this.setState({showLoader: false});
        })
    }

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: event.target.value, page: 0})
    };

    renderCompanyInfo() {
        
        const rows = this.state.companyInfo.map(item => {
            return { 
                date: item.date.substring(0,10), 
                open: parseFloat(item.open).toFixed(2),
                close: parseFloat(item.close).toFixed(2),
                adjustedClose: parseFloat(item.adjusted_close).toFixed(2),
                high: parseFloat(item.high).toFixed(2),
                low: parseFloat(item.low).toFixed(2),
                volume: item.volume 
            }
        });

        const columns = [
            { id: 'date', label: 'Date', minWidth: 90 },
            { id: 'open', label: 'Open', minWidth: 50, align: 'right' },
            { id: 'close', label: 'Close', minWidth: 50, align: 'right' },
            { id: 'adjustedClose', label: 'Adjusted\u00a0Close', minWidth: 50, align: 'right' },
            { id: 'high', label: 'High', minWidth: 50, align: 'right' },
            { id: 'low', label: 'Low', minWidth: 50, align: 'right' },
            { id: 'volume', label: 'Volume', minWidth: 80, align: 'right' },
          ];

        return (
            <Paper className={classes1.root}>
            <TableContainer className={classes1.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                            const value = row[column.id];
                            return (
                            <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 15, 20]}
                component="div"
                count={rows.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
            </Paper>
        );
    }

    render() {
        // const name = this.state.companyInfo[0].symbol;
        // console.log(columnHeader.concat(this.state.dataPoints));
        return(
            <React.Fragment>
                <div className={classes.backdrop}>
                <Backdrop open={this.state.showLoader} onClick={() => this.setState({showLoader: false})}>
                    <CircularProgress color="white" />
                </Backdrop>
                </div>
                <div className={classes.home}>
                    <div>
                    <DatePicker 
                        getDate={this.getDate}
                    />
                    <button
                        className={classes.button}
                        onClick={this.switchMode}
                    >
                        {this.state.companiesFlag ? 'Show bottom 10' : 'Show top 10'}
                    </button>
                        <br />
                        {this.state.companiesList.map(item => {
                                return (
                                    <div>
                                        <Card 
                                            className={classes.cards} 
                                            key={item.symbol} 
                                            onClick={() => this.searchParam(item.symbol)} 
                                            variant="outlined" 
                                        >
                                            <CardContent className={classes.cardContent}>
                                                <span>{item.symbol}</span>
                                                <span>${parseFloat(item.close).toFixed(2)}</span>
                                            </CardContent>
                                        </Card>
                                        <br />
                                    </div>
                                );
                            })}
                    </div>
                    <div className={classes.companyDescription}>
                        <SearchBar searchParam={this.searchParam}/>
                        {this.state.companyDetails.map(item => {
                            return (
                                <div className={classes.description}>
                                    <table>
                                        <tr>
                                            <td><h3>{item.companyname} ({item.symbol})</h3></td>
                                        </tr>
                                    </table>
                                    <table>
                                        <tr>
                                            <td><b>Stock Exchange:</b> {item.exchange}</td>
                                            <td><b>Sector:</b> {item.sector}</td>
                                        </tr>
                                    </table>
                                    <table>
                                        <tr>
                                            <td><b>Industry:</b> {item.industry}</td>
                                        </tr>
                                    </table>
                                </div>
                            )
                        })}
                        {
                            this.state.companyInfo.length > 0 ? this.renderCompanyInfo() : null
                        }
                    </div>
                    <div>
                        <Chart
                            width = {850}
                            height = {650}
                            chartType = "CandlestickChart"
                            loader = {<div>Loading Chart</div>}
                            data = {(columnHeader.concat((this.state.dataPoints).slice(0,50).reverse()))}
                            options = {{
                                legend: 'none',
                                title: 'Past 50 days company track',
                                titleTextStyle: {
                                    fontSize: 20,
                                },
                                bar: { groupWidth: '100%' },
                                candlestick: {
                                    fallingColor: { strokeWidth: 0, fill: '#a52714' },
                                    risingColor: { strokeWidth: 0, fill: '#0f9d58' },
                                },
                                fontSize: 14,
                                vAxis: {
                                    title: 'Price in ($)',
                                },
                                hAxis: {
                                    title: 'Date',
                                },
                                animation: {startup:  true},
                            }}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    };
};

export default companyDescription;