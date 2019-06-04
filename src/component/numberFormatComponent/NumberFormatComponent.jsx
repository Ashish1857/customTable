import React from "react";
import "./NumberFormatComponent.css";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

const NumberFormatComponent = props => {
  return (
    <div
      className={
        (props.focusHighlightClassName === ""
          ? "c-numberFormatComponent"
          : "c-numberFormatComponent " + props.focusHighlightClassName) +
        (props.editable ? " " : " readOnly")
      }
 >
      <div className="tooltipContainer">
        {props.showTooltip ? (
          <div className="tooltip">
            <span className="tooltiptext">
              {props.tooltipMessage}
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="headerClass">
        {props.header}
        <span className="markRequired">{props.required ? " *" : ""}</span>
      </div>
      <span className="textboxContainer">
        {props.editable ? (
         <NumberFormat 
          isAllowed={props.isAllowed}
          prefix={props.prefix} 
          suffix={props.suffix}
          value={props.value} 
          displayType={props.displayType} 
          thousandSeparator={props.thousandSeparator}
          format={props.format}
          decimalSeparator={props.decimalSeparator}
          onValueChange={props.onValueChange}
          allowNegative={false}
          fixedDecimalScale={props.fixedDecimalScale}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          //onChange={props.onChange}
          //isNumericString ={true}
           />
        ) : (
          props.value
        )}
      </span>
    </div>
  );
};

NumberFormatComponent.propTypes = {
  header: PropTypes.string,
  value: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  focusHighlightClassName: PropTypes.string,
  watermark: PropTypes.string,
  editable: PropTypes.bool,
  pattern: PropTypes.string,
  onInvalid: PropTypes.func,
  required: PropTypes.bool,
  tooltip: PropTypes.string,
  onKeyDown: PropTypes.func,


  displayType:PropTypes.string,
  thousandSeparator:PropTypes.string
};

NumberFormatComponent.defaultProps = {
  decimalSeparator:".",
  thousandSeparator:",",
  header: "Number Component",
  value: "",
  onFocus: function(e) {
    console.log(e.target.value);
  },
  onBlur: function(e) {
    console.log(e.target.value);
  },
  focusHighlightClassName: "",
  watermark: "(0-999)",
  editable: true,
  pattern: "(.*?)",
  onInvalid: function(e) {
    console.log(e.target.value);
  },
  onKeyDown: function(e) {
    console.log(e.target.value);
  },
  required: false,
  tooltip: "",
  timeNotSelected: false,
  prefix:"",
  suffix:"",
};

export default NumberFormatComponent;
