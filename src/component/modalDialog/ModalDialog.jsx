import React from "react";
import PropTypes from "prop-types";

import "./ModalDialog.css";

const ModalDialog = props => {
  if (!props.open) {
    return null;
  }
  return (
    <div className="c-modalDialog">
      <div className="backgroundOverlayStyle">
        <div className="windowStyle">
          <div className="content">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

ModalDialog.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node
};

export default ModalDialog;