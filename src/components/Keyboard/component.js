import React, { Component } from 'react';

import Key from '../Key/component';

import './style.css';

class Keyboard extends Component {
  render() {
    const shiftKey = this.props.shiftKey;
    const capsLock = this.props.capsLock;

    return (
      <div className="keyboard-wrapper">
        <div className='keyboard'>
          <div className='row-1'><div>{this.props.keySet.filter((key) => key.index >= 0 && key.index < 13).map((key) => <Key key={key.keyID} location={key.location} text={shiftKey? key.keyDown : key.keyUp} size='regular' keyID={key.keyID} pressedKeys={this.props.pressedKeys} exactKeys={this.props.previousKeys} />)}</div><Key key={this.props.keySet[13].keyID} location={this.props.keySet[13].location} text={this.props.keySet[13].keyUp} size='backspace' keyID={this.props.keySet[13].keyID} pressedKeys={this.props.pressedKeys} exactKeys={this.props.previousKeys} /></div>
          <div className='row-2'><Key key={this.props.keySet[14].keyID} location={this.props.keySet[14].location} text={this.props.keySet[14].keyUp} size='tab' keyID={this.props.keySet[14].keyID} pressedKeys={this.props.pressedKeys} exactKeys={this.props.previousKeys} /><div>{this.props.keySet.filter((key) => key.index >= 15 && key.index < 27).map((key) => <Key key={key.keyID} location={key.location} text={shiftKey || (key.index >= 15 && key.index < 25 && capsLock)? key.keyDown : key.keyUp} size='regular' keyID={key.keyID} pressedKeys={this.props.pressedKeys} exactKeys={this.props.previousKeys} />)}</div><Key key={this.props.keySet[27].keyID} location={this.props.keySet[27].location} text={this.props.keySet[27].keyUp} size='backslash' keyID={this.props.keySet[27].keyID} pressedKeys={this.props.pressedKeys} exactKeys={this.props.previousKeys} /></div>
          <div className='row-3'><Key key={this.props.keySet[28].keyID} location={this.props.keySet[28].location} text={this.props.keySet[28].keyUp} size='caps-lock' keyID={this.props.keySet[28].keyID} pressedKeys={this.props.pressedKeys} exactKeys={this.props.previousKeys} /><div>{this.props.keySet.filter((key) => key.index >= 29 && key.index < 40).map((key) => <Key key={key.keyID} location={key.location} text={shiftKey || (key.index >= 29 && key.index < 38 && capsLock)? key.keyDown : key.keyUp} size='regular' keyID={key.keyID} pressedKeys={this.props.pressedKeys} exactKeys={this.props.previousKeys} />)}</div><Key key={this.props.keySet[40].keyID} location={this.props.keySet[40].location} text={this.props.keySet[40].keyUp} size='enter' keyID={this.props.keySet[40].keyID} pressedKeys={this.props.pressedKeys} exactKeys={this.props.previousKeys} /></div>
          <div className='row-4'><Key key={this.props.keySet[41].keyID} location={this.props.keySet[41].location} text={this.props.keySet[41].keyUp} size='shift-left' keyID={this.props.keySet[41].keyID} pressedKeys={this.props.pressedKeys} exactKeys={this.props.previousKeys} /><div>{this.props.keySet.filter((key) => key.index >= 42 && key.index < 52).map((key) => <Key key={key.keyID} location={key.location} text={shiftKey || (key.index >= 42 && key.index < 48 && capsLock)? key.keyDown : key.keyUp} size='regular' keyID={key.keyID} pressedKeys={this.props.pressedKeys} exactKeys={this.props.previousKeys} />)}</div><Key key={this.props.keySet[52].keyID} location={this.props.keySet[52].location} text={this.props.keySet[52].keyUp} size='shift-right' keyID={this.props.keySet[52].keyID} pressedKeys={this.props.pressedKeys} exactKeys={this.props.previousKeys} /></div>
          <div className='row-5'><div className='gap'></div><Key key={this.props.keySet[53].keyID} location={this.props.keySet[53].location} size='space' keyID={this.props.keySet[53].keyID} pressedKeys={this.props.pressedKeys} exactKeys={this.props.previousKeys} /> 
            <div className='reference'>
              <div className='reference-content' onClick={this.props.displayReference}>
                <input id='checkbox' ref={this.props.checkbox}
                  className='checkbox' 
                  type='checkbox' />
                <label htmlFor='checkbox'><span className='reference-text'>Reference</span></label>
              </div>
            </div>
            <div className='row-5-gap-right'></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Keyboard;