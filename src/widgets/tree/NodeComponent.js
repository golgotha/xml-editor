import React, {useState} from 'react';
import PT from 'prop-types';
import NodeAttributeComponent from './NodeAttributeComponent';
import {TEXT_NODE} from '../../model/Node';
import NodeElement from './NodeElement';
import TextNodeElement from './TextNodeElement';
import EditNodeComponent from './EditNodeComponent';

const NodeComponent = ({node, level, onCommit}) => {
  const keys = Object.keys(node.attributes);
  const [editNodeName, setEditNodeName] = useState(false);
  const [editAttributeValue, setEditAttributeValue] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const change = event => {
    const value = event.target.value;
    onCommit(value, node);
    setEditNodeName(false);
  };

  const onCollapse = event => {
    setExpanded(!expanded);
  };

  const isTextNode = node.type === TEXT_NODE;
  return (
    <ul style={{paddingLeft: 10 * (level + 1)}}>
      <li>
        {
          editNodeName ?
            <EditNodeComponent node={node} onChange={change}/>
            :
            (
              isTextNode ?
                (<TextNodeElement text={node.getTextContent()} onClick={() => setEditNodeName(true)}/>)
                :
                (
                  <React.Fragment>
                    <NodeElement name={node.name} onClick={() => setEditNodeName(true)}/>
                  </React.Fragment>
                )
            )
        }
      </li>
      <ul className="node-content" style={{display: expanded ? 'block' : 'none'}}>

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
            return <NodeComponent node={n}
                                  key={i}
                                  onCommit={onCommit}
                                  level={level}
            />
          })
        }
      </ul>
      {
        !isTextNode &&
        <span className="collapse-expand collapsed" onClick={onCollapse}>
          {expanded ? '-' : '+'}
        </span>}

    </ul>
  );
};

NodeComponent.propTypes = {
  node: PT.object.isRequired,
  level: PT.number.isRequired,
  onCommit: PT.func.isRequired
};

export default NodeComponent;
