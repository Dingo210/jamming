import React, { Component } from "react";
import "./SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: "" };

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search() {
    const { term } = this.state;
    const { onSearch } = this.props;
    if (term.length > 0) onSearch(term);
  }

  handleTermChange(e) {
    this.setState({ term: e.target.value }, this.search());
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
          autoFocus
        />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
