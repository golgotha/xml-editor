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

  setAttribute(name, value) {
    this.attributes[name] = value;
  }

  getNodes() {
    return this.nodes;
  }

  addNode(node) {
    this.nodes.push(node);
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

  iterate() {
    const iterateTreeNode = (nodes, level, onCallBack) => {
      nodes.forEach(node => {
        // console.debug(new Array(level).join(' ') + node.name + ' ' + node.index);
        onCallBack(node, level);
        if (node.nodes.length > 0) {
         iterateTreeNode(node.nodes, level + 1, onCallBack);
        }
      })
    };

    const result = [];
    iterateTreeNode(this.nodes, 0, (node, level) => {
      result.push({node, level});
    });

    return result;
  }
}
