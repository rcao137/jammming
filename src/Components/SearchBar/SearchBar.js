import React from 'react';
import './SearchBar.css'

// Class for song search, initially set search term to be empty  
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {term: ''}
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

//callback on search button click
  search() {
    this.props.onSearch(this.state.term);
  }

// callback on search field value change
  handleTermChange(e) {
    this.setState({term: e.target.value});
  }

// feature enhancement to trigge search by return button click
  handleEnter(e) {
    if (e.keyCode === 13) {
      // perform same method as search button click
      this.props.onSearch(this.state.term);
    }
  }

// Render Search Bar
  render() {
    return (
      <div className="SearchBar">
        <input type="text" onKeyDown={this.handleEnter} onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.search}>SEARCH</a>
      </div>);
  }
}

export default SearchBar;
