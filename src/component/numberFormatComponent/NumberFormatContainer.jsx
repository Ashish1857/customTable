import React from "react";
import NumberFormatComponent from "./NumberFormatComponent";

class NumberFormatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{"margin-left":"50px","margin-top":"50px"}}>
        <NumberFormatComponent
          prefix={"$"}
          thousandSeparator={"."}
          decimalSeparator={","}
          header={"Min"}
        />
        <NumberFormatComponent
          prefix={"¥"}
          thousandSeparator={","}
          decimalSeparator={"."}
          header={"Max"}
        />
        <NumberFormatComponent
          suffix={"%"}
         // thousandSeparator={","}
          decimalSeparator={"."}
          header={"Percentage"}
          required={true}
        />
      </div>
    );
  }
}
export default NumberFormatContainer;
