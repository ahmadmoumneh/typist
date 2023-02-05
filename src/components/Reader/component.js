import React, { Component } from 'react';
import './style.css';

import rightHand from '../../assets/images/right-hand.png';
import rightHanded from '../../assets/images/right-handed.png';

import Hand from '../Hand/component';

class Reader extends Component {
  render() {
    const paragraphs = this.props.paragraphs;

    let corrector = null;

    if (paragraphs.length > 0) {
      const paragraphIndex = this.props.paragraphIndex;
      const words = this.props.getWords();
    
      corrector = words.map((word, wordIndex) => 
        <div key={`p${paragraphIndex}w${wordIndex}`}>
          {word.split('').map((letter, letterIndex) => 
            <span key={`p${paragraphIndex}w${wordIndex}l${letterIndex}`} id={`p${paragraphIndex}w${wordIndex}l${letterIndex}`}>
              {letter}
            </span>)}
            <span key={`p${paragraphIndex}w${wordIndex}l${word.length}`} id={`p${paragraphIndex}w${wordIndex}l${word.length}`}>&nbsp;</span>
        </div>);
    }

    return (
      <div className="reader-wrapper">
        <div className='reader'>
          <div className='reader-content'>
            <Hand 
              side='left'
              handRef={this.props.leftHand}
              image={rightHanded}
              alt='Left Hand'
              id='left-handed'
              radio={this.props.leftRadio}
              defaultChecked={false}
              label='Left-handed'
              setHandedness={this.props.setHandedness} />
            <div className='corrector-wrapper'>
              <div
                ref={this.props.corrector} 
                className='corrector'>
                  <div className='corrector-screen'>
                    <div className='corrector-content'>
                      {corrector}
                    </div>
                  </div>
              </div>
            </div>
            <Hand 
              side='right'
              handRef={this.props.rightHand}
              image={rightHand}
              alt='Right Hand'
              id='right-handed'
              radio={this.props.rightRadio} 
              defaultChecked={true}
              label='Right-handed'
              setHandedness={this.props.setHandedness} />
          </div>
        </div>
      </div>
    );
  }
}

export default Reader;