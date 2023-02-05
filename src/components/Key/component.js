import React, { Component } from 'react';
import './style.css';

class Key extends Component {
  render() {
    const exactKey = this.props.exactKeys.find(key => key.keyID === this.props.keyID);
    const anyKey = this.props.pressedKeys.length > 0;
    const thisKey = this.props.pressedKeys.find(key => key.keyID === this.props.keyID);
    const fitleredKeys = this.props.pressedKeys.filter(key => this.props.exactKeys.includes(key));
    const shiftKey = fitleredKeys.find(key => key.keyID === 'ShiftLeft' || key.keyID === 'ShiftRight');
    const correct = shiftKey || fitleredKeys.length === this.props.exactKeys.length;
    const homeKey = this.props.keyID === 'KeyF' ||  this.props.keyID === 'KeyJ';

    return (
      <div id={this.props.keyID} className={`key key-up${exactKey? ' ' + this.props.location : ''} ${this.props.size}${anyKey? thisKey? correct? ' key-down-correct' : ' key-down-wrong' : '' : ''}`}>
        {homeKey? <div className='home-key'><span className='home-key-content'>-</span></div> : null}
        {this.props.text}
      </div>
    );
  }
}

export default Key;