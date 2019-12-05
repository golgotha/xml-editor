import React from 'react';
import PT from 'prop-types';

const NodeComponent = ({node, level}) => {
  const keys = Object.keys(node.attributes);

  return (
    <ul>

      <li style={{marginLeft: 10 * level}}>
        <span className="node">
          {node.name + ' ' + node.index}
        </span>
      </li>

      {
        keys.length > 0 && keys.map(key => {
          return (
            <li
              className="attribute"
              key={key}
              style={{marginLeft: 10 * level}}>
              @{`${key}: ${node.attributes[key]}`}
            </li>
          )
        })
      }

      {
        node.nodes.length > 0 && node.nodes.map((n,i) => {
          return <NodeComponent node={n}
                                key={i}
                                level={level + 1}
          />
        })
      }
    </ul>
  );
};

NodeComponent.propTypes = {
  node: PT.object,
  level: PT.number

};

export default NodeComponent;
