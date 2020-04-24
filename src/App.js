import React, { Component } from "react";
import "./App.css";
import { CardList } from "./components/CardList/CardList";
import { SearchBar } from "./components/SearchBar/SearchBar";

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: "",
      isLoading: false,
    };
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users, isLoading: false }));
  }
  render() {
    const { searchField, monsters } = this.state;
    let filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBar
          placeholder="Search Monsters"
          handleChange={this.handleChange}
        />
        {this.state.isLoading ? (
          <p>fetching data</p>
        ) : (
          <CardList
            monsters={filteredMonsters}
            loading={this.state.isLoading}
          />
        )}
      </div>
    );
  }
}

export default App;
