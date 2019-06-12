module.exports = { 
  getNextHeadingLevel(currentLevel) {
    return parseInt(currentLevel, 10) + 1;
  }
};
