const { generateJS } = require('../src/generator');

describe('SJSS Generator', () => {
  test('generates JS for toggle-class', () => {
    const directives = [{
      action: 'toggle-class',
      target: '.modal',
      className: 'visible',
      parentSelector: 'a:click'
    }];
    const js = generateJS(directives);
    expect(js).toContain("el.addEventListener('click', () => {");
    expect(js).toContain("target.classList.toggle('visible');");
  });
});