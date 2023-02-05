import React, { Component } from 'react';

import './style.css';
import methods from './methods';

class ReportModal extends Component {
  constructor(props) {
    super(props);

    this.averageWPM = methods.averageWPM.bind(this);
  }

  render() {
    const accuracy = this.props.accuracy;
    const errors = this.props.errors;
    const wpms = this.props.wpms;
    const averageWPM = wpms.length > 0? this.averageWPM(wpms) : 0;

    return (
      <div className='report-modal'>
        <div className="report-modal-content" >
          <div className="report-modal-background" ref={this.props.background}></div>
          <div className="close-header" ref={this.props.closer}><div onClick={this.props.close} className='close-report-modal'></div></div>
          <div className="report-details" ref={this.props.details}>
              <span><strong>Average WPM</strong>: {averageWPM}</span>
              <span><strong>Accuracy</strong>: {accuracy}%</span>
              <span><strong>Errors</strong>: {errors}</span>
            </div>
        </div>
      </div>
    );
  }
}

export default ReportModal;