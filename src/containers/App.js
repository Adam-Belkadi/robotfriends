import React, { Component } from 'react';
import CardList from '../components/CardList.js';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll.js';
import ErrorBoundary from '../components/ErrorBoundry.js';
import './App.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: '',
    };
  }

  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => this.setState({ robots: data }));
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };
  render() {
    const filteredRobots = this.state.robots.filter((robot) =>
      robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
    );
    return (
      <div className="tc">
        <h1 className='f1'>RobotFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundary>
             <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }
}

export default App;
