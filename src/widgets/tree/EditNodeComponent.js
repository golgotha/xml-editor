import React from 'react';
import PT from 'prop-types';
import {TEXT_NODE} from "../../model/Node";

const EditNodeComponent = ({node, onChange}) => {

  const onKeyUp = event => {
    if (event.keyCode === 13) {
      onChange(event);
    }
  };

    return (
      <React.Fragment>
        {
          node.type !== TEXT_NODE ?
          (
            <input type="text"
                   defaultValue={node.name}
                   autoFocus
                   onBlur={event => onChange(event)}
                   onKeyUp={event => onKeyUp(event)}
            />
          ) :
            (
              <textarea className="edit-text"
                        onBlur={event => onChange(event)}
                        defaultValue={node.getTextContent()}
              />
            )
        }
      </React.Fragment>
    );
}

EditNodeComponent.propTypes = {
  node: PT.object.isRequired,
  onChange: PT.func.isRequired
};

export default EditNodeComponent;
