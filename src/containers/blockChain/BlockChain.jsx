import React, { Component } from "react";
import { sha256 } from "js-sha256";
import "./BlockChain.css";
import ModalDialog from "../../component/modalDialog/ModalDialog";
import Button from "../../component/genericimagebutton/GenericImageButton";
import TextBox from "../../component/textbox/TextboxWithLabelAndWatermark";
import NumberFormatComponent from "../../component/numberFormatComponent/NumberFormatComponent";

class Block {
  constructor(index, data = {}, previousHashCode = "") {
    let currrentDate = new Date();
    let month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    this.index = index;
    this.previousHashCode = previousHashCode;
    this.time =
      currrentDate.getDate() +
      " " +
      month[currrentDate.getMonth()] +
      " " +
      currrentDate.getFullYear();
    this.data = data;
    this.hash = this.getCurrentHashCode();
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
      sender: "",
      receiver: "",
      amount: "",
      formatedAmount: "",
      buttonDisabled: true,
      isChainvalid:true
    };
    this.showBlockChain = this.showBlockChain.bind(this);
    this.openOrCloseAddBlockModal = this.openOrCloseAddBlockModal.bind(this);
    this.addBlockHandler = this.addBlockHandler.bind(this);
    this.amountOnchange = this.amountOnchange.bind(this);
    this.senderOnchange = this.senderOnchange.bind(this);
    this.receiverOnchange = this.receiverOnchange.bind(this);
  }

  createInitialBlock = () => {
    return new Block(1, { recipent: "Basic", Amount: 1 }, "0");
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
        this.setState({
          isChainvalid: false,
        });
      else {
        this.setState({
          isChainvalid: true,
        });
      }
    });
  };
  //TODO

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
              <div className="block">
                <span>
                  index: {data.index} <br />
                  Transaction: {JSON.stringify(data.data)}
                  <br />
                  Hash Code: {data.hash}
                  <br />
                  previous HashCode: {data.previousHashCode}
                  <br />
                  timeStamp: {data.time}
                  <br />
                </span>
              </div>
            </div>
          ))}
      </div>
    );
  }

  openOrCloseAddBlockModal() {
    this.setState({
      OpenAddBlockPopUp: !this.state.OpenAddBlockPopUp,
    });
    this.setState({
      sender: "",
      receiver: "",
      formatedAmount: "",
      buttonDisabled: true,
    });
  }

  addBlockHandler() {
    let chain = this.state.chain;
    let transaction = {};
    transaction = {
      sender: this.state.sender,
      receiver: this.state.receiver,
      amount: this.state.formatedAmount,
    };

    this.addBlock(
      new Block(
        Number(chain[chain.length - 1].index + 1),
        transaction,
        chain.length - 1 > 0 ? chain[chain.length - 2].hash : 0
      )
    );

    this.openOrCloseAddBlockModal();
  }
  receiverOnchange(e) {
    this.setState({
      receiver: e.target.value,
    });
  }
  senderOnchange(e) {
    this.setState({
      sender: e.target.value,
    });
  }
  amountOnchange(value) {
    this.setState({
      formatedAmount: value.formattedValue,
      amount: value.floatValue,
    });
  }

  enableAddButton = () => {
    let sender = this.state.sender;
    let receiver = this.state.receiver;
    let amount = this.state.formatedAmount;

    if (sender !== "" && receiver !== "" && amount !== "" && amount !== null)
      this.setState({
        buttonDisabled: false,
      });
    else {
      this.setState({
        buttonDisabled: true,
      });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.sender !== this.state.sender ||
      prevState.receiver !== this.state.receiver ||
      prevState.formatedAmount !== this.state.formatedAmount
    )
      this.enableAddButton();

    if (prevState.chain !== this.state.chain) {
      this.validateChain();
    }
  }
  render() {
    return (
      <div className="blockChainWrapper">
        <div className="blockWrapper">{this.showBlockChain()}</div>

        <Button
          onButtonClickHandler={this.openOrCloseAddBlockModal}
          label={"Add Block"}
        />
        <span>
          * Chain is Valid? {this.state.isChainvalid ? "true" : "false"}
        </span>

        <ModalDialog open={this.state.OpenAddBlockPopUp}>
          <div>
            <div style={{ height: "223px" }}>
              <span className="header"> {"Add Block"}</span>
              <div className="textboxWrapper">
                <TextBox
                  header={"Sender"}
                  onChange={this.senderOnchange}
                  value={this.state.sender}
                />
                <TextBox
                  header={"Receiver"}
                  onChange={this.receiverOnchange}
                  value={this.state.receiver}
                />
                <NumberFormatComponent
                  thousandSeparator={","}
                  header={"Amount"}
                  onValueChange={this.amountOnchange}
                  value={this.state.formatedAmount}
                />
              </div>
            </div>
            <div className="addOrCancelWrapper">
              <Button
                onButtonClickHandler={this.addBlockHandler}
                label={"Add"}
                disabled={this.state.buttonDisabled}
              />

              <Button
                onButtonClickHandler={this.openOrCloseAddBlockModal}
                label={"Cancel"}
              />
            </div>
          </div>
        </ModalDialog>
      </div>
    );
  }
}
export default BlockChain;
