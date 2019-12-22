import "./TableComponent.css";
import React from "react";
import ReactTable from "react-table";
import ReactSVG from "react-svg";
import "react-table/react-table.css";

const TableComponent = props => {
  let tableData = props.tableData;
  return (
    <div className="table-and-header-wrapper">
      <div className={"containerName " + props.containerClassName}>
        {props.containerName}
      </div>
      <div className="tableWrapper">
        <div className="tableContainer">
          <ReactTable
            className={props.borderHighlight}
            data={tableData}
            columns={props.columns}
            showPagination={false}
            minRows={props.minRows}
            collapseOnPageChange={false}
            collapseOnDataChange={false}
            pageSize={props.tableData.length}
          />

          {props.addRowHandler ? (
            <button
              className="addNewRowButton"
              onClick={e => props.addRowHandler(e)}
            >
              <div className="addNewRowButtonText">{"ADD ROW"}</div>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
TableComponent.defaultProps = {
  className: "",
  minRows: 0,
  borderHighlight: "",
  containerName: ""
};

export default TableComponent;
