import React from 'react';
import PT from 'prop-types';

const NodeElement = ({name, onClick}) => {
  return (
    <span className="node" onClick={onClick}>
      {name}
    </span>
  );
}

NodeElement.propTypes = {
  name: PT.string.isRequired,
  onClick: PT.func.isRequired
};

export default NodeElement;
