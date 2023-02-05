const methods = {
  averageWPM(wpms) {
    const filteredWPMs = [...wpms];

    filteredWPMs.pop();
    filteredWPMs.shift();
    return Math.round(filteredWPMs.reduce((previous, current) => previous + current, 0) / filteredWPMs.length);
  }
};

export default methods;