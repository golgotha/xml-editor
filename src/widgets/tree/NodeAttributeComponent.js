import React from 'react';
import PT from 'prop-types';

const NodeAttributeComponent = ({name, value, level}) => {
    return (
      <li
        className="attribute"
        style={{marginLeft: 10 * level}}>
        <span>@{`${name}:`}</span>
        <span>{value}</span>
      </li>
    );
};

NodeAttributeComponent.propTypes = {
  name: PT.string.isRequired,
  value: PT.string.isRequired,
  level: PT.number.isRequired
};

export default NodeAttributeComponent;
