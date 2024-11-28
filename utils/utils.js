const isInputValid = (input, requiredData) => {
  if (Object.keys(input).length === 0) {
    return false;
  }

  for (let i = 0; i < requiredData.length; i++) {
    if (!Object.keys(input).includes(requiredData[i])) {
      return false;
    }
  }

  return true;
};

module.exports = { isInputValid };
