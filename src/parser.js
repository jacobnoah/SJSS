function parseSJSS(sjssContent) {
    const directives = [];
    const lines = sjssContent.split('\n');
    let currentSelector = '';
    let insideRule = false;
  
    // Regex to match => directives
    const directiveRegex = /^\s*=>\s*(add-class|remove-class|toggle-class)\s*([^{}\s]+)\s*([^{}\s]+)\s*;/;
  
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
  
      // Detect selector (start of a rule)
      if (line.match(/[^{]+{/)) {
        currentSelector = line.split('{')[0].trim();
        insideRule = true;
        continue;
      }
  
      // Detect end of rule
      if (line === '}') {
        insideRule = false;
        currentSelector = '';
        continue;
      }
  
      // Parse => directives inside a rule
      if (insideRule) {
        const match = line.match(directiveRegex);
        if (match) {
          directives.push({
            action: match[1],
            target: match[2],
            className: match[3].replace(/^\./, ''), // Remove leading dot
            parentSelector: currentSelector
          });
        }
      }
    }
  
    return directives;
  }
  
  module.exports = { parseSJSS };