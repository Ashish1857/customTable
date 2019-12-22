import React, { Component } from "react";
import "./App.css";
import CustomTable from "./containers/customTable/CustomTable";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="table">
          <CustomTable />
        </div>
      </div>
    );
  }
}

export default App;
