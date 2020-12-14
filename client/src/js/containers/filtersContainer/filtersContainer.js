import React, {Component} from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class FiltersContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companiesList: [],
            companiesFlag: true
        };
        this.switchMode = this.switchMode.bind(this);
    }

    componentWillMount() {
        this.loadCompanies('desc');
    }

    loadCompanies(order) {
        axios.post( 'http://localhost:5000/getCompaniesCloseByDate',{order})
            .then(res => {
                console.log(res);
                this.setState({companiesList: res.data.rows});
            })
            .catch(err => {
                console.log(err);
            });
    }

    switchMode() {
        this.setState({companiesFlag: !this.state.companiesFlag},() => {
            this.loadCompanies(this.state.companiesFlag ? 'desc' : 'asc')
        });
    }

    render () {
        console.log(this.state.companiesList);
        // let
        return (
            <React.Fragment>
                <button onClick={this.switchMode}>Switch Mode</button>
                {
                    this.state.companiesList.map(item => {
                        return (
                            <Card key={item.symbol}>
                                <CardContent>
                                    {item.symbol}
                            </CardContent>
                            </Card>
                        );
                    })
                }
            </React.Fragment>
            );
            
    }
};

export default FiltersContainer ;