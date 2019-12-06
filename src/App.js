import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Document, {Node} from './model/Document';
import test from './test.json';
import NodeComponent from './widgets/tree/NodeComponent';

class App extends Component {

  constructor(props) {
    super(props);
    this.parser = new DOMParser();
    this.state = {};
  }

  componentDidMount() {
    const dom = this.parser.parseFromString(test.xml, 'application/xml');
    const documentModel = Document.createDocument();
    const rootNodes = documentModel.getNodes();

    treeNode(dom.childNodes, rootNodes);

    function treeNode(nodes, newNodes) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        // Node.TEXT_NODE
        // console.debug(node.tagName, node.nodeType);
        if (node.tagName) {
          // console.debug(node.nodeValue + '\n');
          const modelNode = Node.createNode(node.tagName);
          modelNode.setTextContent(node.nodeValue);
          getListAttributes(node).forEach(attribute => modelNode.setAttribute(attribute.name, attribute.value));

          newNodes.push(modelNode);

          if (node.childNodes.length > 0) {
            treeNode(node.childNodes, modelNode.getNodes());
          }
        }

      }
    }

    function getListAttributes(node) {
      const result = [];
      for (let k = 0; k < node.attributes.length; k++) {
        const attribute = node.attributes[k];
        result.push({name: attribute.name, value: attribute.value});
      }
      return result;
    }

    // documentModel.iterate();
    this.setState({document: documentModel});
    // console.debug(dom)
  }

  onCommit = (value, node) => {
    console.debug(value)
    node.name = value;
    console.debug(node)
    this.setState({document: this.state.document});
  };

  onSave = event => {
    const {document} = this.state;
    document.iterate((node, level) => {
      console.debug(new Array(level).join(' ') + node.name + ' ' + node.index);
    });

    console.debug(this.parser.parseFromString(document.getString(), 'application/xml'));
    console.debug(document.getString());
  };

  render() {
    const {document} = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to XMl Editor</h2>
        </div>
        <nav>
          <button onClick={this.onSave}>Save</button>
        </nav>

        {
          document && document.getNodes().map((node, index) => {
            return (
              <NodeComponent node={node}
                             key={node.index}
                             onCommit={this.onCommit}
                             level={0}
              />
            )
          })
        }
      </div>
    );
  }
}

export default App;
