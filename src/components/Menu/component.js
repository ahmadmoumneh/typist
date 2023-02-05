import React, { Component } from 'react';
import './style.css';

class Menu extends Component {
  render() {
    return (
      <div className={`menu ${this.props.side}-menu`}>
        <div className='label title-label'>
          <strong>{this.props.title}</strong>
        </div>
        <div className="detail-labels">
          {this.props.details}
        </div>
      </div>
    );
  }
}

export default Menu;