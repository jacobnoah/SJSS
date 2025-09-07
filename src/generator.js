function generateJS(directives) {
    const eventMap = {
      ':click': 'click',
      ':active': 'mousedown',
      ':hover': 'mouseenter'
    };
  
    const jsCode = directives.map(d => {
      const event = Object.keys(eventMap).find(pseudo => d.parentSelector.includes(pseudo)) || ':click';
      const jsEvent = eventMap[event] || 'click';
      const selector = d.parentSelector.replace(/:.*$/, '');
      let code = `
        document.querySelectorAll('${selector}').forEach(el => {
          el.addEventListener('${jsEvent}', () => {
            document.querySelectorAll('${d.target}').forEach(target => {
              target.classList.${d.action.replace('-class', '')}('${d.className}');
            });
          });
      `;
      // For temporary states (e.g., :active, :hover), add removal logic
      if (event === ':active') {
        code += `
          el.addEventListener('mouseup', () => {
            document.querySelectorAll('${d.target}').forEach(target => {
              target.classList.remove('${d.className}');
            });
          });
        `;
      } else if (event === ':hover') {
        code += `
          el.addEventListener('mouseleave', () => {
            document.querySelectorAll('${d.target}').forEach(target => {
              target.classList.remove('${d.className}');
            });
          });
        `;
      }
      code += `
        });
      `;
      return code;
    }).join('\n');
  
    return `
      (function() {
        window.addEventListener('DOMContentLoaded', () => {
          ${jsCode}
        });
      })();
    `;
  }
  
  module.exports = { generateJS };