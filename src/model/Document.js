export class Node {

  static index = 0;

  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
    this.attributes = {};
    this.nodes = [];
    this.index = Node.index++;
  }

  name() {
    return this.name;
  }

  static createNode(name, parent) {
    return new Node(name, parent)
  }

  getIndex() {
    return this.index;
  }

  getAttribute(name) {
    return this.attributes[name];
  }

  getAttributeString() {
    return Object.keys(this.attributes).map(key => {
      return key + '='+ '"' + this.getAttribute(key) + '"';
    }).join(' ');
  }

  setAttribute(name, value) {
    this.attributes[name] = value;
  }

  getNodes() {
    return this.nodes;
  }

  addNode(node) {
    this.nodes.push(node);
  }

  setTextContent(textContent) {
    this.textContent = textContent;
  }
}


export default class Document {

  constructor() {
    this.nodes = [];
  }

  static createDocument() {
    return new Document();
  }

  getNodes() {
    return this.nodes;
  }

  iterate(onCallback) {
    const iterateTreeNode = (nodes, level, onCallBack) => {
      nodes.forEach(node => {
        // console.debug(new Array(level).join(' ') + node.name + ' ' + node.index);
        onCallBack(node, level);
        if (node.nodes.length > 0) {
          iterateTreeNode(node.nodes, level + 1, onCallBack);
        }
      })
    };

    iterateTreeNode(this.nodes, 0, onCallback);
  }

  getString() {
    const iterateTreeNode = (nodes, level, onStart, onEnd) => {
      nodes.forEach(node => {
        onStart(node);
        if (node.nodes.length > 0) {
          iterateTreeNode(node.nodes, level + 1, onStart, onEnd);
        }
        onEnd(node);
      })
    };

    let result = '<?xml version="1.0" encoding="UTF-8"?>\n';
    iterateTreeNode(this.nodes, 0, node => {
        result +=  `<${node.name} ${node.getAttributeString()}>${node.textContent}`;
      },
      node => {
        result += '</' + node.name + '>';
      });

    return result;
  }
}
