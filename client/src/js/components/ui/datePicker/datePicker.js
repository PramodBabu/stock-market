import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import classes from  './datePicker.css';

class DatePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tDate: '2018-01-02'
        }
    }

    captureQueryString = (event) => {
        event.preventDefault();
        this.setState({tDate: event.target.value}, () => {
            // console.log(this.state);
        });
    }

    render() {
        return (
            <div>
                <TextField
                    id="date"
                    label="Pick a date"
                    type="date"
                    defaultValue={this.state.tDate}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={this.captureQueryString}
                />
                <button className={classes.button}
                    onClick={() => this.props.getDate(this.state.tDate)}
                >
                    Search
                </button>
            </div>
        );
    }
}

export default DatePicker;