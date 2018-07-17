import React from 'react';
import './SearchBar.css'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {term: ''}
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  handleTermChange(e) {
    this.setState({term: e.target.value});
  }

  handleEnter(e) {
    if (e.keyCode === 13) {
      this.props.onSearch(this.state.term);// Trigger the button element with a click
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input type="text" onKeyDown={this.handleEnter} onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.search}>SEARCH</a>
      </div>);
  }
}

export default SearchBar;
