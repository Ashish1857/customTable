import React, { Component } from "react";

import "./CustomTable.css";
import Select from "react-select";
import ReactTable from "../tableComponent/TableComponent";

function TextBox(props) {
  return (
    <div className="textBox">
      <span className="dollarSign"> {"$"}</span> &nbsp;&nbsp;
      <span className="textField">
        <input
          type="text"
          value={props.value}
          onChange={e => props.onChangeMaterialFee(e, props.cellInfo)}
        ></input>
      </span>
    </div>
  );
}

function SelectBox(props) {
  return (
    <Select
      options={props.options}
      searchable={false}
      onChange={e => props.onChange(e, props.cellInfo)}
      isDisabled={false}
      value={props.value}
    />
  );
}

class CustomTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      itemOptions: [
        { label: "item 1", value: "item 1" },
        { label: "item 2", value: "item 2" }
      ],
      selectedItem: ""
    };
  }
  addRowHandler = () => {
    let data = [...this.state.data];

    let emptyRow = data.filter(
      x =>
        x.item === "" &&
        x.materialFee === "" &&
        x.packingfee === "" &&
        x.unpackingFee === ""
    );
    if (emptyRow.length === 0) {
      let newItem = {
        item: "",
        materialFee: "",
        packingfee: "",
        unpackingFee: ""
      };
      data.unshift(newItem);
      this.setState({
        data: data
      });
    }
  };

  deleteRow = (e, cellInfo) => {
    let data = [...this.state.data];
    data.splice(cellInfo.index, 1);
    this.setState({
      data: data
    });
  };

  onItemChange = (selectedOption, cellInfo) => {
    let data = [...this.state.data];
    data[cellInfo.index].item = selectedOption;

    this.setState({
      data: data
    });
  };
  onChangeMaterialFee = (e, cellInfo) => {
    let data = [...this.state.data];
    data[cellInfo.index].materialFee = e.target.value;

    this.setState({
      data: data
    });
  };

  onChangePackingFee = (e, cellInfo) => {
    let data = [...this.state.data];
    data[cellInfo.index].packingfee = e.target.value;

    this.setState({
      data: data
    });
  };
  onChangeUnPackingFee = (e, cellInfo) => {
    let data = [...this.state.data];
    data[cellInfo.index].unpackingFee = e.target.value;

    this.setState({
      data: data
    });
  };
  itemRenderer = cellInfo => {
    let inputType = cellInfo.column.inputType;

    return (
      <SelectBox
        options={this.state.itemOptions}
        onChange={this.onItemChange}
        value={cellInfo.original.item}
        cellInfo={cellInfo}
      />
    );
  };

  materialFeeRenderer = cellInfo => {
    return (
      <div>
        <TextBox
          value={cellInfo.original.materialFee}
          onChangeMaterialFee={this.onChangeMaterialFee}
          cellInfo={cellInfo}
        />
      </div>
    );
  };
  packingFeeRenderer = cellInfo => {
    return (
      <div>
        <TextBox
          value={cellInfo.original.packingfee}
          onChangeMaterialFee={this.onChangePackingFee}
          cellInfo={cellInfo}
        />
      </div>
    );
  };
  unpackingFeeRenderer = cellInfo => {
    return (
      <div>
        <TextBox
          value={cellInfo.original.unpackingFee}
          onChangeMaterialFee={this.onChangeUnPackingFee}
          cellInfo={cellInfo}
        />
        <div
          className="deleteIcon"
          style={{ display: "inline-flex", float: "right" }}
          onClick={e => this.deleteRow(e, cellInfo)}
        >
          X
        </div>
      </div>
    );
  };

  render() {
    let columns = [
      {
        Header: "Item",
        inputType: "select",
        Cell: this.itemRenderer
      },
      {
        Header: "Material Fee",
        accessor: "materialFee",
        inputType: "currency",
        Cell: this.materialFeeRenderer
      },
      {
        Header: "Packing Fee",
        accessor: "packingfee",
        inputType: "currency",
        Cell: this.packingFeeRenderer
      },
      {
        Header: "Unpacking Fee",
        accessor: "unpackingFee",
        inputType: "currency",
        Cell: this.unpackingFeeRenderer
      }
    ];
    return (
      <div className="customTable">
        <ReactTable
          columns={columns}
          tableData={this.state.data}
          addRowHandler={this.addRowHandler}
        />
      </div>
    );
  }
}
export default CustomTable;
