import React, {Component, Fragment} from 'react';
import {
    Grid,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    CssBaseline,
    Typography,
    Container
} from '@material-ui/core';
import Papa from 'papaparse';
import Constants from '../../utils/constants';
import axios from 'axios';
import {connect} from 'react-redux';
import updateRows from '../../redux/actions/updateRows';
import './home.css'

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: 0,
            amountExpenses: 0,
            amountTime: 0,
            order: 'desc',
            orderBy: 'amount'
        }
    }

    componentDidMount() {
        this.getDataFromDB();
    }

    getDataFromDB = async () => {
        try {

            const responseTime = await axios.get(Constants.URL_TIME);
            const responseExpense = await axios.get(Constants.URL_EXPENSE);
            const response = this.getDataEndPoint(responseTime, responseExpense);
            this.props.updateRows(response);
        } catch (e) {
            console.log(e);
        }
    }

    getDataEndPoint = (time, expense) => {
        let data = [];

        if (time.data.length !== 0) {
            data = this.setDataTable(time.data, Constants.FILE_TYPE_TIME);
        }
        if (expense.data.length !== 0) {
            if (data.length !== 0) {
                data = data.concat(this.setDataTable(expense.data, Constants.FILE_TYPE_EXPENSE));
            } else {
                data = this.setDataTable(expense.data, Constants.FILE_TYPE_EXPENSE);
            }
        }
        return data;
    }

    uploadFile = async file => {

        const parseFile = file => {
            return new Promise(resolve => {
                Papa.parse(file, {
                    complete: results => {
                        resolve(results);
                    }
                });
            });
        };
        let results = await parseFile(file.target.files[0]);
        if (this.checkHeader(results.data[0])) {
            delete results.data[0];
            let dataRequest = this.setDataRequest(results.data, this.checkType(results.data[1]));
            let data = this.setDataTable(dataRequest, this.checkType(results.data[1]))
            this.props.updateRows(data);
            this.setDataOnDB(dataRequest, this.checkType(results.data[1]));
        } else {
            window.alert('The file does not have the proper format');
        }
    };

    setDataRequest = (data, type) => {
        let array = [];
        if (type === Constants.FILE_TYPE_EXPENSE) {
            data.map(row => {
                array.push({
                    incurredDate: row[0],
                    memo: row[1],
                    userName: row[2],
                    amount: row[3],
                    billable: row[4],
                    account: row[5]
                })
            })
        } else {
            data.map(row => {
                array.push({
                    entryDate: row[0],
                    userName: row[1],
                    comment: row[2],
                    billable: row[3],
                    amount: row[4]
                })
            })
        }

        return array;
    }

    setDataTable = (data, type) => {
        let users = [];
        data.map(user => {
            users.push({
                'id': user.id ? user.id : this.state.id++,
                'name': user.userName,
                'amount': Number(user.amount),
                'description': type === Constants.FILE_TYPE_EXPENSE ? user.memo : user.comment,
                'date': type === Constants.FILE_TYPE_EXPENSE ? user.incurredDate : user.entryDate,
                'billable': user.billable,
                'type': type === Constants.FILE_TYPE_EXPENSE ? Constants.FILE_TYPE_EXPENSE : Constants.FILE_TYPE_TIME
            })
            if (type === Constants.FILE_TYPE_EXPENSE) {
                this.setState({amountExpenses: Number(this.state.amountExpenses) + Number(user.amount)})
            } else {

                this.setState({amountTime: Number(this.state.amountTime) + Number(user.amount)})
            }
        })

        return users;
    }

    setDataOnDB = (dataRequest, type) => {
        type === Constants.FILE_TYPE_EXPENSE ? axios.post(Constants.URL_EXPENSE, dataRequest) : axios.post(Constants.URL_TIME, dataRequest)
    }

    checkType = data => {
        return data.length === Constants.MAX_HEADER_LENGTH ? Constants.FILE_TYPE_EXPENSE : Constants.FILE_TYPE_TIME;
    }

    checkHeader = header => {
        return (header.length <= Constants.MAX_HEADER_LENGTH) && (header[0].includes(Constants.HEADER_EXPENSES) || header[0].includes(Constants.HEADER_HOURS));
    }

    desc = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    handleRequestSort = property => event => {
        const isDesc = this.state.orderBy === property && this.state.order === 'desc';
        this.setState({
            order: isDesc ? 'asc' : 'desc',
            orderBy: property
        })
    }

    getSorting = (order, orderBy) => {

        return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
    }

    stableSort = (array, cmp) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = cmp(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    }

    render() {

        const headRows = [
            {id: 'name', numeric: false, disablePadding: true, label: 'Person'},
            {id: 'amount', numeric: true, disablePadding: false, label: 'Amount'},
            {id: 'description', numeric: true, disablePadding: false, label: 'Description'},
            {id: 'date', numeric: true, disablePadding: false, label: 'Date'},
            {id: 'billable', numeric: true, disablePadding: false, label: 'Billable'},
            {id: 'type', numeric: true, disablePadding: false, label: 'Type'}
        ];

        const {
            rows,
        } = this.props;

        return (

            <Fragment>
                <CssBaseline/>
                <div>
                    <Container>
                        {this.props.rows.length === 0 ?
                            <Typography variant="h5" component="h3" className="page-message" align="center">
                                Please upload a valid File
                            </Typography>
                            :
                            <div className="table">
                                <Paper>
                                    <Table>
                                        <TableHead>
                                            {headRows.map(row => (
                                                <TableCell key={row.id}
                                                           scope="row"
                                                           align="center"
                                                >
                                                    <TableSortLabel
                                                        direction={this.state.order}
                                                        onClick={this.handleRequestSort(row.id)}
                                                    >
                                                        {row.label}
                                                    </TableSortLabel>
                                                </TableCell>

                                            ))}
                                        </TableHead>
                                        <TableBody>
                                            {this.stableSort(this.props.rows, this.getSorting(this.state.order, this.state.orderBy)).map(row => (
                                                <TableRow key={row.id}>
                                                    <TableCell align="left">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="right">{row.amount}</TableCell>
                                                    <TableCell align="left">{row.description}</TableCell>
                                                    <TableCell align="right">{row.date}</TableCell>
                                                    <TableCell align="right">{row.billable}</TableCell>
                                                    <TableCell align="right">{row.type}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </div>
                        }
                        <Grid container className="gridContainer">
                            {this.props.rows.length !== 0 ?
                                <Grid xs={6}>
                                    <Typography align={"center"}>Time: {this.state.amountTime}</Typography>
                                    <Typography align={"center"}>Expenses : {this.state.amountExpenses}</Typography>
                                    <Typography
                                        align={"center"}>Total: {this.state.amountTime + this.state.amountExpenses}</Typography>
                                </Grid>
                                :
                                <Grid xs={6}></Grid>
                            }
                            <Grid xs={6} alignItems={"right"}>
                                <input align="right"
                                       accept="text/csv"
                                       id="outlined-button-file"
                                       multiple
                                       type="file"
                                       onChange={this.uploadFile}
                                />
                                <label htmlFor="outlined-button-file">
                                    <Button variant="outlined" component="span">
                                        Upload
                                    </Button>
                                </label>
                            </Grid>
                        </Grid>

                    </Container>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    rows: state.rows,
});

const mapDispatchToProps = {

    updateRows
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);