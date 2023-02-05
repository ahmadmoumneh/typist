import React, { Component } from 'react';

import './style.css';

class Hand extends Component {
  render() {
    return (
      <div 
        className='hand' 
        onClick={() => this.props.setHandedness(this.props.side)}>
          <img
            src={this.props.image}
            alt={this.props.alt}
            ref={this.props.handRef}
            className='img' />
          <div className='handedness'>
            <input
              id={this.props.id}
              className='radio' 
              type='radio' 
              name='handedness'
              ref={this.props.radio}
              defaultChecked={this.props.defaultChecked} />
            <label 
              className='hand-label'
              htmlFor={this.props.id}>
                {this.props.label}
            </label>
          </div>
      </div>
    );
  }
}

export default Hand;