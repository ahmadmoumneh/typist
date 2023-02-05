const methods = {
  showReport() {
    this.reportBackground.style.background = 'linear-gradient(45deg, white, grey 30%, black 70%)';
    this.reportBackground.classList.remove('show-report-hover');
    this.reportBackground.classList.add('show-report');
    this.closer.style.display = 'inline-flex';
    this.reportDetails.style.display = 'inline-flex';
  },

  hoverInReport() {
    this.reportBackground.classList.add('show-report-hover');
  },

  hoverOutReport() {
    this.reportBackground.classList.remove('show-report-hover');
  },

  closeModal() {
    this.closer.style.display = 'none';
    this.reportDetails.style.display = 'none';
    this.reportBackground.classList.remove('show-report');
    this.reportBackground.style.background = 'linear-gradient(45deg, transparent 10% , black)';
  },

  getParagraph() {
    const paragraphIndex = this.state.paragraph;
    const paragraphs = this.state.paragraphs;

    return paragraphs[paragraphIndex];
  },

  getWords() {
    const paragraph = this.getParagraph();

    return paragraph.split(' ');
  },

  getWord() {
    const wordIndex = this.state.word;
    const words = this.getWords();

    return words[wordIndex];
  },

  getLetters() {
    const word = this.getWord();

    return word.split('');
  },

  getLetter() {
    const letterIndex = this.state.letter;
    const letters = this.getLetters();

    return letters[letterIndex];
  },

  setHandedness(handedness) {
    switch (handedness) {
      case 'left':
        const locationLeft = 'left-thumb';

        this.keySet[53].location = locationLeft;
        this.leftRadio.checked = true;

        break;
      

      default:
        const locationRight = 'right-thumb';

        this.keySet[53].location = locationRight;
        this.rightRadio.checked = true;
    }

    if (this.checkbox.checked)
      this.setHands(handedness);

    else this.setExactKeyImages();

    this.handedness = handedness;
    this.forceUpdate();
  }
};

export default methods;