import {TEXT_NODE} from './Node';

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
        if (node.type === TEXT_NODE && node.getTextContent()) {
          result += node.getTextContent();
        } else {
          result +=  `<${node.name} ${node.getAttributeString()}>`;
        }

      },
      node => {
        if (node.type !== TEXT_NODE) {
          result += '</' + node.name + '>';
        }
      });

    return result;
  }
}
