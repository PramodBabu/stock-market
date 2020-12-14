import React, {Component} from 'react' ;
import classes from './searchBar.css';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchString: ''
        }
    }

    captureQueryString = (event) => {
        this.setState({searchString: event.target.value});
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.props.searchParam(this.state.searchString); 
        }
    }

    render() {
        return(
            <div className={classes.SearchBarContainer}>
                <InputBase
                    className={classes.input}
                    placeholder='Search for a company'
                    inputProps={{ 'aria-label': 'Search for a company' }}
                    fullWidth={true}
                    onChange={this.captureQueryString}
                    onKeyDown={this.handleKeyPress}
                />
                <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                    onClick={() =>this.props.searchParam(this.state.searchString)}
                    disabled={this.state.searchString.trim() === ''}
                >
                    <SearchIcon />
                </IconButton>
            </div>
        );
    }
}

export default SearchBar;