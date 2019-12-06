import React, {useState} from 'react';
import PT from 'prop-types';
import NodeAttributeComponent from './NodeAttributeComponent';

const ElementNode = ({node, level, onCommit}) => {
  const keys = Object.keys(node.attributes);
  const [editNodeName, setEditNodeName] = useState(false);
  const [editAttributeValue, setEditAttributeValue] = useState(false);

  const change = event => {
    const value = event.target.value;
    onCommit(value, node);
    setEditNodeName(false);
  };

  const onKeyUp = event => {
    if (event.keyCode === 13) {
      change(event);
    }
  };

  return (
    <ul>
      <li style={{marginLeft: 10 * level}}>

        {
          editNodeName ?
            <input type="text"
                   defaultValue={node.name}
                   onBlur={event => change(event)}
                   onKeyUp={event => onKeyUp(event)}
            />
            :
            (<span className="node" onClick={() => setEditNodeName(true)}>
              {node.name + ' ' + node.index}
            </span>)

        }
      </li>

      {
        keys.length > 0 && keys.map(key => {
          return (
            <NodeAttributeComponent key={key}
                                    level={level}
                                    name={key}
                                    value={node.getAttribute(key)}
            />
          )
        })
      }

      {
        node.nodes.length > 0 && node.nodes.map((n, i) => {
          return <ElementNode node={n}
                                key={i}
                                onCommit={onCommit}
                                level={level + 1}
          />
        })
      }
    </ul>
  );
}

ElementNode.propTypes = {
  node: PT.object.isRequired,
  level: PT.number.isRequired,
  onCommit: PT.func.isRequired
};

export default ElementNode;
