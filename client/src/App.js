import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Projects from "./Components/Projects";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/projects")
      .then(res => this.setState({ projects: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
          <h1>Projects</h1>
        <Projects projects={this.state.projects} />
      </div>
    );
  }
}

export default App;
