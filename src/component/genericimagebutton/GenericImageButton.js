import React from 'react';
import propTypes from 'prop-types';
import './GenericImageButton.css';

const GenericImageButton = props => (
  <button className={props.buttonStyle} onClick={props.onButtonClickHandler}>
    <img src={props.image} alt="" className="iconButton" />
    <span className={props.buttonTextStyle}>{props.label}</span>
  </button>
);

GenericImageButton.defaultProps = {
  buttonStyle: 'c-genericImageButton',
  buttonTextStyle: 'buttonText',
  label: 'CREATE NEW STANDARD ACTIVITY'
};

GenericImageButton.proptypes = {
  /* This is the label of button*/
  label: propTypes.string.isRequired,
  /* This is the onClick Handler*/
  onButtonClickHandler: propTypes.func.isRequired
};
export default GenericImageButton;
