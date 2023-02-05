
import React, { Component } from 'react';

import methods from './methods';

import Keyboard from '../Keyboard/component';
import Reader from '../Reader/component';
import ReportModal from '../ReportModal/component'
import Celebration from '../Celebration/component';
import Menu from '../Menu/component';

import './style.css';
import material from '../../assets/json/stories.json';

import finish from '../../assets/images/finish.gif';
import leftHand  from '../../assets/images/left-hand.png'
import leftHanded from '../../assets/images/left-handed.png';
import rightHand from '../../assets/images/right-hand.png';
import rightHanded from '../../assets/images/right-handed.png';
import leftEmpty from '../../assets/images/left-empty.png';
import leftPinky from '../../assets/images/left-pinky.png';
import leftRing from '../../assets/images/left-ring.png';
import leftMiddle from '../../assets/images/left-middle.png';
import leftIndex from '../../assets/images/left-index.png';
import leftThumb from '../../assets/images/left-thumb.png';
import rightEmpty from '../../assets/images/right-empty.png';
import rightPinky from '../../assets/images/right-pinky.png';
import rightRing from '../../assets/images/right-ring.png';
import rightMiddle from '../../assets/images/right-middle.png';
import rightIndex from '../../assets/images/right-index.png';
import rightThumb from '../../assets/images/right-thumb.png';

class Typist extends Component {
  constructor(props) {
    super(props);

    this.initKeySet();

    const paragraphs = material.stories[0].content;
    const shiftLeft = this.keyMap.get('ShiftLeft');
    const keyO = this.keyMap.get('KeyO');

    this.state = {
      paragraphs: paragraphs,
      letter: 0,
      word: 0,
      paragraph: 0,
      exactKeys: [shiftLeft, keyO],
      previousKeys: [shiftLeft, keyO],
      pressedKeys: [],
      shiftKey: false,
      capsLock: false,
      error: false,
      status: 'idle',
      metrics: false,
      wpm: 0,
      wpms: [],
      previousLetter: 0,
      previousWord: 0,
      previousWPS: 0,
      second: 0,
      hits: 1,
      errors: 0,
      counter: 1,
      accuracy: 100
    }

    this.handedness = 'right';
    this.advanced = true;
    this.charMatch = /^[a-zA-Z0-9`~!@#$%^&*()-_=+[{\]}\\|;:'",<.>/?]{1}$/;
    this.paragraphReducer = (previous, current) => previous + '\n\n' + current;

    this.typeIn = this.typeIn.bind(this);
    this.typeOut = this.typeOut.bind(this);
    this.setPractice = this.setPractice.bind(this);
    this.setStory = this.setStory.bind(this);
    this.setCustomInput = this.setCustomInput.bind(this);
    this.setInputPolicy = this.setInputPolicy.bind(this);
    this.trimTextReadValue = this.trimTextReadValue.bind(this);
    this.addClickListener = this.addClickListener.bind(this);
    this.focusTextInput = this.focusTextInput.bind(this);
    this.displayReference = this.displayReference.bind(this);

    this.startMetrics = this.startMetrics.bind(this);
    this.stopMetrics = this.stopMetrics.bind(this);
    this.setWPM = this.setWPM.bind(this);

    this.showReport = methods.showReport.bind(this);
    this.hoverInReport = methods.hoverInReport.bind(this);
    this.hoverOutReport = methods.hoverOutReport.bind(this);
    this.closeModal = methods.closeModal.bind(this);

    this.getParagraph = methods.getParagraph.bind(this);
    this.getWords = methods.getWords.bind(this);
    this.getWord = methods.getWord.bind(this);
    this.getLetters = methods.getLetters.bind(this);
    this.getLetter = methods.getLetter.bind(this);

    this.setHandedness = methods.setHandedness.bind(this);
  }

  componentDidMount() {
    this.setExactKeyImages();
    this.highlightNextLetter();
    this.focusTextInput();
  }

  toggleStartMetricsButton(disabled) {
    this.stopMetricsButton.disabled = disabled;
  }

  toggleStopMetricsButton(disabled) {
    this.stopMetricsButton.disabled = disabled;
  }

  startMetrics() {
    const letterIndex = this.state.letter;
    const wordIndex = this.state.word;

    this.setState({
      wpm: 0,
      previousLetter: letterIndex,
      previousWord: wordIndex,
      previousWPS: 0,
      metrics: true
    }, () => {
      this.metrics = setInterval(this.setWPM, 1000);
      this.startMetricsButton.disabled = true;
      this.stopMetricsButton.disabled = false;
      this.focusTextInput();
    });
  }

  stopMetrics() {
    this.setState({
      metrics: false,
      wpm: 0
    });

    clearInterval(this.metrics);

    this.startMetricsButton.disabled = false;
    this.stopMetricsButton.disabled = true;
  }

  initKeySet() {
    this.keySet = [
      {index: 0, keyID: 'Backquote', keyUp: '`', keyDown: '~', location: 'left-pinky', shiftKey: 'ShiftRight'},
      {index: 1, keyID: 'Digit1', keyUp: '1', keyDown: '!', location: 'left-pinky', shiftKey: 'ShiftRight'},
      {index: 2, keyID: 'Digit2', keyUp: '2', keyDown: '@', location: 'left-ring', shiftKey: 'ShiftRight'},
      {index: 3, keyID: 'Digit3', keyUp: '3', keyDown: '#', location: 'left-middle', shiftKey: 'ShiftRight'},
      {index: 4, keyID: 'Digit4', keyUp: '4', keyDown: '$', location: 'left-index', shiftKey: 'ShiftRight'},
      {index: 5, keyID: 'Digit5', keyUp: '5', keyDown: '%', location: 'left-index', shiftKey: 'ShiftRight'},
      {index: 6, keyID: 'Digit6', keyUp: '6', keyDown: '^', location: 'right-index', shiftKey: 'ShiftRight'},
      {index: 7, keyID: 'Digit7', keyUp: '7', keyDown: '&', location: 'right-index', shiftKey: 'ShiftLeft'},
      {index: 8, keyID: 'Digit8', keyUp: '8', keyDown: '*', location: 'right-middle', shiftKey: 'ShiftLeft'},
      {index: 9, keyID: 'Digit9', keyUp: '9', keyDown: '(', location: 'right-ring', shiftKey: 'ShiftLeft'},
      {index: 10, keyID: 'Digit0', keyUp: '0', keyDown: ')', location: 'right-pinky', shiftKey: 'ShiftLeft'},
      {index: 11, keyID: 'Minus', keyUp: '-', keyDown: '_', location: 'right-pinky', shiftKey: 'ShiftLeft'},
      {index: 12, keyID: 'Equal', keyUp: '=', keyDown: '+', location: 'right-pinky', shiftKey: 'ShiftLeft'},
      {index: 13, keyID: 'Backspace', keyUp: '←', keyDown: '←', location: 'right-pinky', shiftKey: null},

      {index: 14, keyID: 'Tab', keyUp: '↹', keyDown: '↹', location: 'left-pinky', shiftKey: null},
      {index: 15, keyID: 'KeyQ', keyUp: 'q', keyDown: 'Q', location: 'left-pinky', shiftKey: 'ShiftRight'},
      {index: 16, keyID: 'KeyW', keyUp: 'w', keyDown: 'W', location: 'left-ring', shiftKey: 'ShiftRight'},
      {index: 17, keyID: 'KeyE', keyUp: 'e', keyDown: 'E', location: 'left-middle', shiftKey: 'ShiftRight'},
      {index: 18, keyID: 'KeyR', keyUp: 'r', keyDown: 'R', location: 'left-index', shiftKey: 'ShiftRight'},
      {index: 19, keyID: 'KeyT', keyUp: 't', keyDown: 'T', location: 'left-index', shiftKey: 'ShiftRight'},
      {index: 20, keyID: 'KeyY', keyUp: 'y', keyDown: 'Y', location: 'right-index', shiftKey: 'ShiftLeft'},
      {index: 21, keyID: 'KeyU', keyUp: 'u', keyDown: 'U', location: 'right-index', shiftKey: 'ShiftLeft'},
      {index: 22, keyID: 'KeyI', keyUp: 'i', keyDown: 'I', location: 'right-middle', shiftKey: 'ShiftLeft'},
      {index: 23, keyID: 'KeyO', keyUp: 'o', keyDown: 'O', location: 'right-ring', shiftKey: 'ShiftLeft'},
      {index: 24, keyID: 'KeyP', keyUp: 'p', keyDown: 'P', location: 'right-pinky', shiftKey: 'ShiftLeft'},
      {index: 25, keyID: 'BracketLeft', keyUp: '[', keyDown: '{', location: 'right-pinky', shiftKey: 'ShiftLeft'},
      {index: 26, keyID: 'BracketRight', keyUp: ']', keyDown: '}', location: 'right-pinky', shiftKey: 'ShiftLeft'},
      {index: 27, keyID: 'Backslash', keyUp: '\\', keyDown: '|', location: 'right-pinky', shiftKey: 'ShiftLeft'},

      {index: 28, keyID: 'CapsLock', keyUp: '⇪', keyDown: '⇪', location: 'left-pinky', shiftKey: null},
      {index: 29, keyID: 'KeyA', keyUp: 'a', keyDown: 'A', location: 'left-pinky', shiftKey: 'ShiftRight'},
      {index: 30, keyID: 'KeyS', keyUp: 's', keyDown: 'S', location: 'left-ring', shiftKey: 'ShiftRight'},
      {index: 31, keyID: 'KeyD', keyUp: 'd', keyDown: 'D', location: 'left-middle', shiftKey: 'ShiftRight'},
      {index: 32, keyID: 'KeyF', keyUp: 'f', keyDown: 'F', location: 'left-index', shiftKey: 'ShiftRight'},
      {index: 33, keyID: 'KeyG', keyUp: 'g', keyDown: 'G', location: 'left-index', shiftKey: 'ShiftRight'},
      {index: 34, keyID: 'KeyH', keyUp: 'h', keyDown: 'H', location: 'right-index', shiftKey: 'ShiftLeft'},
      {index: 35, keyID: 'KeyJ', keyUp: 'j', keyDown: 'J', location: 'right-index', shiftKey: 'ShiftLeft'},
      {index: 36, keyID: 'KeyK', keyUp: 'k', keyDown: 'K', location: 'right-middle', shiftKey: 'ShiftLeft'},
      {index: 37, keyID: 'KeyL', keyUp: 'l', keyDown: 'L', location: 'right-ring', shiftKey: 'ShiftLeft'},
      {index: 38, keyID: 'Semicolon', keyUp: ';', keyDown: ':', location: 'right-pinky', shiftKey: 'ShiftLeft'}, 
      {index: 39, keyID: 'Quote', keyUp: '\'', keyDown: '"', location: 'right-pinky', shiftKey: 'ShiftLeft'},
      {index: 40, keyID: 'Enter', keyUp: '↵', keyDown: '↵', location: 'right-pinky', shiftKey: null},
      
      {index: 41, keyID: 'ShiftLeft', keyUp: '⇧', keyDown: '⇧', location: 'left-pinky', shiftKey: null},
      {index: 42, keyID: 'KeyZ', keyUp: 'z', keyDown: 'Z', location: 'left-pinky', shiftKey: 'ShiftRight'},
      {index: 43, keyID: 'KeyX', keyUp: 'x', keyDown: 'X', location: 'left-ring', shiftKey: 'ShiftRight'},
      {index: 44, keyID: 'KeyC', keyUp: 'c', keyDown: 'C', location: 'left-middle', shiftKey: 'ShiftRight'},
      {index: 45, keyID: 'KeyV', keyUp: 'v', keyDown: 'V', location: 'left-index', shiftKey: 'ShiftRight'},
      {index: 46, keyID: 'KeyB', keyUp: 'b', keyDown: 'B', location: 'left-index', shiftKey: 'ShiftRight'},
      {index: 47, keyID: 'KeyN', keyUp: 'n', keyDown: 'N', location: 'right-index', shiftKey: 'ShiftLeft'},
      {index: 48, keyID: 'KeyM', keyUp: 'm', keyDown: 'M', location: 'right-index', shiftKey: 'ShiftLeft'},
      {index: 49, keyID: 'Comma', keyUp: ',', keyDown: '<', location: 'right-middle', shiftKey: 'ShiftLeft'},
      {index: 50, keyID: 'Period', keyUp: '.', keyDown: '>', location: 'right-ring', shiftKey: 'ShiftLeft'},
      {index: 51, keyID: 'Slash', keyUp: '/', keyDown: '?', location: 'right-pinky', shiftKey: 'ShiftLeft'},
      {index: 52, keyID: 'ShiftRight', keyUp: '⇧', keyDown: '⇧', location: 'right-pinky', shiftKey: null},
      
      {index: 53, keyID: 'Space', keyUp: null, keyDown: null, location: 'right-thumb', shiftKey: null}
    ];

    this.keyMap = new Map(
      this.keySet.map(key => [key.keyID, key])
    );
  }

  setExactKeyImages() {
    const exactKeys = this.state.exactKeys;

    if (exactKeys.length === 0) {
      this.setRightExactKeyImage('right-empty');
      this.setLeftExactKeyImage('left-empty');
    }

    else {
      exactKeys.forEach(key => {
        const location = key.location;
  
        if (location.startsWith('right')) {
          this.setRightExactKeyImage(location);
  
          if (exactKeys.length === 1)
            this.setLeftExactKeyImage('left-empty');
        }
          
        else if (location.startsWith('left')) {
          this.setLeftExactKeyImage(location);
  
          if (exactKeys.length === 1)
            this.setRightExactKeyImage('right-empty');
        } 
      });
    }   

    if (this.checkbox.checked)
      this.checkbox.checked = false;
  }

  highlightNextLetter() {  
    const letterIndex =  this.state.letter;
    const wordIndex = this.state.word;
    const paragraphIndex = this.state.paragraph;

    const element = document.getElementById(`p${paragraphIndex}w${wordIndex}l${letterIndex}`);
    
    if (element) {
      element.classList.add('current');

      if (element.innerHTML !== '&nbsp;')
        element.classList.add('pending');
    }
  }

  getExactKeys() {
    const letterIndex =  this.state.letter;
    const wordIndex = this.state.word;
    const paragraphIndex = this.state.paragraph;
    const words = this.getWords();
    const letters = this.getLetters();

    let exactKeys = [];

    const element = document.getElementById(`p${paragraphIndex}w${wordIndex}l${letterIndex}`);
    
    if (element) {
      if (wordIndex < words.length && letterIndex <= letters.length) {
        if (element.innerHTML === '&nbsp;') {
          if (wordIndex === words.length - 1) {
            const enter = this.keyMap.get('Enter');
            exactKeys = [enter];
          }
            
          else {
            const space = this.keyMap.get('Space');
            exactKeys = [space];
          }
        }
          
        else {
          const letter = element.innerText;
          const charDown = this.keySet.find(key => key.keyDown === letter);
          
          if (charDown) {
            const shiftKey = this.keyMap.get(charDown.shiftKey);
            exactKeys = [charDown, shiftKey];
          }
    
          else {
            const charUp = this.keySet.find(key => key.keyUp === letter);
            exactKeys = [charUp];
          }
        }
      }
    }

    return exactKeys;
  }
  
  getPressedKey(keyValue, shiftKeyState, location) {
    const characterPressed = keyValue.match(this.charMatch);

    let key = this.keyMap.get(keyValue);

    if (characterPressed) {
      if (shiftKeyState) 
        key = this.keySet.find(key => key.keyDown === keyValue);
      
      else 
        key = this.keySet.find(key => key.keyUp === keyValue);
    }

    if (keyValue === 'Shift')
      key = location === 1? this.keyMap.get('ShiftLeft') : this.keyMap.get('ShiftRight');
    
    else if (keyValue === ' ') 
      key = this.keyMap.get('Space');

    return key;
  }

  typeIn(event) {
    const status = this.state.status;

    const keyValue = event.key;
    const shiftKeyState = event.shiftKey;
    const keyLocation = event.location;

    const key = this.getPressedKey(keyValue, shiftKeyState, keyLocation);
    const error = this.state.error;

    if (status === 'start') {
      this.setState({
        wpms: [],
        accuracy: 100,
        errors: 0,
      });
    }

    if (status !== 'ending') {      
      const capsLockState = event.getModifierState('CapsLock');

      if (key) {
        let letterIndex = this.state.letter;
        let wordIndex = this.state.word;
        let paragraphIndex = this.state.paragraph;

        const element = document.getElementById(`p${paragraphIndex}w${wordIndex}l${letterIndex}`);

        if (element) {
          const pressedKeys = [...this.state.pressedKeys];

          if (!pressedKeys.includes(key))
            pressedKeys.push(key);

          const backspace = this.keyMap.get('Backspace');
          const newStatus = this.checkStatus(keyValue, pressedKeys);
          
          const hits = this.state.hits;
          const errors = this.state.errors;
          const counter = this.state.counter;

          if (newStatus === 'correct') {
            const paragraphs = this.state.paragraphs;
            const words = this.getWords();
            const letters = this.getLetters();

            const exactKeys = this.state.exactKeys;

            if (exactKeys.includes(backspace)) 
              this.nextElement();
            
            else {
              if (letterIndex + 1 <= letters.length) 
                letterIndex++;
                
              else if (wordIndex + 1 < words.length) {
                letterIndex = 0;
                wordIndex++;
              }

              else if (paragraphIndex + 1 < paragraphs.length) {
                letterIndex = 0;
                wordIndex = 0;
                paragraphIndex++;

                this.setState({
                  previousLetter: 0,
                  previousWord: 0
                });
                
                this.addTextInputNewLine();
              }
              
              this.addCorrectMarking(element);
              this.removeExactKeyLocation();

              const accuracy = Math.round(100 * (hits + 1) / (counter + 1));

              this.setState({
                letter: letterIndex,
                word: wordIndex,
                paragraph: paragraphIndex,
                hits: hits + 1,
                counter: counter + 1,
                accuracy: accuracy,
              }, this.nextElement);

              this.advanced = true;
            }

            this.setState({
              error: false
            });
          }
          
          else if (newStatus === 'incorrect') {
            this.addWrongMarking(element);
            const exactKeys = [backspace];

            const currentErrors = this.advanced? errors + 1 : errors;
            this.advanced = false;

            const accuracy = Math.round(100 * hits / (counter + 1));

            this.setState({
              exactKeys: exactKeys,
              error: true,
              errors: currentErrors,
              counter: counter + 1,
              accuracy: accuracy
            }, this.setExactKeyImages);
          }

          this.setState({
              pressedKeys: pressedKeys,
              shiftKey: shiftKeyState,
              capsLock: capsLockState,
              status: newStatus
          }, this.endSession);
        }
      }
    }

    const backspacePressed = keyValue === 'Backspace';
    const whitespace = (keyValue === 'Enter' || keyValue === ' ');
    const character = keyValue.match(this.charMatch);
    const tab = keyValue === 'Tab';

    const ending = status === 'ending';
    
    if (!key || tab || ending || ((whitespace || character) && error) || (backspacePressed && !error))
      event.preventDefault();

    this.scrollTextInputToBottom();
  }

  textIdentical(keyValue) {
    const letterIndex = this.state.letter;
    const letters = this.getLetters();
    const letter = this.getLetter();
    const textReadValue = letterIndex < letters.length? letter : ' ';
    const character = keyValue.match(this.charMatch);
    const textInputValue = (character || keyValue === ' ')? keyValue : (keyValue === 'Enter')? ' ' : '';

    return textReadValue === textInputValue;
  }

  checkStatus(keyValue, pressedKeys) {
    const letterIndex = this.state.letter;
    const wordIndex = this.state.word;
    const paragraphIndex = this.state.paragraph;
    const paragraphs = this.state.paragraphs;
    const words = this.getWords();
    const letters = this.getLetters();
    const whitespace = (keyValue === 'Enter' || keyValue === ' ');
    const character = keyValue.match(this.charMatch);
    const backspace = keyValue === 'Backspace';
    const shift = keyValue === 'Shift';
    const capsLock = keyValue === 'CapsLock';
    const exactKeys = this.state.exactKeys;
    const fitleredKeys = pressedKeys.filter(key => exactKeys.includes(key));
    const exact = fitleredKeys.length === exactKeys.length; 
    const identical = this.textIdentical(keyValue);
    const correct = backspace? exact : exact && identical;
    const error = this.state.error;
    const complete = letterIndex === letters.length && wordIndex === words.length - 1 && 
      paragraphIndex === paragraphs.length - 1 && exact && identical;

    if (complete)
      return 'complete';

    else if (((character || whitespace) && !capsLock && !shift && !backspace && !error) || (backspace && error)) {
      if (correct)
        return 'correct';
      
      else 
        return 'incorrect';
    }
    
    return 'idle';
  }

  removeExactKeyLocation() {
    const exactKeys = this.state.exactKeys;

    exactKeys.forEach(exactKey => {
      const exactKeyElement = document.getElementById(exactKey.keyID);
      
      if (exactKeyElement)
        exactKeyElement.classList.remove(exactKey.location);
    });
  }

  addCorrectMarking(element) {
    element.classList.remove('current');

    if (element.innerHTML !== '&nbsp;' && !element.classList.contains('wrong'))
      element.classList.add('correct');
    
  }

  addWrongMarking(element) {
    if (element.innerHTML === '&nbsp;')
      element.classList.add('space-wrong');

    else {
      element.classList.remove('pending');
      element.classList.add('wrong');
    }
  }

  typeOut(event) {
    const pressedKeys = [...this.state.pressedKeys];
    const previousKeys = this.state.exactKeys;

    const keyValue = event.key;

    const shiftKeyState = event.shiftKey;
    const keyLocation = event.location;

    const key = this.getPressedKey(keyValue, shiftKeyState, keyLocation);

    if (key) {
      const index = pressedKeys.findIndex(pressedKey => pressedKey.keyID === key.keyID);
      pressedKeys.splice(index, 1);
    }

    this.setState({
      pressedKeys: pressedKeys,
      previousKeys: previousKeys,
      shiftKey: false
    });
  }

  endSession() {
    const status = this.state.status;

    if (status === 'complete') {
      this.stopMetrics();
      
      this.setState({
        exactKeys: [],
        previousKeys: [],
        status: 'ending',
      }, () => {
        this.reloadImage();
        this.setExactKeyImages();
        this.resetLetterElements();
      });
  
      setTimeout(() => {
        this.resetImage();
        this.resetTextInput();
  
        this.setState({
          letter: 0,
          word: 0,
          paragraph: 0,
          status: 'start',
          hits: 1,
          counter: 1
        }, () => {
          this.nextElement();
          const exactKeys = this.getExactKeys();

          this.setState({
            previousKeys: exactKeys
          });
        });
      }, 3000);
    }
  }

  setPractice() {
    const textReadValue = this.textRead.value;
    const oldParagraphs = this.state.paragraphs;
    
    const oldTextReadValue = oldParagraphs.length > 0? oldParagraphs.reduce(this.paragraphReducer) : '';

    const paragraphsChanged = oldTextReadValue !== textReadValue;
    const paragraphs = textReadValue.split('\n\n');

    this.setState({
      paragraphs: paragraphs,
      letter: 0,
      word: 0,
      paragraph: 0,
      hits: 1,
      counter: 1,
      status: 'start',
      error: false
    }, () => {
      this.stopMetrics();

      if (paragraphsChanged)
        this.resetTextInput();
      
      this.resetLetterElements();
      this.nextElement();
      
      const exactKeys = textReadValue.length === 0? [] : this.getExactKeys();
      this.setState({
        previousKeys: exactKeys
      });
    });
  }

  resetTextInput() {
    this.setTextInputValue('');
  }

  resetTextRead() {
    this.setTextReadValue('');
  }

  addTextInputNewLine() {
    this.textInput.value += '\n';
  }

  resetLetterElements() {
    const correctElements = Array.from(document.getElementsByClassName('correct'));
    const pendingElements =  Array.from(document.getElementsByClassName('pending'));
    const wrongElements = Array.from(document.getElementsByClassName('wrong'));
    const spaceWrongElements = Array.from(document.getElementsByClassName('space-wrong'));
    const currentElements = Array.from(document.getElementsByClassName('current'));

    this.removeStyle(correctElements, 'correct');
    this.removeStyle(pendingElements, 'pending');
    this.removeStyle(wrongElements, 'wrong');
    this.removeStyle(spaceWrongElements, 'space-wrong');
    this.removeStyle(currentElements, 'current');
  }

  removeStyle(elements, style) {
    if (elements.length > 0) {
      elements.forEach(element => {
        element.classList.remove(style);
      });
    }
  }

  setHands(handedness) {
    if (handedness === 'left') {
      this.leftHand.src = leftHand;
      this.rightHand.src = leftHanded;
    } 

    else {
      this.leftHand.src = rightHanded;
      this.rightHand.src = rightHand;
    }
  }

  nextElement() {
    const textReadValue = this.textRead.value;

    if (textReadValue.length > 0) {
      this.scrollCorrector();
      this.highlightNextLetter();
    }

    this.setExactKeys();
  }

  setExactKeys() {
    const textReadValue = this.textRead.value;
    const exactKeys = textReadValue.length === 0? [] : this.getExactKeys();

    this.setState({
      exactKeys: exactKeys
    }, this.setExactKeyImages);
  }

  scrollCorrector() {
    const paragraph = this.getParagraph();
    const paragraphLength = paragraph.length;
    const maxScrollTop = this.corrector.scrollHeight - this.corrector.clientHeight;
    const maxScrollRight = this.corrector.scrollWidth - this.corrector.clientWidth;
    const current = this.getCurrentPosition();
    const scrollTop = current / paragraphLength * maxScrollTop;
    const scrollRight = current / paragraphLength * maxScrollRight;

    this.corrector.scrollTop = scrollTop;
    this.corrector.scrollLeft = scrollRight;
  }

  getCurrentPosition() {
    const wordIndex = this.state.word;
    const words = this.getWords();
    const letterIndex =  this.state.letter;
    
    let current = 0;

    for (let w = 0; w <= wordIndex; w++) 
        current += w < wordIndex? words[w].length + 1 : letterIndex;

    return current;
  }

  displayReference() {
    this.checkbox.checked = !this.checkbox.checked;

    if (this.checkbox.checked) {
      this.setHands(this.handedness);

      this.setState({
        previousKeys: this.keySet
      });
    }
      
    else {
      this.setExactKeyImages();

      const exactKeys = this.getExactKeys();

      this.setState({
        previousKeys: exactKeys
      });
    }
  }

  focusTextInput() {    
    if (this.textRead.value.length > 0)
      this.textInput.focus();
  }

  scrollTextInputToBottom() {
    const maxScrollTop = this.textInput.scrollHeight - this.textInput.clientHeight;
    this.textInput.scrollTop = maxScrollTop;
  }

  removeClickListener() {
    this.textRead.removeEventListener('click', this.setCustomInput);
  }

  setSelectorIndex(value) {
    this.selector.selectedIndex = value;
  }

  setTextReadValue(value) {
    this.textRead.value = value;
  }

  setTextInputValue(value) {
    this.textInput.value = value;
  }

  setCustomInput() {
    const index = this.selector.selectedIndex;

    if (index !== 5) {
      this.stopMetrics();
      this.setSelectorIndex(5);
      this.resetTextRead();
      this.resetTextInput();
      this.removeClickListener();
      
      this.setState({
        paragraphs: [],
        exactKeys: [],
        previousKeys: [],
        hits: 1,
        counter: 1,
        status: 'start'
      }, this.setExactKeyImages);
    }
  }

  setInputPolicy(event) {
    const keyValue = event.key;
    const textReadValue = this.textRead.value;
    
    if (keyValue === 'Enter' && textReadValue.endsWith(' '))
      this.trimTextReadValue();

    if (keyValue === 'Tab')
      this.textRead.value = textReadValue + '  ';
    
    if (((textReadValue.length === 0) &&
          (keyValue === 'Enter' || keyValue === ' ')) ||
      
        ((textReadValue.length > 0) &&
          ((textReadValue.endsWith('\n') && keyValue === ' ') ||
          (keyValue === 'Enter' && textReadValue.endsWith('\n\n')) || 
          (keyValue === ' ' && textReadValue.endsWith('  ')))))

      event.preventDefault();
  }

  trimTextReadValue() {
    if (this.selector.selectedIndex === 5)  {
      this.setTextReadValue(this.textRead.value.trim());
      this.setPractice();
    }
  }

  setStory() {
    const index = this.selector.selectedIndex;
    const textReadValue = material.stories[index].content.reduce(this.paragraphReducer);

    this.setTextReadValue(textReadValue);
    this.setPractice();    
    this.focusTextInput();
  }

  addClickListener() {
    if (this.selector.selectedIndex === 5)
      this.textRead.addEventListener('click', this.setCustomInput);
  }

  reloadImage() {
    this.celebration.src = finish;
  }

  setWPM() {
    const currentLetterIndex = this.state.letter;
    const currentWordIndex = this.state.word;
    const letters = this.getLetters();
    const paragraph = this.getWords();
    const previousWordIndex = this.state.previousWord;
    const previousWord = paragraph[previousWordIndex];
    const previousWords = currentWordIndex - previousWordIndex;
    const previousLetterIndex = this.state.previousLetter;
    const previousTypedLetters = previousWord.length - previousLetterIndex + 1;
    const previousWordSpan = previousWord.length + 1;
    const currentTypedLetters = currentLetterIndex - (previousWords === 0? previousLetterIndex : 0);
    const currentWordLength = letters.length;
    const currentWordSpan = currentWordLength + 1;
    const currentLetterPercentage = currentTypedLetters / currentWordSpan;
    const previousLettersPercentage = previousTypedLetters / previousWordSpan;
    const lettersPercentage = currentLetterPercentage + (previousWords > 0? previousLettersPercentage : 0);
    const wordsPerSecond = previousWords - (previousWords > 0? 1 : 0) + lettersPercentage;

    const previousWordsPerSecond = this.state.previousWPS;

    const wpm = wordsPerSecond > 0? Math.round(60 * wordsPerSecond) : Math.round(60 * previousWordsPerSecond);

    const wpms = this.state.wpms;
    const previousWPM = this.state.wpm;
    
    if (wpm !== previousWPM)
      wpms.push(wpm);
    
    this.setState({
      wpm: wpm,
      wpms: wpms,
      previousWPS: wordsPerSecond > 0? wordsPerSecond : previousWordsPerSecond,
      previousLetter: currentLetterIndex,
      previousWord: currentWordIndex
    });
  }

  setLeftExactKeyImage(location) {
    switch (location) {
      case 'left-thumb':
        this.leftHand.src = leftThumb;
        break;

      case 'left-index':
        this.leftHand.src = leftIndex;
        break;

      case 'left-middle':
        this.leftHand.src = leftMiddle;
        break;

      case 'left-ring':
        this.leftHand.src = leftRing;
        break;

      case 'left-pinky':
        this.leftHand.src = leftPinky;
        break;

      default:
        this.leftHand.src = leftEmpty;
    }
  }

  setRightExactKeyImage(location) {
    switch (location) {
      case 'right-thumb':
        this.rightHand.src = rightThumb;
        break;

      case 'right-index':
        this.rightHand.src = rightIndex;
        break;

      case 'right-middle':
        this.rightHand.src = rightMiddle;
        break;

      case 'right-ring':
        this.rightHand.src = rightRing;
        break;

      case 'right-pinky':
        this.rightHand.src = rightPinky;
        break;

      default:
        this.rightHand.src = rightEmpty;
    }
  }

  resetImage() {
    this.celebration.removeAttribute('src');
  }

  render() {
    const paragraphs = this.state.paragraphs;
    const paragraphIndex = this.state.paragraph;

    let textReadValue = '';

    if (paragraphs.length > 0)
      textReadValue = paragraphs.reduce(this.paragraphReducer);

    const shiftKey = this.state.shiftKey;
    const capsLock = this.state.capsLock;
    const pressedKeys = this.state.pressedKeys;
    const previousKeys = this.state.previousKeys;
    const status = this.state.status;
    const rows = '13';
    const start = status === 'start';
    const ending = status === 'ending';
    const metrics = this.state.metrics;
    const wpm = this.state.wpm;
    const accuracy = this.state.accuracy;
    const errors = this.state.errors;
    const wpms = this.state.wpms;

    const leftDetails =
      <select title='Text Selector' className='selector detail-label' ref={ref => this.selector = ref} onChange={this.setStory}>
        <option title='https://www.shortstories4kids.com/2018/03/snow-white-dwarfs-story.html' value='Snow White' onClick={this.addClickListener}>Snow White</option>
        <option title='https://www.bedtimestorieskids.com/bedtime-stories-little-red-riding-hood' value='Little Red Riding Hood' onClick={this.addClickListener}>Little Red Riding Hood</option>
        <option title='https://www.shortstories4kids.com/2020/05/alice-wonderland-short-story.html' value='Alice in Wonderland' onClick={this.addClickListener}>Alice in Wonderland</option>
        <option title='https://www.kidsshortmoralstories.com/short-story-of-the-wonderful-wizard-of-oz/' value='The Wonderful Wizard of Oz' onClick={this.addClickListener}>The Wonderful Wizard of Oz</option>
        <option title='https://www.bedtimeshortstories.com/cinderella-short-story/amp' value='Cinderella' onClick={this.addClickListener}>Cinderella</option>
        <option value='Custom Text' hidden onClick={this.addClickListener}>Custom Text</option>
      </select>;

    const rightDetails = 
      <div key='right-details' className="detail-labels">
        <div className='label detail-label'>
          <button className='button start-metrics' ref={ref => this.startMetricsButton =  ref} type='button' onClick={this.startMetrics} disabled={metrics}>
            START
          </button>
          <button className='button stop-metrics'  ref={ref => this.stopMetricsButton =  ref} type='button' onClick={this.stopMetrics} disabled={!metrics}>
            STOP
          </button>
          <span className='wpm-abbr' title='Word Per Minute' ><strong>WPM</strong></span>: {wpm}
        </div>
        <div className='label detail-label'>
          <strong>Accuracy</strong>: {start? 100 : accuracy}%
        </div>
        <div className='label detail-label'>
          <strong>Errors</strong>: {start? 0 : errors}
        </div>
      </div>;

  const report = 
    <div key='report' className='label detail-label report' ref={ref => this.report = ref} onMouseEnter={this.hoverInReport} onMouseLeave={this.hoverOutReport} onClick={this.showReport}>
      <strong>Report</strong>
    </div>;

    return (
      <div className='typist'>
        <ReportModal 
          accuracy={accuracy}
          errors={errors} 
          wpms={wpms} 
          close={this.closeModal}
          background={ref => this.reportBackground = ref} 
          closer={ref => this.closer = ref} 
          details={ref => this.reportDetails = ref} 
          getWords={this.getWords} />

        <div className="typist-content">
          <div className='text'>
            <Menu side='left' title='Text' details={leftDetails} />
            <div className='text-wrappers'>
              <div className='text-read-wrapper'><textarea placeholder='Type Custom Text' className='text-read' cols='30' rows={rows} value={textReadValue} onClick={this.setCustomInput} onKeyDown={this.setInputPolicy} onChange={this.setPractice} onBlur={this.trimTextReadValue} ref={ref => this.textRead = ref}></textarea></div>
              <div className='text-input-wrapper' onClick={this.focusTextInput}><textarea placeholder='Practice Typing Text' className='text-input' cols='30' rows={rows} onKeyDown={this.typeIn} onKeyUp={this.typeOut} ref={ref => this.textInput = ref}></textarea></div>
            </div>
          </div>
          <div className='practice'>
            <Menu side='right' title='Metrics' details={[rightDetails, report]} />
            {ending? <Celebration celebration={ref => this.celebration = ref} /> : null}
            <div className="practice-content">
              <Reader
                leftHand={ref => this.leftHand = ref} 
                leftRadio={ref => this.leftRadio = ref} 
                rightHand={ref => this.rightHand = ref} 
                rightRadio={ref => this.rightRadio = ref} 
                corrector={ref => this.corrector = ref}
                paragraphs={paragraphs} 
                paragraphIndex={paragraphIndex}
                getWords={this.getWords}
                setHandedness={this.setHandedness} />
              <Keyboard
                keySet={this.keySet}
                shiftKey={shiftKey}
                capsLock={capsLock}
                pressedKeys={pressedKeys}
                previousKeys={previousKeys}
                displayReference={this.displayReference}
                checkbox={ref => this.checkbox = ref} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Typist;