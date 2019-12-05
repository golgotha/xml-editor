import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Document, {Node} from './model/Document';
import test from './test.json';
import NodeComponent from './widgets/tree/NodeComponent';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const parser = new DOMParser();
    const dom = parser.parseFromString(test.xml, "application/xml");
    const documentModel = Document.createDocument();
    const rootNodes = documentModel.getNodes();

    treeNode(dom.childNodes, rootNodes);

    function treeNode(nodes, newNodes) {
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.tagName) {
          const modelNode = Node.createNode(node.tagName);
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

  render() {
    const {document} = this.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        {
          document && document.iterate().map((item, index) => {
            return (
                <NodeComponent node={item.node}
                               key={index}
                               level={item.level}
                />
            )
          })
        }

        {
          document && document.getNodes().map((node, index) => {
            return (
              <NodeComponent node={node}
                             key={index}
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
