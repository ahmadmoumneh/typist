import React, { Component } from 'react';
import './style.css';

class Celebration extends Component {
  render() {
    return (
      <div className='celebration'>
        <img className='hide' width='411' height='480' alt='Celebration' ref={this.props.celebration} />
      </div>
    );
  }
}

export default Celebration;