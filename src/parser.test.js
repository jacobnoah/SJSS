const { parseSJSS } = require('../src/parser');

describe('SJSS Parser', () => {
  test('parses => directive', () => {
    const sjss = `
      .toggle-btn:click {
        => toggle-class .modal .visible;
      }
    `;
    const directives = parseSJSS(sjss);
    expect(directives).toEqual([{
      action: 'toggle-class',
      target: '.modal',
      className: 'visible',
      parentSelector: '.toggle-btn:click'
    }]);
  });
});