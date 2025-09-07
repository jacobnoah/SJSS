# SJSS: Sass with JavaScript

SJSS (Sass with JavaScript) introduces a new file type (`.sjss`) that supercharges SCSS with JavaScript-driven class manipulation via the `=>` directive. Build interactive UI components—modals, dropdowns, theme toggles—without writing separate JavaScript files. SJSS compiles to standard CSS and generates JavaScript event listeners, perfect for lightweight projects, rapid prototyping, and style-driven interactions.

## Features

- **Declarative Interactivity**: Use `=>` directives (e.g., `=> toggle-class .modal .visible`) to add, remove, or toggle classes.
- **Seamless SCSS Integration**: Write standard SCSS alongside `=>` directives.
- **Automatic JavaScript Generation**: Creates event listeners for interactivity, no manual JavaScript needed.
- **VS Code Syntax Highlighting**: `.sjss` files get SCSS-like highlighting with orange `=>` directives for clarity.
- **CLI and Build Tools**: Integrates with Node.js workflows (Vite, Webpack, or CLI).
- **Lightweight Runtime**: Minimal JavaScript runtime (~1KB) for generated code.

## Why SJSS?

SJSS bridges CSS and JavaScript, making it ideal for:
- **Designers**: Add interactivity without learning JavaScript.
- **Prototypers**: Build functional UIs in a single file.
- **Lightweight Sites**: Create modals or toggles without heavy frameworks.
- **Design Systems**: Keep styles and behavior in sync.

## Prerequisites

- Node.js v18 or higher (v20 recommended).
- VS Code for syntax highlighting (optional but recommended).

## Installation

Install the SJSS processor via npm:

```bash
npm i sjss-processor
```

Install the VS Code extension for syntax highlighting:Open VS Code and go to the Extensions view (Ctrl+Shift+X or Cmd+Shift+X on Mac).
Search for SJSS Language Support by yourusername.
Click Install.

Alternatively, install manually

```bash
code --install-extension sjss-vscode-1.0.0.vsix
```

Download the .vsix file from the VS Code Marketplace or GitHub releases.

## Usage

1. Create an .sjss File:Write SCSS styles and => directives for interactivity {modal.sjss}:

```
.modal {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid #ccc;

  &.visible {
    display: block;
  }
}

.toggle-btn:click {
  => toggle-class .modal .visible;
}
```

2. Process the File:Use the CLI to generate CSS and JavaScript:


```
npx sjss modal.sjss
```

This creates:
* output.css: Compiled SCSS styles.
* output.js: JavaScript event listeners.

3. Include in HTML

```
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="output.css">
</head>
<body>
  <button class="toggle-btn">Toggle Modal</button>
  <div class="modal">Modal Content</div>
  <script src="node_modules/@yourusername/sjss/src/runtime.js"></script>
  <script src="output.js"></script>
</body>
</html>
```

4. Set Up VS Code Syntax Highlighting: After installing the SJSS Language Support extension, open an .sjss file.
Syntax highlighting mirrors SCSS, with => directives highlighted in orange (#FF9900) for easy identification.
Customize the color (optional) in VS Code settings:

```
{
  "editor.tokenColorCustomizations": {
    "textMateRules": [
      {
        "scope": "meta.js-directive.sjss",
        "settings": {
          "foreground": "#FF9900"
        }
      }
    ]
  }
}
```

SyntaxSJSS extends SCSS with the => directive for class manipulation:=> add-class .target .class: Adds .class to .target elements.
=> remove-class .target .class: Removes .class from .target elements.
=> toggle-class .target .class: Toggles .class on .target elements.

Supported Pseudo-Classes::click: Triggers on click (persistent toggle/add/remove).
:active: Triggers on mousedown, reverses on mouseup.
:hover: Triggers on mouseenter, reverses on mouseleave.

