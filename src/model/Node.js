
export const ELEMENT_NODE = 1;
export const TEXT_NODE = 3;

export default class Node {

    static index = 0;

    constructor(name, type, parent) {
        this.name = name;
        this.parent = parent;
        this.type = type;
        this.attributes = {};
        this.nodes = [];
        this.index = Node.index++;
    }

    name() {
        return this.name;
    }

    static createNode(name, type, parent) {
      return new Node(name, type, parent);
    }

    getIndex() {
        return this.index;
    }

    getAttribute(name) {
        return this.attributes[name];
    }

    getAttributeString() {
        return Object.keys(this.attributes).map(key => {
            return key + '=' + '"' + this.getAttribute(key) + '"';
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

    getType() {
      return this.type;
    }

    setTextContent(textContent) {
        this.textContent = textContent;
    }

    getTextContent() {
      return this.textContent;
    }
}
