import React, { Component } from "react";
import { sha256 } from "js-sha256";
import "./BlockChain.css";
import { prefixed } from "eventemitter3";

class Block {
  constructor(index, time, data, previousHashCode = "") {
    this.index = index;
    this.previousHashCode = previousHashCode;
    this.time = time;
    this.data = data;
    this.hash = this.getCurrentHashCode();
    this.nonce = 0;
  }

  getCurrentHashCode = () => {
    return sha256(
      this.index +
        this.previousHashCode +
        this.time +
        JSON.stringify(this.data) +
        this.nonce
    );
  };
}

/**
 * @class: To create a simple block chain
 */
class BlockChain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chain: [],
      OpenAddBlockPopUp: false,
    };
    this.showBlockChain = this.showBlockChain.bind(this);
  }

  createInitialBlock = () => {
    return new Block(
      1,
      new Date().getTime(),
      { recipent: "ashish", Amount: 10 },
      "0"
    );
  };

  getCurrentBlock = () => {
    return this.state.chain[this.state.chain.length - 1];
  };

  addBlock = block => {
    block.previousHashCode = this.getCurrentBlock().hash;
    block.hash = new Block().getCurrentHashCode();
    this.state.chain.push(block);
  };
  /**This method will validate each block as follows:
   * 1. It will compare the stored hash code with the dynamic calculated hash code of the current block.
   * 2. It will compare the the previous hash code stored in the block with the dynamic calculated hashcode of the previous block.
   * @see: Check starts from the index 1 as 1st block is generic/genesis block which is added by default.
   */
  validateChain = () => {
    let chain = this.state.chain;

    chain.forEach((block, index) => {
      if (
        index > 0 &&
        (block.hash !== block.getCurrentHashCode() ||
          block.previousHashCode !== chain[index - 1].hash)
      )
        return false;
      else return true;
    });
  };

  componentWillMount() {
    let chain = this.state.chain;
    chain.push(this.createInitialBlock());
  }

  showBlockChain() {
    let chain = this.state.chain;
    return (
      <div>
        {chain.length > 0 &&
          chain.map(data => (
            <div key={data.index}>
              <div style={{ color: "red" }}>
                <span>
                  index:{data.index} <br />
                  Payload:{JSON.stringify(data.data)}
                  <br />
                  Hash Code:{data.hash}
                  <br />
                  previous HashCode: {data.previousHashCode}
                  <br />
                  timeStamp:{data.time}
                  <br />
                  nonce:{data.nonce}
                  <br />
                </span>
              </div>
              <span>{"---------"}</span>
            </div>
          ))}
      </div>
    );
  }

  addBlockHandler() {
    let chain = this.state.chain;
    let Length = chain.length;
    // this.setState({
    //   OpenAddBlockPopUp: !this.state.OpenAddBlockPopUp,
    // });
    chain.push(
      new Block(
        Number(chain[chain.length - 1].index + 1),
        new Date().getTime(),
        { reciever: "ashish", Amount: 100 },
        chain.length - 1 > 0 ? chain[chain.length - 2].hash : 0
      )
    );
    this.setState({ chain: chain });
  }
  render() {
    return (
      <div className="zx">
        {this.showBlockChain()}

        <button onClick={() => this.addBlockHandler()}>Add Block</button>
      </div>
    );
  }
}
export default BlockChain;
