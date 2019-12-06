import React from 'react';
import PT from 'prop-types';

const TextNodeElement = ({text, onClick}) => (
  <span onClick={onClick}>
    {text}
  </span>
);

TextNodeElement.propTypes = {
  text: PT.string.isRequired,
  onClick: PT.func.isRequired
};

export default TextNodeElement;
