const parseJson = (string = '') => {
  try {
    JSON.parse(string);
  } catch (e) {
    return {};
  }
}

module.exports = { parseJson };
