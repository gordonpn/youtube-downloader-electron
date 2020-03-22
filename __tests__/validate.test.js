const path = require('path');
const { validateLinks } = require(path.join(process.cwd(), 'src/js/validate.js'));

describe('with an valid youtube link, validation', () => {
  it('should resolve', () => {
    return expect(validateLinks('https://www.youtube.com/watch?v=9nfVWiXY3WY'))
      .resolves.toBeTruthy();
  })
});

describe('with an valid short youtube link, validation', () => {
  it('should resolve', () => {
    return expect(validateLinks('https://youtu.be/9nfVWiXY3WY'))
      .resolves.toBeTruthy();
  })
});

describe('with a dailymotion link, validation', () => {
  it('should reject', () => {
    return expect(validateLinks('https://www.dailymotion.com/video/x3n5nk9'))
      .rejects.toBeTruthy();
  })
});

describe('with a space character " ", validation', () => {
  it('should reject', () => {
    return expect(validateLinks(' '))
      .rejects.toBeTruthy();
  })
});

