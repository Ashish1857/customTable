import React, { Component } from "react";
import "./App.css";
import BlockChain from "./blockChain/BlockChain";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-1">
          <BlockChain />
        </div>
      </div>
    );
  }
}

export default App;
