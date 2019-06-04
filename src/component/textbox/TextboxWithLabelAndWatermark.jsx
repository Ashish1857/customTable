import React from "react";
import PropTypes from "prop-types";

import "./TextboxWithLabelAndWatermark.css";

const TextboxWithLabelAndWatermark = props => (
  <div
    className={
      (props.focusHighlightClassName === ""
        ? "c-textboxWithLabelAndWatermark"
        : "c-textboxWithLabelAndWatermark " + props.focusHighlightClassName) +
      (props.editable ? " " : " readOnly")
    }
  >
    <div className="tooltipContainer">
      {props.timeNotSelected ? (
        <div className="tooltip">
          <span className={"tooltiptext " + props.timefieldName}>
            {props.timevalidationMessage}
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
        <input
          type="text"
          value={props.value}
          onChange={props.onChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          placeholder={props.watermark}
          pattern={props.pattern}
          onInvalid={props.onInvalid}
          required={props.required}
          title={props.tooltip}
          onKeyDown={props.onKeyDown}
          maxLength={props.textMaxLimit}
        />
      ) : (
        props.value
      )}
    </span>
  </div>
);

TextboxWithLabelAndWatermark.propTypes = {
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
  textMaxLimit: PropTypes.string,
};

TextboxWithLabelAndWatermark.defaultProps = {
  header: "Savings Type",
  value: "",
  onFocus: function(e) {},
  onBlur: function(e) {},
  onChange: function(e) {
    console.log(e.target.value);
  },
  focusHighlightClassName: "",
  watermark: "Enter Address ...",
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
  textMaxLimit: "256",
  timeNotSelected: false,
};

export default TextboxWithLabelAndWatermark;
